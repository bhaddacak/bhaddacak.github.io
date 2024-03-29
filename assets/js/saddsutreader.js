/*! saddsutreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const saddsutReader = {};
saddsutReader.util = {};
saddsutReader.params = {};
saddsutReader.suttaNumberList = [];
saddsutReader.suttaFormulaList = [];
saddsutReader.textCache = { "1-7": "", "8-9": "" };
saddsutReader.currChapter = "1";
saddsutReader.firstOpen = true;
saddsutReader.fixedToolBar = false;
saddsutReader.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("c" in vars)
		result["chapter"] = vars.c;
	if ("s" in vars)
		result["sutta"] = vars.s;
	return result;
};
saddsutReader.getChapterGroup = function(chap) {
	const ch = "" + chap;
	return ch < "8" ? "1-7" : "8-9";
};
saddsutReader.loadText = function(chap) {
	this.params = this.getUrlParams();
	if (chap === undefined) 
		this.currChapter = "chapter" in this.params ? this.params.chapter : "1";
	else
		this.currChapter = chap;
	const textGrp = this.getChapterGroup(this.currChapter);
	if (this.textCache[textGrp].length > 0) {
		this.displayText(this.textCache[textGrp]);
		return;
	}
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/saddsut" + textGrp + ".gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = saddsutReader.formatText(window.pako.ungzip(response, { to: "string" }));
		saddsutReader.textCache[textGrp] = content;
		saddsutReader.displayText(content);
	};
	this.util.ajaxLoad(ajaxParams);
};
saddsutReader.displayText = function(text) {
	const resultElem = document.getElementById("textdisplay");
	if (this.currChapter < "8") {
		if (document.getElementById("onlyformulas").checked)
			resultElem.innerHTML = this.suttaFormulaList.join("<br>");
		else
			resultElem.innerHTML = text;
		this.fillSuttaNumberList();
	} else {
		resultElem.innerHTML = text;
	}
	if ("chapter" in this.params) {
		this.util.setSelectSelection(document.getElementById("chapterselector"), this.params.chapter);
		this.goChapter(this.params.chapter);
	} else if ("sutta" in this.params) {
		this.util.setSelectSelection(document.getElementById("suttaselector"), this.params.sutta);
		this.goSutta();
	} else {
		if (this.firstOpen)
			this.firstOpen = false;
		else
			this.goChapter(this.currChapter);
	}
};
saddsutReader.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const onlyFor = document.getElementById("onlyformulas");
	if (onlyFor.checked) {
		resultElem.innerHTML = this.suttaFormulaList.join("<br>");
		this.util.scroll(resultElem, this.fixedToolBar);
	} else {
		resultElem.innerHTML = this.textCache["1-7"];
		this.goChapter(this.currChapter);
	}
	document.getElementById("chapterselector").disabled = onlyFor.checked;
	document.getElementById("suttaselector").disabled = onlyFor.checked;
};
saddsutReader.formatText = function(text) {
	let result = "";
	result += this.util.makeHead("Saddanītippakaraṇassa Suttamālā");
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	let pstarted = false;
	result += "<br>";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/^<b>\d+\./) !== null) {
			const pstyle = " style='text-align:left;padding-top:5px;'";
			if (!pstarted) {
				result += "<p" + pstyle + ">";
				pstarted = true;
			} else {
				result += "</p><p" + pstyle + ">";
			}
			result += lines[i];
			const ln = lines[i].trim();
			const sn = ln.slice(3, ln.indexOf("."));
			this.suttaNumberList.push(sn);
			this.suttaFormulaList.push(lines[i]);
		} else {
			const tab = lines[i].startsWith("<h") ? "<br>" : "\t";
			result += tab + lines[i];
		}
		if (!lines[i].startsWith("<h"))
			result += "<br>";
	}
	if (pstarted)
		result += "</p>";
	return result;
};
saddsutReader.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList);
};
saddsutReader.goChapter = function(chap) {
	let chapToGo;
	if (chap === undefined) {
		const chapSelector = document.getElementById("chapterselector");
		chapToGo = chapSelector.options[chapSelector.selectedIndex].value;
	} else {
		chapToGo = chap;
	}
	const chgrp = this.getChapterGroup(chapToGo);
	if (chgrp !== this.getChapterGroup(this.currChapter)) {
		this.loadText(chapToGo);
		return;
	}
	const suttaSelector = document.getElementById("suttaselector");
	const onlyFormulas = document.getElementById("onlyformulas");
	suttaSelector.disabled = chgrp === "8-9";
	onlyFormulas.disabled = chgrp === "8-9";
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
saddsutReader.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.getElementsByTagName("b");
		for (let n=0; n<nodes.length; n++) {
			const text = nodes[n].textContent.trim();
			const rex = new RegExp("^" + suttaToGo + "\\.");
			if (text.match(rex) !== null) {
				this.util.scroll(p, this.fixedToolBar);
				break;
			}
		}
	}
};
