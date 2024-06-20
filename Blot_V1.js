// Size of the grid
const sqNumWidth = 12; // Squares Width
const sqNumHeight = 12; // Squares Height

//Height and Width of Square of Where Each Shape Goes
const squareWidth = 10; // Width - Square
const squareHeight = 10; // Height - Square

const canvasWidth = squareWidth * sqNumWidth;
const canvasHeight = squareHeight * sqNumHeight;

setDocDimensions(canvasWidth, canvasHeight);

const finalLines = [];
const finalLinesBounds = bt.bounds(finalLines);

// This will Rotate The Shapes
function rotateShape(shape) {
  const degrees = bt.randIntInRange(0, 3) * 90;
  bt.rotate(shape, degrees);
}

// Circle, Used in the Emojis
function polylineCircle(center, radius, segments) {
  const circle = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    circle.push([x, y]);
  }
  return [circle];
}

// Arc
function arc(center, radius, segments) {
  const qCircle = [];
  const startAngle = -Math.PI / 2; // angle
  const endAngle = 0;
  const angleIncrement = (endAngle - startAngle) / segments;
  for (let i = 0; i <= segments; i++) {
    const angle = startAngle + i * angleIncrement;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    qCircle.push([y, x]);
  }
  for (let i = segments; i >= 0; i--) {
    const angle = startAngle + i * angleIncrement;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    qCircle.push([x, y]);
  }
  return [qCircle];
}

//Emoji - Smiley Face
function drawSmileyFace(center, faceRadius = 5) {
  const [cx, cy] = center;

  const face = polylineCircle([cx, cy], faceRadius, 24)[0];

  const eyeRadius = faceRadius / 6;
  const leftEyeCenter = [cx - faceRadius / 3, cy + faceRadius / 3];
  const rightEyeCenter = [cx + faceRadius / 3, cy + faceRadius / 3];
  const leftEye = polylineCircle(leftEyeCenter, eyeRadius, 12)[0];
  const rightEye = polylineCircle(rightEyeCenter, eyeRadius, 12)[0];

  const smile = [];
  for (let i = 0; i <= 24; i++) {
    const angle = Math.PI - (i / 24) * Math.PI;
    const x = cx + (faceRadius / 2) * Math.cos(angle);
    const y = cy - (faceRadius / 2) * Math.sin(angle);
    smile.push([x, y]);
  }

  return [face, leftEye, rightEye, smile];
}

function drawSadFace(center, faceRadius = 5) {
  const [cx, cy] = center;

  const face = polylineCircle([cx, cy], faceRadius, 24)[0];

  const eyeRadius = faceRadius / 6;
  const leftEyeCenter = [cx - faceRadius / 3, cy + faceRadius / 3];
  const rightEyeCenter = [cx + faceRadius / 3, cy + faceRadius / 3];
  const leftEye = polylineCircle(leftEyeCenter, eyeRadius, 12)[0];
  const rightEye = polylineCircle(rightEyeCenter, eyeRadius, 12)[0];

  const sad = [];
  for (let i = 0; i <= 30; i++) {
    const angle = (i / 30) * Math.PI;
    const x = cx + (faceRadius / -2) * Math.cos(angle);
    const y = cy - (faceRadius / -2) * Math.sin(angle);
    sad.push([x, y-3]);
  }

  return [face, leftEye, rightEye, sad];
}

