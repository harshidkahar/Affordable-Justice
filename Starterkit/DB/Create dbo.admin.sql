USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[admin] Script Date: 03-04-2024 00:27:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[admin] (
    [adid]    INT           NOT NULL,
    [adname]  VARCHAR (30)  NOT NULL,
    [admail]  VARCHAR (30)  NOT NULL,
    [admob]   VARCHAR (15)  NOT NULL,
    [addob]   DATETIME2 (7) NOT NULL,
    [aduname] VARCHAR (30)  NOT NULL,
    [adpass]  VARCHAR (30)  NOT NULL,
    [adadr]   VARCHAR (100) NOT NULL,
    [adnatn]  VARCHAR (30)  NOT NULL,
    [dtjion]  DATETIME      NOT NULL
);


