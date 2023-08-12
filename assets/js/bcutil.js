/*! bcutil.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const bcUtil = {};
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
		if (line.startsWith("<p ")) {
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
