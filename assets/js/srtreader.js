/*! srtreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const srtReader = {};
srtReader.original = null;
srtReader.dehyphenated = null;
srtReader.clearNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};
srtReader.loadText = function() {
	this.displayText("Loading... (please wait)");
	const textSelector = document.getElementById("texts");
	let text = textSelector.options[textSelector.selectedIndex].value;
	const request = new XMLHttpRequest();
	request.responseType = "arraybuffer"; 
	request.open("GET", "/assets/palitext/siamrath/" + text, true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			const content = window.pako.ungzip(request.response, { to: "string" });
			document.getElementById("showline").checked = false;
			document.getElementById("dehyphen").checked = false;
			srtReader.displayText(srtReader.formatText(content));
			srtReader.original = content;
			srtReader.dehyphenated = null;
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
};
srtReader.displayText = function(text) {
	const display = document.getElementById("textdisplay");
	display.innerHTML = text;
	const preface = document.getElementById("preface");
	if (preface)
		preface.parentNode.removeChild(preface);
};
srtReader.getNikaya = function(booknum) {
	let result = "";
	if (booknum >= 1 && booknum <= 8)
		result = "Vinayapiṭake";
	else if (booknum >= 9 && booknum <= 11)
		result = "Suttantapiṭake Dīghanikāyassa";
	else if (booknum >= 12 && booknum <= 14)
		result = "Suttantapiṭake Majjhimanikāyassa";
	else if (booknum >= 15 && booknum <= 19)
		result = "Suttantapiṭake Saṃyuttanikāyassa";
	else if (booknum >= 20 && booknum <= 24)
		result = "Suttantapiṭake Aṅguttaranikāyassa";
	else if (booknum >= 25 && booknum <= 33)
		result = "Suttantapiṭake Khuddakanikāyassa";
	else if (booknum >= 34 && booknum <= 45)
		result = "Abhidhammapiṭake";
	return result;
};
srtReader.formatText = function(text) {
	let result = "";
	const textSelector = document.getElementById("texts");
	const selected = textSelector.options[textSelector.selectedIndex].innerText;
	const firstSpacePos = selected.indexOf(" ");
	const vol = selected.slice(0, firstSpacePos-1);
	const book = selected.slice(firstSpacePos).trim();
	const nikaya = this.getNikaya(textSelector.selectedIndex + 1);
	result += "<h4 style='text-align:center;'>Volume " + vol + "</h4>";
	result += "<h3 style='text-align:center;'>" + nikaya + "<br>" + book + "</h3>";
	result += "<div style='text-align:center;font-size:0.8em;'>The text in Roman script is licensed under a <a href='http://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons Attribution-ShareAlike 4.0 International License</a>.</div>";
	const lines = text.split(/\r?\n/);
	let lineno = 1;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		const pline = lines[i].match(/\[page \d\d\d\d]/);
		if (pline !== null) {
			if (i === 0)
				result += "<p id='" + pline[0] + "' style='text-align:left;'>";
			else
				result += "</p><p id='" + pline[0] + "' style='text-align:left;'>";
			result += "<strong>" + lines[i] + "</strong>";
			lineno = 1;
		} else {
			const lo = lines[i].trim().length > 0
						? document.getElementById("showline").checked ? this.fillZero(lineno + "") + ": " : ""
						: "";
			result += lo + lines[i].replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
			lineno++;
		}
		result += "<br>";
	}
	result += "</p>";
	const pageList = text.match(/\[page \d\d\d\d]/gi);
	this.updatePageList(pageList);
	return result;
};
srtReader.fillZero = function(num) {
	if (num.length < 2)
		return "0" + num;
	else
		return num;
};
srtReader.updatePageList = function(list) {
	const pageSelector = document.getElementById("pageselector");
	this.clearNode(pageSelector);
	for (let i=0; i<list.length; i++) {
		const opt = document.createElement("option");
		opt.value = list[i];
		opt.innerHTML = parseInt(list[i].slice(6, list[i].indexOf("]")));
		pageSelector.appendChild(opt);
	}
};
srtReader.gotoPage = function() {
	const pageSelector = document.getElementById("pageselector");
	if (pageSelector.options.length > 0) {
		const pageToGo = pageSelector.options[pageSelector.selectedIndex].value;
		const elem = document.getElementById(pageToGo);
		if (elem)
			elem.scrollIntoView();
	}
};
srtReader.toggleLineNo = function() {
	if (!this.original) return;
	if (document.getElementById("dehyphen").checked)
		this.displayText(this.formatText(this.dehyphenated));
	else
		this.displayText(this.formatText(this.original));
};
srtReader.dehyphenate = function() {
	if (this.dehyphenated === null) {
		const text = this.original;
		if (!text) return;
		const lines = text.split(/\r?\n/);
		const hyphenedList = this.getHyphenedList(text);
		for (let i=0; i<hyphenedList.length; i++) {
			const firstLine = lines[hyphenedList[i][0]].trimRight();
			const secondLine = lines[hyphenedList[i][1]].trim();
			const spacePos = secondLine.indexOf(" ");
			const secondFirstWord = spacePos > -1 ? secondLine.slice(0, spacePos) : secondLine;
			const theRest = spacePos > -1 ? secondLine.slice(spacePos) : "";
			if (secondFirstWord.length > 0) {
				lines[hyphenedList[i][0]] = firstLine.slice(0, -1) + secondFirstWord;
				lines[hyphenedList[i][1]] = theRest;
			}

		}
		this.dehyphenated = lines.join("\n");
	}
	if (document.getElementById("dehyphen").checked)
		this.displayText(this.formatText(this.dehyphenated));
	else
		this.displayText(this.formatText(this.original));
};
srtReader.getHyphenedList = function(text) {
	let result = [];
	const lines = text.split(/\r?\n/);
	for (let i=0; i<lines.length; i++) {
		const line = lines[i].trim();
		if (line.match(/[^\s-;:]-$/) !== null) {
			for (let j=i+1; j<lines.length; j++) {
				const next = lines[j].trim();
				if (next.length === 0 || next.startsWith("[page") || next.startsWith("#") || next.startsWith("*")) {
					continue;
				} else {
					result.push([ i, j ]);
					break;
				}
			}
		}
	}
	return result;
};
