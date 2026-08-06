"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { InterviewFlow } from "@/components/interview/InterviewFlow";

interface InterviewGateProps {
  /** Whether the signed-in student already has a completed interview. */
  hasCompletedInterview: boolean;
}

/**
 * Decides whether `/interview` shows the "already completed" state or the
 * question flow itself.
 *
 * Purpose & responsibility:
 *   A student who already completed their interview shouldn't land back in
 *   question 1 of a brand-new interview just by opening `/interview` again —
 *   that silently starts a new attempt and buries their existing results.
 *   Instead they see a summary state with a way to jump straight to their
 *   current recommendations, or explicitly choose to redo the interview.
 *
 * Why this is a separate component from `InterviewFlow`:
 *   `InterviewFlow` owns the question-by-question flow and has no reason to
 *   know whether a *previous* interview exists — that's a concern of what
 *   to show *before* the flow starts, not of the flow itself. Keeping them
 *   separate means `InterviewFlow` stays exactly as it was.
 *
 * Why the "completed" check happens once, server-side, in `page.tsx`:
 *   Whether a completed interview exists is a one-time fact needed at page
 *   load — a plain server-side `getLatestInterview` lookup (the same one
 *   `/recommendations` and `/dashboard` already use) answers it without
 *   adding a client-side fetch. This component only needs the boolean
 *   result to decide what to render.
 *
 * Why redoing needs a confirmation step:
 *   Starting over discards the vantage point of "these are my current
 *   results" until the new interview is finished — `window.confirm` is the
 *   smallest possible way to make sure that's an intentional choice, without
 *   introducing a new modal component for one confirmation.
 */
export function InterviewGate({ hasCompletedInterview }: InterviewGateProps) {
  const [showFlow, setShowFlow] = useState(!hasCompletedInterview);

  if (showFlow) {
    return <InterviewFlow />;
  }

  function handleRedo() {
    const confirmed = window.confirm(
      "سيؤدي هذا إلى بدء مقابلة جديدة. هل تريد المتابعة؟",
    );

    if (confirmed) {
      setShowFlow(true);
    }
  }

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="المقابلة الشخصية"
        description="لقد أكملت مقابلتك الشخصية بالفعل."
      />
      <Card className="flex flex-col items-center gap-6 py-10 text-center">
        <p className="max-w-lg text-sm leading-relaxed text-muted">
          يمكنك عرض توصياتك الحالية، أو إعادة إجراء المقابلة للحصول على
          تحليل وتوصيات جديدة.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/recommendations" ariaLabel="عرض التوصيات">
            عرض التوصيات
          </Button>
          <Button
            variant="secondary"
            onClick={handleRedo}
            ariaLabel="إعادة إجراء المقابلة"
          >
            إعادة إجراء المقابلة
          </Button>
        </div>
      </Card>
    </Container>
  );
}
