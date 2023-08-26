/*! mdreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const mdReader = {};
mdReader.util = {};
mdReader.partPali = [ "Paṭhamo", "Dutiyo" ];
mdReader.params = {};
mdReader.pnList = [];
mdReader.transWindow = {};
mdReader.fixedToolBar = false;
mdReader.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("v" in vars)
		result["volume"] = vars.v;
	else
		result["volume"] = "1";
	if ("pn" in vars)
		result["paranum"] = vars.pn;
	return result;
};
mdReader.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/md/md0" + this.params.volume + ".gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		mdReader.displayText(content);
	};
	this.util.ajaxLoad(ajaxParams);
};
mdReader.displayText = function(text) {
	const volbutt = document.getElementById("volumebutton");
	volbutt.innerText = this.params.volume === "1" ? "Go Vol. II" : "Go Vol. I";
	const resultElem = document.getElementById("textdisplay");
	resultElem.innerHTML = this.formatText(text);
	this.fillParaNumList();
	if ("paranum" in this.params) {
		this.util.setSelectSelection(document.getElementById("paranumselector"), this.params.paranum);
		this.goParaNum();
	}
};
mdReader.formatText = function(text) {
	let part = parseInt(this.params.volume);
	let result = "";
	result += this.util.makeHead("Maṅgalatthadīpanī " + this.partPali[part-1] + " Bhāgo");
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
		} else if (lines[i].match(/^\s*\[\d+]/) !== null) {
			const ln = lines[i].trim();
			const pn = ln.slice(1, ln.indexOf("]"));
			this.pnList.push(pn);
			result += lines[i];
		} else {
			result += lines[i];
		}
		result += "<br>";
	}
	result += "</p>";
	return result;
};
mdReader.goVolume = function() {
	const vol = this.params.volume === "1" ? "2" : "1";
	const url = "/mdreader?v=" + vol;
	window.open(url, "_self");
};
mdReader.fillParaNumList = function() {
	this.util.fillSelectOptions(document.getElementById("paranumselector"), this.pnList);
};
mdReader.goParaNum = function() {
	const pnSelector = document.getElementById("paranumselector");
	const pnToGo = pnSelector.options[pnSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.childNodes;
		for (let n=0; n<nodes.length; n++) {
			if (nodes[n].nodeType === Node.TEXT_NODE) {
				const text = nodes[n].textContent.trim();
				if (text.startsWith("[" + pnToGo + "]")) {
					this.util.scroll(p, this.fixedToolBar);
					break;
				}
			}
		}
	}
	this.syncThai();
};
mdReader.syncThai = function() {
	const syncthai = document.getElementById("syncthai");
	if (syncthai.checked && "document" in this.transWindow) {
		const pnSelector = document.getElementById("paranumselector");
		const pnToGo = pnSelector.options[pnSelector.selectedIndex].value;
		this.transWindow.mdThai.goParaNum(pnToGo);
	}
};
mdReader.openTransThai = function() {
	const pnSelector = document.getElementById("paranumselector");
	const pnToGo = pnSelector.options[pnSelector.selectedIndex].value;
	this.transWindow = window.open("/mdthai?v=" + this.params.volume + "&pn=" + pnToGo, "md-trans-thai");
};

