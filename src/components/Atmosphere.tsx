import "./Atmosphere.css";

/** Decorative artwork, intentionally separate from the interactive pathway atlas. */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="crimson-halo" />
      <svg className="crimson-moon" viewBox="0 0 200 200" fill="none">
        <defs>
          <radialGradient id="moon-surface" cx=".34" cy=".3" r=".75">
            <stop stopColor="#b16b66" />
            <stop offset=".45" stopColor="#843d43" />
            <stop offset=".82" stopColor="#49252e" />
            <stop offset="1" stopColor="#211720" />
          </radialGradient>
          <filter id="moon-relief">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".055"
              numOctaves="4"
              seed="12"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComposite in2="SourceGraphic" operator="in" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="url(#moon-surface)"
          filter="url(#moon-relief)"
        />
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="#d89b83"
          strokeOpacity=".18"
          strokeWidth=".5"
        />
      </svg>
      <svg
        className="ritual-palimpest"
        viewBox="0 0 800 800"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="400" cy="400" r="362" strokeWidth=".6" />
        <circle cx="400" cy="400" r="350" strokeWidth=".5" />
        <circle
          cx="400"
          cy="400"
          r="337"
          strokeWidth="8"
          strokeDasharray=".6 18.65"
        />
        <circle
          cx="400"
          cy="400"
          r="310"
          strokeWidth=".6"
          strokeDasharray="210 22 100 38"
        />
        <circle cx="400" cy="400" r="236" strokeWidth=".5" />
        <path d="M400 90 668 555H132Z M400 710 132 245H668Z" strokeWidth=".5" />
        <path d="M400 38V90M762 400H710M400 762V710M38 400H90" />
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 30} 400 400)`} strokeWidth=".8">
            <path d="M394 114 400 104 406 114 400 124Z M389 130H411 M400 124V141" />
            <circle cx="400" cy="151" r="2" />
          </g>
        ))}
      </svg>
      <svg
        className="veiled-arcade"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="arcade-fade" x2="0" y2="1">
            <stop stopColor="#a59c8b" stopOpacity=".24" />
            <stop offset=".8" stopColor="#a59c8b" stopOpacity=".06" />
            <stop offset="1" stopColor="#a59c8b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="url(#arcade-fade)" strokeWidth="1">
          <path d="M-100 1000V390Q-100 180 95 42Q290 180 290 390V1000 M-76 1000V400Q-76 202 95 70Q266 202 266 400V1000" />
          <path d="M1310 1000V390Q1310 180 1505 42Q1700 180 1700 390V1000 M1334 1000V400Q1334 202 1505 70Q1676 202 1676 400V1000" />
          <path d="M-60 1010V530Q-60 390 95 280Q250 390 250 530V1010 M1350 1010V530Q1350 390 1505 280Q1660 390 1660 530V1010" />
          <path d="M95 75V1000M1505 75V1000M-75 435H265M1335 435H1675 M-75 455H265M1335 455H1675" />
          <circle cx="95" cy="225" r="46" />
          <circle cx="1505" cy="225" r="46" />
          <path d="m95 180 26 45-26 45-26-45Z m1410 0 26 45-26 45-26-45Z" />
        </g>
      </svg>
      <div className="mist mist-one" />
      <div className="mist mist-two" />
      <div className="mist mist-three" />
      <div className="spiritual-dust" />
      <div className="atmosphere-vignette" />
      <div className="grain" />
    </div>
  );
}
