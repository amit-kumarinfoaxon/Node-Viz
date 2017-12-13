
		function changeWWR()
		{	// Each time the button is toogled change WWRByFacade
			// You will need something similar in Angular to toogle between envelope by facade and envelope by building
			if (WWRByFacade == false)
			{

				WWRByFacade = true;
			}
			else
			{
				WWRByFacade = false;
			}
			// update HTML code for envelope page - you will not need this in angular
			initEnvelopeInputFields();
			//
			updateOpenings();
			// update update outputs in html - you will not need this in angular
			updateenvelopehtml()
		}

		function updateOpenings() {
			// ENVELOPE NOTE Here you must bind the html inputs to the inputs in angular
			try {
				// FACADE AT THE BUILDING LEVEL

				theBuilding.wwr = parseFloat(inpWwr.value)/100;

				theBuilding.noWindows = parseInt(noWindows.value);

				theBuilding.windowRatio = parseFloat(inpwindowRatio.value);

				theBuilding.overHangDepth = parseFloat(inpOverhangDepth.value);

				theBuilding.finDepth = parseFloat(inpFinDepth.value);

				theBuilding.wwrS = null;

				theBuilding.wwrN = null;

				theBuilding.wwrE = null;

				theBuilding.wwrS = null;

			} catch (e) {
				// FACADE BY ORIENTATION

				// Window the wall ratio South
				theBuilding.wwrS = parseFloat(inpWwrS.value)/100;
				// Window the wall ratio North
				theBuilding.wwrN = parseFloat(inpWwrN.value)/100;
				// Window the wall ratio East
				theBuilding.wwrE = parseFloat(inpWwrE.value)/100;
				// Window the wall ratio West
				theBuilding.wwrW = parseFloat(inpWwrW.value)/100;

				// Update the value next to the slider
				// Window the window Ratio North
				theBuilding.windowRatioN = parseFloat(windowRatioN.value);
				// window Ratio East
				theBuilding.windowRatioE = parseFloat(windowRatioE.value);
				// window Ratio West
				theBuilding.windowRatioW = parseFloat(windowRatioW.value);
				// window Ratio South
				theBuilding.windowRatioS = parseFloat(windowRatioS.value);
				// Number of windows South
				theBuilding.noWindowsS = parseInt(noWindowsS.value);
				// Number of windows North
				theBuilding.noWindowsN = parseInt(noWindowsN.value);
				// Number of windows East
				theBuilding.noWindowsE = parseInt(noWindowsE.value);
				// Number of windows West
				theBuilding.noWindowsW = parseInt(noWindowsW.value);
				// overhang depth South
				theBuilding.overhangDepthS = parseFloat(inpOverhangDepthS.value);
				// overhang depth North
				theBuilding.overhangDepthN = parseFloat(inpOverhangDepthN.value);
				// overhang depth East
				theBuilding.overhangDepthE = parseFloat(inpOverhangDepthE.value);
				// overhang depth West
				theBuilding.overhangDepthW = parseFloat(inpOverhangDepthW.value);
				// overhang fin Depth
				theBuilding.finDepthS = parseFloat(inpFinDepthS.value);

				theBuilding.finDepthN = parseFloat(inpFinDepthN.value);

				theBuilding.finDepthE = parseFloat(inpFinDepthE.value);

				theBuilding.finDepthW = parseFloat(inpFinDepthW.value);

				theBuilding.wwr = null;

				theBuilding.noWindows = null;

			} finally {
				changeOpenings();
			}
		}
