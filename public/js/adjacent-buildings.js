/* Copyright 2017 Ladybug Tools authors. MIT License */

	function addAjacentBuildings() {

		for ( let i = 0; i < 4; i++ ) {

			const mesh = createMesh();
			mesh.name = 'building' + ( i + 1 );
			mesh.scale.set( 20, 20, 30 ); // scale is easier to deal with than geometry vertices
			mesh.position.z = mesh.scale.z * 0.5;
			mesh.visible = false;

			adjacentBuildingsGeometry.group.add(mesh)

		}
		scene.add(adjacentBuildingsGeometry.group);
	}

	function createMesh() {

		const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 ); // use scale to set size
		const material = new THREE.MeshPhongMaterial();
		const mesh = new THREE.Mesh( geometry, material );
		const edgesGeometry = new THREE.EdgesGeometry( geometry );
		const meshEdges = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
		mesh.add( meshEdges );

		return mesh;

	}



	function toggleVisibility( index ){

		const building = scene.getObjectByName( 'building' + index );

		building.visible = !building.visible;

	}



	function updateBuilding( that ) {
	// This code takes HTML inputs and updates the adjacent buildings

		const building = scene.getObjectByName( 'building' + that.id.slice( -1 ) ); // is slice needed? check this
//console.log( 'building', building, 'id', that.id );

		if ( that.id.startsWith( 'inpOffsetX' ) ) {
//console.log( 'that.value', that.value );

			building.position.x = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpOffsetY' ) ) {

			building.position.y = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpSiteOrientation' ) ) {
//console.log( 'inpSiteOrientation', that.value );

			building.rotation.z = parseInt( that.value, 10 ) * - Math.PI / 180;

		} else if ( that.id.startsWith( 'inpLength' ) ) {

			building.scale.x = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpWidth' ) ) {

			building.scale.y = parseInt( that.value, 10 );

		} else if ( that.id.startsWith( 'inpHeight' ) ) {

			building.scale.z = parseInt( that.value, 10 );
			building.position.z = building.scale.z * 0.5;

		}
	}
