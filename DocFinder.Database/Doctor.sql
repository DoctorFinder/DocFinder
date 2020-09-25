CREATE TABLE [dbo].[Doctor]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [FirstName] VARCHAR(30) NOT NULL,
    [MiddleName] VARCHAR(30) NOT NULL, 
    [LastName] VARCHAR(30) NOT NULL,
    [DateOfBirth] Date NOT NULL,
    [Gender] VARCHAR(20) NOT NULL,
    [Email] VARCHAR(50) NOT NULL, 
    [Password] VARCHAR(20) NOT NULL,
    [Education] VARCHAR(30) NOT NULL,
    [YearsInPractice] int  NOT NULL,
    [Degree] VARCHAR(30) NOT NULL,
    [License] VARCHAR(30) NOT NULL,
    [NpiNumber] VARCHAR(30) NULL,
    [NpiDisclosure] bit,
    [Address1] VARCHAR(50) NOT NULL,
    [Address2] VARCHAR(50) NOT NULL,
    [City] VARCHAR(50) NOT NULL,
    [State] VARCHAR(50) NOT NULL,
    [Zipcode] VARCHAR(5) NOT NULL, 
    [PhoneNumber] VARCHAR(10) NOT NULL
)

