import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getCompatibilityLabel } from "@/utils/knowledge";

interface OfficialClassificationSummary {
  broadField: string;
  narrowField: string;
  detailedField: string;
}

interface MajorRecommendationCardProps {
  /** Recommended major's name, e.g. "علوم الحاسب". */
  title: string;
  /** Compatibility score, 0–100. */
  matchPercentage: number;
  /** One or two sentences describing the major. */
  description: string;
  /** Key skills this major calls for, shown as small badges. */
  skills: string[];
  /** Label for the detail-view button, e.g. "عرض التفاصيل الكاملة". */
  actionLabel: string;
  /** Optional accessible-name override for the button — see `Button`'s `ariaLabel` prop. */
  actionAriaLabel?: string;
  /** Destination for the detail-view button, e.g. `/majors/${id}`. Omit to render an inert button. */
  actionHref?: string;
  /**
   * The RIASEC dimensions (Arabic labels) that contributed most to this
   * match — from `getMatchedRiasecDimensions`. Shown in the "why this
   * major" section. Optional so the card still renders without it.
   */
  matchedDimensions?: string[];
  /** The major's place in the Saudi Unified Classification, from `official_specializations.json`. */
  classification?: OfficialClassificationSummary;
  /** Core subjects for this major, from the official classification record. */
  coreSubjects?: string[];
  /** Related career names, from `getMajorCareers`. */
  careers?: string[];
  /** Short overview of the preparation roadmap, from `getPreparationRoadmap`. */
  roadmapOverview?: string;
}

/**
 * A full, standalone card presenting one recommended major: compatibility
 * score, why it matched (RIASEC strengths + official classification),
 * core subjects, required skills, related careers, a roadmap preview, and
 * a link to the full detail page.
 *
 * Why this is a new component instead of extending the existing
 * `RecommendationCard`:
 *   `RecommendationCard` (used on `/dashboard`) is, by design, a compact
 *   *row* with no border of its own — its whole reason for existing is to
 *   sit inside a `DashboardCard`'s divided list without drawing a second
 *   border around itself. This page needs the opposite: a small number of
 *   independent, fully-bordered cards, each carrying substantially more
 *   content than a compact row has room for. `MajorRecommendationCard`
 *   reuses the same underlying `Card`/`Button` primitives without changing
 *   `RecommendationCard` itself or the dashboard that depends on its shape.
 *
 * Why the extra sections (classification, core subjects, careers, roadmap
 * preview) are all optional props instead of always-required:
 *   Not every caller necessarily has all of this data on hand — keeping
 *   them optional lets the card degrade gracefully (it simply omits a
 *   section whose data wasn't passed) rather than forcing every call site
 *   to supply placeholder values.
 *
 * When it is used:
 *   Once per top-3 result in `src/app/recommendations/page.tsx`.
 */
export function MajorRecommendationCard({
  title,
  matchPercentage,
  description,
  skills,
  actionLabel,
  actionAriaLabel,
  actionHref,
  matchedDimensions,
  classification,
  coreSubjects,
  careers,
  roadmapOverview,
}: MajorRecommendationCardProps) {
  const hasWhyThisMajor = (matchedDimensions && matchedDimensions.length > 0) || classification;

  const action = actionHref ? (
    <Button
      variant="secondary"
      size="sm"
      href={actionHref}
      ariaLabel={actionAriaLabel}
      className="self-start"
    >
      {actionLabel}
    </Button>
  ) : (
    <Button variant="secondary" size="sm" ariaLabel={actionAriaLabel} className="self-start">
      {actionLabel}
    </Button>
  );

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm font-medium text-primary">
            {getCompatibilityLabel(matchPercentage)}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-primary/10 px-4 py-1.5 text-lg font-bold text-primary">
          {matchPercentage}%
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted">{description}</p>

      {hasWhyThisMajor ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
          <h4 className="text-sm font-bold text-foreground">لماذا هذا التخصص؟</h4>

          {matchedDimensions && matchedDimensions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchedDimensions.map((dimension) => (
                <span
                  key={dimension}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {dimension}
                </span>
              ))}
            </div>
          ) : null}

          {classification ? (
            <p className="text-xs leading-relaxed text-muted">
              يندرج هذا التخصص ضمن التصنيف السعودي الموحد تحت:{" "}
              <span className="font-medium text-foreground">
                {classification.broadField} ← {classification.narrowField} ←{" "}
                {classification.detailedField}
              </span>
            </p>
          ) : null}
        </div>
      ) : null}

      {coreSubjects && coreSubjects.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">المواد الأساسية</h4>
          <ul className="flex flex-wrap gap-2">
            {coreSubjects.map((subject) => (
              <li
                key={subject}
                className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
              >
                {subject}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {skills.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">المهارات المطلوبة</h4>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {careers && careers.length > 0 ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">المسارات المهنية ذات الصلة</h4>
          <ul className="flex flex-wrap gap-2">
            {careers.map((career) => (
              <li
                key={career}
                className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
              >
                {career}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {roadmapOverview ? (
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">خطة الاستعداد لهذا التخصص</h4>
          <p className="text-sm leading-relaxed text-muted">{roadmapOverview}</p>
        </div>
      ) : null}

      {action}
    </Card>
  );
}
