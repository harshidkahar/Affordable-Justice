USE [Affordablejusitce]
GO

/****** Object: Table [dbo].[createcompany] Script Date: 03-04-2024 00:43:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[createcompany] (
    [comid]  INT             NOT NULL,
    [aptype] VARCHAR (20)    NOT NULL,
    [cotype] VARCHAR (20)    NOT NULL,
    [cmainl] VARCHAR (20)    NULL,
    [cmlbus] VARCHAR (20)    NULL,
    [cfrez]  VARCHAR (20)    NULL,
    [cfrezl] VARCHAR (20)    NULL,
    [cfzbus] VARCHAR (20)    NULL,
    [rvisa]  INT             NOT NULL,
    [visad]  VARCHAR (10)    NOT NULL,
    [oftype] VARCHAR (30)    NOT NULL,
    [jtype]  VARCHAR (30)    NOT NULL,
    [bstart] VARCHAR (30)    NOT NULL,
    [bmind]  VARCHAR (10)    NOT NULL,
    [bname]  VARCHAR (30)    NOT NULL,
    [oserv]  VARCHAR (100)   NULL,
    [cname]  VARCHAR (30)    NOT NULL,
    [cmail]  VARCHAR (30)    NOT NULL,
    [cmob]   VARCHAR (15)    NOT NULL,
    [caddr]  VARCHAR (100)   NOT NULL,
    [cnatn]  VARCHAR (30)    NOT NULL,
    [cupprt] VARBINARY (MAX) NOT NULL,
    [cupph]  VARBINARY (MAX) NOT NULL,
    [dtupl]  DATETIME        NOT NULL
);


