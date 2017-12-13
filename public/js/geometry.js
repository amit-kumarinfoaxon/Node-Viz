/* Copyright 2017 Ladybug Tools authors. MIT License */

	function initGeometry(){

		// // Initialize the building as an object
		// theBuilding.area = 10000;
		// theBuilding.storeys = 1;
		// theBuilding.orientation = 0;
		// theBuilding.perimeterDepth = 5;
		// // Assign envelope values

		theBuilding.wwr = 0.5;
		theBuilding.windowRatio = 0.5;
		theBuilding.overHangDepth = 3;
		theBuilding.finDepth = 3;
		theBuilding.noWindows = 4;

		// Assign global variabless
		buildingArea = 10000;
		numFloors = 1;

		// Add the default building
		implementUserChange(userChange.buildingShape,stringOfBuildingShapeToBuildingShapeEnum("Box-Shape"))
		//console.log(qLine.group)
	}
