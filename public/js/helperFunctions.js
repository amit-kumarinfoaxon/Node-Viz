
const buildingShapes =
{
  "Lshape":0,
  "Hshape":1,
  "Tshape":2,
  "Boxshape":3
};

const userChange =
{
  "buildingArea":0,
  "numFloors":1,
  "lengthChange":2,
  "widthChange":3,
  "buildingShape":4,
  "perimeterDepth":5,
  "openings":6,
  "irrevelent":7
};

/// Helper functions

function stringOfBuildingShapeToBuildingShapeEnum(selectedShapeType){

  if (selectedShapeType === "L-Shape")
  {
    return buildingShapes.Lshape
  }
  else if (selectedShapeType === "H-Shape")
  {
    return buildingShapes.Hshape
  }
  else if (selectedShapeType === "T-Shape")
  {
    return buildingShapes.Tshape
  }
  else if (selectedShapeType === "Box-Shape")
  {
    return buildingShapes.Boxshape
  }
  else {
    throw new Error('Cannot convert string '+selectedShapeType+ ' to building shape enum!!')
  }
}

function calculateSurfaceArea(surface)
{
  var floor = scene.getObjectByName(surface.name);
  var pts = floor.geometry.attributes.position.array;
  var shape = [];

  for(var i = 0; i < pts.length / 3; i ++)
  {
      shape.push({x : pts[i * 3], y : pts[i * 3 + 1]});
  }

  var area = THREE.ShapeUtils.area(shape) * (-1);

  return area
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
  ctx.stroke();
}

function makeTextSprite( message, parameters )
{
  if ( parameters === undefined ) parameters = {};

  var fontface = parameters.hasOwnProperty("fontface") ?
    parameters["fontface"] : "Arial";

  var fontsize = parameters.hasOwnProperty("fontsize") ?
    parameters["fontsize"] : 18;

  var borderThickness = parameters.hasOwnProperty("borderThickness") ?
    parameters["borderThickness"] : 4;

  var borderColor = parameters.hasOwnProperty("borderColor") ?
    parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

  var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
    parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
  //var spriteAlignment = parameters.hasOwnProperty("alignment") ?
  //	parameters["alignment"] : THREE.SpriteAlignment.topLeft;

  //var spriteAlignment = THREE.SpriteAlignment.topLeft;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px " + fontface;

  // get size data (height depends only on font size)
  var metrics = context.measureText( message );
  var textWidth = metrics.width;

  // background color
  context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                  + backgroundColor.b + "," + backgroundColor.a + ")";
  // border color
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                  + borderColor.b + "," + borderColor.a + ")";
  context.lineWidth = borderThickness;
  roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
  // 1.4 is extra height factor for text below baseline: g,j,p,q.

  // text color
  context.fillStyle = "rgba(0, 0, 0, 1.0)";
  context.fillText( message, borderThickness, fontsize + borderThickness);

  // canvas contents will be used for a texture
  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial(
    { map: texture,useScreenCoordinates: false, } );

  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(100,50,1.0);
  return sprite;
}

