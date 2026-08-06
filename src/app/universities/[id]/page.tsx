import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DashboardCard } from "@/components/ui/DashboardCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { universities } from "@/utils/data";
import { getUniversityMajors, getUniversityCareers, getUniversityTypeLabel } from "@/utils/knowledge";

export const metadata: Metadata = { title: "تفاصيل الجامعة" };

interface UniversityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UniversityDetailPage({ params }: UniversityDetailPageProps) {
  const { id } = await params;
  const university = universities.find((item) => item.id === id);

  if (!university) {
    return (
      <Container className="flex flex-col gap-10 py-10">
        <PageHeader
          title="الجامعة غير موجودة"
          description="لم نتمكن من العثور على الجامعة التي تبحث عنها."
        />
        <DashboardCard title="ماذا يمكنك أن تفعل؟">
          <Button href="/universities" variant="secondary">
            العودة إلى الجامعات
          </Button>
        </DashboardCard>
      </Container>
    );
  }

  const typeLabel = getUniversityTypeLabel(university.type);
  const offeredMajors = getUniversityMajors(university.id);
  const relatedCareers = getUniversityCareers(university.id);

  return (
    <Container className="flex flex-col gap-10 py-10">
      <PageHeader
        eyebrow={typeLabel}
        title={university.nameAr}
        description={`جامعة ${typeLabel} تقع في مدينة ${university.cityAr}.`}
        actions={
          university.website ? (
            <Button
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              ariaLabel={`زيارة الموقع الرسمي لـ ${university.nameAr}`}
            >
              زيارة الموقع الرسمي
            </Button>
          ) : undefined
        }
      />

      <section aria-label="معلومات سريعة" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard value={typeLabel} label="نوع الجامعة" />
        <StatCard value={university.cityAr} label="المدينة" />
        <StatCard value={String(offeredMajors.length)} label="تخصص متاح" />
        <StatCard value={String(relatedCareers.length)} label="مسار مهني ذو صلة" />
      </section>

      <DashboardCard title="التخصصات المتاحة" icon="majors">
        {offeredMajors.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {offeredMajors.map((major) => (
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
          <p className="text-sm text-muted">لا تتوفر تخصصات مسجلة لهذه الجامعة حالياً.</p>
        )}
      </DashboardCard>

      <DashboardCard title="المسارات المهنية ذات الصلة" icon="careers">
        {relatedCareers.length > 0 ? (
          <ul className="flex flex-col divide-y divide-border">
            {relatedCareers.map((career) => (
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
          <p className="text-sm text-muted">لا تتوفر مسارات مهنية مرتبطة بهذه الجامعة حالياً.</p>
        )}
      </DashboardCard>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/interview" ariaLabel="ابدأ المقابلة الشخصية">
          ابدأ المقابلة
        </Button>
        <Button href="/universities" variant="secondary" ariaLabel="العودة إلى الجامعات">
          العودة إلى الجامعات
        </Button>
      </div>
    </Container>
  );
}
