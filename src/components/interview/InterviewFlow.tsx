"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InterviewHeader } from "@/components/ui/InterviewHeader";
import { InterviewTipsCard } from "@/components/ui/InterviewTipsCard";
import { ProgressSection } from "@/components/ui/ProgressSection";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { questionOptions, questions } from "@/utils/data";
import {
  calculateRiasecProfile,
  type InterviewAnswers,
} from "@/utils/riasec";
import { createRecommendationsUrl } from "@/utils/recommendation-navigation";

const STUDENT_NAME = "سارة أحمد";

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

  function finishInterview() {
    const profile = calculateRiasecProfile(answers, orderedQuestions, questionOptions);
    router.push(createRecommendationsUrl(profile));
  }

  return (
    <Container className="flex flex-col gap-10 py-10">
      <InterviewHeader
        studentName={STUDENT_NAME}
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
                disabled={!selectedOptionId}
                ariaLabel="إنهاء المقابلة"
              >
                إنهاء المقابلة
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

        </div>

        <InterviewTipsCard title="نصائح" tips={INTERVIEW_TIPS} />
      </div>
    </Container>
  );
}
