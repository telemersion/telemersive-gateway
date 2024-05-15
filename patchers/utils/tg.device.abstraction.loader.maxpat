{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 3,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 227.0, 343.0, 369.0, 305.0 ],
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
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 248.0, 253.0, 22.0 ],
					"text" : "tg.deviceMC_remote tg.deviceMC_view #0 57",
					"varname" : "tg.deviceUG_local[6]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 217.0, 241.0, 22.0 ],
					"text" : "tg.deviceMC_local tg.deviceMC_view #0 56",
					"varname" : "tg.deviceUG_local[7]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 183.0, 249.0, 22.0 ],
					"text" : "tg.deviceSC_remote tg.deviceSC_view #0 55",
					"varname" : "tg.deviceUG_local[4]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 152.0, 237.0, 22.0 ],
					"text" : "tg.deviceSC_local tg.deviceSC_view #0 54",
					"varname" : "tg.deviceUG_local[5]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 118.0, 268.0, 22.0 ],
					"text" : "tg.deviceOSC_remote tg.deviceOSC_view #0 53",
					"varname" : "tg.deviceUG_local[2]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 87.0, 255.0, 22.0 ],
					"text" : "tg.deviceOSC_local tg.deviceOSC_view #0 52",
					"varname" : "tg.deviceUG_local[3]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 57.0, 252.0, 22.0 ],
					"text" : "tg.deviceUG_remote tg.deviceUG_view #0 51",
					"varname" : "tg.deviceUG_local[1]"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patching_rect" : [ 28.0, 26.0, 239.0, 22.0 ],
					"text" : "tg.deviceUG_local tg.deviceUG_view #0 50",
					"varname" : "tg.deviceUG_local"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "UI_Switch.png",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/media",
				"type" : "PNG",
				"implicit" : 1
			}
, 			{
				"name" : "syscmd.mxe64",
				"type" : "mx64"
			}
, 			{
				"name" : "tg.device.menu.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceMC_button.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceMC_icon.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceMC_local.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceMC_remote.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceMC_view.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceOSC_button.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceOSC_icon.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceOSC_info.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceOSC_local.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceOSC_remote.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceOSC_view.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceSC_button.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceSC_icon.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceSC_info.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceSC_local.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceSC_remote.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceSC_view.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceUG_button.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceUG_icon.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceUG_info.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceUG_local.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceUG_remote.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.deviceUG_view.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.dynRangeMenu.audio.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.dynRangeMenu.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.dynamic.editor.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.monitor.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.receiveC.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.receiveR.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.syscmd.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.syscmdHelper.js",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "tg.texture.selection.gate.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.ug.streamParser.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.ultragrid.js",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/javascript",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "tg.view.appearance.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.view.simplewin.maxpat",
				"bootpath" : "~/Documents/Max 8/Packages/telemersive-gateway/patchers/utils",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
