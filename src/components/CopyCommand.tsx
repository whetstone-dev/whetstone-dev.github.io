import { CopyButton } from './CopyButton';
import type { Dictionary } from '@/i18n/types';

interface CopyCommandProps {
  cmd: string;
  copy: Dictionary['copy'];
  /** Part of the command to highlight (e.g. the repository) */
  highlight?: string;
  size?: 'lg' | 'sm';
}

export function CopyCommand({ cmd, copy, highlight, size = 'lg' }: CopyCommandProps) {
  const idx = highlight ? cmd.indexOf(highlight) : -1;
  return (
    <div className="cmd" data-size={size}>
      <span className="dollar" aria-hidden="true">$</span>
      <code>
        {idx >= 0 && highlight ? (
          <>
            {cmd.slice(0, idx)}
            <span className="hl">{highlight}</span>
            {cmd.slice(idx + highlight.length)}
          </>
        ) : (
          cmd
        )}
      </code>
      <CopyButton text={cmd} labels={copy} />
    </div>
  );
}
