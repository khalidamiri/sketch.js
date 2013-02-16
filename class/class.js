
//	The class diagram drawing and manipulation file.
//alert(this)
var cContainer = {};

(function(){


	// List of all the class elements.
	cContainer.cElems = [];

	//	Class: cElem
	//	The class that contains all the other elements of a class (e.g. title, attributes, operations) in a class diagram.
	
	cContainer.cElem = function(){
		
		// List of attributes and operations in the class element.
		var _cAttrs = [];
		var _cOpers = [];
		var _cPosX = 0;
		var _cPosY = 1;
		var _cTitle;
//		var _cId = "c_" + svgCanvas.getNextId();
		var _cSvgJson = {
			"element": "g",
			"attr": {
//				"id": _cId,
				"class": "class"
			}
		};
		
		this.setPosX = function(x){
			this._cPosX = x;
		}
		this.getPosX = function(){
			return this._cPosX;
		}
		
		var getPosY = function(){
			return this._cPosY;
		}

		
//		svgCanvas.addSvgElementFromJson(this._cSvgJson);
		
			return this;
	};
	
	cContainer.cTitle = function(x, y){
			
		var _cTSvgJson = {
			"element": "rect",
			"attr": {
//				"id": svgCanvas.getNextId(),
				"width": "100",
				"height": "20",
				"fill": "white",
				"x": x,
				"y": y,
				"stroke": "black",
				"stroke-width": "1"
			}
		};
		
		this.getPosX = function(){
			return this._cTSvgJson;
		};
		
	};
})();

aTitle = new cContainer.cTitle(100, 100);
alert(aTitle.getPosX());