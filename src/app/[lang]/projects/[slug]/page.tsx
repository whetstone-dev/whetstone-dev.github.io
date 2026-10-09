import type { Metadata } from 'next';
import Link from 'next/link';
import { InstallTabs } from '@/components/InstallTabs';
import { LiveStage, type StageItem } from '@/components/LiveStage';
import { ProjectFacts } from '@/components/ProjectFacts';
import { getProject, projects } from '@/content/projects';
import { defaultLocale, format, getDictionary, isLocale, locales } from '@/i18n/config';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) throw new Error(`Unsupported language: ${lang}`);
  const t = getDictionary(lang);
  const project = getProject(slug);
  const title = format(t.meta.projectTitle, { name: project.slug });
  return {
    title,
    description: project.description[lang],
    alternates: {
      canonical: `/${lang}/projects/${slug}/`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}/projects/${slug}/`])), 'x-default': `/${defaultLocale}/projects/${slug}/` },
    },
    openGraph: { title, description: project.description[lang], images: [project.preview.src] },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) throw new Error(`Unsupported language: ${lang}`);
  const t = getDictionary(lang);
  const project = getProject(slug);

  const stageItems: StageItem[] = (project.artifacts?.items ?? []).map((a) => ({
    url: `${project.artifacts?.base}${a.file}.html`,
    label: a.label[lang],
    note: a.note[lang],
  }));

  return (
    <main>
      <section className="detail">
        <div className="wrap">
          <nav className="crumbs" aria-label={t.detail.crumbsLabel}>
            <Link href={`/${lang}/#projects`}>{t.nav.projects}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.slug}</span>
          </nav>
          <div className="detail-head">
            <div>
              <p className="project-tags">
                <span>{t.projects.kinds[project.kind]}</span>
                <span className="status" data-status={project.status}>{t.projects.status[project.status]}</span>
              </p>
              <h1>{project.slug}</h1>
              <p className="lede">{project.description[lang]}</p>
            </div>
            <div className="detail-actions">
              {project.site ? <a className="btn btn-solid" href={project.site}>{t.projects.website}</a> : null}
              <a className="btn btn-ghost" href={project.repo} target="_blank" rel="noopener noreferrer">{t.projects.source}</a>
            </div>
          </div>

          <div className="detail-grid">
            <figure className="shot">
              <img src={project.preview.src} width={project.preview.width} height={project.preview.height} alt={project.preview.alt[lang]} fetchPriority="high" />
            </figure>
            <aside className="detail-side">
              {project.install ? <InstallTabs install={project.install} repo={project.repo} t={t.detail} copy={t.copy} /> : null}
              {project.prompts ? (
                <div>
                  <h2 className="side-title">{t.detail.asks}</h2>
                  <ul className="asks">
                    {project.prompts[lang].map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <ProjectFacts project={project} t={t.facts} />
            </aside>
          </div>
        </div>
      </section>

      {stageItems.length > 0 ? (
        <section className="section detail-live" aria-labelledby="live-title">
          <div className="wrap">
            <h2 id="live-title">{t.detail.live}</h2>
            <LiveStage projectName={project.slug} items={stageItems} t={t.stage} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
