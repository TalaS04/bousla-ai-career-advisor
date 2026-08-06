import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { getUserById, getLatestInterview } from "@/services/interview.service";

export const metadata: Metadata = { title: "الملف الشخصي" };

const DATE_FORMATTER = new Intl.DateTimeFormat("ar-SA", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * `/profile` — the student's personal profile page.
 *
 * Purpose & responsibility:
 *   Show the student's real account details and, once available, the
 *   full AI-generated interpretation of their interview results — the
 *   `AIStudentAnalysis` fields (`riasecInterpretation`,
 *   `bigFiveInterpretation`, `workValuesInterpretation`,
 *   `skillsInterpretation`, `careerGoalsInterpretation`, `learningStyle`,
 *   `idealWorkEnvironment`, `confidenceLevel`) that already exist in
 *   every completed interview's saved analysis but were, until now, only
 *   partially surfaced (`/recommendations` only showed `summary`,
 *   `strengths`, and `developmentAreas`). Replaces the earlier Week 4
 *   version, which rendered entirely hardcoded sample data (a fixed
 *   name, made-up RIASEC percentages, fabricated personal fields like age
 *   and school that don't exist in the real `User` model at all).
 *
 * Why fields like age, education level, and school no longer appear:
 *   `User` only has `fullName`, `email`, and `createdAt` — those older
 *   fields never had a real source and are not shown rather than invented.
 *
 * Why "تحديث البيانات" (edit profile) is no longer shown:
 *   There is no edit-profile feature in the app — leaving a button that
 *   does nothing is worse than not showing it.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "الملف الشخصي" entry in `NAV_ITEMS`. Uses the same
 *   cookie + `getLatestInterview` pattern already established on
 *   `/dashboard`, `/recommendations`, and `/majors/[id]`.
 */
export default async function ProfilePage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return (
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader title="الملف الشخصي" description="بياناتك الشخصية ونتائج مقابلتك." />
        <Card className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-sm leading-relaxed text-muted">
            سجّل الدخول لعرض ملفك الشخصي.
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

  const analysis = interview?.analysis ? JSON.parse(interview.analysis) : null;

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        title="الملف الشخصي"
        description="بياناتك الشخصية، ونتائج تحليل مقابلتك الشخصية إن وُجدت."
      />

      <DashboardCard title="المعلومات الشخصية" icon="profile">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">الاسم الكامل</dt>
            <dd className="text-base font-bold text-foreground">{user?.fullName ?? "—"}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm text-muted">البريد الإلكتروني</dt>
            <dd className="text-base font-bold text-foreground">{user?.email ?? "—"}</dd>
          </div>
          {user?.createdAt && (
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted">تاريخ الانضمام</dt>
              <dd className="text-base font-bold text-foreground">
                {DATE_FORMATTER.format(new Date(user.createdAt))}
              </dd>
            </div>
          )}
        </dl>
      </DashboardCard>

      {!interview ? (
        <Card className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-sm leading-relaxed text-muted">
            لم تكمل المقابلة الشخصية بعد. أكملها لعرض تحليل شخصيتك الكامل هنا.
          </p>
          <Button href="/interview" ariaLabel="ابدأ المقابلة الشخصية">
            ابدأ المقابلة
          </Button>
        </Card>
      ) : (
        <>
          {interview.completedAt && (
            <p className="text-sm text-muted">
              أكملت مقابلتك الشخصية بتاريخ {DATE_FORMATTER.format(new Date(interview.completedAt))}.
            </p>
          )}

          {analysis ? (
            <>
              <DashboardCard title="ملخص شخصيتك" icon="growth">
                <p className="text-sm leading-relaxed text-muted">{analysis.summary}</p>
              </DashboardCard>

              <DashboardCard title="تحليل نتائجك بالتفصيل">
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      نتائج RIASEC
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {analysis.riasecInterpretation}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      السمات الشخصية (Big Five)
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {analysis.bigFiveInterpretation}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">القيم المهنية</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {analysis.workValuesInterpretation}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      الثقة بالمهارات
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {analysis.skillsInterpretation}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      الأهداف المهنية
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {analysis.careerGoalsInterpretation}
                    </p>
                  </div>
                </div>
              </DashboardCard>

              <section aria-label="ملخص سريع" className="grid gap-6 sm:grid-cols-3">
                <Card className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted">أسلوب التعلم الأنسب</span>
                  <span className="text-sm font-bold text-foreground">{analysis.learningStyle}</span>
                </Card>
                <Card className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted">بيئة العمل المثالية</span>
                  <span className="text-sm font-bold text-foreground">
                    {analysis.idealWorkEnvironment}
                  </span>
                </Card>
                <Card className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted">مستوى الثقة في النتائج</span>
                  <span className="text-sm font-bold text-foreground">
                    {analysis.confidenceLevel}
                  </span>
                </Card>
              </section>
            </>
          ) : (
            <Card>
              <p className="text-sm text-muted">
                لم يكتمل تحليل الذكاء الاصطناعي لهذه المقابلة بعد.
              </p>
            </Card>
          )}

          <div className="flex justify-center">
            <Button href="/interview" variant="secondary" ariaLabel="إعادة المقابلة الشخصية">
              إعادة المقابلة
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
