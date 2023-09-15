/*! subhoreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const subhoReader = {};
subhoReader.util = {};
subhoReader.suttaNumberList = [];
subhoReader.fixedToolBar = false;
subhoReader.firstOpen = true;
subhoReader.loadText = function() {
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/subho.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		subhoReader.displayText(subhoReader.formatText(content));
	};
	this.util.ajaxLoad(ajaxParams);
};
subhoReader.formatText = function(text) {
	let result = "";
	const lines = text.split(/\r?\n/);
	const hpRex = new RegExp("<\\/?[hp]");
	const pstyle = "style='text-align:left;padding-top:5px;'";
	result += "<br>";
	let snum = null;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			result += lines[i].replace("<p>", "<p " + pstyle + ">");
		} else if ((snum = lines[i].match(/^\d+/)) !== null) {
			result += lines[i];
			this.suttaNumberList.push(snum[0]);
		} else {
			const tab = lines[i].match(hpRex) !== null ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;";
			result += tab + lines[i];
		}
		if (lines[i].match(hpRex) === null)
			result += "<br>";
	}
	return result;
};
subhoReader.displayText = function(text) {
	this.updateDisplay(text);
	this.fillSuttaNumberList();
};
subhoReader.updateDisplay = function(text) {
	const resultElem = document.getElementById("textdisplay");
	let head = this.util.makeHead("Subodhālaṅkāro");
	head += this.util.ccsaHtmlText;
	resultElem.innerHTML = head + text;
	if (this.firstOpen)
		this.firstOpen = false;
	else
		this.util.scroll(resultElem, this.fixedToolBar);
};
subhoReader.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList);
};
subhoReader.goChapter = function() {
	const chapSelector = document.getElementById("chapterselector");
	let chapToGo = chapSelector.options[chapSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allH3 = resultElem.getElementsByTagName("h3");
	const success = this.findElementAndGo(allH3, chapToGo);
	if (!success) {
		const allH4 = resultElem.getElementsByTagName("h4");
		this.findElementAndGo(allH4, chapToGo);
	}
};
subhoReader.findElementAndGo = function(list, str) {
	let success = false;
	for (let i=0; i<list.length; i++) {
		const elem = list[i];
		const text = list[i].textContent.trim();
		if (text === str) {
			this.util.scroll(elem, this.fixedToolBar);
			success = true;
			break;
		}
	}
	return success;
};
subhoReader.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = allP[i].childNodes;
		for (let n=0; n<nodes.length; n++) {
			const elm = nodes[n];
			if (elm.nodeType === Node.TEXT_NODE) {
				const text = nodes[n].textContent.trim();
				const rex = new RegExp("^" + suttaToGo + "\\.");
				if (text.match(rex) !== null) {
					this.util.scroll(p, this.fixedToolBar);
					break;
				}
			}
		}
	}
};



