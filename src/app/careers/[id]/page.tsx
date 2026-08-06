import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { StepCard } from "@/components/ui/StepCard";
import { careers } from "@/utils/data";
import { getCareerMajors, getCareerSkills } from "@/utils/knowledge";

export const metadata: Metadata = { title: "تفاصيل المسار المهني" };

interface CareerDetailPageProps {
  params: Promise<{ id: string }>;
}

/** Arabic-Indic numerals for up to 4 career-path steps (the real data never has more). */
const STEP_NUMBERS = ["١", "٢", "٣", "٤"];

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { id } = await params;
  const career = careers.find((item) => item.id === id);

  if (!career) {
    return (
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader
          title="المسار المهني غير موجود"
          description="لم نتمكن من العثور على المسار المهني الذي تبحث عنه."
        />
        <DashboardCard title="ماذا يمكنك أن تفعل؟">
          <Button href="/careers" variant="secondary">
            العودة إلى المسارات المهنية
          </Button>
        </DashboardCard>
      </Container>
    );
  }

  const relatedMajors = getCareerMajors(career.id);
  const careerSkills = getCareerSkills(career.id);
  // The career progression ladder is stored as one "->"-separated string,
  // e.g. "Junior Developer -> Senior Developer -> Tech Lead" — parsed here
  // for display, not invented: the steps are exactly what's in the data.
  const careerSteps = career.careerPath.split("->").map((step) => step.trim());

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        eyebrow={relatedMajors[0]?.officialClassification.broadField}
        title={career.nameAr}
        description={career.descriptionAr}
      />

      <section
        aria-label="معلومات سريعة"
        className="grid gap-6 sm:grid-cols-2"
      >
        <StatCard value={String(relatedMajors.length)} label="تخصص يؤدي إلى هذا المسار" />
        <StatCard value={String(careerSkills.length)} label="مهارة مطلوبة" />
      </section>

      <DashboardCard title="المهارات المطلوبة">
        {careerSkills.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {careerSkills.map((skill) => (
              <li
                key={skill.id}
                className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium text-foreground"
              >
                {skill.nameAr}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">لا تتوفر مهارات مسجلة لهذا المسار حالياً.</p>
        )}
      </DashboardCard>

      <DashboardCard title="التخصصات المؤدية لهذا المسار المهني" icon="majors">
        {relatedMajors.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {relatedMajors.map((major) => (
              <li key={major.id} className="py-3 first:pt-0 last:pb-0">
                <Link
                  href={`/majors/${major.id}`}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {major.nameAr}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">لا تتوفر تخصصات مسجلة لهذا المسار حالياً.</p>
        )}
      </DashboardCard>

      {careerSteps.length > 0 && (
        <DashboardCard title="المسار الوظيفي" icon="growth">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-10">
            {careerSteps.map((step, index) => (
              <StepCard
                key={step}
                number={STEP_NUMBERS[index] ?? String(index + 1)}
                title={step}
              />
            ))}
          </div>
        </DashboardCard>
      )}

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/interview" ariaLabel="ابدأ المقابلة الشخصية">
          ابدأ المقابلة
        </Button>
        <Button href="/careers" variant="secondary" ariaLabel="العودة إلى المسارات المهنية">
          العودة إلى المسارات المهنية
        </Button>
      </div>
    </Container>
  );
}
