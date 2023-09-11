/*! niruttireader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const niruttiReader = {};
niruttiReader.util = {};
niruttiReader.nirumoggUtil = {};
niruttiReader.chapterList = [];
niruttiReader.suttaNumberList = [];
niruttiReader.suttaFormulaList = [];
niruttiReader.textCache = "";
niruttiReader.suttaCache = {};
niruttiReader.fixedToolBar = false;
niruttiReader.firstOpen = true;
niruttiReader.loadText = function() {
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/niru.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		niruttiReader.textCache = niruttiReader.formatText(content);
		niruttiReader.getSuttaList();
		niruttiReader.displayText();
	};
	this.util.ajaxLoad(ajaxParams);
};
niruttiReader.formatText = function(text) {
	let result = "";
	result += this.util.makeHead("Niruttidīpanī");
	result += this.util.ccsaHtmlText;
	result += "<br>";
	const lines = text.split(/\r?\n/);
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			result += "\n" + lines[i].replace("<p>", "<p style='text-align:left;padding-top:5px;'>") + "\n";
		} else if (lines[i].startsWith("</p>")) {
			result += "\n" + lines[i] + "\n";
		} else if (lines[i].startsWith("<h3>")) {
			result += lines[i];
			const ln = lines[i];
			const ch = ln.slice(ln.indexOf(">")+1, ln.lastIndexOf("<")).trim();
			this.chapterList.push(ch);
		} else if (lines[i].match(/^\d/) !== null) {
			const ln = lines[i].trim();
			const firstdot = ln.indexOf(".");
			const sn = ln.slice(0, firstdot);
			this.suttaNumberList.push(sn);
			const monum = this.nirumoggUtil.getMoggNumber(sn);
			const molink = monum.length > 0 ? " (mo. " + monum + ")" : "";
			const lnmo = this.nirumoggUtil.addNiruXrefLinks(ln + molink);
			this.suttaFormulaList.push(lnmo);
			result += lnmo;
		} else {
			const spaces = "&nbsp;&nbsp;&nbsp;&nbsp;";
			const tab = lines[i].startsWith("<h") ? "" : spaces;
			result += tab + lines[i];
		}
		if (lines[i].match(/<\/?[hp]/) === null)
			result += "<br>";
	}
	return result;
};
niruttiReader.displayText = function() {
	this.updateDisplay();
	this.fillChapterList();
	this.fillSuttaNumberList();
};
niruttiReader.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const withNotes = document.getElementById("withnotes");
	const onlyFormulas = document.getElementById("onlyformulas");
	if (onlyFormulas.checked) {
		let htext = "";
		for (const h of this.suttaFormulaList) {
			htext += withNotes.checked ? h : h.replace(/ \[.*?\]/g, "");
			htext += "<br>";
		}
		resultElem.innerHTML = htext;
		withNotes.disabled = false;
	} else {
		withNotes.disabled = true;
		withNotes.checked = true;
		resultElem.innerHTML = this.textCache;
	}
	document.getElementById("chapterselector").disabled = onlyFormulas.checked;
	document.getElementById("suttaselector").disabled = onlyFormulas.checked;
	if (this.firstOpen)
		this.firstOpen = false;
	else
		this.util.scroll(resultElem, this.fixedToolBar);
};
niruttiReader.getSuttaList = function() {
	const plist = this.util.getHtmlPList(this.textCache);
	for (let i=0; i<plist.length; i++) {
		const pid = this.suttaNumberList[i];
		this.suttaCache[pid] = plist[i];
	}
};
niruttiReader.fillChapterList = function() {
	this.util.fillSelectOptions(document.getElementById("chapterselector"), this.chapterList);
};
niruttiReader.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList);
};
niruttiReader.goChapter = function() {
	const chapSelector = document.getElementById("chapterselector");
	let chapToGo = chapSelector.options[chapSelector.selectedIndex].value.trim();
	const resultElem = document.getElementById("textdisplay");
	const allH3 = resultElem.getElementsByTagName("h3");
	this.findElementAndGo(allH3, chapToGo);
};
niruttiReader.findElementAndGo = function(list, str) {
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
niruttiReader.goSutta = function() {
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
				const text = elm.textContent.trim();
				const rex = new RegExp("^" + suttaToGo + "\\.");
				if (text.match(rex) !== null) {
					this.util.scroll(p, this.fixedToolBar);
					break;
				}
			}
		}
	}
};

