"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { AnswerOption } from "@/components/ui/AnswerOption";

interface QuestionCardProps {
  /** The interview question's text. */
  questionText: string;
  /** The answer scale, in display order, e.g. five Likert options. */
  options: string[];
  /**
   * Index into `options` that should appear selected on first render.
   * Optional — omit it to start with no option selected.
   */
  defaultSelectedIndex?: number;
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
 * Why `useState` is needed, and why it lives here rather than in
 * `AnswerOption` or the page:
 *   "Which option is currently selected" is UI state that only makes
 *   sense scoped to *one question's* option group — it has to live above
 *   all the `AnswerOption`s it coordinates (so selecting one can
 *   deselect the others), which rules out keeping it inside `AnswerOption`
 *   itself. It could technically live one level higher, in the page
 *   component — but that would force the whole page to be a Client
 *   Component just to track one question's selection, and would make the
 *   page responsible for interaction logic that's really a property of
 *   "one question," not "the interview page." Scoping the state to
 *   `QuestionCard` keeps that Client Component boundary as small as
 *   possible and keeps the component reusable for any single question.
 *
 * Why this is only local UI state, not wired to any real answer-submission
 * logic:
 *   There is no backend, interview engine, or database yet (Week 4 is
 *   UI-only) — `defaultSelectedIndex` exists purely to demonstrate what a
 *   pre-answered question looks like using static sample data, not to
 *   persist or score real answers.
 *
 * When it is used:
 *   Once per question shown. Currently rendered once, in
 *   `src/app/interview/page.tsx`, for the sample question.
 */
export function QuestionCard({ questionText, options, defaultSelectedIndex }: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    defaultSelectedIndex ?? null,
  );

  return (
    <Card className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold leading-relaxed text-foreground sm:text-xl">
        {questionText}
      </h2>
      <div role="radiogroup" aria-label={questionText} className="flex flex-col gap-3">
        {options.map((option, index) => (
          <AnswerOption
            key={option}
            label={option}
            selected={selectedIndex === index}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </Card>
  );
}
