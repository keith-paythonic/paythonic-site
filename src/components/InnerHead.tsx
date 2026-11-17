import { GlassObject } from "@/components/Glass";
import { PageHeader } from "@/components/Page";
import type { SceneKey } from "@/content/site";

/** Inner page header (design pick PH2): eyebrow, headline and lead on the midnight panel, a glass object beside. */
export function InnerHead({ eyebrow, title, lead, glass }: { eyebrow: string; title: string; lead: string; glass: SceneKey }) {
  return (
    <PageHeader className="hero page-head">
      <div className="wrap ph-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="metal">{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        <div className="ph-vis"><GlassObject kind={glass} /></div>
      </div>
    </PageHeader>
  );
}
