/* Copyright 2017 Ladybug Tools authors. MIT License */

	var dictonarySpaceAreas = [];

	function onToogleSpaceLayout()
	{

		// Calculate the zone area and return them
		// Put text tags on each zone
		// Don't rotate the building or the N,S,E,W but rotate the axis

		divEnvelope.style.display = 'none';

		divAdjacentBuildings.style.display = 'none';

		divGeometry.style.display = 'none';

		divSpaceLayout.style.display = 'block';

		threejsOrtho.style.display = 'block';

		threejsPerspective.style.display = 'none';
		// HTML
		initSpaceLayoutInputFields();

		switchToSpaceLayout();

		spaceLayout.group = new THREE.Group();

		spaceLayout.group.name = "spaceLayoutBuilding";

		// Copy the qLine group to the SpaceLayout Group
		// But remove the exterior roof of the SpaceLayout Group

		function createSpaceLayoutInScene()
		{
				scene.children.forEach( function( node ) {

					if ((node instanceof THREE.Group) && (node.name == "theBuilding" ))
					{

						node.children.forEach(function(child){

							if (child.name=="storey-0")
							{
								child.visible = true;

								child.children.forEach(function(surface){
									// For a box expect to see
									// interior-floor-storey-0
									// floor-1-storey-0
									// floor-2-storey-0
									// floor-3-storey-0
									// floor-4-storey-0
									if (surface.name.includes("floor"))
									{
										if (surface.name.includes("interior"))
										{ /// Its the interior floor
											// the zone number is zero
											zoneNumber = 0;

											zoneName = 'zone'+zoneNumber.toString();

											calculateSurfaceArea(surface);

											dictonarySpaceAreas.push({zoneName:calculateSurfaceArea(surface)});
										}
										else
										{ // get the zone number from the surfaceName
											zoneNumber = surface.name.split("-")[1].split("-")[0]
											zoneName = 'zone'+zoneNumber.toString()

											dictonarySpaceAreas.push({zoneName:calculateSurfaceArea(surface)})

										}

										// You must clone the surface otherwise it literally moves objects between the groups!
										copiedSurface = surface.clone();
										spaceLayout.group.add(copiedSurface);
									}
								});
								// Set the postion to be the same as the Geometry and Envelope Geometry
								spaceLayout.group.position.x = child.position.x;
								spaceLayout.group.position.y = child.position.y;
								spaceLayout.group.position.z = child.position.z;

								drawspacelayoutText();

							}
						});
					}

				function drawspacelayoutText()
				{
					spaceLayout.group.children.forEach(function(surface)
					{
						if (surface.name.includes("floor"))
						{
							surface.geometry.computeBoundingBox();

							// Computers count fron zero - Architects don't
							let zoneNumber = surface.userData.zone+1

							var centroid = new THREE.Vector3();
							centroid.addVectors( surface.geometry.boundingBox.min, surface.geometry.boundingBox.max );
							centroid.multiplyScalar(0.5);

							if (theBuilding.shape === buildingShapes.Lshape)
							{
								// With the L-shape the zone label for the interior zone must be moveed
								if (surface.userData.floorNum === 0)
								{
									// The interior floor is always number 0
									draw2Dtext("zone"+zoneNumber,(buildingArea/numFloors)/(1000*1.75),centroid.x-(centroid.x*0.6),centroid.y-(centroid.y*0.6),qLine.height,spaceLayout.group);
								}
								else
								{
									draw2Dtext("zone"+zoneNumber,(buildingArea/numFloors)/(1000*1.75),centroid.x,centroid.y,qLine.height,spaceLayout.group);
								}

							}
							else if (theBuilding.shape === buildingShapes.Tshape)
							{
								// H-shape has lots of zones ensure extra scalling down of zones to make sure that tehy fit
								draw2Dtext("zone"+zoneNumber,(buildingArea/numFloors)/(1000*1.75),centroid.x,centroid.y,qLine.height,spaceLayout.group);
							}
							else if (theBuilding.shape === buildingShapes.Hshape)
							{
								// H-shape has lots of zones ensure extra scalling down of zones to make sure that tehy fit
								draw2Dtext("zone"+zoneNumber,(buildingArea/numFloors)/(1000*1.75),centroid.x,centroid.y,qLine.height,spaceLayout.group);
							}
							else {
								draw2Dtext("zone"+zoneNumber,(buildingArea/numFloors)/1000,centroid.x,centroid.y,qLine.height,spaceLayout.group);
							}
						}
					});
				}

			});

		};

		createSpaceLayoutInScene();

		scene.add(spaceLayout.group);

		function switchToSpaceLayout()
		{
			adjacentBuildingsGeometry.group.visible = false;
			qLine.group.visible = false;
		}
	}

	function onShapeChangeUpdateLayout(){

		// inpFloorStart.max = theBuilding.storeys;
		// inpFloorEnd.max = theBuilding.storeys;
		//
		//
		// const options = addSpaceTypeOptions();
		// const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];
		// let txt = '';
		//
		// for ( let i = 0; i < zonesInShape; i++ ) {
		//
		// 	txt += '<p>Zone: ' + ( i + 1 ) + ' <select id=inpZone' + i + ' onchange=updateZones(); >' + options + '</select></p>';
		//
		// }
		//
		// divZones.innerHTML = txt;
		//
		// theBuilding.floorZones = [];
		//
		// for ( let i = 0; i < theBuilding.storeys; i++ ) {
		//
		// 	const zones = [];
		//
		// 	for ( let j = 0; j < zonesInShape[ selShape.selectedIndex ]; j++ ) {
		//
		// 		zone = document.getElementById( 'inpZone' + j );
		// 		zones.push( zone.value );
		//
		// 	}
		//
		// 	theBuilding.floorZones.push( zones );
		//
		// }
		//
		// //console.log( 'theBuilding', theBuilding );
		// updateZones();

	}

	function updateTypes() {

		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];

		for ( var i = 0; i < zonesInShape; i++ ) {

//			zone = document.getElementById( 'inpZone' + i );
//			zone.selectedIndex = 0;

		}

	}

	function addSpaceTypeOptions() {

		const optionTypes = [
			'Office-Open Office',
			'Office-Private Office',
			'Office-Storage',
			'Office-Conference',
			'Hospital-Lab',
			'Hospital-Private Office',
			'Hospital-Open Office',
			'Hospital-Storage',
			'Hospital-Conference',
			'Retail-Retail',
			'Retail-Storage'
		];

		let options = '';

		for ( let option of optionTypes ) {

			options += '<option>' + option + '</option>';

		}

		return options;

	}

	function updateZones() {

		const zonesInShape = zonesPerShapes[ selShape.selectedIndex ];
		const zones = zonesInShape * theBuilding.storeys;

		for ( let i = inpFloorStart.value - 1; i <= inpFloorEnd.value - 1; i++ ) {

			const floor = theBuilding.floorZones[ i ];

			for ( let j = 0; j < zonesInShape; j++ ) {

				const zone = document.getElementById( 'inpZone' + j );
				floor[ j ] = zone.value;

			}

		}

//console.log( 'theBuilding.floorZones', theBuilding.floorZones );

		const types = [];
		const counts = [];

		for ( let i = 0; i < theBuilding.storeys; i++ ) {

			const floor = theBuilding.floorZones[ i ];

			for ( let j = 0; j < zonesInShape; j++ ) {

				const zone = floor[ j ];

				if ( !types.includes( zone ) ) {

					types.push( zone );
					counts.push( 0 );

				};

				counts[ types.indexOf( zone ) ] ++;

			}

		}

		//console.log( 'types', types );
		//console.log( 'counts', counts );

		let txt = '';

		for ( var i = 0; i < types.length; i++ ) {

			txt += '<tr><td>' + types[ i ] + '</td><td>' + ( 100 * counts[ i ] / zones ).toFixed() + '%</td></tr>';

		}

		tabUsage.innerHTML = txt;

	}
