'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons';

interface CopyButtonProps {
  text: string;
  labels: { label: string; done: string; failed: string };
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for contexts without clipboard permission
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({ text, labels }: CopyButtonProps) {
  const [status, setStatus] = useState<'idle' | 'done' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick(): Promise<void> {
    const ok = await copyToClipboard(text);
    setStatus(ok ? 'done' : 'failed');
    clearTimeout(timer.current);
    // A failure stays visible longer: the user has to copy by hand
    timer.current = setTimeout(() => setStatus('idle'), ok ? 1600 : 4000);
  }

  return (
    <button className="copy" type="button" onClick={handleClick} aria-label={labels.label} data-status={status}>
      <CopyIcon className="i-copy" />
      <CheckIcon className="i-check" />
      <span className="sr-only" aria-live="polite">
        {status === 'done' ? labels.done : ''}
      </span>
      {status === 'failed' && (
        <span className="copy-error" role="alert">
          {labels.failed}
        </span>
      )}
    </button>
  );
}
