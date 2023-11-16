{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 6,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 139.0, 348.0, 640.0, 480.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-7",
					"linecount" : 11,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 267.0, 32.0, 260.0, 154.0 ],
					"text" : "iasnet creates a local listener socket that listens on the 'local receive port'. \n\nIt passes everything on to the 'remote url' and port.\n\nIt also listens to messages from the 'remote url' and port (it is a bidirectional udp connection)\n\nand passes everything on to the first and second 'local send url' and 'local send port'"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"linecount" : 9,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 34.0, 32.0, 205.0, 127.0 ],
					"text" : "iasnet external takes 5 or 7 attributes\n\n1. local receive port\n2. remote url\n3. remote port\n4. first local send url\n5. first local send port\n6. second local send url\n7. second local send port"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 34.0, 273.0, 457.0, 22.0 ],
					"text" : "iasnet 10099 telemersion.zhdk.ch 11099 10.130.133.96 10098 10.130.133.96 10097"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "list", "list" ],
					"patching_rect" : [ 34.0, 241.0, 321.0, 22.0 ],
					"text" : "iasnet 10000 telemersion.com 11000 10.130.133.96 10010"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "iasnet.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0
	}

}
