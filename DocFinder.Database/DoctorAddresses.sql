CREATE TABLE [dbo].[DoctorAddresses]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DoctorId] INT NOT NULL,
    [Address1] VARCHAR(50) NOT NULL,
    [Address2] VARCHAR(50) NOT NULL,
    [City] VARCHAR(50) NOT NULL,
    [State] VARCHAR(50) NOT NULL,
    [Zipcode] VARCHAR(5) NOT NULL, 
    [Location] geography NULL,
    [PhoneNumber] VARCHAR(10) NOT NULL
)
