/*! subhotreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const subhotReader = {};
subhotReader.util = {};
subhotReader.fixedToolBar = false;
subhotReader.firstOpen = true;
subhotReader.loadText = function() {
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/subhot.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		subhotReader.displayText(subhotReader.formatText(content));
	};
	this.util.ajaxLoad(ajaxParams);
};
subhotReader.formatText = function(text) {
	let result = "";
	const lines = text.split(/\r?\n/);
	const pstyle = "style='text-align:left;padding-top:5px;'";
	const tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
	result += "<br>";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<div>")) {
			result += lines[i].replace("<div>", "<div " + pstyle + ">");
		} else if (lines[i].match(/^\d+\.$/) !== null) {
			result += lines[i];
		} else if (lines[i].match(/^\d+[-0-9]*\. .*/) !== null) {
			result += "<br>" + tab + lines[i];
		} else {
			const indent = lines[i].startsWith("<h") ? "" : tab ;
			result += indent + lines[i];
		}
		if (lines[i].match(/<h/) === null && lines[i].match(/<\/?div/) === null)
			result += "<br>";
	}
	return result;
};
subhotReader.displayText = function(text) {
	this.updateDisplay(text);
	this.fillSuttaNumberList();
};
subhotReader.updateDisplay = function(text) {
	const resultElem = document.getElementById("textdisplay");
	let head = this.util.makeHead("Subodhālaṅkāraṭīkā");
	head += this.util.ccsaHtmlText;
	resultElem.innerHTML = head + text;
	if (this.firstOpen)
		this.firstOpen = false;
	else
		this.util.scroll(resultElem, this.fixedToolBar);
};
subhotReader.fillSuttaNumberList = function() {
	const list = [];
	for (let i=1; i<=367; i++)
		list.push(""+i);
	this.util.fillSelectOptions(document.getElementById("suttaselector"), list);
};
subhotReader.goChapter = function() {
	const chapSelector = document.getElementById("chapterselector");
	let chapToGo = chapSelector.options[chapSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allH4 = resultElem.getElementsByTagName("h4");
	this.findElementAndGo(allH4, chapToGo);
};
subhotReader.findElementAndGo = function(list, str) {
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
subhotReader.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("div");
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




