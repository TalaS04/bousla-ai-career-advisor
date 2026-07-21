import { Card } from "@/components/ui/Card";

interface PersonalityTrait {
  /** Short trait name, e.g. "استقصائي" (Investigative). */
  name: string;
  /** One sentence explaining what the trait means. */
  description: string;
}

interface PersonalityCardProps {
  /** Card heading, e.g. "نمط شخصيتك (RIASEC)". */
  title: string;
  /** The student's top personality traits, in display order. */
  traits: PersonalityTrait[];
}

/**
 * A self-contained card summarizing a student's top RIASEC personality
 * traits.
 *
 * What it does:
 *   Renders `title` as a heading, then one row per entry in `traits`: a
 *   pill with the trait's name and a short description of what it means.
 *
 * Why it exists:
 *   Unlike `RecommendationCard` (a list of independent, individually
 *   ranked majors), a student's personality traits are one cohesive
 *   result — "your profile is Investigative + Social" — not a ranked list
 *   of unrelated items. That's why this is a single self-contained card
 *   that takes the whole `traits` array at once (rendering its own
 *   heading and `Card` surface), rather than a small per-trait row
 *   component repeated inside a `DashboardCard`, the way recommendations
 *   and saved universities are.
 *
 * When it is used:
 *   Once, in `src/app/dashboard/page.tsx`, with the student's top two
 *   RIASEC traits.
 */
export function PersonalityCard({ title, traits }: PersonalityCardProps) {
  return (
    <Card className="flex flex-col gap-5">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <ul className="flex flex-col gap-4">
        {traits.map((trait) => (
          <li
            key={trait.name}
            className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
          >
            <span className="w-fit shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {trait.name}
            </span>
            <p className="text-sm leading-relaxed text-muted">{trait.description}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
