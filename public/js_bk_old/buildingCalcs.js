
// Functions for calculating building geometry dimensions



function changeBuildingShape(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
{

  // Strangely in slider the values are stored as strings we need to make sure that they are parsed as numbers before used
  implementUserChange(userChange.buildingShape,buildingShape)

}

function changeNumFloors(buildingShape = 3)
{
   console.log("value "+selShape.value);

   implementUserChange(userChange.buildingShape,buildingShape)
}

function changeBuildingArea(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
{
  implementUserChange(userChange.buildingArea,buildingShape)
}

function changeLengthSlider(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
{
  implementUserChange(userChange.lengthChange,buildingShape)
}

function changeWidthSlider(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
{

  implementUserChange(userChange.widthChange,buildingShape)
}

function changeOpenings(buildingShape = stringOfBuildingShapeToBuildingShapeEnum(selShape.value))
{
  implementUserChange(userChange.openings,buildingShape)
}

function implementUserChange(typeUserChange,buildingShape)
{

    console.log("-buildingShape "+buildingShape);
    console.log("typeUserChange  "+typeUserChange)
  // Promise chaining taken from - https://javascript.info/promise-chaining
  new Promise(function(resolve,reject)
  {
  // First do all calculations
  doCalculations(resolve,reject,typeUserChange,buildingShape)
    })
  .then(function(values)
    {
          console.log(values)
      /// Update text on sliders
      // updateTextInput(values.length,"lengthSlider")
      // updateTextInput(values.width,'widthSlider')
      //Update stored values and slider values

      inpWidth.max = values.widthMax
      widthMax = values.widthMax

      inpWidth.min = values.widthMin
      widthMin = values.widthMin

      inpWidth.value = values.width
      width = values.width

      inpLength.max =  values.lengthMax
      lengthMax = values.lengthMax

      inpLength.min = values.lengthMin
      lengthMin  = values.lengthMin

      inpLength.value = values.length
      length = values.length
    
      return values
    })
    .then(function(values)
      {
        // Update the shape + display all the values
        updateDimensions(values)
      }
    )
  }


function doCalculations(resolve,reject,typeUserChange,buildingShape)
{ //// General method for doing calculations

  let factorChange;

  let lengthLocal,widthLocal;
  let localWidthMin,localWidthMax;
  let localLengthMin,localLengthMax;
  let newfloorArea;
  let newNumOfFloors;

  function calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal)
  {
    switch (buildingShape)
    {
      case buildingShapes.Lshape:

        a = (lengthLocal+widthLocal)/2

        b = Math.sqrt(Math.pow(a,2)-floorArea)

        thickness = a-b

        calculatedFloorArea = (widthLocal*thickness)+((lengthLocal-thickness)*thickness)

        break;

      case buildingShapes.Hshape:

        a = (lengthLocal+2*widthLocal)/4;

        b = Math.sqrt(Math.pow(a,2)-floorArea/2);

        thickness = a-b;

        /// the thickness of the middle part of the H-shape is equal to thickness
        calculatedFloorArea = (2*widthLocal*thickness)+(thickness*(lengthLocal-2*thickness))

        break;
      case buildingShapes.Tshape:

        a = (lengthLocal+widthLocal)/2

        b = Math.sqrt(Math.pow(a,2)-floorArea)

        thickness = a-b

        calculatedFloorArea = (thickness*lengthLocal)+(thickness*(widthLocal-thickness))

        break;

      case buildingShapes.Boxshape:

        lengthMax = Math.sqrt(floorArea*10);

        lengthMin = Math.sqrt(floorArea/10);

        /// Length min and max????

        widthMax = floorArea/lengthLocal

        widthMin = floorArea/parseFloat(lengthLocal);

        calculatedFloorArea = widthLocal*lengthLocal

        thickness = "NA"

        break;
      default:
        return reject('Building type enum does not exist!');
    }
  }

  function calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)
  {
        console.log("calculateThicknessArea"+buildingShapes.Lshape);
        console.log("calculateThicknessArea"+buildingShape);
      switch (buildingShape)
      {
        case buildingShapes.Lshape:

          // create factor change on the length
          /// Length is x
          lengthMax = 2*Math.sqrt(floorArea*1.8);

          lengthMin = 2/3*Math.sqrt(floorArea*1.8);

          /// Width is y
          widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

          widthMin = floorArea/parseFloat(lengthLocal);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;

        case buildingShapes.Hshape:

          lengthMax = 2*Math.sqrt(floorArea*(9/7));

          lengthMin = 2/3*Math.sqrt(floorArea*(9/7));

          widthMax =  5*(floorArea/parseFloat(lengthLocal))-0.4*parseFloat(lengthLocal);

          widthMin = floorArea/parseFloat(lengthLocal);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;
        case buildingShapes.Tshape:

          lengthMax = 2*Math.sqrt(floorArea*1.8);

          lengthMin = 2/3*Math.sqrt(floorArea*1.8);

          widthMax =  10*(floorArea/parseFloat(lengthLocal))-0.9*parseFloat(lengthLocal);

          widthMin = floorArea/parseFloat(lengthLocal);

          return [lengthMax,lengthMin,widthMax,widthMin]

          break;
        case buildingShapes.Boxshape:

          lengthMax = Math.sqrt(floorArea*10);

          lengthMin = Math.sqrt(floorArea/10);

          /// Length min and max????

          widthMax = Math.sqrt(floorArea*10);

          widthMin = Math.sqrt(floorArea/10);

          thickness = "NA"

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
      floorArea = buildingArea/numFloors

      lengthLocal = length

      widthLocal = width

      localLengthMax = lengthMax
      localLengthMin = lengthMin
      localWidthMax = widthMax
      localWidthMin = widthMin
      break;

    case userChange.buildingArea:

      // Calculate new floor area
      newbuildingArea = parseFloat(inpArea.value)
      console.log("userChange.buildingArea"+newbuildingArea + "area"+buildingArea);

       factorChange = newbuildingArea/buildingArea
       console.log("factorChange ->"+factorChange)

      lengthLocal = Math.sqrt(factorChange)*length

      widthLocal = Math.sqrt(factorChange)*width

      newFloorArea = newbuildingArea/numFloors

      minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

      calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,thickness)

      localLengthMax = minmax[0]
      localLengthMin = minmax[1]
      localWidthMax = minmax[2]
      localWidthMin = minmax[3]

      // Update building area for future
      buildingArea = newbuildingArea

      break;
    case userChange.numFloors:

      newNumOfFloors = parseFloat(inpFloors.value)

      factorChange = numFloors/newNumOfFloors

      lengthLocal = Math.sqrt(factorChange)*length

      widthLocal = Math.sqrt(factorChange)*width

      newFloorArea = buildingArea/newNumOfFloors

      minmax = calculateMinMax(buildingShape,newFloorArea,lengthLocal,widthLocal)

      calculateThicknessArea(buildingShape,newFloorArea,lengthLocal,widthLocal,thickness)

      localLengthMax = minmax[0]
      localLengthMin = minmax[1]
      localWidthMax = minmax[2]
      localWidthMin = minmax[3]

      // Update building area for future
      numFloors = newNumOfFloors

      break;
    case userChange.lengthChange:

      lengthLocal = parseFloat(inpLength.value)

      factor = (width-widthMin)/(widthMax-widthMin)

      floorArea = buildingArea/numFloors
      //[lengthMax,lengthMin,widthMax,widthMin]
      minmax = calculateMinMax(buildingShape,floorArea,lengthLocal,widthLocal)

      localLengthMax = minmax[0]
      localLengthMin = minmax[1]
      localWidthMax = minmax[2]
      localWidthMin = minmax[3]

      if (buildingShape == buildingShapes.Boxshape)
      {
        widthLocal = floorArea/lengthLocal

        calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,thickness)
      }
      else {
        widthLocal = factor*(localWidthMax-localWidthMin)+localWidthMin
      }

      // Must re-calculate thickness for length change

      calculateThicknessArea(buildingShape,floorArea,lengthLocal,widthLocal,thickness)

      break;

    case userChange.widthChange:

      floorArea = buildingArea/numFloors

      lengthLocal = length

      if (buildingShape == buildingShapes.Boxshape)
      {
        widthLocal = width
      }
      else {
        widthLocal = parseFloat(inpWidth.value)
      }

      localLengthMax = lengthMax
      localLengthMin = lengthMin
      localWidthMax = widthMax
      localWidthMin = widthMin

      calculateThicknessArea(buildingShape,floorArea,length,widthLocal)

      break;

    case userChange.buildingShape:

        floorArea = buildingArea/numFloors

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
