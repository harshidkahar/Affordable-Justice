USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[caseassignlawyer] Script Date: 03-04-2024 00:43:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[caseassignlawyer] (
    [asslid] INT          NOT NULL,
    [lid]    INT          NOT NULL,
    [ltype]  VARCHAR (30) NOT NULL,
    [cid]    INT          NOT NULL,
    [comid]  INT          NOT NULL,
    [dtassi] DATETIME     NULL
);


