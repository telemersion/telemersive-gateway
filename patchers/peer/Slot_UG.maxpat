{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 2,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 425.0, 223.0, 608.0, 480.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
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
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 487.0, 220.0, 56.0, 22.0 ],
					"text" : "autopattr",
					"varname" : "u444011683"
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 0 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-27",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 0.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.0",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 1 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-30",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 50.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 50.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.1",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 2 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-36",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 100.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 100.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.2",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 3 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-39",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 150.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 150.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.3",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 4 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-41",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 200.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 200.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.4",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 5 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-43",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 250.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 250.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.5",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 6 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-46",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 300.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 300.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.6",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 7 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-48",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 350.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 350.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.7",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 8 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-55",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 400.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 400.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.8",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1", 9 ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-57",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "deviceUG_remote.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 450.0, 0.0, 48.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 450.0, 0.0, 48.0, 40.0 ],
					"varname" : "channel.9",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "deviceUG_remote.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceUG_view.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "SVGButton.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceUG_icon.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
