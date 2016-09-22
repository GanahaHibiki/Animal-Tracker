function getEntries(sContent) {
	return sContent.split("\n\r");
}

function getId(sEntry) {
	var aLines = sEntry.split("\n");
	if (aLines[0]) {
		return aLines[0];
	} else {
		return aLines[1];
	}
	
}

function getAnimalTrace(sEntry, index) {
	if (index < sEntry.length) {
		return sEntry.split("\n")[index];
	}
}

function getAnimalName(sAnimalTrace) {
	return sAnimalTrace.split(" ")[0];
}

function getLastXAxis(sAnimalTrace) {
	return +sAnimalTrace.split(" ")[1];
}

function getLastYAxis(sAnimalTrace) {
	return +sAnimalTrace.split(" ")[2];
}

function getXShift(sAnimalTrace) {
	if (sAnimalTrace.split(" ").length > 3) {
		return +sAnimalTrace.split(" ")[3];
	} else {
		return 0;
	}
}

function getYShift(sAnimalTrace) {
	if (sAnimalTrace.split(" ").length > 4) {
		return +sAnimalTrace.split(" ")[4];
	} else {
		return 0;
	}
}

function getSnapshot(historyData, id) {
	var aEntries = getEntries(historyData);
	var oSnapShotData = {};
	var oAnimalData = {};
	var bErrFlag = false;
	var bMatched = false;
	var result = "";
	var setErrFlag = function() {
		bErrFlag = true;
		console.log("Invalid format");
		alert("Invalid format");
		return false;
	}

	var sName, iXAxis, iYAxis, iXShift, iYShift;
	aEntries.every(function(sCurrent, iIndex, aArray) {
		var aEntry = sCurrent.split("\n");
		if (!aEntry[0]) {
			aEntry.shift();
		}
		sId = getId(sCurrent);

		aEntry.every(function(sLine, iIdx, aArr) {
			if (iIdx === 0) {
				return true;
			} else if (iIdx === 1) {
				var dDate = new Date(sLine)
				if(dDate.toString() === "Invalid Date") {
					return setErrFlag(bErrFlag);
				} else {
					return true;
				}
			} else {
				if (sLine.split(" ").length < 3) {
					return setErrFlag(bErrFlag);
				}
				sName = getAnimalName(sLine);
				iXAxis = getLastXAxis(sLine);
				iYAxis = getLastYAxis(sLine);
				iXShift = getXShift(sLine);
				iYShift = getYShift(sLine);

				if (isNaN(iXAxis) || isNaN(iYAxis) || isNaN(iXShift) || isNaN(iYShift)) {
					return setErrFlag(bErrFlag);
				}

				oSnapShotData[getId(sLine)] = getAnimalName(sLine);
				if (!oAnimalData[getAnimalName(sLine)]) {
					oAnimalData[getAnimalName(sLine)] = new Animal(sName, iXAxis, iYAxis);
				} else {
					if (!oAnimalData[getAnimalName(sLine)].validateShift(iXAxis, iYAxis)) {
						console.log("Conflict found at " + sId);
						alert("Conflict found at " + sId);
						bErrFlag = true;
						return false;
					} else {
						oAnimalData[getAnimalName(sLine)].setNewState(iXAxis, iYAxis, iXShift, iYShift);
						if (encodeURIComponent(id) === encodeURIComponent(id)) {
							bMatched = true;
							result = result + sName + " " + iXAxis + " " + iYAxis + "\n";
							return true;
						}
					}
				}
			}
		});

		if (bErrFlag) {
			return false;
		}
		return true;
	});

	if (bErrFlag) {
		return false;
	} else if (bMatched) {
		console.log(result);
		alert(result);
		return result;
	} else {
		console.log("Invalid ID!");
		alert("Invalid ID!");
		return false;
	}
}