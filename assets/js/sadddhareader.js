/*! sadddhareader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const sadddhaReader = {};
sadddhaReader.verbGroupRange = [ [1, 859], [860, 877], [878, 977], [978, 998], [999, 1030], [1031, 1040], [1041, 1053], [1054, 1412] ];
sadddhaReader.verbGroupName = [ "I&nbsp;Bhū", "II&nbsp;Rudha", "III&nbsp;Diva", "IV&nbsp;Su", "V &nbsp;ī", "VI&nbsp;Gaha", "VII&nbsp;Tana", "VIII&nbsp;Cura" ];
sadddhaReader.util = {};
sadddhaReader.params = {};
sadddhaReader.textCache = "";
sadddhaReader.headList = [];
sadddhaReader.fixedToolBar = false;
sadddhaReader.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("c" in vars)
		result["chapter"] = vars.c;
	if ("d" in vars)
		result["defnum"] = vars.d;
	return result;
};
sadddhaReader.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/sadddha.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		sadddhaReader.textCache = sadddhaReader.formatText(window.pako.ungzip(response, { to: "string" }));
		sadddhaReader.displayText();
	};
	this.util.ajaxLoad(ajaxParams);
};
sadddhaReader.formatText = function(text) {
	let result = "";
	result += this.util.makeHead("Saddanītippakaraṇassa Dhātumālā");
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	result += "<br>";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<b>[")) {
			result += lines[i];
			const bpos = lines[i].indexOf("</b>");
			this.headList.push(lines[i].slice(0, bpos+4));
		} else {
			const tab = lines[i].startsWith("<h") ? "" : "\t";
			result += tab + lines[i];
		}
		if (!lines[i].startsWith("<h"))
			result += "<br>";
	}
	return result;
};
sadddhaReader.displayText = function() {
	const resultElem = document.getElementById("textdisplay");
	resultElem.innerHTML = this.textCache;
	this.fillDefNumberList();
	if (this.params.chapter !== undefined) {
		this.util.setSelectSelection(document.getElementById("chapterselector"), this.params.chapter);
		this.goChapter(this.params.chapter);
	} else if (this.params.defnum !== undefined) {
		this.util.setSelectSelection(document.getElementById("defselector"), this.params.defnum);
		this.goDef(this.params.defnum);
	}
};
sadddhaReader.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const onlyHeads = document.getElementById("onlyheads");
	if (onlyHeads.checked) {
		resultElem.innerHTML = this.headList.join("<br>");
		this.util.scroll(resultElem, this.fixedToolBar);
	} else {
		resultElem.innerHTML = this.textCache;
		this.goChapter(this.params.chapter);
	}
	document.getElementById("chapterselector").disabled = onlyHeads.checked;
	document.getElementById("defselector").disabled = onlyHeads.checked;
};
sadddhaReader.fillDefNumberList = function() {
	const defList = [];
	for (let i=1; i<=1412; i++)
		defList.push(i);
	this.util.fillSelectOptions(document.getElementById("defselector"), defList);
};
sadddhaReader.goChapter = function(chap) {
	let chapToGo;
	if (chap === undefined) {
		const chapSelector = document.getElementById("chapterselector");
		chapToGo = chapSelector.options[chapSelector.selectedIndex].value;
	} else {
		chapToGo = chap;
	}
	chapToGo = chapToGo.indexOf(".") > -1 ? chapToGo : chapToGo + ".";
	const resultElem = document.getElementById("textdisplay");
	const allH3 = resultElem.getElementsByTagName("h3");
	const success = this.findElementAndGo(allH3, chapToGo);
	if (!success) {
		const allH4 = resultElem.getElementsByTagName("h4");
		this.findElementAndGo(allH4, chapToGo);
	}
};
sadddhaReader.findElementAndGo = function(list, str) {
	let success = false;
	for (let i=0; i<list.length; i++) {
		const elem = list[i];
		const text = list[i].textContent.trim();
		if (text.startsWith(str + " ")) {
			this.util.scroll(elem, this.fixedToolBar);
			success = true;
			break;
		}
	}
	return success;
};
sadddhaReader.goDef = function(defnum) {
	let defToGo;
	if (defnum === undefined) {
		const defSelector = document.getElementById("defselector");
		defToGo = defSelector.options[defSelector.selectedIndex].value;
	} else {
		defToGo = defnum;
	}
	const resultElem = document.getElementById("textdisplay");
	const allB = resultElem.getElementsByTagName("b");
	for (let i=0; i<allB.length; i++) {
		const elm = allB[i];
		const text = elm.textContent.trim();
		const rex = new RegExp("^\\[" + defToGo + "\\]");
		if (text.match(rex) !== null) {
			this.util.scroll(elm, this.fixedToolBar);
			break;
		}
	}
	this.showVerbGroup(defToGo);
};
sadddhaReader.getVerbGroup = function(defnum) {
	let result = -1;
	const dnum = parseInt(defnum);
	for (let i=0; i<this.verbGroupRange.length; i++) {
		const range = this.verbGroupRange[i];
		if (dnum >= range[0] && dnum <= range[1]) {
			result = i;
			break;
		}
	}
	return result;
};
sadddhaReader.showVerbGroup = function(defnum) {
	const vgroup = this.getVerbGroup(defnum);
	if (vgroup > -1) {
		const vgElem = document.getElementById("verbgroup");
		vgElem.innerHTML = this.verbGroupName[vgroup];
		vgElem.style.display = "inline";
		setTimeout(function() {
			document.getElementById("verbgroup").style.display = "none";
		}, 3000);
	}
};

