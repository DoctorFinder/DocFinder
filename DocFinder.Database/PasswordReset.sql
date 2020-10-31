CREATE TABLE [dbo].[PasswordReset]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	[DoctorId] INT NOT NULL,
	[PasswordResetCode]  binary(12)   NULL,
    [PasswordResetStart] datetime2 NULL
)
