/*****************************************************************************************************************************

*						My Area After This

******************************************************************************************************************************/


//	The class diagram drawing and manipulation file.
//alert(this)

(function(window){

	var s = window.s = {};
	$.extend(this, svgCanvas);

	// List of all the class elements.
	s.cElems = [];

	//	Class: cElem
	//	The class that contains all the other elements of a class (e.g. title, attributes, operations) in a class diagram.
	
	s.cElem = function(x, y, cNum){
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
				"y": y + 36,
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
				"y": y + 56,
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
			this.longestChildLength = 0;
			this.secondLongestChildLength = 0;	// Needed to update the width when the longest child's length gets decreased
			// So that "this" can be called form the methods in children
			var self = this;

			
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
				s.cElems[cNum].newAttr();
			});
			// Add new operation
			$('#'+this.cOperBtn.getAttribute("id")).bind("click", function(){
				s.cElems[cNum].newOper();
			});
			
			// For editing the attribute
			$(this.cAttrs[this.cAttrCount].cAttrText).bind("dblclick", function(){
				this.attrTextInput = prompt('Enter the attribute name:', this.textContent);
				if(this.attrTextInput.length != null && this.attrTextInput.length > 0)
					this.textContent = this.attrTextInput;
				this.attrLength = this.getBBox().width;
				self.updateWidth(this.attrLength);
			});
			
			// Remove an attribute			
			$(this.cAttrs[this.cAttrCount].cAttrDelBtn).bind('click', function(){
				var _index = this.parentNode.getAttribute('id');
				_index = _index.substring(15);
				_index = parseInt(_index);
				self.updateHeight(false, _index);
				this.parentNode.parentNode.removeChild(this.parentNode);
				self.cAttrCount--;
			});

		};
		
