"use client";

import {
  createInterview,
  saveInterviewAnalysis,
  completeInterview,
} from "@/utils/interview";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InterviewHeader } from "@/components/ui/InterviewHeader";
import { InterviewTipsCard } from "@/components/ui/InterviewTipsCard";
import { ProgressSection } from "@/components/ui/ProgressSection";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { questionOptions, questions } from "@/utils/data";
import type { InterviewAnswers } from "@/utils/riasec";
import { generateStudentProfile } from "@/utils/student-profile";
import { generateStudentAnalysis } from "@/utils/ai-analysis";

const INTERVIEW_TIPS = [
  "أجب بصدق؛ لا توجد إجابات صحيحة أو خاطئة.",
  "اختر الإجابة الأقرب إلى ما تشعر به فعلاً.",
  "يمكنك العودة إلى أي سؤال سابق لتعديل إجابتك.",
];

/**
 * Stores the selected option id for each question id.
 * Keeping this simple object in component state makes it easy to send the
 * complete answer set to FastAPI later without adding another state library.
 */
export function InterviewFlow() {
  // The data loader is the only source for the local knowledge base.
  const orderedQuestions = [...questions].sort(
    (firstQuestion, secondQuestion) => firstQuestion.displayOrder - secondQuestion.displayOrder,
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const currentQuestion = orderedQuestions[currentQuestionIndex];
  const currentOptions = questionOptions.filter(
    (option) => option.questionId === currentQuestion.id,
  );
  const selectedOptionId = answers[currentQuestion.id];
  const answeredQuestionCount = Object.keys(answers).length;
  const progressPercentage = Math.round((answeredQuestionCount / orderedQuestions.length) * 100);
  const remainingQuestions = orderedQuestions.length - answeredQuestionCount;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isFinalQuestion = currentQuestionIndex === orderedQuestions.length - 1;

  function selectAnswer(optionId: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: optionId,
    }));
  }

  function showPreviousQuestion() {
    setCurrentQuestionIndex((index) => Math.max(0, index - 1));
  }

  function showNextQuestion() {
    setCurrentQuestionIndex((index) => Math.min(orderedQuestions.length - 1, index + 1));
  }

async function finishInterview() {

  setSubmitError(null);
  setIsSubmitting(true);

  try {

    // --------------------------------------------------------
    // Step 1
    // Generate the student's profile from interview answers.
    // --------------------------------------------------------
    const studentProfile = generateStudentProfile(
      answers,
      orderedQuestions,
      questionOptions
    );

    // --------------------------------------------------------
    // Step 2
    // Create a new interview record in SQL Server.
    // --------------------------------------------------------
    const interviewId = await createInterview(studentProfile);

    // --------------------------------------------------------
    // Step 3
    // Generate the AI analysis using the Python service.
    // --------------------------------------------------------
    const analysis = await generateStudentAnalysis(studentProfile);

    // --------------------------------------------------------
    // Step 4
    // Save the AI analysis in the database.
    // --------------------------------------------------------
    await saveInterviewAnalysis(
      interviewId,
      analysis
    );

    // --------------------------------------------------------
    // Step 5
    // Mark the interview as completed.
    // --------------------------------------------------------
    await completeInterview(interviewId);

    // --------------------------------------------------------
    // Step 6
    // Navigate to the recommendations page. It reads the RIASEC
    // profile back from the interview record we just saved, so no
    // URL parameters are needed here.
    // --------------------------------------------------------
    router.push("/recommendations");

  } catch (error) {

    // The create-interview API responds with this exact message when
    // there's no logged-in session — surfaced as a specific, actionable
    // message instead of the generic fallback below.
    const isNotLoggedIn =
      error instanceof Error && error.message.includes("not logged in");

    setSubmitError(
      isNotLoggedIn
        ? "يجب تسجيل الدخول أولاً لحفظ نتائج المقابلة."
        : "حدث خطأ أثناء إنهاء المقابلة. الرجاء المحاولة مرة أخرى.",
    );
    setIsSubmitting(false);

  }

}


  return (
    <Container className="flex flex-col gap-10 py-10">
      <InterviewHeader
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={orderedQuestions.length}
      />

      <ProgressSection percentage={progressPercentage} remainingQuestions={remainingQuestions} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <QuestionCard
            questionText={currentQuestion.textAr}
            options={currentOptions}
            selectedOptionId={selectedOptionId}
            onSelectOption={selectAnswer}
          />

          <div className="flex items-center justify-between gap-4">
            <Button
              variant="secondary"
              onClick={showPreviousQuestion}
              disabled={isFirstQuestion}
              ariaLabel="السؤال السابق"
            >
              السابق
            </Button>

            {isFinalQuestion ? (
              <Button
                onClick={finishInterview}
                disabled={!selectedOptionId || isSubmitting}
                ariaLabel="إنهاء المقابلة"
              >
                {isSubmitting ? "جارٍ الحفظ..." : "إنهاء المقابلة"}
              </Button>
            ) : (
              <Button
                onClick={showNextQuestion}
                disabled={!selectedOptionId}
                ariaLabel="السؤال التالي"
              >
                التالي
              </Button>
            )}
          </div>

          {submitError && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-error/20 bg-error/5 p-4 text-center sm:flex-row sm:justify-between sm:text-start">
              <p className="text-sm font-medium text-error">{submitError}</p>
              {submitError.includes("تسجيل الدخول") && (
                <Button href="/login" variant="secondary" size="sm">
                  تسجيل الدخول
                </Button>
              )}
            </div>
          )}
        </div>

        <InterviewTipsCard title="نصائح" tips={INTERVIEW_TIPS} />
      </div>
    </Container>
  );
}
