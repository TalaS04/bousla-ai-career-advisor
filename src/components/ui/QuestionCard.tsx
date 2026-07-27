import { Card } from "@/components/ui/Card";
import { AnswerOption } from "@/components/ui/AnswerOption";
import type { QuestionOption } from "@/types/data";

interface QuestionCardProps {
  /** The interview question's text. */
  questionText: string;
  /** Only the options belonging to the displayed question. */
  options: QuestionOption[];
  /** The id of the answer already stored for this question, if any. */
  selectedOptionId?: string;
  /** Reports the selected option id to the interview flow. */
  onSelectOption: (optionId: string) => void;
}

/**
 * A single interview question, with its full answer-option list, as one
 * interactive unit.
 *
 * What it does:
 *   Renders `questionText` as a heading, then one `AnswerOption` per entry
 *   in `options` inside a `role="radiogroup"`. Clicking an option selects
 *   it; only one option can be selected at a time.
 *
 * Why it exists:
 *   Groups a question and its answer scale — which always appear and
 *   change together — into one component, so `src/app/interview/page.tsx`
 *   only has to pass in question data, not re-implement the
 *   single-select behavior itself.
 *
 * Why selection state lives in the interview flow:
 *   The parent needs to remember every answer while the student moves
 *   between questions. This component stays focused on presenting one
 *   question and reports the chosen option id through `onSelectOption`.
 *
 * When it is used:
 *   Once per question shown. Currently rendered once, in
 *   `src/app/interview/page.tsx`, for the sample question.
 */
export function QuestionCard({
  questionText,
  options,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <Card className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
        {questionText}
      </h2>
      <div role="radiogroup" aria-label={questionText} className="flex flex-col gap-3">
        {options.map((option) => (
          <AnswerOption
            key={option.id}
            label={option.labelAr}
            selected={selectedOptionId === option.id}
            onSelect={() => onSelectOption(option.id)}
          />
        ))}
      </div>
    </Card>
  );
}
