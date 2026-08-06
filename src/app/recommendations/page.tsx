import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { MajorRecommendationCard } from "@/components/ui/MajorRecommendationCard";

import { majors, riasecMajorWeights } from "@/utils/data";
import { getMajorSkills, getMajorCareers, getPreparationRoadmap } from "@/utils/knowledge";
import { getTopMajorCompatibilities, getMatchedRiasecDimensions } from "@/utils/recommendations";
import type { RiasecProfile } from "@/utils/riasec";
import { getLatestInterview } from "@/services/interview.service";

export const metadata: Metadata = {
  title: "التوصيات",
};

interface RecommendedMajor {
  major: (typeof majors)[number];
  compatibilityPercentage: number;
}

/**
 * Convert recommendation IDs into complete major objects.
 */
function getRecommendedMajors(profile: RiasecProfile): RecommendedMajor[] {
  const recommendedMajors: RecommendedMajor[] = [];

  for (const compatibility of getTopMajorCompatibilities(profile)) {
    const major = majors.find(
      (item) => item.id === compatibility.majorId
    );

    if (major) {
      recommendedMajors.push({
        major,
        compatibilityPercentage:
          compatibility.compatibilityPercentage,
      });
    }
  }

  return recommendedMajors;
}

/**
 * `/recommendations` — the student's top-3 major recommendations.
 *
 * Purpose & responsibility:
 *   Always regenerate the top 3 from the student's *latest completed
 *   interview*, not from a one-time URL parameter — so a student can
 *   revisit this page any time (from the nav, from `/dashboard`, from a
 *   bookmark) and see their real, current recommendations without
 *   retaking the interview. Both the RIASEC profile used for matching and
 *   the AI analysis shown above it now come from the exact same interview
 *   record (`getLatestInterview`), so the two can never disagree, unlike
 *   the previous version where the analysis came from the database but
 *   the major grid came from whatever RIASEC values happened to be in the
 *   URL.
 *
 * Why this no longer reads `searchParams`:
 *   The previous version derived the profile from RIASEC values encoded
 *   in the URL by `InterviewFlow` right after finishing — which only
 *   worked immediately after that one redirect, and broke on any later
 *   visit. `InterviewFlow` now navigates here with no query string at
 *   all; this page is self-sufficient given only the logged-in session.
 *
 * How it interacts with the rest of the application:
 *   Reached via the "التوصيات" entry in `NAV_ITEMS`, `/dashboard`'s
 *   "عرض جميع التوصيات" button, and directly after finishing `/interview`.
 *   Uses the same cookie + `getLatestInterview` pattern already
 *   established on `/dashboard`, `/profile`, and `/majors/[id]`.
 */
export default async function RecommendationsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const interview = userId ? await getLatestInterview(userId) : null;

  const studentProfile = interview?.studentProfile ? JSON.parse(interview.studentProfile) : null;
  const analysis = interview?.analysis ? JSON.parse(interview.analysis) : null;
  const profile: RiasecProfile | null = studentProfile?.riasec ?? null;

  const recommendedMajors = profile ? getRecommendedMajors(profile) : [];

  return (
    <Container className="flex flex-col gap-10 py-10">

      <PageHeader
        title="التوصيات"
        description="أفضل التخصصات المناسبة بناءً على نتائج مقابلتك الشخصية الأخيرة."
      />

      {analysis && (
        <Card className="border-primary/20 bg-primary/5">
          <h2 className="mb-3 text-xl font-bold text-foreground">تحليل شخصيتك</h2>
          <p className="leading-8 text-muted">
            {analysis.summary}
          </p>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">

        {analysis && (
          <Card>
            <h2 className="mb-4 text-xl font-bold text-foreground">نقاط القوة</h2>
            <ul className="space-y-3">
              {analysis.strengths.map(
                (strength: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="text-lg text-primary">✓</span>
                    <span className="leading-7 text-foreground">{strength}</span>
                  </li>
                )
              )}
            </ul>
          </Card>
        )}

        {analysis && (
          <Card>
            <h2 className="mb-4 text-xl font-bold text-foreground">الجوانب التي تحتاج إلى تطوير</h2>
            <ul className="space-y-3">
              {analysis.developmentAreas.map(
                (item: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="text-lg text-primary">✓</span>
                    <span className="leading-7 text-foreground">{item}</span>
                  </li>
                )
              )}
            </ul>
          </Card>
        )}

      </div>

      {profile ? (
        <section aria-label="التخصصات الموصى بها" className="flex flex-col gap-6">
          {recommendedMajors.map(({ major, compatibilityPercentage }) => {
            const skills = getMajorSkills(major.id).map((skill) => skill.nameAr);
            const careers = getMajorCareers(major.id).map((career) => career.nameAr);
            const roadmap = getPreparationRoadmap(major.id);
            const majorWeights = riasecMajorWeights.find(
              (weights) => weights.majorId === major.id,
            );
            const matchedDimensions = majorWeights
              ? getMatchedRiasecDimensions(profile, majorWeights).map(
                  (match) => match.labelAr,
                )
              : [];

            return (
              <MajorRecommendationCard
                key={major.id}
                title={major.nameAr}
                matchPercentage={compatibilityPercentage}
                description={major.descriptionAr}
                skills={skills}
                careers={careers}
                coreSubjects={major.coreSubjects}
                classification={major.officialClassification}
                matchedDimensions={matchedDimensions}
                roadmapOverview={roadmap?.overviewAr}
                actionLabel="عرض التفاصيل الكاملة"
                actionHref={`/majors/${major.id}`}
                actionAriaLabel={`عرض تفاصيل تخصص ${major.nameAr}`}
              />
            );
          })}
        </section>
      ) : (
        <Card className="flex flex-col items-center gap-4 py-10 text-center">
          <p className="text-sm leading-relaxed text-muted">
            أكمل المقابلة الشخصية أولاً لعرض تخصصاتك الموصى بها.
          </p>
          <Button href="/interview" ariaLabel="ابدأ المقابلة الشخصية">
            ابدأ المقابلة
          </Button>
        </Card>
      )}

    </Container>
  );
}
