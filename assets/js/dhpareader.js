/*! dhpareader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const dhpaReader = {};
dhpaReader.partList = [ [1], [2,3], [4,5], [6,7,8], [9,10,11], [12,13,14,15,16,17], [18,19,20,21,22,23], [24,25,26] ];
dhpaReader.partNum = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII" ];
dhpaReader.partPali = [ "Paṭhamo", "Dutiyo", "Tatiyo", "Catuttho", "Pañcamo", "Chaṭṭho", "Sattamo", "Aṭṭhamo" ];
dhpaReader.toc = {};
dhpaReader.textCache = {};
dhpaReader.trWindow = {};
dhpaReader.clearNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};
dhpaReader.getPart = function(vagga) {
	let result = 0;
	for (let i=0; i<this.partList.length; i++) {
		if (this.partList[i].indexOf(vagga) > -1) {
			result = i + 1;
			break;
		}
	}
	return result;
};
dhpaReader.loadTOC = function() {
	const request = new XMLHttpRequest();
	request.open("GET", "/assets/palitext/dhpa/dhpatoc.json", true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			dhpaReader.toc = JSON.parse(request.responseText);
			dhpaReader.showTOC();
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
};
dhpaReader.showTOC = function() {
	const vaggas = Object.keys(this.toc);
	if (vaggas.length === 0)
		return;
	const toolBar = document.getElementById("toolbar");
	toolBar.style.display = "none";
	const resultElem = document.getElementById("textdisplay");
	this.clearNode(resultElem);
	let pnumStr = "";
	for (let i=0; i< vaggas.length; i++) {
		const currPart = this.getPart(i+1);
		const pStr = this.partNum[currPart-1];
		if (pnumStr !== pStr) {
			pnumStr = pStr;
			const phead = document.createElement("h3");
			phead.innerText = "Part " + pnumStr;
			resultElem.appendChild(phead);
		}
		const vhead = document.createElement("h4");
		vhead.innerText = vaggas[i];
		resultElem.appendChild(vhead);
		const ul = document.createElement("ul");
		const vatthus = this.toc[vaggas[i]];
		for (let v=0; v<vatthus.length; v++) {
			const li = document.createElement("li");
			const vt = vatthus[v];
			const vnum = vt.slice(vt.indexOf("[")+1, -1);
			li.innerHTML = "<a style='cursor:pointer;' oncLick='dhpaReader.loadVatthu(" + currPart + "," + vnum + ");'>" + vt + "</a>";
			ul.appendChild(li);
		}
		resultElem.appendChild(ul);
	}
};
dhpaReader.loadVatthu = function(part, vatthu) {
	const toolBar = document.getElementById("toolbar");
	toolBar.style.display = "block";
	const partSelector = document.getElementById("partselector");
	partSelector.options[part-1].selected = true;
	const vattSelector = document.getElementById("vatthuselector");
	this.fillVatthuSelector(part);
	for (let j=0; j<vattSelector.options.length; j++) {
		if (parseInt(vattSelector.options[j].value) === vatthu) {
			vattSelector.options[j].selected = true;
			break;
		}
	}
	this.loadText(part, vatthu);
};
dhpaReader.fillVatthuSelector = function(part) {
	const vattSelector = document.getElementById("vatthuselector");
	this.clearNode(vattSelector);
	const vaggas = Object.keys(this.toc);
	const thisVags = this.partList[part-1];
	for (let i=0; i<thisVags.length; i++) {
		const vtitle = vaggas[thisVags[i]-1];
		const optg = document.createElement("optgroup");
		optg.label = vtitle;
		const vatthus = this.toc[vtitle];
		for (let v=0; v<vatthus.length; v++) {
			const vt = vatthus[v];
			const vnum = vt.slice(vt.indexOf("[")+1, -1);
			const opt = document.createElement("option");
			opt.value = vnum;
			opt.innerText = vt;
			optg.appendChild(opt);
		}
		vattSelector.appendChild(optg);
	}
};
dhpaReader.selectPart = function() {
	const partSelector = document.getElementById("partselector");
	const part = parseInt(partSelector.options[partSelector.selectedIndex].value);
	this.fillVatthuSelector(part);
};
dhpaReader.loadText = function(part, vatthu) {
	if (part === undefined) {
		const partSelector = document.getElementById("partselector");
		part = parseInt(partSelector.options[partSelector.selectedIndex].value);
		const vattSelector = document.getElementById("vatthuselector");
		vatthu = parseInt(vattSelector.options[vattSelector.selectedIndex].value);
	}
	if (!(part in this.textCache)) {
		const request = new XMLHttpRequest();
		request.responseType = "arraybuffer"; 
		request.open("GET", "/assets/palitext/dhpa/dhpa0" + part + ".gz", true);
		request.onload = function(){
			if (request.status >= 200 && request.status < 400) {
				const content = window.pako.ungzip(request.response, { to: "string" });
				dhpaReader.textCache[part] = content;
				dhpaReader.displayText(part, vatthu);
			} else {
				console.log("Error loading ajax request. Request status:" + request.status);
			}
		};
		request.onerror = function(){
			console.log("There was a connection error");
		};
		request.send();
	} else {
		this.displayText(part, vatthu);
	}
};
dhpaReader.displayText = function(part, vatthu) {
	const resultElem = document.getElementById("textdisplay");
	const text = this.textCache[part];
	resultElem.innerHTML = this.formatText(text, part);
	this.goVatthu(vatthu);
};
dhpaReader.formatText = function(text, part) {
	let result = "";
	result += "<h3 style='text-align:center;'>Dhammapadaṭṭhakathāya " + this.partPali[part-1] + " Bhāgo</h3>";
	result += "<div style='text-align:center;font-size:0.8em;'>The text in Roman script is licensed under a <a href='http://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons Attribution-ShareAlike 4.0 International License</a>.</div>";
	const lines = text.split(/\r?\n/);
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/page \d\d\d\d/) !== null) {
			if (i === 0)
				result += "<p style='text-align:left;'>";
			else
				result += "</p><p style='text-align:left;'>";
			result += lines[i];
		} else if (lines[i].match(/\[ \d+ ]$/) !== null) {
			result += "<strong>" + lines[i] + "</strong>";
		} else {
			result += lines[i].replace(/^\t/, "&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		result += "<br>";
	}
	result += "</p>";
	return result;
};
dhpaReader.goVatthu = function(vatthu) {
	let vatToGo = "[ " + vatthu + " ]";
	let vattNum = vatthu;
	if (vatthu === undefined) {
		const vattSelector = document.getElementById("vatthuselector");
		vattNum = vattSelector.options[vattSelector.selectedIndex].value;
		vatToGo = "[ " + vattNum + " ]";
	}
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.getElementsByTagName("strong");
		for (let n=0; n<nodes.length; n++) {
			if (nodes[n].textContent.indexOf(vatToGo) > -1) {
				p.scrollIntoView();
				break;
			}
		}
	}
	if ("document" in this.trWindow && document.getElementById("synctrans").checked) {
		this.syncTrans(vattNum);
	}
};
dhpaReader.openTransThai = function() {
	const vattSelector = document.getElementById("vatthuselector");
	const vatthu = parseInt(vattSelector.options[vattSelector.selectedIndex].value);
	this.trWindow = window.open("/dhpathai?vt=" + vatthu, "dhpa-trans-thai");
};
dhpaReader.syncTrans = function(vatthu) {
	this.trWindow.dhpaThai.goVatthu(vatthu);
};
