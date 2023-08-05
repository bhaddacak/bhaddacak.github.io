/*! mdthai.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const mdThai = {};
mdThai.thaiNum = "๐๑๒๓๔๕๖๗๘๙";
mdThai.partList = [[[1, 114], [115, 417]], [[1, 260], [261, 468], [469, 627]]];
mdThai.params = {};
mdThai.pnList = [];
mdThai.getUrlParams = function() {
	const result = {};
	const url = location.href;
	const qpos = url.indexOf("?");
	if (qpos > -1) {
		const params = url.slice(qpos);
		const vpos = params.indexOf("v=");
		if (vpos > -1) {
			let volume = params.slice(vpos + 2);
			const apos = volume.indexOf("&");
			volume = apos > -1 ? volume.slice(0, apos) : volume;
			result["volume"] = volume;
		} else {
			result["volume"] = "1";
		}
		const pnpos = params.indexOf("pn=");
		if (pnpos > -1) {
			let paranum = params.slice(pnpos + 3);
			const apos = paranum.indexOf("&");
			paranum = apos > -1 ? paranum.slice(0, apos) : paranum;
			result["paranum"] = paranum;
		} else {
			result["paranum"] = "1";
		}
	} else {
		result["paranum"] = "1";
		result["volume"] = "1";
	}
	return result;
};
mdThai.clearNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
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
mdThai.loadText = function() {
	this.params = this.getUrlParams();
	const thaiVol = this.getThaiVolume(this.params.volume, this.params.paranum);
	const request = new XMLHttpRequest();
	request.responseType = "arraybuffer"; 
	request.open("GET", "/assets/palitext/md/md0" + thaiVol + "th.gz", true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			const content = window.pako.ungzip(request.response, { to: "string" });
			mdThai.displayText(content);
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
};
mdThai.displayText = function(text) {
	const resultElem = document.getElementById("textdisplay");
	resultElem.innerHTML = this.formatText(text);
	this.fillParaNumList();
	if ("paranum" in this.params) {
		this.setPnSelector(this.params.paranum);
		this.goParaNum();
	}
};
mdThai.formatText = function(text) {
	const thaiVol = this.getThaiVolume(this.params.volume, this.params.paranum);
	let result = "";
	result += "<h3 style='text-align:center;'>มังคลัตถทีปนีแปล เล่ม " + this.thaiNum[thaiVol] + "</h3>";
	result += "<div style='text-align:center;font-size:0.8em;'>This work is licensed under a <a href='http://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons Attribution-ShareAlike 4.0 International License</a>.</div>";
	const lines = text.split(/\r?\n/);
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/page \d\d\d\d/) !== null) {
			if (i === 0)
				result += "<p style='text-align:left;'>";
			else
				result += "</p><p style='text-align:left;'>";
			result += lines[i];
		} else if (lines[i].match(/^\s*\[[๐๑๒๓๔๕๖๗๘๙]+]/) !== null) {
			const ln = lines[i].trim();
			const pn = ln.slice(1, ln.indexOf("]"));
			this.pnList.push(pn);
			result += lines[i];
		} else {
			result += lines[i].replace(/^\t/, "&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		result += "<br>";
	}
	result += "</p>";
	return result;
};
mdThai.toArabicNum = function(num) {
	let result = "";
	for (let i=0; i<num.length; i++) {
		const ch = num.charAt(i);
		const chPos = this.thaiNum.indexOf(ch);
		if (chPos > -1)
			result += chPos;
	}
	return result;
};
mdThai.toThaiNum = function(num) {
	let result = "";
	const numStr = "" + num;
	for (let i=0; i<numStr.length; i++) {
		const ch = numStr.charAt(i);
		const chTh = this.thaiNum.charAt(parseInt(ch));
		if (chTh !== undefined)
			result += chTh;
	}
	return result;
};
mdThai.fillParaNumList = function() {
	const pnSelector = document.getElementById("paranumselector");
	this.clearNode(pnSelector);
	for (let i=0; i<this.pnList.length; i++) {
		const opt = document.createElement("option");
		opt.value = this.pnList[i];
		opt.innerText = this.pnList[i];
		pnSelector.appendChild(opt);
	}
};
mdThai.setPnSelector = function(paranum) {
	const pnThai = this.toThaiNum(paranum);
	const pnSelector = document.getElementById("paranumselector");
	for (let i=0; i<pnSelector.options.length; i++) {
		if (pnSelector.options[i].value === pnThai) {
			pnSelector.options[i].selected = true;
			break;
		}
	}
};
mdThai.goParaNum = function() {
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
					p.scrollIntoView();
					break;
				}
			}
		}
	}
};

