
function implementUserChange(resolve,reject,typeUserChange,theBuilding)
{

  // Promise chaining taken from - https://javascript.info/promise-chaining

  // First do all calculations
  newBuilding = doCalculations(typeUserChange,theBuilding)
  // Use this for widthMax,WidthMin,LengthMax,LengthMin
  return resolve(newBuilding)

}

function doCalculations(typeUserChange,theBuilding)
{ //// General method for doing calculations
  // Local variables - make it easier for naming
  let factorChange;

  let lengthLocal,widthLocal;
  let newfloorArea;

  // Copy the building pass through
  var newBuilding = JSON.parse(JSON.stringify(theBuilding));

  function calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)
  {

    let newthickness,calculatedArea

    switch (buildingShape)
    {
      case buildingShapes.Lshape:

        a = (lengthLocal+widthLocal)/2

        b = Math.sqrt(Math.pow(a,2)-floorArea)

        newthickness = a-b

        calculatedFloorArea = ((widthLocal*newthickness)+((lengthLocal-newthickness)*newthickness))

        return [newthickness,calculatedFloorArea]

      case buildingShapes.Hshape:

        a = (lengthLocal+2*widthLocal)/4;

        b = Math.sqrt(Math.pow(a,2)-floorArea/2);

        newthickness = a-b;

        /// the thickness of the middle part of the H-shape is equal to thickness
        calculatedFloorArea = ((2*widthLocal*newthickness)+(newthickness*(lengthLocal-2*newthickness)))

        return [newthickness,calculatedFloorArea]

        break;
      case buildingShapes.Tshape:

        a = (lengthLocal+widthLocal)/2

        b = Math.sqrt(Math.pow(a,2)-floorArea)

        newthickness = a-b

        calculatedFloorArea = ((newthickness*lengthLocal)+(newthickness*(widthLocal-newthickness)))

        return [newthickness,calculatedFloorArea]

        break;

      case buildingShapes.Boxshape:

        lengthMax = Math.sqrt(floorArea*10);

        lengthMin = Math.sqrt(floorArea/10);

        /// Length min and max????

        widthMax = floorArea/lengthLocal

        widthMin = floorArea/parseFloat(lengthLocal);

        calculatedFloorArea = widthLocal*lengthLocal

        newthickness = "NA"

        return [newthickness,calculatedFloorArea]

        break;
      default:
        return reject('Building type enum does not exist!');
    }
  }

  function calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)
  {
      switch (newBuilding.shape)
      {
        case buildingShapes.Lshape:

          // create factor change on the length
          /// Length is x
          lengthMax = 2*Math.sqrt(floorArea*1.8);

          lengthMin = 2/3*Math.sqrt(floorArea*1.8);

          /// Width is y
          widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

          widthMin = floorArea/parseFloat(lengthLocal)+0.05*parseFloat(lengthLocal);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;

        case buildingShapes.Hshape:

          lengthMax = 2*Math.sqrt(floorArea*(9/7));

          lengthMin = 2/3*Math.sqrt(floorArea*(9/7));

          widthMax =  5*(floorArea/parseFloat(lengthLocal))-0.4*parseFloat(lengthLocal);

          widthMin = floorArea/parseFloat(lengthLocal)+0.1*parseFloat(lengthLocal);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;
        case buildingShapes.Tshape:

          lengthMax = 2*Math.sqrt(floorArea*1.8);

          lengthMin = 2/3*Math.sqrt(floorArea*1.8);

          widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

          widthMin = floorArea/parseFloat(lengthLocal)+0.05*parseFloat(lengthLocal);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;
        case buildingShapes.Boxshape:

          lengthMax = Math.sqrt(floorArea*10);

          lengthMin = Math.sqrt(floorArea/10);

          /// Length min and max????

          widthMax = Math.sqrt(floorArea*10);

          widthMin = Math.sqrt(floorArea/10);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;
        default:
          return reject('Building type enum does not exist!');
      }
    }

  switch (typeUserChange)
  {
    case userChange.openings:
      /// Changes like permieter depth, all envelope changes, orientation changes

      break;

    case userChange.buildingArea:

      factorChange = newBuilding.newArea/newBuilding.area

      // Re-calculate lengths

      newBuilding.length = Math.sqrt(factorChange)*newBuilding.length

      newBuilding.width = Math.sqrt(factorChange)*newBuilding.width

      newFloorArea = newBuilding.area/newBuilding.numStoreys

      newThicknessCalcArea = calculateThicknessArea(newBuilding.shape,newFloorArea,newBuilding.length,newBuilding.width)

      // The new calculated thickness - update building thickness
      newBuilding.thickness = newThicknessCalcArea[0]

      // Calculated area is just for checking
      calculatedFloorArea = newThicknessCalcArea[1]

      // These are min and max values
      minmax = calculateMinMax(newBuilding.shape,newBuilding.newArea,newBuilding.length,newBuilding.width)

      newBuilding.LengthMax = minmax[0]
      newBuilding.LengthMin = minmax[1]
      newBuilding.WidthMax = minmax[2]
      newBuilding.WidthMin = minmax[3]

      // *** Update the new building area ***
      newBuilding.area = newBuilding.newArea

      break;
    case userChange.numFloors:

      factorChange = newBuilding.numStoreys/newBuilding.newNumStoreys

      newBuilding.length = Math.sqrt(factorChange)*newBuilding.length

      newBuilding.width = Math.sqrt(factorChange)*newBuilding.width

      newFloorArea = newBuilding.area/newBuilding.newNumStoreys

      newThicknessCalcArea = calculateThicknessArea(newBuilding.shape,newFloorArea,newBuilding.length,newBuilding.width)

      newBuilding.thickness = newthickness = newThicknessCalcArea[0]

      calculatedFloorArea = newThicknessCalcArea[1]

      calculatedArea = calculatedFloorArea*newBuilding.newNumStoreys

      minmax = calculateMinMax(newBuilding.shape,newFloorArea,lengthLocal,widthLocal)

      newBuilding.LengthMax = minmax[0]
      newBuilding.LengthMin = minmax[1]
      newBuilding.WidthMax = minmax[2]
      newBuilding.WidthMin = minmax[3]

      /// After updating dimensions change the building number of storeys

      newBuilding.numStoreys = newBuilding.newNumStoreys

      break;
    case userChange.lengthChange:

      factor = (newBuilding.width-newBuilding.widthMin)/(newBuilding.widthMax-newBuilding.widthMin)

      floorArea = newBuilding.area/newBuilding.numStoreys
      //[lengthMax,lengthMin,widthMax,widthMin]
      minmax = calculateMinMax(newBuilding.shape,floorArea,newBuilding.length,newBuilding.width)

      newBuilding.LengthMax = minmax[0]
      newBuilding.LengthMin = minmax[1]
      newBuilding.WidthMax = minmax[2]
      newBuilding.WidthMin = minmax[3]

      if (newBuilding.shape == buildingShapes.Boxshape)
      {
        newWidth = floorArea/newBuilding.length

        newBuilding.width = newWidth

        newThicknessCalcArea = calculateThicknessArea(newBuilding.shape,floorArea,newBuilding.length,newWidth)

        newBuilding.thickness = newThicknessCalcArea[0]

        calculatedFloorArea = newThicknessCalcArea[1]
      }
      else {

        newBuilding.width = factor*(newBuilding.WidthMax-newBuilding.WidthMin)+newBuilding.WidthMin
      }

      // Must re-calculate thickness for length change

      newThicknessCalcArea = calculateThicknessArea(newBuilding.shape,floorArea,newBuilding.length,newBuilding.width)

      newBuilding.thickness = newThicknessCalcArea[0]

      calculatedFloorArea = newThicknessCalcArea[1]

      calculatedArea = calculatedFloorArea*newBuilding.numStoreys

      break;

    case userChange.widthChange:
      // Need to prevent width change for Box-shape
      floorArea = newBuilding.area/newBuilding.numStoreys

      minmax = calculateMinMax(newBuilding.shape,floorArea,newBuilding.length,newBuilding.width)

      newBuilding.LengthMax = minmax[0]
      newBuilding.LengthMin = minmax[1]
      newBuilding.WidthMax = minmax[2]
      newBuilding.WidthMin = minmax[3]

      newThicknessCalcArea = calculateThicknessArea(newBuilding.shape,floorArea,newBuilding.length,newBuilding.width)

      newBuilding.thickness = newThicknessCalcArea[0]

      calculatedFloorArea = newThicknessCalcArea[1]

      calculatedArea = calculatedFloorArea*newBuilding.numStoreys

      break;

    case userChange.buildingShape:

        floorArea = newBuilding.area/newBuilding.numStoreys

        // Calculate Length and Width for each shape
        switch (newBuilding.shape)
        {
          case buildingShapes.Lshape:

            newBuilding.length = Math.sqrt(floorArea*1.8)

            newBuilding.width = Math.sqrt(floorArea*1.8)

            break;

          case buildingShapes.Hshape:

            newBuilding.length = Math.sqrt(floorArea*(9/7))

            newBuilding.width = Math.sqrt(floorArea*(9/7))

            break;
          case buildingShapes.Tshape:

            newBuilding.length = Math.sqrt(floorArea*1.8)

            newBuilding.width = Math.sqrt(floorArea*1.8)

            break;
          case buildingShapes.Boxshape:

            newBuilding.length = Math.sqrt(floorArea)

            newBuilding.width = floorArea/newBuilding.length

            break;
          default:
            throw 'Building type enum does not exist!'        }

        minmax = calculateMinMax(newBuilding.shape,floorArea,newBuilding.length,newBuilding.width)

        newBuilding.LengthMax = minmax[0]
        newBuilding.LengthMin = minmax[1]
        newBuilding.WidthMax = minmax[2]
        newBuilding.WidthMin = minmax[3]

        newThicknessCalcArea = calculateThicknessArea(newBuilding.shape,floorArea,newBuilding.length,newBuilding.width)

        newBuilding.thickness = newThicknessCalcArea[0]

        calculatedFloorArea = newThicknessCalcArea[1]

        calculatedArea = calculatedFloorArea*newBuilding.numStoreys

    case userChange.irrevelent:
      factorChange = 1
      break;

    default:
      return reject('Type of user change doesnt exist');
  }

  console.log("Calculated area is ")
  console.log(newBuilding)

  return newBuilding
}
