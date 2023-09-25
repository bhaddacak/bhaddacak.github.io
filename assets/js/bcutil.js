/*! bcutil.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const bcUtil = {};
bcUtil.paliChars = [ "a", "ā", "i", "ī", "u", "ū", "e", "o", "k", "kh", "g", "gh", "ṅ", "c", "ch", "j", "jh", "ñ", "ṭ", "ṭh", "ḍ", "ḍh", "ṇ", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "s", "h", "ḷ", "ṃ" ];
bcUtil.hasH = "kgcjṭḍtdpb";
bcUtil.thaiNum = "๐๑๒๓๔๕๖๗๘๙";
bcUtil.ccsaHtmlText = "<div style='text-align:center;font-size:0.8em;'>This work is licensed under a <a href='http://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons Attribution-ShareAlike 4.0 International License</a>.</div>";
bcUtil.clearNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};
bcUtil.makeHead = function(text, hlevel) {
	const tag = hlevel === undefined ? "h3" : "h"+hlevel;
	return "<" + tag + " id='texthead' style='text-align:center;'>" + text + "</" + tag + ">";
};
bcUtil.getUrlVars = function(url) {
	const result = {};
	const qpos = url.indexOf("?");
	if (qpos > -1) {
		const chunks = url.slice(qpos+1).split("&");
		for (let i=0; i<chunks.length; i++) {
			const epos = chunks[i].indexOf("=");
			if (epos > -1) {
				const vname = chunks[i].slice(0, epos);
				const vval = chunks[i].slice(epos+1);
				result[vname] = vval;
			} else {
				result[chunks[i]] = "";
			}
		}
	}
	return result;
};
bcUtil.getUrlSingleVar = function(url) {
	let result = "";
	const dlpos = url.indexOf("?");
	if (dlpos > -1) {
		result = url.slice(dlpos+1);
	}
	return result;
};
bcUtil.scroll = function(element, condition) {
	if (condition)
		this.scrollIntoView(element);
	else
		element.scrollIntoView();
};
bcUtil.scrollIntoView = function(element, offset) {
	if (offset === undefined)
		offset = 27;
	let dims = element.getBoundingClientRect(); 
	window.scrollTo(window.scrollX, dims.top - offset + window.scrollY); 
};
bcUtil.ajaxLoad = function(params) {
	const request = new XMLHttpRequest();
	if (params.isBinary)
		request.responseType = "arraybuffer"; 
	request.open("GET", params.address, true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			const res = params.isBinary ? request.response : request.responseText;
			params.successCallback(res);
		} else {
			if (params.failureCallback)
				params.failureCallback();
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
};
bcUtil.globalThemeCheck = function() {
	if (localStorage.getItem("globaltheme")) {
		if (localStorage.getItem("globaltheme") === "dark")
			bcUtil.toggleGlobalTheme();
	} else {
		localStorage.setItem("globaltheme", "light");
	}
};
bcUtil.toggleGlobalTheme = function() {
	const body = document.body;
	const header = document.getElementById("main-header");
	const footer = document.getElementById("main-footer");
	body.parentNode.classList.toggle("dark-theme");
	body.classList.toggle("dark-theme");
	header.classList.toggle("dark-theme");
	footer.classList.toggle("dark-theme");
};
bcUtil.toggleGlobalThemeSave = function() {
	bcUtil.toggleGlobalTheme();
	const theme = localStorage.getItem("globaltheme") === "light" ? "dark" : "light";
	localStorage.setItem("globaltheme", theme);
};
bcUtil.toggleToolBar = function(obj) {
	const toolbar = document.getElementById("toolbar");
	if (obj.fixedToolBar)
		toolbar.classList.remove("fixed");
	else
		toolbar.classList.add("fixed");
	obj.fixedToolBar = !obj.fixedToolBar;
};
bcUtil.toArabicNum = function(num) {
	let result = "";
	for (let i=0; i<num.length; i++) {
		const ch = num.charAt(i);
		const chPos = this.thaiNum.indexOf(ch);
		if (chPos > -1)
			result += chPos;
	}
	return result;
};
bcUtil.toThaiNum = function(num) {
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
bcUtil.fillSelectOptions = function(selElem, textList, param) {
	this.clearNode(selElem);
	for (let i=0; i<textList.length; i++) {
		const opt = document.createElement("option");
		if (param) {
			if (typeof param === "function")
				opt.value = param(textList[i]);
			else
				opt.value = param[i];
		} else {
			opt.value = textList[i];
		}
		opt.innerText = textList[i];
		selElem.appendChild(opt);
	}
};
bcUtil.setSelectSelection = function(selElem, val) {
	for (let i=0; i<selElem.options.length; i++) {
		if (selElem.options[i].value === val) {
			selElem.options[i].selected = true;
			break;
		}
	}
};
bcUtil.findSelectIndex = function(selElem, val) {
	let ind = -1;
	if (selElem) {
		const opts = selElem.options;
		for (let i=0; i<opts.length; i++) {
			if (opts[i].value === val) {
				ind = i;
				break;
			}
		}
	}
	return ind;
};
bcUtil.indexOfFirstDigit = function(str) {
	let ind = -1;
	for (let i=0; i<str.length; i++) {
		if (!isNaN(str.charAt(i))) {
			ind = i;
			break;
		}
	}
	return ind;
};
bcUtil.getNumSeq = function(input, delim) {
	if (delim === undefined)
		delim = ">";
	const result = [];
	const startend = input.split(delim);
	const start = parseInt(startend[0]);
	const end = parseInt(startend[1]);
	for (let n=start; n<=end; n++)
		result.push(n);
	return result;
};
bcUtil.getHtmlPList = function(htext) {
	const result = [];
	let buffer = "";
	const lines = htext.split(/\r?\n/);
	for (let i=0; i<lines.length; i++) {
		const line = lines[i].trim().toLowerCase();
		if (line.startsWith("<p ") || line.startsWith("<p>")) {
			buffer = lines[i];
		} else if (line.startsWith("</p>")) {
			buffer += lines[i];
			result.push(buffer);
		} else {
			buffer += lines[i];
		}
	}
	return result;
};
bcUtil.interweaveHtmlP = function(list1, list2) {
	let result = "";
	const max = list1.length >= list2.length ? list1.length : list2.length;
	for (let i=0; i<max; i++) {
		result += list1[i];
		result += list2[i];
	}
	return result;
};
bcUtil.decomposePali = function(text) {
	const result = [];
	let i = 0;
	for (; i<text.length-1; i++) {
		const ch = text.charAt(i);
		if (this.hasH.indexOf(ch) > -1 && text.charAt(i+1) === "h") {
			i++;
			result.push(ch + "h");
		} else {
			result.push(ch);
		}
	}
	if (i < text.length)
		result.push(text.charAt(i));
	return result;
};
bcUtil.comparePali = function(term1, term2) {
	const t1 = this.decomposePali(term1);
	const t2 = this.decomposePali(term2);
	if (t1.length === 0) {
		if (t2.length === 0)
			return 0;
		else
			return 1;
	}
	let i = 0;
	for (; i<t1.length; i++) {
		const ch1 = t1[i];
		const ch2 = i<t2.length ? t2[i] : "";
		const pos1 = this.paliChars.indexOf(ch1);
		const pos2 = this.paliChars.indexOf(ch2);
		if (pos1 - pos2 === 0) {
			continue;
		} else {
			return(pos1 - pos2);
		}
	}
	if (i === t2.length)
		return 0;
	else
		return -1;
};
