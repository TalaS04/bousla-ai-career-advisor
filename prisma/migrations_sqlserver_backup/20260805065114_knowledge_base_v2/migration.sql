BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DataSource] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [organization] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [datasetVersion] NVARCHAR(1000),
    [lastVerified] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DataSource_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [DataSource_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [DataSource_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Classification] (
    [id] NVARCHAR(1000) NOT NULL,
    [officialCode] NVARCHAR(1000) NOT NULL,
    [arabicName] NVARCHAR(1000) NOT NULL,
    [englishName] NVARCHAR(1000),
    [level] INT,
    [parentId] NVARCHAR(1000),
    [dataSourceId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Classification_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Classification_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Classification_officialCode_key] UNIQUE NONCLUSTERED ([officialCode])
);

-- CreateTable
CREATE TABLE [dbo].[Major] (
    [id] NVARCHAR(1000) NOT NULL,
    [officialCode] NVARCHAR(1000) NOT NULL,
    [arabicName] NVARCHAR(1000) NOT NULL,
    [englishName] NVARCHAR(1000),
    [description] NVARCHAR(max),
    [classificationId] NVARCHAR(1000) NOT NULL,
    [dataSourceId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Major_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Major_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Major_officialCode_key] UNIQUE NONCLUSTERED ([officialCode])
);

-- CreateTable
CREATE TABLE [dbo].[Career] (
    [id] NVARCHAR(1000) NOT NULL,
    [officialCode] NVARCHAR(1000) NOT NULL,
    [arabicName] NVARCHAR(1000) NOT NULL,
    [englishName] NVARCHAR(1000),
    [description] NVARCHAR(max),
    [occupationGroup] NVARCHAR(1000),
    [dataSourceId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Career_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Career_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Career_officialCode_key] UNIQUE NONCLUSTERED ([officialCode])
);

-- CreateTable
CREATE TABLE [dbo].[Skill] (
    [id] NVARCHAR(1000) NOT NULL,
    [officialCode] NVARCHAR(1000) NOT NULL,
    [arabicName] NVARCHAR(1000) NOT NULL,
    [englishName] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [description] NVARCHAR(max),
    [dataSourceId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Skill_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Skill_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Skill_officialCode_key] UNIQUE NONCLUSTERED ([officialCode])
);

-- CreateTable
CREATE TABLE [dbo].[University] (
    [id] NVARCHAR(1000) NOT NULL,
    [arabicName] NVARCHAR(1000) NOT NULL,
    [englishName] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [website] NVARCHAR(1000),
    [sector] NVARCHAR(1000),
    [dataSourceId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [University_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [University_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [University_arabicName_key] UNIQUE NONCLUSTERED ([arabicName])
);

-- CreateTable
CREATE TABLE [dbo].[College] (
    [id] NVARCHAR(1000) NOT NULL,
    [officialCode] NVARCHAR(1000),
    [arabicName] NVARCHAR(1000) NOT NULL,
    [englishName] NVARCHAR(1000),
    [universityId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [College_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [College_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [College_universityId_arabicName_key] UNIQUE NONCLUSTERED ([universityId],[arabicName])
);

-- CreateTable
CREATE TABLE [dbo].[MajorSkill] (
    [majorId] NVARCHAR(1000) NOT NULL,
    [skillId] NVARCHAR(1000) NOT NULL,
    [importance] INT,
    CONSTRAINT [MajorSkill_pkey] PRIMARY KEY CLUSTERED ([majorId],[skillId])
);

-- CreateTable
CREATE TABLE [dbo].[MajorCareer] (
    [majorId] NVARCHAR(1000) NOT NULL,
    [careerId] NVARCHAR(1000) NOT NULL,
    [matchLevel] INT,
    CONSTRAINT [MajorCareer_pkey] PRIMARY KEY CLUSTERED ([majorId],[careerId])
);

-- CreateTable
CREATE TABLE [dbo].[CollegeMajor] (
    [collegeId] NVARCHAR(1000) NOT NULL,
    [majorId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [CollegeMajor_pkey] PRIMARY KEY CLUSTERED ([collegeId],[majorId])
);

-- CreateTable
CREATE TABLE [dbo].[MajorRiasecProfile] (
    [majorId] NVARCHAR(1000) NOT NULL,
    [realistic] INT NOT NULL,
    [investigative] INT NOT NULL,
    [artistic] INT NOT NULL,
    [social] INT NOT NULL,
    [enterprising] INT NOT NULL,
    [conventional] INT NOT NULL,
    CONSTRAINT [MajorRiasecProfile_pkey] PRIMARY KEY CLUSTERED ([majorId])
);

-- CreateTable
CREATE TABLE [dbo].[MajorRoadmap] (
    [majorId] NVARCHAR(1000) NOT NULL,
    [overview] NVARCHAR(max),
    [learningPath] NVARCHAR(max),
    [certifications] NVARCHAR(max),
    [activities] NVARCHAR(max),
    [tools] NVARCHAR(max),
    CONSTRAINT [MajorRoadmap_pkey] PRIMARY KEY CLUSTERED ([majorId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Classification_officialCode_idx] ON [dbo].[Classification]([officialCode]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Major_officialCode_idx] ON [dbo].[Major]([officialCode]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Career_officialCode_idx] ON [dbo].[Career]([officialCode]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Skill_officialCode_idx] ON [dbo].[Skill]([officialCode]);

-- AddForeignKey
ALTER TABLE [dbo].[Classification] ADD CONSTRAINT [Classification_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[Classification]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Classification] ADD CONSTRAINT [Classification_dataSourceId_fkey] FOREIGN KEY ([dataSourceId]) REFERENCES [dbo].[DataSource]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Major] ADD CONSTRAINT [Major_classificationId_fkey] FOREIGN KEY ([classificationId]) REFERENCES [dbo].[Classification]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Major] ADD CONSTRAINT [Major_dataSourceId_fkey] FOREIGN KEY ([dataSourceId]) REFERENCES [dbo].[DataSource]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Career] ADD CONSTRAINT [Career_dataSourceId_fkey] FOREIGN KEY ([dataSourceId]) REFERENCES [dbo].[DataSource]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Skill] ADD CONSTRAINT [Skill_dataSourceId_fkey] FOREIGN KEY ([dataSourceId]) REFERENCES [dbo].[DataSource]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[University] ADD CONSTRAINT [University_dataSourceId_fkey] FOREIGN KEY ([dataSourceId]) REFERENCES [dbo].[DataSource]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[College] ADD CONSTRAINT [College_universityId_fkey] FOREIGN KEY ([universityId]) REFERENCES [dbo].[University]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MajorSkill] ADD CONSTRAINT [MajorSkill_majorId_fkey] FOREIGN KEY ([majorId]) REFERENCES [dbo].[Major]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[MajorSkill] ADD CONSTRAINT [MajorSkill_skillId_fkey] FOREIGN KEY ([skillId]) REFERENCES [dbo].[Skill]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MajorCareer] ADD CONSTRAINT [MajorCareer_majorId_fkey] FOREIGN KEY ([majorId]) REFERENCES [dbo].[Major]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[MajorCareer] ADD CONSTRAINT [MajorCareer_careerId_fkey] FOREIGN KEY ([careerId]) REFERENCES [dbo].[Career]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CollegeMajor] ADD CONSTRAINT [CollegeMajor_collegeId_fkey] FOREIGN KEY ([collegeId]) REFERENCES [dbo].[College]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CollegeMajor] ADD CONSTRAINT [CollegeMajor_majorId_fkey] FOREIGN KEY ([majorId]) REFERENCES [dbo].[Major]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[MajorRiasecProfile] ADD CONSTRAINT [MajorRiasecProfile_majorId_fkey] FOREIGN KEY ([majorId]) REFERENCES [dbo].[Major]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MajorRoadmap] ADD CONSTRAINT [MajorRoadmap_majorId_fkey] FOREIGN KEY ([majorId]) REFERENCES [dbo].[Major]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
