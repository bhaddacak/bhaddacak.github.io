/*! nirusingle.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const niruSingle = {};
niruSingle.util = {};
niruSingle.nirumoggUtil = {};
niruSingle.params = {};
niruSingle.suttaNumberList = [];
niruSingle.suttaList = [];
niruSingle.fixedToolBar = false;
niruSingle.getUrlParams = function() {
	const result = {};
	const sutta = this.util.getUrlSingleVar(location.href);
	result["sutta"] = sutta.length > 0 ? sutta : "1";
	return result;
};
niruSingle.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/niru.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		niruSingle.suttaList = niruSingle.formatText(content);
		niruSingle.displayText();
		niruSingle.fillSuttaNumberList();
		niruSingle.util.setSelectSelection(document.getElementById("suttaselector"), niruSingle.params.sutta);
	};
	this.util.ajaxLoad(ajaxParams);
};
niruSingle.formatText = function(text) {
	const lines = text.split(/\r?\n/);
	let htmltext = "";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			htmltext += "\n" + lines[i].replace("<p>", "<p style='text-align:left;padding-top:5px;'>") + "\n";
		} else if (lines[i].startsWith("</p>")) {
			htmltext += "\n" + lines[i] + "\n";
		} else if (lines[i].match(/^\d/) !== null) {
			const ln = lines[i].trim();
			const firstdot = ln.indexOf(".");
			const sn = ln.slice(0, firstdot);
			this.suttaNumberList.push(sn);
			const monum = this.nirumoggUtil.getMoggNumber(sn);
			const molink = monum.length > 0 ? " (mo. " + monum + ")" : "";
			const lnmo = this.nirumoggUtil.addNiruXrefLinks(ln + molink);
			htmltext += lnmo;
		} else {
			htmltext += "\t" + lines[i];
		}
		if (lines[i].match(/<\/?p/) === null)
			htmltext += "<br>";
	}
	return this.util.getHtmlPList(htmltext);
};
niruSingle.displayText = function(suttaKey) {
	if (suttaKey !== undefined)
		this.params.sutta = suttaKey.match(/^\d+/)[0];
	this.updateDisplay();
};
niruSingle.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const ind = this.suttaNumberList.indexOf(this.params.sutta);
	let text = "";
	if (ind > -1) {
		text += this.suttaList[ind];
		text += "<br>" + this.util.ccsaHtmlText;
	} else {
		text += "Content not found";
	}
	resultElem.innerHTML = text;
};
niruSingle.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList);
};
niruSingle.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	this.displayText(suttaToGo);
};
