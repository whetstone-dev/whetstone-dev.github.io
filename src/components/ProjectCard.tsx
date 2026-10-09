import Link from 'next/link';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { PROPOSE_PROJECT_URL } from '@/lib/site';
import { Glow } from './Glow';

interface ProjectCardProps {
  project: Project;
  lang: Locale;
  t: Dictionary['projects'];
}

export function ProjectCard({ project, lang, t }: ProjectCardProps) {
  const detail = `/${lang}/projects/${project.slug}/`;
  return (
    <Glow as="article" className="project reveal">
      <Link className="project-shot" href={detail} tabIndex={-1} aria-hidden="true">
        <img src={project.preview.src} width={project.preview.width} height={project.preview.height} alt="" loading="lazy" decoding="async" />
      </Link>
      <div className="project-body">
        <p className="project-tags">
          <span>{t.kinds[project.kind]}</span>
          <span className="status" data-status={project.status}>
            {t.status[project.status]}{project.version ? ` ${project.version}` : ''}
          </span>
        </p>
        <h3><Link href={detail}>{project.slug}</Link></h3>
        <p>{project.summary[lang]}</p>
        <div className="project-links">
          <Link className="btn btn-solid" href={detail}>{t.details}</Link>
          {project.site ? <a className="btn btn-ghost" href={project.site}>{t.website}</a> : null}
          <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noopener noreferrer">{t.source}</a>
        </div>
      </div>
    </Glow>
  );
}

/** The open slot at the end of the grid: an invitation, not a fake project */
export function NextProjectCard({ t }: { t: Dictionary['projects']['next'] }) {
  return (
    <article className="project project-next reveal">
      <div className="project-body">
        <h3>{t.title}</h3>
        <p>{t.body}</p>
        <div className="project-links">
          <a className="btn btn-ghost" href={PROPOSE_PROJECT_URL} target="_blank" rel="noopener noreferrer">{t.cta}</a>
        </div>
      </div>
    </article>
  );
}
