-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
    "analysis" TEXT,
    "studentProfile" TEXT,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSource" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "datasetVersion" TEXT,
    "lastVerified" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classification" (
    "id" TEXT NOT NULL,
    "officialCode" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT,
    "level" INTEGER,
    "parentId" TEXT,
    "dataSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Major" (
    "id" TEXT NOT NULL,
    "officialCode" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT,
    "description" TEXT,
    "classificationId" TEXT NOT NULL,
    "dataSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "includedSpecializations" TEXT,
    "coreSubjects" TEXT,

    CONSTRAINT "Major_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "officialCode" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT,
    "description" TEXT,
    "occupationGroup" TEXT,
    "dataSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "officialCode" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT,
    "category" TEXT,
    "description" TEXT,
    "dataSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT,
    "city" TEXT,
    "website" TEXT,
    "sector" TEXT,
    "ministryId" INTEGER,
    "businessCode" TEXT,
    "logoUrl" TEXT,
    "imageUrl" TEXT,
    "dataSourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "officialCode" TEXT,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT,
    "universityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MajorSkill" (
    "majorId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "importance" INTEGER,

    CONSTRAINT "MajorSkill_pkey" PRIMARY KEY ("majorId","skillId")
);

-- CreateTable
CREATE TABLE "MajorCareer" (
    "majorId" TEXT NOT NULL,
    "careerId" TEXT NOT NULL,
    "matchLevel" INTEGER,

    CONSTRAINT "MajorCareer_pkey" PRIMARY KEY ("majorId","careerId")
);

-- CreateTable
CREATE TABLE "CollegeMajor" (
    "collegeId" TEXT NOT NULL,
    "majorId" TEXT NOT NULL,

    CONSTRAINT "CollegeMajor_pkey" PRIMARY KEY ("collegeId","majorId")
);

-- CreateTable
CREATE TABLE "MajorRiasecProfile" (
    "majorId" TEXT NOT NULL,
    "realistic" INTEGER NOT NULL,
    "investigative" INTEGER NOT NULL,
    "artistic" INTEGER NOT NULL,
    "social" INTEGER NOT NULL,
    "enterprising" INTEGER NOT NULL,
    "conventional" INTEGER NOT NULL,

    CONSTRAINT "MajorRiasecProfile_pkey" PRIMARY KEY ("majorId")
);

-- CreateTable
CREATE TABLE "MajorRoadmap" (
    "majorId" TEXT NOT NULL,
    "overview" TEXT,
    "learningPath" TEXT,
    "certifications" TEXT,
    "activities" TEXT,
    "tools" TEXT,

    CONSTRAINT "MajorRoadmap_pkey" PRIMARY KEY ("majorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DataSource_name_key" ON "DataSource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Classification_officialCode_key" ON "Classification"("officialCode");

-- CreateIndex
CREATE INDEX "Classification_officialCode_idx" ON "Classification"("officialCode");

-- CreateIndex
CREATE UNIQUE INDEX "Major_officialCode_key" ON "Major"("officialCode");

-- CreateIndex
CREATE INDEX "Major_officialCode_idx" ON "Major"("officialCode");

-- CreateIndex
CREATE UNIQUE INDEX "Career_officialCode_key" ON "Career"("officialCode");

-- CreateIndex
CREATE INDEX "Career_officialCode_idx" ON "Career"("officialCode");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_officialCode_key" ON "Skill"("officialCode");

-- CreateIndex
CREATE INDEX "Skill_officialCode_idx" ON "Skill"("officialCode");

-- CreateIndex
CREATE UNIQUE INDEX "University_arabicName_key" ON "University"("arabicName");

-- CreateIndex
CREATE UNIQUE INDEX "College_universityId_arabicName_key" ON "College"("universityId", "arabicName");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Classification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Classification" ADD CONSTRAINT "Classification_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "Classification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_dataSourceId_fkey" FOREIGN KEY ("dataSourceId") REFERENCES "DataSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorSkill" ADD CONSTRAINT "MajorSkill_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MajorSkill" ADD CONSTRAINT "MajorSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorCareer" ADD CONSTRAINT "MajorCareer_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MajorCareer" ADD CONSTRAINT "MajorCareer_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeMajor" ADD CONSTRAINT "CollegeMajor_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeMajor" ADD CONSTRAINT "CollegeMajor_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MajorRiasecProfile" ADD CONSTRAINT "MajorRiasecProfile_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorRoadmap" ADD CONSTRAINT "MajorRoadmap_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
