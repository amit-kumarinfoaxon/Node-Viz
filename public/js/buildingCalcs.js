/// Global variables

var length,width;

var widthMin,widthMax;

var lengthMin,lengthMax;

var thickness;
// Calculated floor area is only used as a check
var calculatedFloorArea;


function implementUserChange(typeUserChange,buildingShape)
{

  // Promise chaining taken from - https://javascript.info/promise-chaining
  new Promise(function(resolve,reject)
  {
  // First do all calculations
  doCalculations(resolve,reject,typeUserChange,buildingShape)
    })
  .then(function(values)
    {
      // Update global variables
      /// DO NOT delete!

      widthMax = values.widthMax

      widthMin = values.widthMin

      width = values.width

      lengthMax = values.lengthMax

      lengthMin  = values.lengthMin

      length = values.length

      return values
    })
    .then(function()
    {
      // Update building
      theBuilding.length = length

      theBuilding.width = width

      theBuilding.shape = buildingShape

      return
    })
    .then(function()
      {
        // Update the shape + display all the values
        updateDimensions()
      }
    )
  }


function doCalculations(resolve,reject,typeUserChange,buildingShape)
{ //// General method for doing calculations
  // Local variables - make it easier for naming
  let factorChange;

  let lengthLocal,widthLocal;
  let localWidthMin,localWidthMax;
  let localLengthMin,localLengthMax;
  let newfloorArea;
  let newNumOfFloors;
  let buildingArea
  let numFloors;

  function calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,numFloors)
  {


    switch (buildingShape)
    {
      case buildingShapes.Lshape:

        a = (lengthLocal+widthLocal)/2

        b = Math.sqrt(Math.pow(a,2)-floorArea)

        theBuilding.thickness = a-b

        calculatedFloorArea = ((widthLocal*theBuilding.thickness)+((lengthLocal-theBuilding.thickness)*theBuilding.thickness))*numFloors

        break;

      case buildingShapes.Hshape:

        a = (lengthLocal+2*widthLocal)/4;

        b = Math.sqrt(Math.pow(a,2)-floorArea/2);

        theBuilding.thickness = a-b;

        /// the thickness of the middle part of the H-shape is equal to thickness
        calculatedFloorArea = ((2*widthLocal*theBuilding.thickness)+(theBuilding.thickness*(lengthLocal-2*theBuilding.thickness)))*numFloors

        break;
      case buildingShapes.Tshape:

        a = (lengthLocal+widthLocal)/2

        b = Math.sqrt(Math.pow(a,2)-floorArea)

        theBuilding.thickness = a-b

        calculatedFloorArea = ((theBuilding.thickness*lengthLocal)+(theBuilding.thickness*(widthLocal-theBuilding.thickness)))*numFloors

        break;

      case buildingShapes.Boxshape:

        lengthMax = Math.sqrt(floorArea*10);

        lengthMin = Math.sqrt(floorArea/10);

        /// Length min and max????

        widthMax = floorArea/lengthLocal

        widthMin = floorArea/parseFloat(lengthLocal);

        calculatedFloorArea = widthLocal*lengthLocal*numFloors

        theBuilding.thickness = "NA"

        break;
      default:
        return reject('Building type enum does not exist!');
    }
  }

  function calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)
  {
      switch (buildingShape)
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

          theBuilding.thickness = "NA"

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
      floorArea = theBuilding.area/theBuilding.storeys

      lengthLocal = theBuilding.length

      widthLocal = theBuilding.width

      localLengthMax = lengthMax
      localLengthMin = lengthMin
      localWidthMax = widthMax
      localWidthMin = widthMin
      break;

    case userChange.buildingArea:

      newbuildingArea = theBuilding.newArea

      buildingArea = theBuilding.area

      factorChange = newbuildingArea/buildingArea

      console.log(factorChange)

      lengthLocal = Math.sqrt(factorChange)*theBuilding.length

      widthLocal = Math.sqrt(factorChange)*theBuilding.width

      newFloorArea = newbuildingArea/theBuilding.storeys
      //console.log(theBuilding.storeys)
      //console.log(newFloorArea)

      minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

      calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal)

      localLengthMax = minmax[0]
      localLengthMin = minmax[1]
      localWidthMax = minmax[2]
      localWidthMin = minmax[3]

      break;
    case userChange.numFloors:

      newNumOfFloors = theBuilding.newNumStoreys
      numFloors = theBuilding.numStoreys

      factorChange = numFloors/newNumOfFloors

      lengthLocal = Math.sqrt(factorChange)*theBuilding.length

      widthLocal = Math.sqrt(factorChange)*theBuilding.width

      newFloorArea = theBuilding.area/newNumOfFloors

      minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

      calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,newNumOfFloors)

      localLengthMax = minmax[0]
      localLengthMin = minmax[1]
      localWidthMax = minmax[2]
      localWidthMin = minmax[3]

      console.log(calculatedFloorArea)

      theBuilding.numStoreys = newNumOfFloors

      break;
    case userChange.lengthChange:
      lengthLocal = theBuilding.length

      factor = (width-widthMin)/(widthMax-widthMin)

      floorArea = theBuilding.area/theBuilding.numStoreys
      //[lengthMax,lengthMin,widthMax,widthMin]
      minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

      localLengthMax = minmax[0]
      localLengthMin = minmax[1]
      localWidthMax = minmax[2]
      localWidthMin = minmax[3]

      if (buildingShape == buildingShapes.Boxshape)
      {
        widthLocal = floorArea/lengthLocal

        calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)
      }
      else {

        widthLocal = factor*(localWidthMax-localWidthMin)+localWidthMin
      }

      // Must re-calculate thickness for length change

      calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)

      break;

    case userChange.widthChange:

      floorArea = theBuilding.area/theBuilding.storeys

      lengthLocal = theBuilding.length

      if (buildingShape == buildingShapes.Boxshape)
      {
        widthLocal = theBuilding.width
      }
      else {

        widthLocal = theBuilding.width
      }

      localLengthMax = lengthMax
      localLengthMin = lengthMin
      localWidthMax = widthMax
      localWidthMin = widthMin

      calculateThicknessArea(buildingShape,floorArea,length,widthLocal)

      break;

    case userChange.buildingShape:

        floorArea = theBuilding.area/theBuilding.storeys

        theBuilding.shape = buildingShape

        // Calculate Length and Width for each shape
        switch (buildingShape)
        {
          case buildingShapes.Lshape:

            lengthLocal = Math.sqrt(floorArea*1.8)

            widthLocal = Math.sqrt(floorArea*1.8)

            break;

          case buildingShapes.Hshape:

            lengthLocal = Math.sqrt(floorArea*(9/7))

            widthLocal = Math.sqrt(floorArea*(9/7))

            break;
          case buildingShapes.Tshape:

            lengthLocal = Math.sqrt(floorArea*1.8)

            widthLocal = Math.sqrt(floorArea*1.8)

            break;
          case buildingShapes.Boxshape:

            lengthLocal = Math.sqrt(floorArea)

            widthLocal = floorArea/lengthLocal

            break;
          default:
            return reject('Building type enum does not exist!');
        }

        minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

        calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)

        localLengthMax = minmax[0]
        localLengthMin = minmax[1]
        localWidthMax = minmax[2]
        localWidthMin = minmax[3]

    case userChange.irrevelent:
      factorChange = 1
      break;

    default:
      return reject('Type of user change doesnt exist');
  }

  return resolve({length:lengthLocal,width:widthLocal,lengthMax:localLengthMax,lengthMin:localLengthMin,widthMax:localWidthMax,widthMin:localWidthMin})
}
