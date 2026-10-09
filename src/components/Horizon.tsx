/**
 * A huge grinding wheel seen edge-on: its rim is the glowing arc behind the hero stage,
 * and a spark glint travels along it every few seconds. Pure CSS, decorative only.
 */
export function Horizon({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  return (
    <div className="horizon" data-variant={variant} aria-hidden="true">
      <div className="horizon-disc" />
    </div>
  );
}
