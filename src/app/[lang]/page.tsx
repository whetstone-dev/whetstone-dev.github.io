import { Areas } from '@/components/Areas';
import { Contact } from '@/components/Contact';
import { HeroMark } from '@/components/HeroMark';
import { Horizon } from '@/components/Horizon';
import { Maintainers } from '@/components/Maintainers';
import { Manifesto } from '@/components/Manifesto';
import { NextProjectCard, ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { Values } from '@/components/Values';
import { projects } from '@/content/projects';
import { getDictionary, isLocale } from '@/i18n/config';
import { DISCUSSIONS_URL } from '@/lib/site';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) throw new Error(`Unsupported language: ${lang}`);
  const t = getDictionary(lang);
  const skillVisual = projects.find((p) => p.kind === 'skill')?.preview;

  return (
    <main>
      <Reveal />

      {/* Hero: the organization. The mark rises like a sun from behind the grinding-wheel horizon */}
      <section className="hero">
        <div className="wrap hero-copy">
          <h1>
            <span className="l l1">{t.hero.line1}</span>
            <span className="l l2">{t.hero.line2}</span>
          </h1>
          <p className="lede">{t.hero.lede}</p>
          <div className="hero-links">
            <a className="btn btn-solid" href="#work">{t.hero.work}</a>
            <a className="btn btn-ghost" href="#team">{t.hero.team}</a>
          </div>
        </div>
        <div className="hero-scene">
          <Horizon />
          {/* The "sun" box ends exactly at the wheel's rim and clips the mark there */}
          <div className="sun">
            <HeroMark size="xl" />
          </div>
        </div>
      </section>

      <section className="section section-about" id="about" aria-labelledby="about-title">
        <div className="wrap">
          <h2 id="about-title" className="sr-only">{t.nav.about}</h2>
          <Manifesto text={t.about.manifesto} />
          <Values t={t.about} />
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <h2 id="work-title" className="reveal">{t.areas.title}</h2>
          <p className="sub reveal">{t.areas.sub}</p>
          {skillVisual ? <Areas t={t.areas} skillsVisual={skillVisual} /> : null}
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="wrap">
          <h2 id="projects-title" className="reveal">{t.projects.title}</h2>
          <p className="sub reveal">{t.projects.sub}</p>
          <div className="projects">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} t={t.projects} />
            ))}
            <NextProjectCard t={t.projects.next} />
          </div>
        </div>
      </section>

      <section className="section" id="team" aria-labelledby="team-title">
        <div className="wrap">
          <h2 id="team-title" className="reveal">{t.team.title}</h2>
          <p className="sub reveal">{t.team.sub}</p>
          <Maintainers lang={lang} t={t.team} />
          <p className="team-outro reveal">
            {t.team.outro} <a className="link-btn" href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer">{t.contact.discussion.title}</a>
          </p>
        </div>
      </section>

      <section className="section cta" id="contact" aria-labelledby="contact-title">
        <Horizon variant="cta" />
        <div className="wrap cta-inner reveal">
          <HeroMark size="sm" idPrefix="cta" />
          <h2 id="contact-title">{t.contact.title}</h2>
          <p className="sub">{t.contact.body}</p>
          <Contact t={t.contact} />
        </div>
      </section>
    </main>
  );
}
