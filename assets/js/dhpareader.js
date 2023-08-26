/*! dhpareader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const dhpaReader = {};
dhpaReader.partList = [ [1], [2,3], [4,5], [6,7,8], [9,10,11], [12,13,14,15,16,17], [18,19,20,21,22,23], [24,25,26] ];
dhpaReader.partNum = [ "I", "II", "III", "IV", "V", "VI", "VII", "VIII" ];
dhpaReader.partPali = [ "Paṭhamo", "Dutiyo", "Tatiyo", "Catuttho", "Pañcamo", "Chaṭṭho", "Sattamo", "Aṭṭhamo" ];
dhpaReader.util = {};
dhpaReader.toc = {};
dhpaReader.textCache = {};
dhpaReader.fixedToolBar = true;
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
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/dhpa/dhpatoc.json";
	ajaxParams.successCallback = function(response) {
		dhpaReader.toc = JSON.parse(response);
		dhpaReader.showTOC();
	};
	this.util.ajaxLoad(ajaxParams);
};
dhpaReader.showTOC = function(scrollTop) {
	const vaggas = Object.keys(this.toc);
	if (vaggas.length === 0)
		return;
	const toolBar = document.getElementById("toolbar");
	toolBar.style.display = "none";
	const resultElem = document.getElementById("textdisplay");
	this.util.clearNode(resultElem);
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
		const table = document.createElement("table");
		const vatthus = this.toc[vaggas[i]];
		for (let v=0; v<vatthus.length; v++) {
			const bpos = vatthus[v].indexOf("[");
			const vt = vatthus[v].slice(0, bpos);
			const vnum = vatthus[v].slice(bpos+1, -1);
			const tr = document.createElement("tr");
			const label = "<a style='cursor:pointer;' oncLick='dhpaReader.loadVatthu(" + currPart + "," + vnum + ");'>" + vt + "</a>";
			const trans = " <span class='textbutton' oncLick='dhpaReader.openTransBurl(" + vnum + ");'>B</span>" +
						" <span class='textbutton' oncLick='dhpaReader.openTransThai(" + vnum + ");'>T</span>";
			tr.innerHTML = "<td style='width:30em;'>" + label
							+ "</td><td style='text-align:right;width:2em;'>" + vnum
							+ "</td><td style='text-align:center;width:3em;'>" + trans + "</td>";
			table.appendChild(tr);
		}
		resultElem.appendChild(table);
	}
	if (scrollTop) {
		this.util.scroll(resultElem, this.fixedToolBar);
	}
};
dhpaReader.loadVatthu = function(part, vatthu) {
	const toolBar = document.getElementById("toolbar");
	toolBar.style.display = "block";
	const partSelector = document.getElementById("partselector");
	partSelector.options[part-1].selected = true;
	const vattSelector = document.getElementById("vatthuselector");
	this.fillVatthuSelector(part);
	const selInd = this.util.findSelectIndex(vattSelector, "" + vatthu);
	if (selInd > -1)
		vattSelector.options[selInd].selected = true;
	this.loadText(part, vatthu);
	if (!this.fixedToolBar)
		this.util.toggleToolBar(this);
};
dhpaReader.fillVatthuSelector = function(part) {
	const vattSelector = document.getElementById("vatthuselector");
	this.util.clearNode(vattSelector);
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
	vattSelector.style.width = "20em";
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
		const ajaxParams = {};
		ajaxParams.address = "/assets/palitext/dhpa/dhpa0" + part + ".gz";
		ajaxParams.isBinary = true;
		ajaxParams.successCallback = function(response) {
			const content = window.pako.ungzip(response, { to: "string" });
			dhpaReader.textCache[part] = content;
			dhpaReader.displayText(part, vatthu);
		};
		this.util.ajaxLoad(ajaxParams);
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
	result += this.util.makeHead("Dhammapadaṭṭhakathāya " + this.partPali[part-1] + " Bhāgo");
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	let pstarted = false;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/page \d\d\d\d/) !== null) {
			const pstyle = " style='text-align:left;padding-top:5px;'";
			if (!pstarted) {
				result += "<p" + pstyle + ">";
				pstarted = true;
			} else {
				result += "</p><p" + pstyle + ">";
			}
			result += lines[i];
		} else if (lines[i].match(/\[ \d+ ]$/) !== null) {
			result += "<strong>" + lines[i] + "</strong>";
		} else {
			result += lines[i];
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
				this.util.scroll(p, this.fixedToolBar);
				break;
			}
		}
	}
};
dhpaReader.openTransBurl = function(vatthu) {
	if (vatthu === undefined) {
		const vattSelector = document.getElementById("vatthuselector");
		vatthu = parseInt(vattSelector.options[vattSelector.selectedIndex].value);
	}
	window.open("/dhpaburl?vt=" + vatthu, "dhpa-trans-burl");
};
dhpaReader.openTransThai = function(vatthu) {
	if (vatthu === undefined) {
		const vattSelector = document.getElementById("vatthuselector");
		vatthu = parseInt(vattSelector.options[vattSelector.selectedIndex].value);
	}
	window.open("/dhpathai?vt=" + vatthu, "dhpa-trans-thai");
};
