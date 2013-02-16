/*****************************************************************************************************************************

*						My Area After This

******************************************************************************************************************************/


//	The class diagram drawing and manipulation file.
//alert(this)
var s = {};

(function(){

	$.extend(this, svgCanvas);

	// List of all the class elements.
	cContainer = s.cContainer = {},
	cContainer.cElems = [];

	//	Class: cElem
	//	The class that contains all the other elements of a class (e.g. title, attributes, operations) in a class diagram.
	
	cContainer.cElem = function(x, y, cNum){
		var _cSvgJson = {
			"element": "g",
			"attr": {
				"class": "classShape",
				"title": "Class"
			}
		};
		var _cTitle = {
			"element": "rect",
			"attr": {
				"width": "100",
				"height": "20",
				"fill": "white",
				"x": x,
				"y": y,
				"stroke": "black",
				"stroke-width": "1"
			}
		};
		var _cTitleText = {
			"element": "text",
			"attr": {
				"width": "100",
				"height": "20",
				"x": x + 28,
				"y": y + 13,
				"fill": "black"
			}
		};

		var _cAttrGrp = {
			"element": "g",
			"attr": {
				"id": "attrG_" + getNextId(),
				"class": "classShape",
				"title": "Class"
			}
		};
		var _cAttrB = {
			"element": "rect",
			"attr": {
				"width": "100",
				"height": "20",
				"fill": "white",
				"x": x,
				"y": y + 20,
				"stroke": "black",
				"stroke-width": "1"
			}
		};
		var _cAttrText = {
			"element": "text",
			"attr": {
				"width": "100",
				"height": "20",
				"fill": "black"
			}
		};
		var _cAttrBtn = {
			"element": "text",
			"attr": {
				"id": "btnA_" + getNextId(),
				"width": "15",
				"height": "15",
				"x": x + 84,
				"y": y + 35,
				"fill": "green",
				"stroke": "green",
				"stroke-width": "0",
				"font-size": "20"
			}
		};

		var _cOperGrp = {
			"element": "g",
			"attr": {
				"id": "operG_" + getNextId(),
				"class": "classShape",
				"title": "Class"
			}
		};
		var _cOperB = {
			"element": "rect",
			"attr": {
				"width": "100",
				"height": "20",
				"fill": "white",
				"x": x,
				"y": y + 40,
				"stroke": "black",
				"stroke-width": "1"
			}
		};
		var _cOperBtn = {
			"element": "text",
			"attr": {
				"id": "btnO_" + getNextId(),
				"width": "15",
				"height": "15",
				"x": x + 84,
				"y": y + 55,
				"fill": "green",
				"stroke": "green",
				"stroke-width": "0",
				"font-size": "20"
			}
		};



/**********************************************************************
*					Constructor
***********************************************************************/

		{

			// List of attributes and operations in the class element.
			this.cAttrs = [];
			this.cOpers = [];
			this.cNum = cNum;
			this.x = x;
			this.y = y;
			this.cAttrCount = 0;
			this.cOperCount = 0;
			this.title = 'Class ' + this.cNum;
			
			this.cSvgJson = addSvgElementFromJson(_cSvgJson);
			this.cSvgJson.setAttribute('id', 'c_' + getNextId());
			
			this.cTitle = _cTitle;
			this.cTitle.attr.id = getNextId();
			this.cTitle = addSvgElementFromJson(this.cTitle);

			this.cTitleText = _cTitleText;
			this.cTitleText.attr.id = getNextId();
			this.cTitleText = addSvgElementFromJson(this.cTitleText);

			this.cAttrB = _cAttrB;
			this.cAttrB.attr.id = getNextId();
			this.cAttrB = addSvgElementFromJson(this.cAttrB);
			this.cAttrBtn = _cAttrBtn;
			this.cAttrBtn = addSvgElementFromJson(this.cAttrBtn);
			this.cAttrGrp = addSvgElementFromJson(_cAttrGrp);
			this.cAttrGrp.appendChild(this.cAttrB);
			this.cAttrGrp.appendChild(this.cAttrBtn);

			this.cOperB = _cOperB;
			this.cOperB.attr.id = getNextId();
			this.cOperB.attr.y = parseInt(this.cAttrB.getAttribute('y')) + parseInt(this.cAttrB.getAttribute('height'));
			this.cOperB = addSvgElementFromJson(this.cOperB);
			this.cOperBtn = addSvgElementFromJson(_cOperBtn);
			this.cOperGrp = addSvgElementFromJson(_cOperGrp);
			this.cOperGrp.appendChild(this.cOperB);
			this.cOperGrp.appendChild(this.cOperBtn);

			this.cSvgJson.appendChild(this.cTitle);
			this.cSvgJson.appendChild(this.cTitleText);
			this.cSvgJson.appendChild(this.cAttrGrp);
			this.cSvgJson.appendChild(this.cOperGrp);

			$('#'+this.cTitleText.getAttribute("id")).append(this.title);
			$('#'+this.cAttrBtn.getAttribute("id")).append("+");
			$('#'+this.cOperBtn.getAttribute("id")).append("+");
			

			// Events

			// Add new attribute
			$('#'+this.cAttrBtn.getAttribute("id")).bind("click", function(){
				cContainer.cElems[cNum].newAttr();
			});
			// Add new operation
			$('#'+this.cOperBtn.getAttribute("id")).bind("click", function(){
				cContainer.cElems[cNum].newOper();
			});
			
			this.canv = svgCanvas.svgCanvasToString();
			socket.emit('updateRemoteDiag', this.canv);
			$('g[id^="c_svg_"]').bind('click', function(event){
				//alert('hovered!');
				this.canv = svgCanvas.svgCanvasToString();

				socket.emit('updateRemoteDiag', this.canv);
				//setInterval(alert(printCanvas, 1000));
				//alert(canv);
				//newLine(attr);
				//svgCanvas.setMode('text');
			});


		};
//			this.newAttr();
		
/***********************************************************************
 *					Public Methods
 ***********************************************************************/

		this.newAttr = function(){
			this.x = this.cSvgJson.getBBox().x;
			this.y = this.cSvgJson.getBBox().y;
			this.cAttrs[this.cAttrCount] = {} = new cContainer.cAttr(this.x, this.y, this.cAttrCount, this.cSvgJson.getAttribute('id')+'_'+this.cAttrCount);
			this.cAttrB.setAttribute('height', 20 + (18 * this.cAttrCount));
			this.cAttrGrp.appendChild(this.cAttrs[this.cAttrCount]);
			this.cAttrs[this.cAttrCount].textContent = '-attribute ' + (this.cAttrCount);
			this.cOperGrpY = parseInt(this.cAttrB.getAttribute('y')) + parseInt(this.cAttrB.getAttribute('height')) - this.cOperGrp.getBBox().y - 6;
			this.cOperGrpX = this.x - this.cOperGrp.getBBox().x;
			this.cOperGrp.setAttribute('transform', 'translate('+this.cOperGrpX+', '+this.cOperGrpY+')');
			$('.cAttrText').bind("dblclick", function(){
//				$(this).css('color', 'red');
				var box = "<div id='addAttr' title='Title'>The content here.<div>";
				$('#addAttr').dialog();
//				textActions.select(this, this.x, this.y);
//				selectorManager.releaseSelector(cContainer.cElems[cNum]);
//				addToSelection(this);
//				textActions.start(this);
//				textActions.toEditMode(this.x, this.y);
//				selectorManager.setSelectionRange(this);
//				textActions.setInputElem(this);
			});

			this.cAttrCount++;
		};
		this.newOper = function(){
			this.x = this.cSvgJson.getBBox().x;
			this.y = this.cSvgJson.getBBox().y;
			this.cOpers[this.cOperCount] = {} = new cContainer.cOper(this.cOperB.getAttribute('x'), this.cOperB.getAttribute('y'), this.cOperCount, this.cSvgJson.getAttribute('id') + '_' + this.cOperCount);
			this.cOperB.setAttribute('height', 20 + (18 * this.cOperCount));
			this.cOperGrp.appendChild(this.cOpers[this.cOperCount]);
			this.cOpers[this.cOperCount].textContent = '+operation ' + (this.cOperCount);

			this.cOperCount++;
		};
		
		this.setPosX = function(x){
			this.cTitle.setAttribute('x');
		};
		this.getPosX = function(){
			return this.cTitle.getAttribute('x');
		};
		this.getPosY = function(){
			return this.cTitle.getAttribute('y');
		};
		this.setPosY = function(){
			this.cTitle.setAttribute('y');
		};
		
	};
	
	cContainer.cAttr = function(x, y, num, id){
		var _cAttrText = {
			"element": "text",
			"attr": {
				"class": "cAttrText",
				"width": "100",
				"height": "20",
				"fill": "black"
			}
		};


		$.extend(this, _cAttrText);
		this.attr.id = 'att_' + id;
		this.attr.x = parseInt(x) + 8;
		this.attr.y = parseInt(y) + 34 + (num*18);
		return addSvgElementFromJson(this);
	};

	cContainer.cOper = function(x, y, num, id){
		var _cOperText = {
			"element": "text",
			"attr": {
				"class": "cOperText",
				"width": "100",
				"height": "20",
				"fill": "black"
			}
		};
		$.extend(this, _cOperText);
		this.attr.id = 'op_' + id;
		this.attr.x = parseInt(x) + 8;
		this.attr.y = parseInt(y) + 15 + (num*18);
		return addSvgElementFromJson(this);
	};
	
})();

		var socket = io.connect('http://localhost:8080');

	socket.on('connect', function(){
		alert('connected');
	});

	$("document").ready(function(){
		var update = function(){
			var canv = svgCanvas.svgCanvasToString();
			socket.emit("updateRemoteDiag", canv);
		}
		//alert(canv);
		//setInterval(update(), 500);
	});


	socket.on('updateLocalDiag', function(xmlString){
		//alert(xmlString);
		svgCanvas.clear();
		svgCanvas.setSvgString(xmlString);
	});

	
			$('g[id^="c_svg_"]').bind('click', function(event){
				//alert('hovered!');
				this.canv = svgCanvas.svgCanvasToString();

				socket.emit('updateRemoteDiag', this.canv);
				//setInterval(alert(printCanvas, 1000));
				//alert(canv);
				//newLine(attr);
				//svgCanvas.setMode('text');
			});