function makeGridAxis(rotation = 0)
{

    scene.remove(gridHelper)

    var axis = scene.getObjectByName("axis");
    scene.remove( axis );

    var sceneBbox = null;

    var theBuildingbbox = getCompoundBoundingBox(qLine.group);

    var adjacentBuildingsbbox = getCompoundBoundingBox(adjacentBuildingsGeometry.group);
    //
    // sceneBbox = theBuildingbbox;
    // // The bounding box of the buildings and adjacent buildings
    //
    // sceneBbox = sceneBbox.union(adjacentBuildingsbbox);

    // let gridSize
    //
    // if (sceneBbox.max.x-sceneBbox.min.x > sceneBbox.max.y-sceneBbox.min.y)
    // {
    //   gridSize = sceneBbox.max.x-sceneBbox.min.x
    // }
    // else
    // {
    //   gridSize = sceneBbox.max.y-sceneBbox.min.y
    // }
    // Make grid axis

    // Create the Grid Helper
    gridHelper = new THREE.GridHelper(100,50);
    gridHelper.rotation.x = 0.5 * Math.PI;

    scene.add(gridHelper);

    function make3Daxis(size,offsetOrigin)
    {
      /// This function makes the X,Y,Z axis

      axis = {}
      axis.group = new THREE.Group();
      axis.group.name = "axis"
      // Taken from: http://osa1.net/posts/2013-04-17-THREEjs-axis-helper.html
      // Nice work Ben for finding this!!!
      height = size
      radius = size*0.03
      arrowGeometry = new THREE.CylinderGeometry(0, size/15, size/8)
      // Red
      xAxisMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000})
      xAxisGeometry = new THREE.CylinderGeometry(radius, radius, height)
      xAxisMesh     = new THREE.Mesh(xAxisGeometry, xAxisMaterial)
      xArrowMesh    = new THREE.Mesh(arrowGeometry, xAxisMaterial)
      xAxisMesh.add(xArrowMesh)
      xArrowMesh.position.y += height / 2
      xAxisMesh.rotation.z  -= 90 * Math.PI / 180
      xAxisMesh.position.x  += height / 2
      // Move the edge
      xAxisMesh.translateX( offsetOrigin*1.8)
      xAxisMesh.translateY( offsetOrigin*1.8)
      xAxisMesh.translateY(2*-offsetOrigin*1.8)
      axis.group.add(xAxisMesh)

      // xLabel.position.set(xAxisMesh.position.x,xAxisMesh.position.y,xAxisMesh.position.z-10)
      // xLabel.z = 0;
      //axis.group.add(xLabel)
      arrowGeometry = new THREE.CylinderGeometry(0, size/15, size/8)
      // Lime
      yAxisMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
      yAxisGeometry = new THREE.CylinderGeometry(radius, radius, height)
      yAxisMesh     = new THREE.Mesh(yAxisGeometry, yAxisMaterial)
      yArrowMesh    = new THREE.Mesh(arrowGeometry, yAxisMaterial)
      yAxisMesh.add(yArrowMesh)
      yArrowMesh.position.y += height / 2
      yAxisMesh.position.y += height / 2
      yAxisMesh.translateX(offsetOrigin*1.8)
      yAxisMesh.translateY(-offsetOrigin*1.8)
      yAxisMesh.translateX(2*-offsetOrigin*1.8)
      axis.group.add(yAxisMesh)
      arrowGeometry = new THREE.CylinderGeometry(0, size/15, size/8)
      // Blue
      zAxisMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF})
      zAxisGeometry = new THREE.CylinderGeometry(radius, radius, height)
      zAxisMesh     = new THREE.Mesh(zAxisGeometry, zAxisMaterial)
      zArrowMesh    = new THREE.Mesh(arrowGeometry, zAxisMaterial)
      zAxisMesh.add(zArrowMesh)
      zAxisMesh.rotation.x  += 90 * Math.PI / 180
      zArrowMesh.position.y += height / 2
      zAxisMesh.position.z  += height / 2
      zAxisMesh.translateZ(offsetOrigin*1.8)
      zAxisMesh.translateX(offsetOrigin*1.8)
      zAxisMesh.translateX(2*-offsetOrigin*1.8)
      axis.group.add(zAxisMesh)
      scene.add(axis.group)
    }

    make3Daxis(100,100)
}

/*
* Get the size of the compound object by computing the bounding box and getting the max/min of each of its children
  Taken from: https://github.com/mrdoob/three.js/issues/581
*/
function getCompoundBoundingBox(object3D) {
    var box = null;
    object3D.traverse(function (obj3D) {
        var geometry = obj3D.geometry;
        if (geometry === undefined) return;
        geometry.computeBoundingBox();
        if (box === null) {
            box = geometry.boundingBox;
        } else {
            box.union(geometry.boundingBox);
        }
    });
    return box;
}

function drawNSEW() {


    directions = {}
    directions.group = new THREE.Group();
    directions.group.name = "directions"

    var directionsToRemove  = scene.getObjectByName("directions");
    scene.remove(directionsToRemove);

    const geometryN = new THREE.BoxGeometry( 17, 17, 17 );
    geometryN.translate( 0, qLine.width, qLine.height );

    const geometryE = new THREE.BoxGeometry( 17, 17, 17 );
    geometryE.translate( qLine.length, 0, qLine.height );

    const geometryW = new THREE.BoxGeometry( 17, 17, 17 );
    geometryW.translate( -qLine.length, 0, qLine.height );

    const geometryS = new THREE.BoxGeometry( 17, 17, 17 );
    geometryS.translate( 0, -qLine.width, qLine.height);

    materialN = new THREE.MeshBasicMaterial( { map: north } );

    materialE = new THREE.MeshBasicMaterial( { map: east } );

    materialS = new THREE.MeshBasicMaterial( { map: south } );

    materialW = new THREE.MeshBasicMaterial( { map: west } );

    const meshN = new THREE.Mesh( geometryN, materialN);
    meshN.name = "north"

    const meshE = new THREE.Mesh( geometryE, materialE);
    meshN.name = "east"

    const meshW = new THREE.Mesh( geometryW, materialE);
    meshN.name = "west"

    const meshS = new THREE.Mesh(geometryS, materialS);
    meshN.name = "south";

    directions.group.add(meshE)
    directions.group.add(meshN)
    directions.group.add(meshW)
    directions.group.add(meshS)

    scene.add(directions.group)
}

function draw2Dtext(message,size,positionx,positiony,positionz,obj,rotation = 0,color = 'black'){

  var loader = new THREE.FontLoader();

  var text;

  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font,text ) {

    var xMid;

    var textShape = new THREE.BufferGeometry();

    var matLite = new THREE.MeshBasicMaterial( {
      color: color,
      transparent: false,
      opacity: 0.4,
      side: THREE.DoubleSide
    } );

    var shapes = font.generateShapes( message, size, 2 );

    var geometry = new THREE.ShapeGeometry( shapes );

    geometry.computeBoundingBox();

    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )

    textShape.fromGeometry( geometry );

    text = new THREE.Mesh( textShape, matLite );
    text.rotation.z = rotation;
    text.name = "2Dtext";

    text.position.x = positionx;
    text.position.y = positiony;
    text.position.z = positionz;

    obj.add(text);
  } ); //end load function
}
