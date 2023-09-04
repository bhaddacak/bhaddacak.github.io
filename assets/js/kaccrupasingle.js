/*! kaccrupasingle.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const kaccrupaSingle = {};
kaccrupaSingle.util = {};
kaccrupaSingle.book = "";
kaccrupaSingle.params = {};
kaccrupaSingle.suttaNumberList = { "kacc": [], "rupa": [] };
kaccrupaSingle.suttaList = { "kacc": [], "rupa": [] };
kaccrupaSingle.fixedToolBar = false;
kaccrupaSingle.getUrlParams = function() {
	const result = {};
	const url = location.href.endsWith("/") ? location.href.slice(0, -1) : location.href;
	const tokens = url.split("/");
	const lastChunk = tokens[tokens.length-1];
	const dlpos = lastChunk.indexOf("?");
	if (dlpos > -1) {
		this.book = lastChunk.slice(0, dlpos);
		result["sutta"] = lastChunk.slice(dlpos+1);
	} else {
		this.book = lastChunk;
		result["sutta"] = "1";
	}
	return result;
};
kaccrupaSingle.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/kaccrupa.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		const rupaPos = content.indexOf("<!--rupasiddhi-->");
		kaccrupaSingle.suttaList.kacc = kaccrupaSingle.formatText(content.slice(0, rupaPos), "kacc");
		kaccrupaSingle.suttaList.rupa = kaccrupaSingle.formatText(content.slice(rupaPos), "rupa");
		kaccrupaSingle.displayText();
		kaccrupaSingle.fillSuttaNumberList();
		const skey = kaccrupaSingle.getSuttaKey(kaccrupaSingle.params.sutta);
		kaccrupaSingle.util.setSelectSelection(document.getElementById("suttaselector"), skey);
	};
	this.util.ajaxLoad(ajaxParams);
};
kaccrupaSingle.formatText = function(text, book) {
	const lines = text.split(/\r?\n/);
	let htmltext = "";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			htmltext += "\n" + lines[i].replace("<p>", "<p style='text-align:left;padding-top:5px;'>") + "\n";
		} else if (lines[i].startsWith("</p>")) {
			htmltext += "\n" + lines[i] + "\n";
		} else if (lines[i].match(/^<b>\d+[.,]/) !== null) {
			htmltext += lines[i];
			const ln = lines[i].trim();
			const sn = ln.slice(3, ln.indexOf("."));
			this.suttaNumberList[book].push(sn);
		} else {
			htmltext += "\t" + lines[i];
		}
		if (lines[i].match(/<\/?p/) === null)
			htmltext += "<br>";
	}
	return this.util.getHtmlPList(htmltext);
};
kaccrupaSingle.displayText = function(suttaKey) {
	if (suttaKey !== undefined)
		this.params.sutta = suttaKey.match(/^\d+/)[0];
	this.updateDisplay();
};
kaccrupaSingle.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const xRef = document.getElementById("xref");
	const key = this.getSuttaKey(this.params.sutta);
	const ind = this.suttaNumberList[this.book].indexOf(key);
	let text = "";
	if (ind > -1) {
		text += this.suttaList[this.book][ind];
		if (xRef.checked) {
			let refText = "";
			if (this.book === "kacc") {
				const rupaKeys = this.getRupaSuttaNumber(this.params.sutta);
				for (const key of rupaKeys)
					refText += this.suttaList.rupa[this.suttaNumberList.rupa.indexOf(key)];
			} else {
				const kaccKeys = this.getKaccSuttaKey(this.params.sutta);
				for (const key of kaccKeys)
					refText += this.suttaList.kacc[this.suttaNumberList.kacc.indexOf(key)];
			}
			if (refText.length > 0)
				text += "<blockquote>" + refText + "</blockquote>";
		}
		text += "<br>" + this.util.ccsaHtmlText;
	} else {
		text += "Content not found";
	}
	resultElem.innerHTML = text;
};
kaccrupaSingle.getSuttaKey = function(suttaNum) {
	if (this.book === "rupa" )
		return suttaNum;
	let result = -1;
	const rex = new RegExp("^" + suttaNum + "[.,]");
	for (const key of this.suttaNumberList.kacc) {
		if (key.match(rex) !== null) {
			result = key;
			break;
		}
	}
	return result;
};
kaccrupaSingle.getKaccSuttaKey = function(rupaNum) {
	let result = [];
	if (rupaNum === "88")
		return ["271, 88, 308"];
	for (const key of this.suttaNumberList.kacc) {
		if (key.endsWith(" " + rupaNum))
			result.push(key);
	}
	return result;
};
kaccrupaSingle.getRupaSuttaNumber = function(kaccNum) {
	let result = [];
	if (kaccNum === "271")
		return ["88", "308"];
	const rex = new RegExp("^" + kaccNum + ",");
	for (const key of this.suttaNumberList.kacc) {
		if (key.match(rex) !== null) {
			const num = key.slice(key.lastIndexOf(",") + 1).trim();
			if (num.length > 0)
				result.push(num);
			break;
		}
	}
	return result;
};
kaccrupaSingle.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList[this.book]);
};
kaccrupaSingle.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	this.displayText(suttaToGo);
};


