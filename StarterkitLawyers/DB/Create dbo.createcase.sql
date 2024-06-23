USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[createcase] Script Date: 03-04-2024 00:43:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[createcase] (
    [cid]     INT             NOT NULL,
    [ctype]   VARCHAR (30)    NOT NULL,
    [ccate]   VARCHAR (30)    NOT NULL,
    [csutype] VARCHAR (30)    NOT NULL,
    [proyet]  VARCHAR (5)     NOT NULL,
    [dtcom]   DATETIME        NOT NULL,
    [cdoc]    VARBINARY (MAX) NOT NULL,
    [prcno]   INT             NOT NULL,
    [crcno]   INT             NOT NULL,
    [lgadi]   VARCHAR (5)     NOT NULL,
    [ccourt]  VARCHAR (30)    NOT NULL,
    [opname]  VARCHAR (30)    NOT NULL,
    [opmail]  VARCHAR (30)    NOT NULL,
    [opmob]   VARCHAR (15)    NOT NULL,
    [emrid]   VARCHAR (20)    NOT NULL,
    [passno]  VARCHAR (20)    NOT NULL,
    [cdesc]   VARCHAR (100)   NOT NULL
);


