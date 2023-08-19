/*! saddreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const saddReader = {};
saddReader.util = {};
saddReader.params = {};
saddReader.suttas = {};
saddReader.fixedToolBar = false;
saddReader.getUrlParams = function() {
	const result = {};
	const url = location.href;
	const dlpos = url.lastIndexOf("/");
	if (dlpos > -1) {
		const sut = url.slice(dlpos+1);
		if (sut === "sadd")
			result["sutta"] = "1";
		else
			result["sutta"] = sut;
	}
	return result;
};
saddReader.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/saddsut1-7.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		saddReader.formatText(window.pako.ungzip(response, { to: "string" }));
		saddReader.displayText();
		saddReader.fillSuttaNumberList();
		saddReader.util.setSelectSelection(document.getElementById("suttaselector"), saddReader.params.sutta);
	};
	this.util.ajaxLoad(ajaxParams);
};
saddReader.displayText = function(sutta) {
	if (sutta !== undefined)
		this.params.sutta = sutta;
	const resultElem = document.getElementById("textdisplay");
	let text = "";
	if (this.params.sutta in this.suttas) {
		text += this.suttas[this.params.sutta];
		text += "<br>" + this.util.ccsaHtmlText;
	} else {
		text += "Content not found";
	}
	resultElem.innerHTML = text;
};
saddReader.formatText = function(text) {
	const lines = text.split(/\r?\n/);
	let pstarted = false;
	let htmltext = "";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/^<b>\d+\./) !== null) {
			const pstyle = " style='text-align:left;padding-top:5px;'";
			if (!pstarted) {
				htmltext += "\n<p" + pstyle + ">\n";
				pstarted = true;
			} else {
				htmltext += "\n</p>\n<p" + pstyle + ">\n";
			}
			htmltext += lines[i];
		} else {
			if (!lines[i].startsWith("<h"))
				htmltext += "\t" + lines[i];
		}
		htmltext += "<br>";
	}
	if (pstarted)
		htmltext += "\n</p>\n";
	const allP = this.util.getHtmlPList(htmltext);
	for (let i=0; i<allP.length; i++) {
		const s = i + 1;
		saddReader.suttas[""+s] = allP[i];
	}
};
saddReader.fillSuttaNumberList = function() {
	const suttaSelector = document.getElementById("suttaselector");
	this.util.clearNode(suttaSelector);
	const suttaList = Object.keys(this.suttas);
	for (let i=0; i<suttaList.length; i++) {
		const opt = document.createElement("option");
		opt.value = suttaList[i];
		opt.innerText = suttaList[i];
		suttaSelector.appendChild(opt);
	}
};
saddReader.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	this.displayText(suttaToGo);
};

