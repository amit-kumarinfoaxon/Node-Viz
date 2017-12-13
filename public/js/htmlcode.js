
// HTML for adjacent buildings

const adjacentBuildings = [

  { type: 'checkbox', name: 'Building' },
  { type: 'number', name: 'Offset X' },
  { type: 'number', name: 'Offset Y' },
  { type: 'number', name: 'Length' },
  { type: 'number', name: 'Width' },
  { type: 'number', name: 'Height' },
  { type: 'number', name: 'Site Orientation' }

];

function initAdacentBuildingsInputFields() {

  let text =

    '<table>' +
    '<tr>' +
      '<td></td>' +
      '<td>' + addCheckbox( adjacentBuildings[ 0 ], 1 ) + '</td>' +
      '<td>' + addCheckbox( adjacentBuildings[ 0 ], 2 ) + '</td>' +
      '<td>' + addCheckbox( adjacentBuildings[ 0 ], 3 ) + '</td>' +
      '<td>' + addCheckbox( adjacentBuildings[ 0 ], 4 ) + '</td>' +
    '</tr>';

  for ( let i = 1; i < adjacentBuildings.length; i++ ) {

    line = '<tr><td>' + adjacentBuildings[ i ].name + '</td>';

    for ( let j = 0; j < 4; j++ ) {

      line += '<td>' + addNumber( adjacentBuildings[ i ], ( j + 1 ) ) + '</td>';

    }

    text += line + '</tr>';

  }

  text += '</table>';

  divAdjacentBuildingsTable.innerHTML = text;

}

function addCheckbox( item, number ){

  return '<div class=checkbox ><input type="checkbox" onchange="toggleVisibility(' + number + ');" >' + item.name + number + '</div>';

}
function addNumber( item, number ){

  return '<input type="number" min=-100 max=100 step=1 value=0 id=inp' + item.name.replace( ' ','') + number + ' onchange=updateBuilding(this); >';

}

// HTML for geometry page

function initGeometryInputFields()
{
  // Initalize geometry Html

  inpArea.value = 10000;

  inpFloors.min = 1;
  inpFloors.max = 20;
  inpFloors.value = 1;

  inpHeight.min = 8;
  inpHeight.max = 20;
  inpHeight.value = 10;

  selShape.innerHTML =
  '<option>Box-Shape</option>' +
  '<option>L-Shape</option>' +
  '<option>T-Shape</option>' +
  '<option>H-Shape</option>' +
  '';

  // Default is box shape
  selShape.selectedIndex = 0;

  selMassing.innerHTML =
    '<option>Generator 1</option>' +
    '<option>Generator 2</option>' +
    '<option>Generator 3</option>' +
  '';

  selMassing.selectedIndex = 0;

  inpPerimeterDepth.min = 10;
  inpPerimeterDepth.max = 20;
  inpPerimeterDepth.value = 5;

  inpOrientation.min = 0;
  inpOrientation.max = 350;
  inpOrientation.step = 10;
  inpOrientation.value = 0;

  //initGeometry();
}


