USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[payment] Script Date: 03-04-2024 00:53:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[payment] (
    [pid]    INT             NOT NULL,
    [uid]    INT             NOT NULL,
    [uppro]  VARCHAR (30)    NOT NULL,
    [amtpd]  DECIMAL (10, 2) NOT NULL,
    [paydt]  DATETIME        NOT NULL,
    [trnsid] VARCHAR (100)   NOT NULL,
    [transt] VARCHAR (20)    NOT NULL
);


