//keycode enum
const keyboard = Object.freeze({
	//SHIFT: 		16,
	SPACE: 		32,
	A: 			65, 	// A
	W: 			87, 	// W
	D: 			68, 	// D
	S: 			83,	 	// S
	LEFT: 		37, 	// left
	UP: 		85, 	// up
	RIGHT: 		39, 	// right
	DOWN: 		40,	 	// down
	ESCAPE:		27,		//escape
});

//last key pressed
const keys = [];
const lastKeys = [];

window.onkeyup = (e) => {
	keys[e.keyCode] = false;
	e.preventDefault();
};

window.onkeydown = (e)=>{
	keys[e.keyCode] = true;
	lastKeys[e.keyCode] = true;
};