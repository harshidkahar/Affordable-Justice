USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[upcasepaper] Script Date: 03-04-2024 00:53:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[upcasepaper] (
    [upid]   INT             NOT NULL,
    [cid]    INT             NOT NULL,
    [comid]  INT             NOT NULL,
    [lid]    INT             NOT NULL,
    [updt]   DATETIME        NOT NULL,
    [upcppr] VARBINARY (MAX) NOT NULL
);


