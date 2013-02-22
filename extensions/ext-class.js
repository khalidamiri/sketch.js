/*
 * ext-helloworld.js
 *
 * Licensed under the Apache License, Version 2
 *
 * Copyright(c) 2010 Alexis Deveria
 *
 */
 
/* 
	This is a very basic SVG-Edit extension. It adds a "Hello World" button in
	the left panel. Clicking on the button, and then the canvas will show the
 	user the point on the canvas that was clicked on.
*/
 
svgEditor.addExtension("Class", function() {
	counter = 0;


	return {
		name: "Class",
		svgicons: "extensions/helloworld-icon.xml",
		
		buttons: [{
			id: "class", 
			
			type: "mode", 
			
			title: "Class", 
			
			events: {
				'click': function() {
					svgCanvas.setMode("class");
				}
			}
		}],

		mouseDown: function(opts) {
			
			if(svgCanvas.getMode() == "class") {

				return {
					started: true
				}
			}

		},
		
		mouseUp: function(opts) {
			if(svgCanvas.getMode() == "class") {
				var zoom = svgCanvas.getZoom();
				var x = opts.mouse_x / zoom;
				var y = opts.mouse_y / zoom;
		//		alert(opts.cContainer.mouse_x + " " + x + "\n" + opts.cContainer.mouse_y + " " + y);

//				newClass = new s.cContainer.cElem(x, y);
				s.cElems[counter] = new s.cElem(x, y, counter);
				
				s.cElems[counter].newAttr();
				

				s.cElems[counter].newOper();

				counter++;
				
				// This somehow fixes the issue of last child element of classes.cContainer. I have no idea why. Seems like some bug with the browser.
				s.cElem.getPosX();


/*				alert(newClass.cContainer.getPosX());
				alert(newClass.cContainer.getPosY());

				newClass.cContainer.setPosX(300);
				alert(newClass.cContainer.getPosX());
*/
			}
		}
	};

});

