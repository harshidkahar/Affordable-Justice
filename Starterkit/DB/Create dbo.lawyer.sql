USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[lawyer] Script Date: 03-04-2024 00:52:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[lawyer] (
    [lid]    INT           NOT NULL,
    [lname]  VARCHAR (30)  NOT NULL,
    [llisno] INT           NOT NULL,
    [ltype]  VARCHAR (30)  NOT NULL,
    [lcomp]  VARCHAR (30)  NOT NULL,
    [lemail] VARCHAR (30)  NOT NULL,
    [lmob]   VARCHAR (15)  NOT NULL,
    [laddr]  VARCHAR (100) NOT NULL,
    [luname] VARCHAR (30)  NOT NULL,
    [lpass]  VARCHAR (30)  NOT NULL,
    [ldob]   DATETIME      NOT NULL,
    [lnatn]  VARCHAR (30)  NOT NULL,
    [dtjoin] DATETIME      NOT NULL
);


