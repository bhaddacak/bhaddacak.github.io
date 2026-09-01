/*! saddpadreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const saddpadReader = {};
saddpadReader.util = {};
saddpadReader.params = {};
saddpadReader.fixedToolBar = false;
saddpadReader.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("c" in vars)
		result["chapter"] = vars.c;
	return result;
};
saddpadReader.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/saddpad.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = saddpadReader.formatText(window.pako.ungzip(response, { to: "string" }));
		saddpadReader.displayText(content);
	};
	this.util.ajaxLoad(ajaxParams);
};
saddpadReader.formatText = function(text) {
	let result = "";
	result += this.util.makeHead("Saddanītippakaraṇassa Padamālā");
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	result += "<br>";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		const tab = lines[i].startsWith("<h") ? "" : "\t";
		result += tab + lines[i];
		if (!lines[i].startsWith("<h"))
			result += "<br>";
	}
	return result;
};
saddpadReader.displayText = function(text) {
	const resultElem = document.getElementById("textdisplay");
	resultElem.innerHTML = text;
	if (this.params.chapter !== undefined) {
		this.util.setSelectSelection(document.getElementById("chapterselector"), this.params.chapter);
		this.goChapter(this.params.chapter);
	}
};
saddpadReader.goChapter = function(chap) {
	let chapToGo;
	if (chap === undefined) {
		const chapSelector = document.getElementById("chapterselector");
		chapToGo = chapSelector.options[chapSelector.selectedIndex].value;
	} else {
		chapToGo = chap;
	}
	const resultElem = document.getElementById("textdisplay");
	const allH = resultElem.getElementsByTagName("h3");
	for (let i=0; i<allH.length; i++) {
		const h = allH[i];
		const text = allH[i].textContent.trim();
		if (text.startsWith(chapToGo + ".")) {
			this.util.scroll(h, this.fixedToolBar);
			break;
		}
	}
};