function initEnvelopeInputFields() {
  /// Initalize envelope html
  if (dataToPass.wwrByBuilding == true)
  {
    document.getElementById("divEnvelope").innerHTML =
    '<h2> Envelope by Building </h2>\n'+
    '<p><button onclick=changeWWR(WWRByFacade);>Toogle to WWRByBuilding</button></p>\n'+
    '<table>\n'+
      '<tr>\n'+
        '<td>building wwr %</td><td>number of Windows</td><td>Overhang Depth</td><td>Fin Depth</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><input type=number id=inpWwr step=5 onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=noWindows onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpOverhangDepth onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpFinDepth onchange=updateOpenings(); ></td>\n'+
      '</tr>\n'+
    '</table>\n'+
    '<div>\n'+
      'Window Ratio <output id=windowRatioOut class=floatright ></output>\n'+
      '<input type=range step=0.1 min=0.1 max=0.9 id=inpwindowRatio  style=max-width:300px oninput=updateOpenings(); >\n'+
    '</div>\n'+
    '<table>\n'+
      '<tr>\n'+
        '<td>window Construction Type</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><select id=selWindowType onchange=updateConstructions();></select></td>\n'+
      '</tr>\n'+
    '</table>';

    inpWwr.min = 1;
    inpWwr.max = 100;
    inpWwr.value = 40;

    inpwindowRatio.min = 0;
    inpwindowRatio.max = 1;
    inpwindowRatio.value = 0.5;

    // Note to to self this is a one off here so that the value appears next to the slider when the user first loads the page, that is all
    // as calling updateOpenings() after calling update shape interfers with the code  - re-order the code?
    windowRatioOut.value = theBuilding.windowRatio;

    inpOverhangDepth.min = 0;
    inpOverhangDepth.max = 10;
    inpOverhangDepth.value = 3;
    inpOverhangDepth.step = 0.5;

    inpFinDepth.min = 0;
    inpFinDepth.max = 10;
    inpFinDepth.value = 3;
    inpFinDepth.step = 0.5;

    noWindows.min = 1;
    noWindows.max = 10;
    noWindows.value = 4;

    selWindowType.innerHTML =
      '<option>ASHRAE 90.1 climate Zone 8</option>' +
      '<option>ASHRAE 189.1 climate zone 7</option>' +
      '<option>ASHRAE 189.1 climate zone 6</option>' +
    '';
  }
  else
  {
    document.getElementById("divEnvelope").innerHTML =
    '<h2> Envelope by Facade </h2>\n'+
    '<p><button onclick=changeWWR(); >Toogle to WWRByFacade</button></p>\n'+
    '<table>\n'+
      '<tr>\n'+
        '<td>building wwr South %</td><td>number of Windows</td><td>Overhang South Depth</td><td>Fin South Depth</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><input type=number id=inpWwrS step=5 onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=noWindowsS onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpOverhangDepthS onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpFinDepthS onchange=updateOpenings(); ></td>\n'+
      '<tr>\n'+
        '<td>building wwr North %</td><td>number of Windows</td><td>Overhang North Depth</td><td>Fin North Depth</td>\n'+
      '</tr>\n'+
        '<td><input type=number id=inpWwrN step=5 onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=noWindowsN onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpOverhangDepthN onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpFinDepthN onchange=updateOpenings(); ></td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td>building wwr East %</td><td>number of Windows</td><td>Overhang East Depth</td><td>Fin North Depth</td>\n'+
      '</tr>\n'+
        '<td><input type=number id=inpWwrE step=5 onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=noWindowsE onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpOverhangDepthE onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpFinDepthE onchange=updateOpenings(); ></td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td>building wwr West %</td><td>number of Windows</td><td>Overhang West Depth</td><td>Fin North Depth</td>\n'+
      '</tr>\n'+
        '<td><input type=number id=inpWwrW step=5 onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=noWindowsW onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpOverhangDepthW onchange=updateOpenings(); ></td>\n'+
        '<td><input type=number id=inpFinDepthW onchange=updateOpenings(); ></td>\n'+
      '</tr>\n'+
    '</table>\n'+
    '<div>\n'+
      'Window Ratio North <output id=windowRatioOutN style=max-width:300px class=floatright ></output>\n'+
      '<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioN oninput=updateOpenings(); >\n'+
    '</div>\n'+
    '<div>\n'+
      'Window Ratio East <output id=windowRatioOutE style=max-width:300px class=floatright ></output>\n'+
      '<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioE oninput=updateOpenings(); >\n'+
    '</div>\n'+
    '<div>\n'+
      'Window Ratio West <output id=windowRatioOutW style=max-width:300px class=floatright ></output>\n'+
      '<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioW oninput=updateOpenings(); >\n'+
    '</div>\n'+
    '<div>\n'+
      'Window Ratio South <output id=windowRatioOutS style=max-width:300px class=floatright ></output>\n'+
      '<input type=range step=0.1 min=0.1 max=0.9 id=windowRatioS min=0.1 max=0.9 oninput=updateOpenings(); >\n'+
    '</div>\n'+
    '<table>\n'+
      '<tr>\n'+
        '<td>windows South Construction Type</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><select id=selWindowTypeS onchange=updateConstructions();></select></td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td>windows North Construction Type</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><select id=selWindowTypeN onchange=updateConstructions();></select></td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td>windows East Construction Type</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><select id=selWindowTypeE onchange=updateConstructions();></select></td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td>windows West Construction Type</td>\n'+
      '</tr>\n'+
      '<tr>\n'+
        '<td><select id=selWindowTypeW onchange=updateConstructions();></select></td>\n'+
      '</tr>\n'+
    '</table>';

    windowRatioN.min = 0;
    windowRatioN.max = 1;
    windowRatioN.value = 0.4;

    windowRatioE.min = 0;
    windowRatioE.max = 1;
    windowRatioE.value = 0.4;

    windowRatioW.min = 0;
    windowRatioW.max = 1;
    windowRatioW.value = 0.4;

    windowRatioS.min = 0;
    windowRatioS.max = 1;
    windowRatioS.value = 0.4;

    inpWwrS.min = 1;
    inpWwrS.max = 100;
    inpWwrS.value = 40;

    inpWwrN.min = 1;
    inpWwrN.max = 100;
    inpWwrN.value = 40;

    inpWwrE.min = 1;
    inpWwrE.max = 100;
    inpWwrE.value = 40;

    inpWwrW.min = 1;
    inpWwrW.max = 100;
    inpWwrW.value = 40;

    noWindowsW.min = 1;
    noWindowsW.max = 10;
    noWindowsW.value = 2;

    noWindowsE.min = 1;
    noWindowsE.max = 10;
    noWindowsE.value = 2;

    noWindowsN.min = 1;
    noWindowsN.max = 10;
    noWindowsN.value = 2;

    noWindowsS.min = 1;
    noWindowsS.max = 10;
    noWindowsS.value = 2;

    selWindowTypeS.innerHTML =
      '<option>ASHRAE 90.1 climate Zone 8</option>' +
      '<option>ASHRAE 189.1 climate zone 7</option>' +
      '<option>ASHRAE 189.1 climate zone 6</option>' +
    '';

    selWindowTypeN.innerHTML =
      '<option>ASHRAE 90.1 climate Zone 8</option>' +
      '<option>ASHRAE 189.1 climate zone 7</option>' +
      '<option>ASHRAE 189.1 climate zone 6</option>' +
    '';

    selWindowTypeE.innerHTML =
      '<option>ASHRAE 90.1 climate Zone 8</option>' +
      '<option>ASHRAE 189.1 climate zone 7</option>' +
      '<option>ASHRAE 189.1 climate zone 6</option>' +
    '';

    selWindowTypeW.innerHTML =
      '<option>ASHRAE 90.1 climate Zone 8</option>' +
      '<option>ASHRAE 189.1 climate zone 7</option>' +
      '<option>ASHRAE 189.1 climate zone 6</option>' +
    '';
  }
}

