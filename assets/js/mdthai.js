/*! mdthai.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const mdThai = {};
mdThai.partList = [[[1, 114], [115, 417]], [[1, 260], [261, 468], [469, 627]]];
mdThai.util = {};
mdThai.params = {};
mdThai.pnList = [];
mdThai.currThaiVol = 1;
mdThai.fixedToolBar = true;
mdThai.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("v" in vars)
		result["volume"] = vars.v;
	else
		result["volume"] = "1";
	if ("pn" in vars)
		result["paranum"] = vars.pn;
	else
		result["paranum"] = "1";
	return result;
};
mdThai.getThaiVolume = function(vol, paranum) {
	const vl = parseInt(vol);
	const pn = parseInt(paranum);
	const plist = this.partList[vl-1];
	let result = 0;
	for (let i=0; i<plist.length; i++) {
		if (pn >= plist[i][0] && pn <= plist[i][1]) {
			result = vl === 1 ? i + 1 : i + 3;
			break;
		}
	}
	return result;
};
mdThai.loadText = function(params) {
	this.params = params === undefined ? this.getUrlParams() : params;
	this.currThaiVol = this.getThaiVolume(this.params.volume, this.params.paranum);
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/md/md0" + this.currThaiVol + "th.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		mdThai.displayText(mdThai.formatText(content));
	};
	ajaxParams.failureCallback = function() {
		document.getElementById("textdisplay").innerHTML = "Content not found";
	};
	this.util.ajaxLoad(ajaxParams);
};
mdThai.displayText = function(textObj) {
	const resultElem = document.getElementById("textdisplay");
	const head = this.util.makeHead(textObj.head) + this.util.ccsaHtmlText;
	resultElem.innerHTML = head + textObj.text;
	this.pnList = textObj.topicList;
	this.fillParaNumList();
	if ("paranum" in this.params) {
		this.setPnSelector(this.params.paranum);
		this.goParaNum(this.params.paranum);
	}
};
mdThai.formatText = function(text) {
	const result = {};
	result.topicList = [];
	result.head = "มังคลัตถทีปนีแปล เล่ม " + this.util.thaiNum[this.currThaiVol];
	const lines = text.split(/\r?\n/);
	const topicRex = new RegExp("^\\s*\\[[๐๑๒๓๔๕๖๗๘๙]+\\]");
	let resultText = "";
	let pstarted = false;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/page \d\d\d\d/) !== null) {
			const pstyle = " style='text-align:left;padding-top:5px;'";
			if (!pstarted) {
				resultText += "<p" + pstyle + ">";
				pstarted = true;
			} else {
				resultText += "</p><p" + pstyle + ">";
			}
			resultText += lines[i];
		} else if (lines[i].match(topicRex) !== null) {
			const ln = lines[i].trim();
			const pn = ln.slice(1, ln.indexOf("]"));
			result.topicList.push(pn);
			resultText += lines[i];
		} else {
			resultText += lines[i];
		}
		resultText += "<br>";
	}
	resultText += "</p>";
	result.text = resultText;
	return result;
};
mdThai.fillParaNumList = function() {
	const pnSelector = document.getElementById("paranumselector");
	this.util.clearNode(pnSelector);
	for (let i=0; i<this.pnList.length; i++) {
		const pn = this.pnList[i];
		const opt = document.createElement("option");
		opt.value = pn;
		opt.innerText = pn;
		pnSelector.appendChild(opt);
	}
};
mdThai.setPnSelector = function(paranum) {
	const pnSelector = document.getElementById("paranumselector");
	const pnNum = this.util.toThaiNum(paranum);
	const selInd = this.util.findSelectIndex(pnSelector, pnNum);
	if (selInd > -1)
		pnSelector.options[selInd].selected = true;
};
mdThai.goParaNum = function(pnum) {
	if (pnum !== undefined) {
		const thaiVol = this.getThaiVolume(this.params.volume, pnum);
		if (thaiVol !== this.currThaiVol) {
			const prm = { volume: this.params.volume, paranum: pnum };
			this.loadText(prm);
			return;
		}
	}
	let pnToGo;
	const pnSelector = document.getElementById("paranumselector");
	if (pnum === undefined) {
		pnToGo = pnSelector.options[pnSelector.selectedIndex].value;
	} else {
		pnToGo = this.util.toThaiNum(pnum);
		const selInd = this.util.findSelectIndex(pnSelector, pnToGo);
		if (selInd > -1)
			pnSelector.options[selInd].selected = true;
	}
	pnToGo = "[" + pnToGo + "]";
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.childNodes;
		for (let n=0; n<nodes.length; n++) {
			if (nodes[n].nodeType === Node.TEXT_NODE) {
				const text = nodes[n].textContent.trim();
				if (text.startsWith(pnToGo)) {
					p.scrollIntoView();
					break;
				}
			}
		}
	}
};
