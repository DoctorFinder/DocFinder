CREATE TABLE [dbo].[DoctorSpecialities]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DoctorId] INT NOT NULL,
	[SpecialityId] INT NOT NULL
)
