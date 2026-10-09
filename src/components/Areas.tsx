import type { Dictionary } from '@/i18n/types';
import { ORG_URL } from '@/lib/site';
import { Glow } from './Glow';

interface AreasProps {
  t: Dictionary['areas'];
  /** Real output shown as the visual of the skills area */
  skillsVisual: { src: string; width: number; height: number };
}

/** The organization's lines of work, each with an honest status */
export function Areas({ t, skillsVisual }: AreasProps) {
  return (
    <div className="areas">
      <Glow as="article" className="area area-skills reveal">
        <div className="area-copy">
          <span className="status" data-status="active">{t.shipping}</span>
          <h3>{t.skills.title}</h3>
          <p>{t.skills.body}</p>
          <a className="text-link" href="#projects">{t.skills.link}</a>
        </div>
        <div className="area-visual" aria-hidden="true">
          <img src={skillsVisual.src} width={skillsVisual.width} height={skillsVisual.height} alt="" loading="lazy" decoding="async" />
        </div>
      </Glow>
      <Glow as="article" className="area area-research reveal">
        <div className="area-copy">
          <span className="status" data-status="in-progress">{t.inProgress}</span>
          <h3>{t.research.title}</h3>
          <p>{t.research.body}</p>
          <a className="text-link" href={ORG_URL} target="_blank" rel="noopener noreferrer">{t.research.link}</a>
        </div>
        {/* Draft pages: the guides are still being written */}
        <div className="drafts" aria-hidden="true"><i /><i /><i /></div>
      </Glow>
    </div>
  );
}
