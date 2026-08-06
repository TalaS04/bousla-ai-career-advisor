import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { RecommendationCard } from "@/components/ui/RecommendationCard";
import { majors } from "@/utils/data";
import { getTopMajorCompatibilities } from "@/utils/recommendations";
import { getUserById, getLatestInterview } from "@/services/interview.service";
import { createRecommendationsUrl } from "@/utils/recommendation-navigation";

export const metadata: Metadata = { title: "لوحة التحكم" };

const DATE_FORMATTER = new Intl.DateTimeFormat("ar-SA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * `/dashboard` — the signed-in student's overview page.
 *
 * Purpose & responsibility:
 *   Summarize the student's real progress: whether they've completed the
 *   interview, and if so, their real top recommendations (via the
 *   existing cosine-similarity engine) and the AI's real strengths
 *   summary. Replaces the earlier Week 4 version, which rendered entirely
 *   hardcoded sample data regardless of who was logged in.
 *
 * Why three distinct states instead of always rendering the same layout:
 *   The data this page needs (a completed interview) may genuinely not
 *   exist yet for a given visitor — not logged in, or logged in but
 *   haven't finished the interview. Each state gets its own honest empty
 *   state with a clear next action, rather than showing zeros or fabricated
 *   numbers in place of missing data.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "لوحة التحكم" entry in `NAV_ITEMS`. Uses the same
 *   cookie + `getLatestInterview` pattern already established on
 *   `/recommendations` and `/majors/[id]`, and the same recommendation
 *   engine (`getTopMajorCompatibilities`) — no new data source.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return (
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader title="لوحة التحكم" description="ملخص تقدمك ونتائجك في مكان واحد." />
        <Card className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-sm leading-relaxed text-muted">
            سجّل الدخول لعرض لوحة التحكم الخاصة بك.
          </p>
          <Button href="/login" ariaLabel="تسجيل الدخول">
            تسجيل الدخول
          </Button>
        </Card>
      </Container>
    );
  }

  const [user, interview] = await Promise.all([
    getUserById(userId),
    getLatestInterview(userId),
  ]);

  const greeting = user?.fullName ? `مرحباً بك، ${user.fullName}.` : "مرحباً بك.";

  if (!interview) {
    return (
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader
          title="لوحة التحكم"
          description={`${greeting} لم تكمل المقابلة الشخصية بعد.`}
        />
        <Card className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-sm leading-relaxed text-muted">
            أكمل المقابلة الشخصية لعرض توصياتك ونتائجك هنا.
          </p>
          <Button href="/interview" ariaLabel="ابدأ المقابلة الشخصية">
            ابدأ المقابلة
          </Button>
        </Card>
      </Container>
    );
  }

  const studentProfile = interview.studentProfile ? JSON.parse(interview.studentProfile) : null;
  const analysis = interview.analysis ? JSON.parse(interview.analysis) : null;

  type RecommendedMajor = { major: (typeof majors)[number]; compatibilityPercentage: number };

  const topRecommendations: RecommendedMajor[] = studentProfile?.riasec
    ? getTopMajorCompatibilities(studentProfile.riasec)
        .map((compatibility) => {
          const major = majors.find((item) => item.id === compatibility.majorId);
          return major ? { major, compatibilityPercentage: compatibility.compatibilityPercentage } : null;
        })
        .filter((entry): entry is RecommendedMajor => entry !== null)
    : [];

  const recommendationsUrl = studentProfile?.riasec
    ? createRecommendationsUrl(studentProfile.riasec)
    : "/recommendations";

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="لوحة التحكم"
        description={`${greeting} أكملت مقابلتك الشخصية بتاريخ ${DATE_FORMATTER.format(new Date(interview.completedAt ?? interview.startedAt))}.`}
      />

      <DashboardCard title="أبرز التوصيات" icon="recommendations">
        {topRecommendations.length > 0 ? (
          <div className="flex flex-col divide-y divide-border">
            {topRecommendations.map(({ major, compatibilityPercentage }) => (
              <RecommendationCard
                key={major.id}
                title={major.nameAr}
                matchPercentage={compatibilityPercentage}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">تعذّر حساب التوصيات من نتائج مقابلتك.</p>
        )}
      </DashboardCard>

      {analysis?.strengths?.length > 0 && (
        <DashboardCard title="أبرز نقاط قوتك" icon="growth">
          <ul className="space-y-3">
            {analysis.strengths.slice(0, 3).map((strength: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-lg text-primary">✓</span>
                <span className="text-sm leading-7 text-foreground">{strength}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
      )}

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href={recommendationsUrl} ariaLabel="عرض جميع التوصيات">
          عرض جميع التوصيات
        </Button>
        <Button href="/interview" variant="secondary" ariaLabel="إعادة المقابلة الشخصية">
          إعادة المقابلة
        </Button>
      </div>
    </Container>
  );
}
