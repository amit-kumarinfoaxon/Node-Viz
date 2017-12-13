

// NOTE DO NOT USE
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

    // For manual change in HTML

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
  }
}
