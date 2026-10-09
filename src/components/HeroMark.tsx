/**
 * The brand mark (">_" with a steel blade and a whetstone cursor) drawn inline so the spark
 * and the cursor can be animated. Source of truth: whetstone-dev-brand/whetstone-mark.svg.
 * On load (or when it scrolls into view inside a .reveal) the spark ignites and the cursor blinks three times.
 * idPrefix keeps the SVG gradient ids unique when the mark appears more than once on a page.
 */
export function HeroMark({ size = 'lg', idPrefix = 'hm' }: { size?: 'xl' | 'lg' | 'sm'; idPrefix?: string }) {
  const p = idPrefix;
  return (
    <div className="mark" data-size={size} aria-hidden="true">
      <svg viewBox="0 0 512 512">
        <defs>
          <linearGradient id={`${p}-bg`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#161d2e" /><stop offset="1" stopColor="#0a0e17" /></linearGradient>
          <radialGradient id={`${p}-glow`} cx=".56" cy=".5" r=".5"><stop offset="0" stopColor="#f5a524" stopOpacity=".16" /><stop offset="1" stopColor="#f5a524" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${p}-coarse`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#34dcc6" /><stop offset="1" stopColor="#11a896" /></linearGradient>
          <linearGradient id={`${p}-fine`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#f4f7fb" /><stop offset="1" stopColor="#cfd8e4" /></linearGradient>
          <linearGradient id={`${p}-side`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0c6b61" /><stop offset=".5" stopColor="#0c6b61" /><stop offset=".5" stopColor="#7a879a" /><stop offset="1" stopColor="#5f6c7f" /></linearGradient>
          <linearGradient id={`${p}-steel`} gradientUnits="userSpaceOnUse" x1="120" y1="140" x2="300" y2="370"><stop offset="0" stopColor="#c3cfdd" /><stop offset="1" stopColor="#75869c" /></linearGradient>
          <linearGradient id={`${p}-bevel`} gradientUnits="userSpaceOnUse" x1="120" y1="140" x2="300" y2="370"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e3e9f1" /></linearGradient>
          <radialGradient id={`${p}-spark`} cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff7e0" /><stop offset=".4" stopColor="#ffc857" stopOpacity=".85" /><stop offset="1" stopColor="#f59e0b" stopOpacity="0" /></radialGradient>
          <clipPath id={`${p}-face`}><rect x="292" y="318" width="132" height="46" rx="12" /></clipPath>
          <filter id={`${p}-drop`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity=".5" /></filter>
        </defs>
        <rect width="512" height="512" fill={`url(#${p}-bg)`} />
        <rect width="512" height="512" fill={`url(#${p}-glow)`} />
        <g filter={`url(#${p}-drop)`}>
          <polyline points="120,148 238,256 120,364" fill="none" stroke={`url(#${p}-steel)`} strokeWidth="48" strokeMiterlimit="10" />
          <polyline points="117,142 231,247 132,338" fill="none" stroke={`url(#${p}-bevel)`} strokeWidth="14" strokeMiterlimit="10" />
        </g>
        <g className="mark-cursor" filter={`url(#${p}-drop)`}>
          <rect x="292" y="332" width="132" height="46" rx="12" fill={`url(#${p}-side)`} />
          <g clipPath={`url(#${p}-face)`}>
            <rect x="292" y="318" width="66" height="46" fill={`url(#${p}-coarse)`} />
            <rect x="358" y="318" width="66" height="46" fill={`url(#${p}-fine)`} />
            <g fill="#0b5f57" opacity=".35">
              <circle cx="304" cy="330" r="1.9" /><circle cx="318" cy="348" r="1.6" /><circle cx="332" cy="328" r="2" />
              <circle cx="344" cy="352" r="1.7" /><circle cx="312" cy="356" r="1.5" /><circle cx="350" cy="334" r="1.5" />
            </g>
            <rect x="292" y="318" width="132" height="6" fill="#fff" opacity=".22" />
          </g>
        </g>
        <g className="mark-spark">
          <circle cx="284" cy="244" r="40" fill={`url(#${p}-spark)`} />
          <path d="M284 220 C286.4 237 288.6 240 307 244 C288.6 248 286.4 251 284 268 C281.6 251 279.4 248 261 244 C279.4 240 281.6 237 284 220 Z" fill="#fffbeb" />
          <path d="M322 196 C323 204 324.4 205.4 332 206.4 C324.4 207.4 323 208.8 322 216 C321 208.8 319.6 207.4 312 206.4 C319.6 205.4 321 204 322 196 Z" fill="#ffd27a" />
        </g>
      </svg>
    </div>
  );
}
