s="""(1,1,1,N'',1.85,N'8000990136013',0,0,0,0,0,0,1,0,1,1,0,CAST(N'2024-02-07T00:00:00.000' AS DateTime),N'Bayernland Caciotta, Formaggio a Fette 140g',5,N'Bayernland Caciotta, Formaggio a Fette 140g',0,
N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',NULL,0,0,0,0,NULL,NULL,
NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,N'07022024',N'07022024',0,0,0,N'',0)"""


# giusto
f = """(1,1,1,N'',1.85,N'8000990136013',0,0,0,0,0,0,1,0,1,1,0,CAST(N'2024-02-07T00:00:00.000' AS DateTime),N'Bayernland Caciotta, Formaggio a Fette 140g',5,N'Bayernland Caciotta, Formaggio a Fette 140g',0,
N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',0,N'',NULL,0,0,0,0,NULL,NULL,
NULL,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,N'07022024',N'07022024',0,0,0,N'',0)"""

print(s==f)
