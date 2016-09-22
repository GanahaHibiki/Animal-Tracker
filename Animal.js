function Animal(sName, iXAxis, iYAxis) {
	this.name = sName;
	this.xAxis = iXAxis;
	this.yAxis = iYAxis;
	this.xShift = 0;
	this.yShift = 0;
}

Animal.prototype.makeSound = function() {
	alert(this.name);
}

Animal.prototype.validateShift = function(iXAxis, iYAxis) {
	return (+(this.xAxis + this.xShift) === +iXAxis) && (+(this.yAxis + this.yShift) === +iYAxis);
}

Animal.prototype.setNewState = function(iXAxis, iYAxis, iXShift, iYShift) {
	this.xAxis = iXAxis;
	this.yAxis = iYAxis;
	this.xShift = iXShift;
	this.yShift = iYShift;
}