function updateenvelopehtml()
{
  try {
    // Update the value next to the slider
    windowRatioOut.value = theBuilding.windowRatio;
  }
  catch (e) {
    // Set outputs

    windowRatioOutN.value = theBuilding.windowRatioN;

    windowRatioOutE.value = theBuilding.windowRatioE;

    windowRatioOutW.value = theBuilding.windowRatioW;

    windowRatioOutS.value = theBuilding.windowRatioS;
  }
}

function updategeometryhtml(values)
{
  inpLength.value = values.length

  inpLength.max =  values.lengthMax

  inpLength.min = values.lengthMin

  inpWidth.max = values.widthMax

  inpWidth.value = values.width

  inpWidth.min = values.widthMin

  // Update the sliders seen in the html document
  outLength.value = values.length
  outWidth.value = values.width
  outFloorArea = Math.round(buildingArea/numFloors,2)

  opacityOut.value = parseFloat(inpOpacity.value/100)

  // Display thickness
  divValidation.innerHTML =
  '<b>thickness:'+thickness+'</b><br>' +
  '<b>calcFloorArea:'+outFloorArea+'</b><br>' +
  '';

}

function initSpaceLayoutInputFields() {

  document.getElementById("divSpaceLayout").innerHTML =
  '<h2>\n'+
    'Space Layout\n'+
  '</h2>\n'+
  '<div id = "divLeftColumn" valign=top >\n'+
    '<h3>Set Space Type</h3>\n'+

  '</div>\n'+
  '<div id = "divRightColumn" style=max-width:300px; >\n'+
    '<h3>Apply to floors</h3>\n'+

    '<p><input id=inpFloorStart type=number onchange=updateTypes() > to <input id=inpFloorEnd type=number onchange=updateTypes(); ></select></p>\n'+

    '<img id=imgShape width=100% />\n'+

    '<h3>Area Usage</h3>\n'+

    '<table id=tabUsage >\n'+

    '</table>\n'+
  '</div>';

  inpFloorStart.min = 1;
  inpFloorStart.max = theBuilding.storeys;
  inpFloorStart.value = 1;

  inpFloorEnd.min = 1;
  inpFloorEnd.max = theBuilding.storeys;
  inpFloorEnd.value = theBuilding.storeys;

}
