import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

import { majors } from "@/utils/data";
import { getMajorSkills, getCompatibilityLabel } from "@/utils/knowledge";

import {
  readRiasecProfile,
  type RecommendationSearchParams,
} from "@/utils/recommendation-navigation";

import { getTopMajorCompatibilities } from "@/utils/recommendations";
import type { RiasecProfile } from "@/utils/riasec";

export const metadata: Metadata = {
  title: "التوصيات",
};

interface RecommendationsPageProps {
  searchParams: Promise<RecommendationSearchParams>;
}

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

export default async function RecommendationsPage({
  searchParams,
}: RecommendationsPageProps) {
  const profile = readRiasecProfile(await searchParams);

  const recommendedMajors = profile
    ? getRecommendedMajors(profile)
    : [];

  return (
    <Container className="flex flex-col gap-10 py-10">

      <PageHeader
        title="التوصيات"
        description="أفضل التخصصات المناسبة بناءً على نتائج المقابلة الشخصية."
      />

      {profile ? (
        <section
          aria-label="التخصصات الموصى بها"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {recommendedMajors.map(
            ({ major, compatibilityPercentage }) => {
              const skills = getMajorSkills(major.id);

              return (
                <Card
                  key={major.id}
                  className="flex flex-col gap-5"
                >
                  <div className="flex items-start justify-between">

                    <div>

                      <h2 className="text-lg font-bold text-foreground">
                        {major.nameAr}
                      </h2>

                      <p className="mt-1 text-sm text-primary font-medium">
                        {getCompatibilityLabel(
                          compatibilityPercentage
                        )}
                      </p>

                    </div>

                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      {compatibilityPercentage}%
                    </span>

                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {major.descriptionAr}
                  </p>

                  <div>

                    <h3 className="mb-2 text-sm font-semibold">
                      المهارات المطلوبة
                    </h3>

                    <ul className="flex flex-wrap gap-2">

                      {skills.slice(0, 3).map((skill) => (
                        <li
                          key={skill.id}
                          className="rounded-full bg-muted/10 px-3 py-1 text-xs font-medium"
                        >
                          {skill.nameAr}
                        </li>
                      ))}

                    </ul>

                  </div>

                  <Button
                    href={`/majors/${major.id}`}
                    variant="secondary"
                    className="mt-auto"
                  >
                    اعرف المزيد
                  </Button>

                </Card>
              );
            }
          )}
        </section>
      ) : (
        <Card>
          <p className="text-sm leading-relaxed text-muted">
            أكمل المقابلة الشخصية أولاً لعرض تخصصاتك الموصى بها.
          </p>
        </Card>
      )}

    </Container>
  );
}