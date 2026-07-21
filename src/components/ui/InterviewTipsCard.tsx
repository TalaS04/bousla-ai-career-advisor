import { Card } from "@/components/ui/Card";

interface InterviewTipsCardProps {
  /** Card heading, e.g. "نصائح". */
  title: string;
  /** Short tip sentences, in display order. */
  tips: string[];
}

/**
 * A card listing short guidance for answering the interview honestly and
 * without pressure.
 *
 * What it does:
 *   Renders `title` as a heading above a bulleted list of `tips`, inside
 *   the shared `Card` surface.
 *
 * Why it exists:
 *   The interview page needs to reassure the student (no right/wrong
 *   answers, answer honestly, can resume later) without cluttering the
 *   question itself. Giving that its own small card — reusing `Card`
 *   rather than a one-off block — keeps the reassurance visually separate
 *   from the question being asked, and keeps the tip list itself a plain
 *   data array (`INTERVIEW_TIPS` in `src/app/interview/page.tsx`) instead
 *   of hand-written list items.
 *
 * When it is used:
 *   Once, in `src/app/interview/page.tsx`, alongside the current
 *   question.
 */
export function InterviewTipsCard({ title, tips }: InterviewTipsCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <ul className="flex flex-col gap-3">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            {tip}
          </li>
        ))}
      </ul>
    </Card>
  );
}
