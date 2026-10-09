// Contract every language must fulfill. Strings with {name} placeholders are filled with format() from config.ts.
import type { ProjectKind, ProjectStatus } from '@/content/projects';

export interface TitleBody {
  title: string;
  body: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    /** {name} = project name */
    projectTitle: string;
  };
  nav: {
    home: string;
    about: string;
    work: string;
    projects: string;
    team: string;
    contact: string;
    mainLabel: string;
    languageLabel: string;
    themeLabel: string;
  };
  copy: { label: string; done: string; failed: string };
  /** The headline is revealed line by line, so it is stored as two lines */
  hero: { line1: string; line2: string; lede: string; work: string; team: string };
  about: {
    /** Words light up one by one while scrolling; keep it to two or three sentences */
    manifesto: string;
    values: TitleBody[];
    facts: { label: string; value: string }[];
  };
  areas: {
    title: string;
    sub: string;
    shipping: string;
    inProgress: string;
    skills: TitleBody & { link: string };
    research: TitleBody & { link: string };
  };
  projects: {
    title: string;
    sub: string;
    kinds: Record<ProjectKind, string>;
    status: Record<ProjectStatus, string>;
    website: string;
    source: string;
    details: string;
    next: TitleBody & { cta: string };
  };
  facts: {
    version: string;
    license: string;
    requires: string;
    dependencies: string;
    none: string;
  };
  stage: {
    /** {name} = project name */
    label: string;
    open: string;
    loading: string;
    tablistLabel: string;
    iframeTitle: string;
  };
  team: { title: string; sub: string; avatarAlt: string; outro: string };
  contact: {
    title: string;
    body: string;
    discussion: TitleBody;
    propose: TitleBody;
    follow: TitleBody;
  };
  detail: {
    crumbsLabel: string;
    live: string;
    installLabel: string;
    tabNpx: string;
    tabGit: string;
    gitUnix: string;
    gitWindows: string;
    gitHint: string;
    asks: string;
  };
  notFound: { title: string; body: string; cta: string };
  footer: { tagline: string; linksLabel: string; license: string };
}
