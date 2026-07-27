/**
 * ==============================================================
 * RecommendationCard.tsx
 * --------------------------------------------------------------
 * Displays one recommended university major.
 *
 * This component is responsible ONLY for presentation.
 *
 * It receives:
 *  - the recommended major
 *  - compatibility percentage
 *
 * It then enriches the UI using the knowledge utility.
 *
 * It DOES NOT:
 *  - calculate recommendations
 *  - calculate RIASEC
 *  - read URL parameters
 *
 * Those responsibilities belong elsewhere.
 * ==============================================================
 */

import { Card } from "@/components/ui/Card";
import { Major } from "@/types/data";
import {
  getMajorCareers,
  getMajorSkills,
  getMajorUniversities,
  getCompatibilityLabel,
} from "@/utils/knowledge";

interface RecommendationCardProps {
  major: Major;
  compatibilityPercentage: number;
}

export default function RecommendationCard({
  major,
  compatibilityPercentage,
}: RecommendationCardProps) {
  // Retrieve related information from the knowledge base.
  const careers = getMajorCareers(major.id);
  const skills = getMajorSkills(major.id);
  const universities = getMajorUniversities(major.id);

  return (
    <Card className="flex flex-col gap-6">

      {/* ==========================================================
          Header
      ========================================================== */}

      <div className="flex items-start justify-between gap-4">

        <div className="space-y-2">

          <h2 className="text-xl font-bold text-foreground">
            {major.nameAr}
          </h2>

          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {getCompatibilityLabel(compatibilityPercentage)}
          </span>

        </div>

        <div className="rounded-full bg-primary px-4 py-2 text-lg font-bold text-white">
          {compatibilityPercentage}%
        </div>

      </div>

      {/* ==========================================================
          Description
      ========================================================== */}

      <p className="text-sm leading-7 text-muted">
        {major.descriptionAr}
      </p>

      {/* ==========================================================
          Major Information
      ========================================================== */}

      <div className="rounded-xl border p-4 space-y-2 text-sm">

        <div>
          <strong>مدة الدراسة:</strong>{" "}
          {major.studyDuration}
        </div>

        <div>
          <strong>الطلب المستقبلي:</strong>{" "}
          {major.futureDemand}
        </div>

        <div>
          <strong>متوسط الرواتب:</strong>{" "}
          {major.salaryRange}
        </div>

      </div>

      {/* ==========================================================
          Careers
      ========================================================== */}

      <div>

        <h3 className="mb-2 font-bold">
          💼 المسارات المهنية
        </h3>

        <ul className="space-y-1 text-sm">

          {careers.map((career) => (

            <li key={career.id}>
              • {career.nameAr}
            </li>

          ))}

        </ul>

      </div>

      {/* ==========================================================
          Skills
      ========================================================== */}

      <div>

        <h3 className="mb-2 font-bold">
          🛠 المهارات المطلوبة
        </h3>

        <ul className="space-y-1 text-sm">

          {skills.map((skill) => (

            <li key={skill.id}>
              • {skill.nameAr}
            </li>

          ))}

        </ul>

      </div>

      {/* ==========================================================
          Universities
      ========================================================== */}

      <div>

        <h3 className="mb-2 font-bold">
          🎓 الجامعات السعودية
        </h3>

        <ul className="space-y-1 text-sm">

          {universities.map((university) => (

            <li key={university.id}>
              • {university.nameAr}
            </li>

          ))}

        </ul>

      </div>

    </Card>
  );
}