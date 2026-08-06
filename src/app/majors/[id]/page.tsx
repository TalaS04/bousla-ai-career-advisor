import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { majors } from "@/utils/data";
import {
  getMajorCareers,
  getMajorSkills,
  getMajorUniversities,
  getPreparationRoadmap,
} from "@/utils/knowledge";
import { getMajorCompatibility } from "@/utils/recommendations";
import { getLatestInterview } from "@/services/interview.service";

export const metadata: Metadata = { title: "تفاصيل التخصص" };

interface MajorDetailPageProps {
  params: Promise<{ id: string }>;
}

/** Keeps roadmap skill importance within the five-star display scale. */
function getImportanceStars(importance: number) {
  const starCount = Math.max(0, Math.min(5, importance));

  return {
    filled: "★".repeat(starCount),
    empty: "★".repeat(5 - starCount),
  };
}

export default async function MajorDetailPage({ params }: MajorDetailPageProps) {
  const { id } = await params;
  const major = majors.find((item) => item.id === id);

  if (!major) {
    return (
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader
          title="التخصص غير موجود"
          description="لم نتمكن من العثور على التخصص الذي تبحث عنه."
        />
        <DashboardCard title="ماذا يمكنك أن تفعل؟">
          <Button href="/majors" variant="secondary">
            العودة إلى التخصصات
          </Button>
        </DashboardCard>
      </Container>
    );
  }

  const majorSkills = getMajorSkills(major.id);
  const majorCareers = getMajorCareers(major.id);
  const majorUniversities = getMajorUniversities(major.id);
  const preparationRoadmap = getPreparationRoadmap(major.id);

  // --------------------------------------------------------------------
  // Compatibility (if available): only shown when a logged-in student has
  // a completed interview to compute it from — same cookie + Prisma
  // lookup already used on /recommendations, and the same cosine-
  // similarity calculation, just scoped to this one major instead of the
  // student's overall top 3.
  // --------------------------------------------------------------------
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const interview = userId ? await getLatestInterview(userId) : null;
  const studentProfile = interview?.studentProfile
    ? JSON.parse(interview.studentProfile)
    : null;
  const compatibilityPercentage = studentProfile?.riasec
    ? getMajorCompatibility(studentProfile.riasec, major.id)
    : null;

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        eyebrow={major.officialClassification.broadField}
        title={major.nameAr}
        description={major.descriptionAr}
      />

      {compatibilityPercentage !== null && (
        <section
          aria-label="التوافق مع ملفك الشخصي"
          className="flex flex-col gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-foreground">
              نسبة توافقك مع هذا التخصص بناءً على نتائج مقابلتك
            </span>
            <span className="text-2xl font-bold text-primary">{compatibilityPercentage}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={compatibilityPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="نسبة التوافق"
            className="h-2.5 w-full overflow-hidden rounded-full bg-muted/15"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${compatibilityPercentage}%` }}
            />
          </div>
        </section>
      )}

      <section
        aria-label="معلومات سريعة"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard value={major.classificationCode} label="الرمز التصنيفي" />
        <StatCard value={major.officialClassification.broadField} label="المجال العام" />
        <StatCard value={major.officialClassification.narrowField} label="المجال الفرعي" />
        <StatCard value={major.officialClassification.detailedField} label="المجال التفصيلي" />
      </section>

      {(major.coreSubjects.length > 0 || major.includedSpecializations.length > 0) && (
        <DashboardCard title="نبذة عن التصنيف الرسمي" icon="majors">
          <div className="flex flex-col gap-6">
            {major.coreSubjects.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">المواد الأساسية</h3>
                <ul className="flex flex-wrap gap-2">
                  {major.coreSubjects.map((subject) => (
                    <li
                      key={subject}
                      className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {major.includedSpecializations.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  التخصصات الدقيقة المشمولة
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {major.includedSpecializations.map((specialization) => (
                    <li
                      key={specialization}
                      className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {specialization}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DashboardCard>
      )}

      <DashboardCard title="المهارات المطلوبة">
        {majorSkills.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {majorSkills.map((skill) => (
              <li
                key={skill.id}
                className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
              >
                {skill.nameAr}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">لا تتوفر مهارات مسجلة لهذا التخصص حالياً.</p>
        )}
      </DashboardCard>

      <DashboardCard title="فرص العمل" icon="careers">
        {majorCareers.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {majorCareers.map((career) => (
              <li key={career.id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  href={`/careers/${career.id}`}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {career.nameAr}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">لا تتوفر مسارات مهنية مسجلة لهذا التخصص حالياً.</p>
        )}
      </DashboardCard>

      <DashboardCard title="الجامعات السعودية التي تقدم التخصص" icon="universities">
        {majorUniversities.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {majorUniversities.map((university) => (
              <li key={university.id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  href={`/universities/${university.id}`}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {university.nameAr}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">لا تتوفر جامعات مسجلة لهذا التخصص حالياً.</p>
        )}
      </DashboardCard>

      <DashboardCard title="كيف تستعد لهذا التخصص؟" icon="growth">
        {preparationRoadmap ? (
          <div className="flex flex-col gap-8">
            <section className="rounded-2xl border border-primary/15 bg-primary/5 p-5 sm:p-6">
              <h3 className="text-base font-bold text-foreground">نظرة عامة</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {preparationRoadmap.overviewAr}
              </p>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">خارطة التعلم</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-muted">
                {preparationRoadmap.learningRoadmap.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">المهارات التي تحتاج لتطويرها</h3>
              <ul className="flex flex-col gap-4">
                {preparationRoadmap.skillsToDevelop.map((skill, index) => {
                  const stars = getImportanceStars(skill.importance);

                  return (
                    <li key={`${skill.skill}-${index}`} className="rounded-xl bg-muted/10 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="font-semibold text-foreground">{skill.skill}</h4>
                        <span
                          aria-label={`مستوى الأهمية: ${skill.importance} من 5`}
                          className="text-warning"
                        >
                          {stars.filled}
                          <span className="text-border">{stars.empty}</span>
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {skill.descriptionAr}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">الدورات المقترحة</h3>
              <ul className="flex flex-col divide-y divide-border">
                {preparationRoadmap.recommendedCourses.map((course) => (
                  <li key={course.titleAr} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-medium text-foreground">{course.titleAr}</p>
                    <p className="mt-1 text-sm text-muted">{course.provider}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{course.reasonAr}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">الأدوات المقترحة</h3>
              <ul className="flex flex-col divide-y divide-border">
                {preparationRoadmap.recommendedTools.map((tool) => (
                  <li key={tool.name} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-medium text-foreground">{tool.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{tool.purposeAr}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">أنشطة موصى بها</h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
                {preparationRoadmap.recommendedActivities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">التحديات الشائعة</h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
                {preparationRoadmap.commonChallenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-base font-bold text-foreground">نصائح للنجاح</h3>
              <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-muted">
                {preparationRoadmap.successTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <p className="text-sm text-muted">لا تتوفر خطة استعداد لهذا التخصص حالياً.</p>
        )}
      </DashboardCard>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/interview" ariaLabel="ابدأ المقابلة الشخصية">
          ابدأ المقابلة
        </Button>
        <Button href="/majors" variant="secondary" ariaLabel="العودة إلى التخصصات">
          العودة إلى التخصصات
        </Button>
      </div>
    </Container>
  );
}
