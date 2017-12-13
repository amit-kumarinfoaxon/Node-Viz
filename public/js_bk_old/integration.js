

function makeChangeLocally(that = null)
{
  if (that == null)
  {
    //TODO you must add the same propertys to the dataToPass object, then
    // call the function passData(dataToPass) - this should work

    // Initializing function - with defaults
    dataToPass.toogleSpaceLayout = true;

    dataToPass.wwrByBuilding = true;

    dataToPass.changeType = userChange.lengthChange;
    // For shape use buildingShapes.Boxshape, buildingShapes.Tshape,buildingShapes.Hshape or buildingShapes.Lshape
    dataToPass.shape = buildingShapes.Boxshape;
    dataToPass.area = 10000;
    dataToPass.length = 100;
    dataToPass.width = 100;
    dataToPass.storeys = 1;
    dataToPass.storeyHeight = 3;
    dataToPass.orientation = 0;
    dataToPass.perimeterDepth = 3;

    dataToPass.opacity = 1;

    dataToPass.wwr = 0.5;
    dataToPass.windowRatio = 0.5;
    dataToPass.overHangDepth = 3;
    dataToPass.finDepth =  3;
    dataToPass.noWindows = 4;

    dataToPass.wwrN = 0.5;
    dataToPass.windowRatioN = 0.5;
    dataToPass.overHangDepthN = 3;
    dataToPass.finDepthN =  3;
    dataToPass.noWindowsN = 4;

    dataToPass.wwrE = 0.5;
    dataToPass.windowRatioE = 0.5
    dataToPass.overHangDepthE = 3;
    dataToPass.finDepthE =  3;
    dataToPass.noWindowsE = 4;

    dataToPass.wwrW = 0.5;
    dataToPass.windowRatioW = 0.5
    dataToPass.overHangDepthW = 3;
    dataToPass.finDepthW =  3;
    dataToPass.noWindowsW = 4;

    dataToPass.wwrS = 0.5;
    dataToPass.windowRatioS = 0.5
    dataToPass.overHangDepthS = 3;
    dataToPass.finDepthS =  3;
    dataToPass.noWindowsS = 4;

    // Assign global variabless
    buildingArea = dataToPass.area
    numFloors = dataToPass.storeys

    passData(dataToPass)
  }
  else {

    // For manual change in HTML;
    console.log("else data ")
    console.log("changeFloorData "+that.changeFloorData)
    if (that.id === "inpArea")
    {
      dataToPass.changeType = userChange.buildingArea;
    }
    else if (that.id === "inpFloors")
    {
      dataToPass.changeType = userChange.numFloors;
    }
    else if (that.id === "inpHeight")
    {
      dataToPass.changeType = userChange.lengthChange;
    }
    else if (that.id === "selShape")
    {
      dataToPass.changeType = userChange.buildingShape;
    }
    else if (that.id === "inpPerimeterDepth")
    {
      dataToPass.changeType = userChange.lengthChange;
    }
    else if (that.id === "inpOrientation")
    {
      dataToPass.changeType = userChange.lengthChange;
    }
    else if (that.id === "inpLength")
    {
      dataToPass.changeType = userChange.lengthChange;
    }
    else if (that.id === "inpWidth")
    {
      dataToPass.changeType = userChange.widthChange;
    }
    else if (that.id === "inpOpacity")
    {
      dataToPass.changeType = userChange.lengthChange;
    }
    else
    {
      dataToPass.changeType = userChange.openings;
    }
     
     if(that.changeFloorData !='undefined '){
            console.log("changeFloorData" + that.changeFloorData )
            dataToPass.changeType=userChange.numFloors;
            dataToPass.shape = 0;
    



    // // NOTE you must bind inpOrientation.value to building orientation
    // theBuilding.orientation = parseInt( inpOrientation.value, 10 );
    // // NOTE you must bind  inpWidth.value to building width
    // theBuilding.perimeterDepth = parseInt( inpPerimeterDepth.value, 10 );
    // // NOTE you must bind  inpWidth.value to building width
    // theBuilding.height = parseInt( inpHeight.value, 10 );
    // // NOTE you must bind  inpWidth.value to building width
    // theBuilding.opacity = parseInt( inpOpacity.value, 10 ) / 100;
    //

    // dataToPass.toogleSpaceLayout = true;
    // dataToPass.shape = selShape.value;
    // dataToPass.area = inpArea.value;
    // dataToPass.length  = inpLength.value;
    // dataToPass.width = inpWidth.value;
    // dataToPass.storeys = inpFloors.value
    // dataToPass.storeyHeight = inpHeight.value
    // dataToPass.orientation = inpOrientation.value
    // dataToPass.perimeterDepth = inpPerimeterDepth.value
    //
    // dataToPass.wwrByBuilding = true
    //
    // dataToPass.wwr = 0.5;
    // dataToPass.windowRatio = 0.5
    // dataToPass.overHangDepth = 3;
    // dataToPass.finDepth =  3;
    // dataToPass.noWindows = 4;
    //
    // dataToPass.wwrN = 0.5;
    // dataToPass.windowRatioN = 0.5
    // dataToPass.overHangDepthN = 3;
    // dataToPass.finDepthN =  3;
    // dataToPass.noWindowsN = 4;
    //
    // dataToPass.wwrE = 0.5;
    // dataToPass.windowRatioE = 0.5
    // dataToPass.overHangDepthE = 3;
    // dataToPass.finDepthE =  3;
    // dataToPass.noWindowsE = 4;
    //
    // dataToPass.wwrW = 0.5;
    // dataToPass.windowRatioW = 0.5
    // dataToPass.overHangDepthW = 3;
    // dataToPass.finDepthW =  3;
    // dataToPass.noWindowsW = 4;
    //
    // dataToPass.wwrS = 0.5;
    // dataToPass.windowRatioS = 0.5
    // dataToPass.overHangDepthS = 3;
    // dataToPass.finDepthS =  3;
    // dataToPass.noWindowsS = 4;
    //
    // // Assign global variabless
    // buildingArea = dataToPass.area
    // numFloors = dataToPass.storeys
    //
     passData(dataToPass)
   }
  }
}

