export type SyncState =
  "local" | "loading" | "synced" | "saving" | "error" | "conflict";
type SaveResult = { ok: boolean; revision: number };
type Remote<T> = { document: T; revision: number } | null;
type Dependencies<T> = {
  read: (owner: string) => Promise<Remote<T>>;
  save: (owner: string, document: T, revision: number) => Promise<SaveResult>;
  changed: (owner: string, document: T) => void;
  pending: (owner: string, pending: boolean) => void;
  status: (state: SyncState) => void;
};

/** Serializes writes and fences every response by account generation. */
export class ArchiveSync<T> {
  owner = "guest";
  document: T;
  private generation = 0;
  private version = 0;
  private revision = 0;
  private dirty = false;
  private ready = false;
  private operation: Promise<void> | null = null;
  private retrying: Promise<void> | null = null;
  constructor(
    initial: T,
    private deps: Dependencies<T>,
  ) {
    this.document = initial;
  }

  async select(owner: string, document: T, pending: boolean) {
    const generation = ++this.generation;
    this.owner = owner;
    this.document = document;
    this.version = 0;
    this.revision = 0;
    this.ready = false;
    this.dirty = pending;
    this.operation = null;
    this.retrying = null;
    this.deps.changed(owner, document);
    this.deps.status(owner === "guest" ? "local" : "loading");
    if (owner === "guest") return;
    try {
      const remote = await this.deps.read(owner);
      if (generation !== this.generation) return;
      this.revision = remote?.revision || 0;
      // A reload or an edit made during the request must never lose local work.
      if (this.dirty) {
        this.deps.status("conflict");
        return;
      }
      this.ready = true;
      if (remote) {
        this.document = remote.document;
        this.deps.changed(owner, remote.document);
        this.deps.status("synced");
      } else {
        this.dirty = true;
        this.deps.pending(owner, true);
        await this.flush();
      }
    } catch {
      if (generation === this.generation) this.deps.status("error");
    }
  }

  write(document: T) {
    this.document = document;
    this.version++;
    this.deps.changed(this.owner, document);
    if (this.owner !== "guest") {
      this.dirty = true;
      this.deps.pending(this.owner, true);
    }
  }

  flush(): Promise<void> {
    if (this.operation) return this.operation;
    if (this.owner === "guest" || !this.ready || !this.dirty)
      return Promise.resolve();
    const generation = this.generation;
    const owner = this.owner;
    const run = async () => {
      while (this.dirty && this.ready && generation === this.generation) {
        const version = this.version;
        const document = this.document;
        this.deps.status("saving");
        try {
          const result = await this.deps.save(owner, document, this.revision);
          if (generation !== this.generation) return;
          if (!result.ok) {
            this.ready = false;
            this.deps.status("conflict");
            return;
          }
          this.revision = result.revision;
          if (version === this.version) {
            this.dirty = false;
            this.deps.pending(owner, false);
            this.deps.status("synced");
          }
          // Edits made during the request are sent with the new revision next.
        } catch {
          if (generation === this.generation) {
            this.ready = false;
            this.deps.status("error");
          }
          return;
        }
      }
    };
    const operation = run().finally(() => {
      if (generation === this.generation) this.operation = null;
    });
    this.operation = operation;
    return operation;
  }

  /** Explicit user action: use the local document against the latest revision. */
  retryLocal(): Promise<void> {
    if (this.retrying) return this.retrying;
    if (this.owner === "guest") return Promise.resolve();
    const generation = this.generation;
    const owner = this.owner;
    const run = async () => {
      await this.flush();
      if (generation !== this.generation) return;
      this.deps.status("loading");
      try {
        const remote = await this.deps.read(owner);
        if (generation !== this.generation) return;
        this.revision = remote?.revision || 0;
        this.ready = true;
        this.dirty = true;
        this.deps.pending(owner, true);
        await this.flush();
      } catch {
        if (generation === this.generation) this.deps.status("error");
      }
    };
    const retry = run().finally(() => {
      if (generation === this.generation) this.retrying = null;
    });
    this.retrying = retry;
    return retry;
  }
}