/***********************************************************************
 *					Public Methods
 ***********************************************************************/

		this.newAttr = function(){
			this.x = this.cSvgJson.getBBox().x;
			this.y = this.cSvgJson.getBBox().y;
			this.cAttrs[this.cAttrCount] = {} = new s.cAttr(this.x, this.y, this.cAttrCount, this.cSvgJson.getAttribute('id')+'_'+this.cAttrCount);
			this.cAttrGrp.appendChild(this.cAttrs[this.cAttrCount].cAttrG);
			this.cAttrs[this.cAttrCount].cAttrText.textContent = '-attribute ' + (this.cAttrCount);
			this.updateHeight(true);
			
			this.cAttrCount++;
		};		
		
		this.newOper = function(){
			this.x = this.cSvgJson.getBBox().x;
			this.y = this.cSvgJson.getBBox().y;
			this.cOpers[this.cOperCount] = {} = new s.cOper(this.cOperB.getAttribute('x'), this.cOperB.getAttribute('y'), this.cOperCount, this.cSvgJson.getAttribute('id') + '_' + this.cOperCount);
			this.cOperB.setAttribute('height', 20 + (18 * this.cOperCount));
			this.cOperGrp.appendChild(this.cOpers[this.cOperCount]);
			this.cOpers[this.cOperCount].textContent = '+operation ' + (this.cOperCount);

			// For editing the operation
			$(this.cOpers[this.cOperCount]).bind("dblclick", function(){
				this.operTextInput = prompt('Enter the operation name:', this.textContent);
				if(this.operTextInput.length != null && this.operTextInput.length > 0)
					this.textContent = this.operTextInput;
				this.operLength = this.getBBox().width;
				if(this.operLength > self.longestChildLength)
					self.updateWidth(this.operLength);
			});

			this.cOperCount++;
		};
		
		// Update the width as the lenght of an attribute or operation changes
		this.updateWidth = function(curWidth){
			if(curWidth > this.longestChildLength){
				curWidth = parseInt(curWidth) + 25;
				this.cSvgJson.setAttribute('width', curWidth);
				this.cTitle.setAttribute('width', curWidth);
				this.cAttrGrp.setAttribute('width', curWidth);
				this.cAttrB.setAttribute('width', curWidth);
				this.cAttrBtn.setAttribute('x', (this.cSvgJson.getBBox().x + curWidth) - 17);
				this.cOperGrp.setAttribute('width', curWidth);
				this.cOperB.setAttribute('width', curWidth);
				this.cOperBtn.setAttribute('x', (this.cSvgJson.getBBox().x + curWidth) - 17);
				this.longestChildLength = curWidth;
			}
		};

		// Update the height when an attribute/operation is added/removed
		this.updateHeight = function(doIncrease, attrNum){
			this.x = this.cSvgJson.getBBox().x;
			this.y = this.cSvgJson.getBBox().y;

			if(doIncrease == true){
				this.cAttrB.setAttribute('height', (18 * this.cAttrCount) + 20);
			}
			else{
				if(this.cAttrCount > 0){
					this.cAttrB.setAttribute('height', (18 * this.cAttrCount) - 18);
					for(var i = attrNum+1; i < this.cAttrCount; i++){
						alert(i);
						this.cAttrs[i].cAttrText.setAttribute('y', this.y + (i * 18) + 18);
						this.cAttrs[i].cAttrDelBtn.setAttribute('y', this.y + (i * 18) + 18);
					}
				}
			}

			this.cOperGrpY = parseInt(this.cAttrB.getAttribute('y')) + parseInt(this.cAttrB.getAttribute('height')) - this.cOperGrp.getBBox().y - 6;
			this.cOperGrpX = this.x - this.cOperGrp.getBBox().x;
			this.cOperGrp.setAttribute('transform', 'translate('+this.cOperGrpX+', '+this.cOperGrpY+')');
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
	
	s.cAttr = function(x, y, num, id){
		var _cAttrG = {
			"element": "g",
			"attr": {
				"width": "100",
				"height": "20",
			}
		};
		var _cAttrText = {
			"element": "text",
			"attr": {
				"class": "cAttrText",
				"width": "100",
				"height": "20",
				"fill": "black"
			}
		};
		
		var _cAttrDelBtn = {
			"element": "text",
			"attr": {
				"width": "15",
				"height": "15",
				"fill": "red",
				"stroke": "red",
				"stroke-width": "0",
				"font-size": "16"
			}
		};


		var selfAttr = this;
		this.cAttrText = _cAttrText;
		this.cAttrDelBtn = _cAttrDelBtn;
		this.cAttrG = addSvgElementFromJson(_cAttrG);
		this.cAttrG.setAttribute('id', 'cAttrG_' + id);

		this.cAttrText.attr.id = 'att_' + id;
		this.cAttrText.attr.x = parseInt(x) + 1;
		this.cAttrText.attr.y = parseInt(y) + 34 + (num*18);
		this.cAttrText = addSvgElementFromJson(this.cAttrText);

		this.cAttrDelBtn.attr.x = parseInt(x) - 10;
		this.cAttrDelBtn.attr.y = parseInt(y) + 34 + (num*18);
		this.cAttrDelBtn.attr.id = "attrDelBtn_" + id;
		this.cAttrDelBtn.attr.style = "display:none;";
		this.cAttrDelBtn = addSvgElementFromJson(this.cAttrDelBtn);
		this.cAttrDelBtn.textContent = "x";
		
		this.cAttrG.appendChild(this.cAttrText);
		this.cAttrG.appendChild(this.cAttrDelBtn);

		// Events
		$(this.cAttrText).bind('mouseenter', function(){
			this.setAttribute('fill', 'green');
			$(selfAttr.cAttrDelBtn).css({"display": "inline"});
			$(selfAttr.cAttrDelBtn).bind('mouseenter', function(){
				$(selfAttr.cAttrDelBtn).css({"display": "inline"});	
			});
			$(selfAttr.cAttrDelBtn).bind('mouseleave', function(){
				$(selfAttr.cAttrDelBtn).css({"display": "none"});	
			});
		});
		$(this.cAttrText).bind('mouseleave', function(){
			this.setAttribute('fill', 'black');
			$(selfAttr.cAttrDelBtn).css({"display": "none"});
			$(selfAttr.cAttrDelBtn).unBind('mouseenter');
			$(selfAttr.cAttrDelBtn).unBind('mouseleave');
		});

		return this
	};

	s.cOper = function(x, y, num, id){
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
	
})(window);

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
