/*! dhatvareader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const dhatvaReader = {};
dhatvaReader.util = {};
dhatvaReader.params = {};
dhatvaReader.fixedToolBar = false;
dhatvaReader.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("c" in vars)
		result["chapter"] = vars.c;
	if ("s" in vars)
		result["versenum"] = vars.s;
	else if ("v" in vars)
		result["versenum"] = vars.v;
	return result;
};
dhatvaReader.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/dhatva.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = dhatvaReader.formatText(window.pako.ungzip(response, { to: "string" }));
		dhatvaReader.displayText(content);
	};
	this.util.ajaxLoad(ajaxParams);
};
dhatvaReader.formatText = function(text) {
	let result = "";
	result += this.util.makeHead("Dhātvatthasaṅgaho");
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	result += "<br>";
	const hpRex = new RegExp("<\\/?[hp]");
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/^\d/) !== null) {
			result += lines[i];
		} else {
			const tab = lines[i].match(hpRex) === null ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "";
			result += tab + lines[i];
		}
		if (lines[i].match(hpRex) === null)
			result += "<br>";
	}
	return result;
};
dhatvaReader.displayText = function(text) {
	const resultElem = document.getElementById("textdisplay");
	resultElem.innerHTML = text;
	this.fillVerseNumberList();
	if (this.params.chapter !== undefined) {
		this.util.setSelectSelection(document.getElementById("chapterselector"), this.params.chapter);
		this.goChapter(this.params.chapter);
	} else if (this.params.versenum !== undefined) {
		this.util.setSelectSelection(document.getElementById("verseselector"), this.params.versenum);
		this.goVerse(this.params.versenum);
	}
};
dhatvaReader.fillVerseNumberList = function() {
	const verseList = [];
	for (let i=1; i<=432; i++)
		verseList.push(i);
	this.util.fillSelectOptions(document.getElementById("verseselector"), verseList);
};
dhatvaReader.goChapter = function(chap) {
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
	this.findElementAndGo(allH3, chapToGo);
};
dhatvaReader.findElementAndGo = function(list, str) {
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
dhatvaReader.goVerse = function(versenum) {
	let verseToGo;
	if (versenum === undefined) {
		const verseSelector = document.getElementById("verseselector");
		verseToGo = verseSelector.options[verseSelector.selectedIndex].value;
	} else {
		verseToGo = versenum;
	}
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = allP[i].childNodes;
		for (let n=0; n<nodes.length; n++) {
			const elm = nodes[n];
			if (elm.nodeType === Node.TEXT_NODE) {
				const text = nodes[n].textContent.trim();
				const rex = new RegExp("^" + verseToGo + "\\.");
				if (text.match(rex) !== null) {
					this.util.scroll(p, this.fixedToolBar);
					break;
				}
			}
		}
	}
};

