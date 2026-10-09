'use client';

import { useEffect, useRef, useState } from 'react';
import { format } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { ExternalIcon } from './Icons';
import { Segmented } from './Segmented';

export interface StageItem {
  url: string;
  label: string;
  note: string;
}

interface LiveStageProps {
  projectName: string;
  items: StageItem[];
  t: Dictionary['stage'];
}

// On whetstone-dev.github.io the diagrams share our origin, so the viewer can follow the page theme
function syncFrameTheme(frame: HTMLIFrameElement | null): void {
  if (!frame) return;
  try {
    const theme = document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const doc = frame.contentDocument;
    if (doc) doc.documentElement.dataset.theme = theme;
  } catch {
    // Different origin (local development): the viewer follows the system theme
  }
}

/** A window showing real, interactive output of a project */
export function LiveStage({ projectName, items, t }: LiveStageProps) {
  const [selected, setSelected] = useState(0);
  // The src is set after hydration: a server-rendered iframe can finish loading before
  // React attaches onLoad, which would leave the stage stuck in its loading state
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const firstUrl = items[0]?.url ?? '';

  useEffect(() => {
    setSrc(firstUrl);
  }, [firstUrl]);

  useEffect(() => {
    const mo = new MutationObserver(() => syncFrameTheme(frameRef.current));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      mo.disconnect();
      clearTimeout(timer.current);
    };
  }, []);

  if (items.length === 0) return null;
  const current = items[selected] ?? items[0];

  function handleSelect(i: number): void {
    const next = items[i]?.url;
    setSelected(i);
    if (!next || next === src) return;
    clearTimeout(timer.current);
    setLoading(true);
    // A short blur first, so swapping diagrams is not an abrupt cut
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160;
    timer.current = setTimeout(() => setSrc(next), delay);
  }

  const shown = src || current.url;
  const path = shown.replace(/^https?:\/\//, '');

  return (
    <div className="stage">
      <div className="stage-bar">
        <span className="stage-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="stage-url" title={path}>{path}</span>
        <a className="stage-open" href={shown} target="_blank" rel="noopener noreferrer">
          {t.open}
          <ExternalIcon />
        </a>
      </div>
      <Segmented className="stage-tabs" idPrefix="stage" ariaLabel={t.tablistLabel} selected={selected} onSelect={handleSelect} items={items.map((it) => it.label)} />
      <div className="stage-frame" id="stage-panel" role="tabpanel" aria-labelledby={`stage-tab-${selected}`} data-loading={loading}>
        {src ? (
          <iframe
            ref={frameRef}
            src={src}
            title={t.iframeTitle}
            onLoad={() => {
              syncFrameTheme(frameRef.current);
              setLoading(false);
            }}
          />
        ) : null}
        <span className="stage-loading" aria-hidden={!loading}>{t.loading}</span>
      </div>
      <div className="stage-meta" aria-live="polite">
        <span className="stage-live"><i aria-hidden="true" />{format(t.label, { name: projectName })}</span>
        <span>{current.note}</span>
      </div>
    </div>
  );
}
