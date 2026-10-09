import type { Project } from '@/content/projects';
import type { Dictionary } from '@/i18n/types';

interface ProjectFactsProps {
  project: Project;
  t: Dictionary['facts'];
}

/** Version, license, runtime and dependencies; fields a project does not have are left out */
export function ProjectFacts({ project, t }: ProjectFactsProps) {
  const facts = [
    project.version ? { label: t.version, value: project.version } : null,
    { label: t.license, value: project.license },
    project.requires ? { label: t.requires, value: project.requires } : null,
    project.dependencies !== undefined
      ? { label: t.dependencies, value: project.dependencies === 0 ? t.none : String(project.dependencies) }
      : null,
  ].filter((f): f is { label: string; value: string } => f !== null);

  return (
    <dl className="facts">
      {facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
