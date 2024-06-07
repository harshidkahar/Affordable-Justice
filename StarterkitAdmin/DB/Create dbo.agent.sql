USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[agent] Script Date: 03-04-2024 00:43:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[agent] (
    [agid]    INT           NOT NULL,
    [agname]  VARCHAR (30)  NOT NULL,
    [agmail]  VARCHAR (30)  NOT NULL,
    [agmob]   VARCHAR (15)  NOT NULL,
    [agdob]   DATETIME      NOT NULL,
    [aguname] VARCHAR (30)  NOT NULL,
    [agpass]  VARCHAR (30)  NOT NULL,
    [agadr]   VARCHAR (100) NOT NULL,
    [agnatn]  VARCHAR (30)  NOT NULL,
    [dtjoin]  DATETIME      NOT NULL
);


