import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { serviceMiddleware } from "./server/service";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of [
    "GLM_API_KEY",
    "GLM_MODEL",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "LOTM_QUOTA_SECRET",
  ])
    if (env[key]) process.env[key] = env[key];
  return {
    plugins: [
      react(),
      {
        name: "lotm-local-api",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.startsWith("/api/")) void serviceMiddleware(req, res);
            else next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 3000,
      fs: {
        deny: [
          ".env",
          ".env.*",
          "*.{crt,pem}",
          "**/.git/**",
          "**/.local-data/**",
          "**/.npm-cache/**",
        ],
      },
    },
  };
});
