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
		"rect" : [ 386.0, 299.0, 679.0, 480.0 ],
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
					"id" : "obj-13",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 145.0, 334.0, 33.0, 22.0 ],
					"text" : "-120"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 23.0, 262.0, 117.0, 22.0 ],
					"text" : "receiveR displaySlot"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 104.333333333333371, 334.0, 29.5, 22.0 ],
					"text" : "-80"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 23.0, 334.0, 29.5, 22.0 ],
					"text" : "0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 63.666666666666629, 334.0, 29.5, 22.0 ],
					"text" : "-40"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"linecount" : 2,
					"maxclass" : "newobj",
					"numinlets" : 5,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 23.0, 292.0, 181.666666666666742, 35.0 ],
					"text" : "route osc ultragrid mocap filesync"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 23.0, 389.0, 64.0, 22.0 ],
					"text" : "offset 0 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 22.75, 424.0, 67.0, 22.0 ],
					"save" : [ "#N", "thispatcher", ";", "#Q", "end", ";" ],
					"text" : "thispatcher"
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1" ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-8",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "Slot_SYNC.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 23.0, 203.0, 500.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 120.0, 520.0, 40.0 ],
					"varname" : "filesync",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1" ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-7",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "Slot_MC.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 23.0, 157.0, 500.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 80.0, 520.0, 40.0 ],
					"varname" : "mocap",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1" ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-2",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "Slot_UG.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 23.0, 110.0, 500.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 40.0, 520.0, 40.0 ],
					"varname" : "ultragrid",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 204.0, 22.0, 56.0, 22.0 ],
					"text" : "autopattr",
					"varname" : "u837011646"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-5",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 27.0, 24.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"args" : [ "#1" ],
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-1",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "Slot_OSC.maxpat",
					"numinlets" : 0,
					"numoutlets" : 0,
					"offset" : [ 0.0, 0.0 ],
					"patching_rect" : [ 23.0, 63.0, 500.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.0, 520.0, 40.0 ],
					"varname" : "osc",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-14", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-14", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-14", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"dependency_cache" : [ 			{
				"name" : "Slot_OSC.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/peer",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceOSC_remote.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceOSC_view.maxpat",
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
				"name" : "deviceOSC_icon.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "Slot_UG.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/peer",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
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
				"name" : "deviceUG_icon.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "Slot_MC.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/peer",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceMC_remote.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/devices",
				"patcherrelativepath" : "../devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceMC_view.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/devices",
				"patcherrelativepath" : "../devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceMC_icon.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/devices",
				"patcherrelativepath" : "../devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "receiveR.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/MQTTQuery/patchers/mockup",
				"patcherrelativepath" : "../../../MQTTQuery/patchers/mockup",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "tg.monitor.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/utils",
				"patcherrelativepath" : "../utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "restartProxy.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/utils",
				"patcherrelativepath" : "../utils",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "deviceMC_button.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/devices",
				"patcherrelativepath" : "../devices",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "Slot_SYNC.maxpat",
				"bootpath" : "~/Arbeiten/01_projekte/181111_IASpace/01_projekte/20xx_Telematik/01_dev/telemersive-gateway/patchers/peer",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "rnbodefault",
				"default" : 				{
					"stripecolor" : [ 0.258338063955307, 0.352425158023834, 0.511919498443604, 1.0 ],
					"bgcolor" : [ 0.031372549019608, 0.125490196078431, 0.211764705882353, 1.0 ],
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.031372549019608, 0.125490196078431, 0.211764705882353, 1.0 ],
						"color1" : [ 0.031372549019608, 0.125490196078431, 0.211764705882353, 1.0 ],
						"color2" : [ 0.263682, 0.004541, 0.038797, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0.0
					}
,
					"color" : [ 0.929412, 0.929412, 0.352941, 1.0 ],
					"fontsize" : [ 12.0 ],
					"accentcolor" : [ 0.343034118413925, 0.506230533123016, 0.86220508813858, 1.0 ],
					"fontname" : [ "Lato" ],
					"elementcolor" : [ 0.357540726661682, 0.515565991401672, 0.861786782741547, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "rnbohighcontrast",
				"default" : 				{
					"clearcolor" : [ 1.0, 1.0, 1.0, 0.0 ],
					"stripecolor" : [ 0.258823529411765, 0.258823529411765, 0.258823529411765, 1.0 ],
					"textcolor_inverse" : [ 1.0, 1.0, 1.0, 1.0 ],
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.0, 0.0, 0.0, 1.0 ],
						"color1" : [ 0.090196078431373, 0.090196078431373, 0.090196078431373, 1.0 ],
						"color2" : [ 0.156862745098039, 0.168627450980392, 0.164705882352941, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.5,
						"autogradient" : 0.0
					}
,
					"color" : [ 1.0, 0.874509803921569, 0.141176470588235, 1.0 ],
					"fontsize" : [ 13.0 ],
					"selectioncolor" : [ 0.301960784313725, 0.694117647058824, 0.949019607843137, 1.0 ],
					"accentcolor" : [ 0.666666666666667, 0.666666666666667, 0.666666666666667, 1.0 ],
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"editing_bgcolor" : [ 0.258823529411765, 0.258823529411765, 0.258823529411765, 1.0 ],
					"elementcolor" : [ 0.223386004567146, 0.254748553037643, 0.998085916042328, 1.0 ],
					"locked_bgcolor" : [ 0.258823529411765, 0.258823529411765, 0.258823529411765, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}