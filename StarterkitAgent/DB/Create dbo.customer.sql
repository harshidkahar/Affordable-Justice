USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[customer] Script Date: 03-04-2024 00:52:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[customer] (
    [uid]    INT          NOT NULL,
    [refcd]  VARCHAR (30) NOT NULL,
    [ufname] VARCHAR (30) NOT NULL,
    [ulname] VARCHAR (30) NOT NULL,
    [umail]  VARCHAR (30) NOT NULL,
    [udob]   DATETIME     NOT NULL,
    [umob]   VARCHAR (15) NOT NULL,
    [uuname] VARCHAR (30) NOT NULL,
    [upass]  VARCHAR (30) NOT NULL,
    [uaddr]  VARCHAR (30) NOT NULL,
    [unatn]  VARCHAR (30) NOT NULL,
    [dtjoin] DATETIME     NOT NULL
);