//Emoji - Poop Emoji
function drawPoopEmoji(center, size = 6) {
  const [cx, cy] = center;
  const emoji = [];

  // "Poop Layers"
  const layers = [
    { w: size * 0.5, h: size * 0.2, y: cy + size * 0.3 },
    { w: size * 0.7, h: size * 0.2, y: cy + size * 0.1 },
    { w: size * 0.9, h: size * 0.2, y: cy - size * 0.1 },
    { w: size * 1.1, h: size * 0.2, y: cy - size * 0.3 },
  ];

  for (const layer of layers) {
    const layerShape = [
      [cx - layer.w / 2, layer.y],
      [cx + layer.w / 2, layer.y],
      [cx + layer.w / 2, layer.y + layer.h],
      [cx - layer.w / 2, layer.y + layer.h],
      [cx - layer.w / 2, layer.y]
    ];
    emoji.push(layerShape);
  }

  // Eyes - Poop Emoji
  const eyeRadius = size / 13;
  const leftEyeCenter = [cx - size / 4, cy + size / 10];
  const rightEyeCenter = [cx + size / 4, cy + size / 10];
  const leftEye = polylineCircle(leftEyeCenter, eyeRadius, 12)[0];
  const rightEye = polylineCircle(rightEyeCenter, eyeRadius, 12)[0];
  emoji.push(leftEye);
  emoji.push(rightEye);

  // Mouth - Poop Emoji
  const mouth = [];
  for (let i = 0; i <= 12; i++) {
    const angle = Math.PI - (i / 12) * Math.PI;
    const x = cx + (size / 3) * Math.cos(angle);
    const y = cy - size * 0.2 + (size / -10) * Math.sin(angle);
    mouth.push([x, y]);
  }
  emoji.push(mouth);

  return emoji;
}

//Octagon - Only Actual Shape lol
function octagon(center, radius) {
  const octagonShape = [];
  const sides = 9; 

  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI / 4) + (i * Math.PI / 4); 
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1] + radius * Math.sin(angle);
    octagonShape.push([x, y]);
  }

  return [octagonShape];
}

function dorito(center, size) {
  const [cx, cy] = center;
  const height = (Math.sqrt(3) / 2) * size;
  return [[
    [cx, cy - (2 / 3) * height],
    [cx - size / 2, cy + (1 / 3) * height],
    [cx + size / 2, cy + (1 / 3) * height],
    [cx, cy - (2 / 3) * height]               
  ]];
}

// Draw A Bullet
function bullet(center, size) {
  const [cx, cy] = center;
  const halfSize = size /4;

  const cp1 = [cx - halfSize, cy];
  const cp2 = [cx + halfSize, cy];

  const points = [
    [cx, cy - size],
    cp1,
    [cx - halfSize, cy + size -0.8],
    [cx + halfSize, cy + size -0.8],
    cp2,
    [cx, cy - size]
  ];

  return [points];
}

// Keep Track of Where Shapes are Put
const grid = Array.from({ length: sqNumWidth }, () => Array(sqNumHeight).fill(null));

// Locate Where Shapes are and Make sure that no 2 same shapes are next to each other
function getRandomShape(i, j) {
  const shapes = ['poop', 'smiley', 'sad', 'octagon', 'dorito' , 'bullet', 'arc'];
  const neighbors = new Set();

  if (i > 0 && grid[i - 1][j]) {
    neighbors.add(grid[i - 1][j]);
  }
  if (j > 0 && grid[i][j - 1]) {
    neighbors.add(grid[i][j - 1]);
  }

  const availableShapes = shapes.filter(shape => !neighbors.has(shape));

  const selectedShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
  grid[i][j] = selectedShape;

  switch (selectedShape) {
    case 'poop':
      return drawPoopEmoji([0, 0], 6);
    case 'smiley':
      return drawSmileyFace([0, 0], 5);
    case 'sad':
      return drawSadFace([0, 0], 5);
    case 'dorito':
      return dorito([0, 0], 5);    
    case 'octagon':
      return octagon([0, 0], 5);
   case 'bullet':
      return bullet([0, 0], 5);
    case 'arc':
      return arc([-5, 5], 10, 24);
    default:
      return [];
  }
}

// Generate the Shapes
for (let i = 0; i < sqNumWidth; i++) {
  for (let j = 0; j < sqNumHeight; j++) {
    let shape = getRandomShape(i, j);
    rotateShape(shape);
    bt.translate(shape, [squareWidth * i, squareHeight * j]);
    bt.join(finalLines, shape);
  }
}

// Just Center Each Shape
bt.translate(finalLines, [5, 5]);

// Border for the Canvas
const border = [
  [
    [0, 0],
    [canvasWidth, 0]
  ],
  [
    [canvasWidth, 0],
    [canvasWidth, canvasHeight]
  ],
  [
    [canvasWidth, canvasHeight],
    [0, canvasHeight]
  ],
  [
    [0, canvasHeight],
    [0, 0]
  ],
];
bt.join(finalLines, border);

// Draws Everything
drawLines(finalLines);