function passData(dataToPass)
{
  console.log("data Received ");
  console.log(dataToPass);
  buildingArea=3000;
  numFloors=4;
  theBuilding.orientation = dataToPass.orientation;

  theBuilding.perimeterDepth = dataToPass.perimeterDepth;

  theBuilding.height = dataToPass.storeyHeight;

  theBuilding.opacity = dataToPass.opacity;
  // Envelope
  theBuilding.wwrByBuilding = dataToPass.wwrByBuilding

  theBuilding.wwr = dataToPass.wwr;
  theBuilding.noWindows = dataToPass.noWindows;
  theBuilding.windowRatio = dataToPass.windowRatio;
  theBuilding.overHangDepth = dataToPass.overHangDepth;

  theBuilding.finDepth = dataToPass.finDepth;

  switch (dataToPass.changeType)
  {
    case 0:
      // buildingArea
      // Initialize the building as an object

      implementUserChange(userChange.buildingArea,dataToPass.shape)
      break;
    case 1:
      //numFloors
      // Initialize the building as an object

      implementUserChange(userChange.numFloors,dataToPass.shape)

      break;
    case 2:
      // lengthChange
      // Initialize the building as an object
      implementUserChange(userChange.lengthChange,dataToPass.shape)

      break;

    case 3:
      // widthChange

      // Initialize the building as an object
      implementUserChange(userChange.widthChange,dataToPass.shape)

      break;
    case 4:

      // Initialize the building as an object
      // buildingShape
      implementUserChange(userChange.buildingShape,dataToPass.shape)

      break;

    case 5:

      // Initialize the building as an object
      // perimeterDepth
      implementUserChange(userChange.perimeterDepth,dataToPass.shape)

      break;
    case 6:

      // openings
      implementUserChange(userChange.openings,dataToPass.shape)

      break;
  }

}
