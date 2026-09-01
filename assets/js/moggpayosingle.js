/*! moggpayosingle.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const moggpayoSingle = {};
moggpayoSingle.util = {};
moggpayoSingle.book = "";
moggpayoSingle.nirumoggUtil = {};
moggpayoSingle.params = {};
moggpayoSingle.suttaNumberList = { "mogg": [], "payo": [] , "panct": [] };
moggpayoSingle.suttaList = { "mogg": [], "payo": [] , "panct": [] };
moggpayoSingle.fixedToolBar = false;
moggpayoSingle.getUrlParams = function() {
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
		result["sutta"] = this.book === "mogg" ? "1.1" : "1";
	}
	return result;
};
moggpayoSingle.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/moggpayo.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		const payoPos = content.indexOf("<!--payogasiddhi-->");
		moggpayoSingle.suttaList.mogg = moggpayoSingle.formatText(content.slice(0, payoPos), "mogg");
		moggpayoSingle.suttaList.payo = moggpayoSingle.formatText(content.slice(payoPos), "payo");
		moggpayoSingle.displayText();
		moggpayoSingle.fillSuttaNumberList();
		const suttaKey = moggpayoSingle.book === "mogg" ? moggpayoSingle.params.sutta : moggpayoSingle.getPayoKey(moggpayoSingle.params.sutta);
		moggpayoSingle.util.setSelectSelection(document.getElementById("suttaselector"), suttaKey);
	};
	this.util.ajaxLoad(ajaxParams);
};
moggpayoSingle.includePancika = function() {
	if (this.suttaList.panct.length === 0) {
		const ajaxParams = {};
		ajaxParams.address = "/assets/palitext/gram/panct.gz";
		ajaxParams.isBinary = true;
		ajaxParams.successCallback = function(response) {
			const content = window.pako.ungzip(response, { to: "string" });
			moggpayoSingle.suttaList.panct = moggpayoSingle.formatText(content, "panct");
			moggpayoSingle.updateDisplay();
		};
		this.util.ajaxLoad(ajaxParams);
	}
	moggpayoSingle.updateDisplay();
};
moggpayoSingle.formatText = function(text, book) {
	const lines = text.split(/\r?\n/);
	let htmltext = "";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			htmltext += "\n" + lines[i].replace("<p>", "<p style='text-align:left;padding-top:5px;'>") + "\n";
		} else if (lines[i].startsWith("</p>")) {
			htmltext += "\n" + lines[i] + "\n";
		} else if (lines[i].match(/^<b>[[\d]/) !== null) {
			htmltext += lines[i];
			const ln = lines[i].trim();
			const firstdot = ln.indexOf(".");
			const sn = ln.slice(3, ln.indexOf(".", firstdot+1));
			this.suttaNumberList[book].push(sn);
		} else {
			htmltext += "\t" + lines[i];
		}
		if (lines[i].match(/<\/?p/) === null)
			htmltext += "<br>";
	}
	return this.util.getHtmlPList(htmltext);
};
moggpayoSingle.displayText = function(suttaKey) {
	if (suttaKey !== undefined)
		this.params.sutta = this.book === "mogg" ? suttaKey : suttaKey.slice(suttaKey.indexOf("[")+1, suttaKey.indexOf("]"));
	this.updateDisplay();
};
moggpayoSingle.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const xRef = document.getElementById("xref");
	const pancSelected = document.getElementById("pancika").checked;
	const suttaKey = this.book === "mogg" ? this.params.sutta : this.getPayoKey(this.params.sutta);
	const ind = this.suttaNumberList[this.book].indexOf(suttaKey);
	let text = "";
	if (ind > -1) {
		text += this.suttaList[this.book][ind];
		if (xRef.checked) {
			let refText = "";
			if (this.book === "mogg") {
				const niruNum = this.nirumoggUtil.getNiruNumber(this.params.sutta);
				if (niruNum.length > 0)
					refText += this.nirumoggUtil.addMoggXrefLinks("Niru " + niruNum.join(", ")) + "<br>";
				const payoKeys = this.getPayoSuttaNumber(this.params.sutta);
				for (const key of payoKeys)
					refText += this.suttaList.payo[this.suttaNumberList.payo.indexOf(key)];
				if (pancSelected) {
					const pancInd = this.suttaNumberList.panct.indexOf(this.params.sutta);
					if (pancInd > -1)
						refText += this.suttaList.panct[pancInd];
				}
			} else {
				const moggKeys = this.getMoggSuttaNumber(this.params.sutta);
				for (const key of moggKeys) {
					const niruNum = this.nirumoggUtil.getNiruNumber(key);
					if (niruNum.length > 0)
						refText += this.nirumoggUtil.addMoggXrefLinks("Niru " + niruNum.join(", ")) + "<br>";
					refText += this.suttaList.mogg[this.suttaNumberList.mogg.indexOf(key)];
					if (pancSelected) {
						const pancInd = this.suttaNumberList.panct.indexOf(key);
						if (pancInd > -1)
							refText += this.suttaList.panct[pancInd];
					}
				}
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
moggpayoSingle.getMoggSuttaNumber = function(payoNum) {
	let result = [];
	const rex = new RegExp("\\[" + payoNum + "\\]");
	for (const key of this.suttaNumberList.payo) {
		if (key.match(rex) !== null) {
			result.push(key.slice(key.indexOf("]") + 2));
		}
	}
	return result;
};
moggpayoSingle.getPayoSuttaNumber = function(moggNum) {
	let result = [];
	const rex = new RegExp(moggNum.replace(".", "\\.") + "$");
	for (const key of this.suttaNumberList.payo) {
		if (key.match(rex) !== null) {
			result.push(key);
		}
	}
	return result;
};
moggpayoSingle.getPayoKey = function(payoNum) {
	let result = "";
	const rex = new RegExp("\\[" + payoNum + "\\]");
	for (const key of this.suttaNumberList.payo) {
		if (key.match(rex) !== null) {
			result = key;
			break;
		}
	}
	return result;
};
moggpayoSingle.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList[this.book]);
};
moggpayoSingle.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	this.displayText(suttaToGo);
};


