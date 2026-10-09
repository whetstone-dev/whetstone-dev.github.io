'use client';

import { useState } from 'react';
import type { Project } from '@/content/projects';
import type { Dictionary } from '@/i18n/types';
import { CopyCommand } from './CopyCommand';
import { Segmented } from './Segmented';

interface InstallTabsProps {
  install: NonNullable<Project['install']>;
  repo: string;
  t: Dictionary['detail'];
  copy: Dictionary['copy'];
}

export function InstallTabs({ install, repo, t, copy }: InstallTabsProps) {
  const [tab, setTab] = useState(0);
  const repoName = repo.replace('https://github.com/', '');

  return (
    <div className="install">
      <Segmented items={[t.tabNpx, t.tabGit]} selected={tab} onSelect={setTab} ariaLabel={t.installLabel} idPrefix="install" />
      <div className="install-panel" id="install-panel" role="tabpanel" aria-labelledby={`install-tab-${tab}`}>
        {tab === 0 ? (
          <CopyCommand cmd={install.npx} highlight={repoName} copy={copy} size="sm" />
        ) : (
          <>
            <p className="install-os">{t.gitUnix}</p>
            <CopyCommand cmd={install.git.unix} copy={copy} size="sm" />
            <p className="install-os">{t.gitWindows}</p>
            <CopyCommand cmd={install.git.windows} copy={copy} size="sm" />
            <p className="install-hint">{t.gitHint}</p>
          </>
        )}
      </div>
    </div>
  );
}
