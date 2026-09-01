/*! ptsreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const ptsReader = {};
ptsReader.util = null;
ptsReader.original = null;
ptsReader.dehyphenated = null;
ptsReader.fixedToolBar = false;
ptsReader.loadText = function() {
	this.displayText("Loading... (please wait)");
	const textSelector = document.getElementById("texts");
	let text = textSelector.options[textSelector.selectedIndex].value;
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/pts/" + text;
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		document.getElementById("dehyphen").checked = false;
		ptsReader.displayText(ptsReader.formatText(content));
		ptsReader.original = null;
		ptsReader.dehyphenated = null;
	};
	this.util.ajaxLoad(ajaxParams);
};
ptsReader.displayText = function(text) {
	const display = document.getElementById("textdisplay");
	display.innerHTML = text;
};
ptsReader.formatText = function(text) {
	const bodyTagStart = "<BODY>";
	const bodyTagEnd = "</BODY>";
	const frontTagStart = "<!--front-start-->";
	const frontTagEnd = "<!--front-end-->";
	const noteTagStart = "<!--note-start-->";
	const noteTagEnd = "<!--note-end-->";
	const textTagStart = "<!--text-start-->";
	const textTagEnd = "<!--text-end-->";
	let upperBodyTagPos = [ text.indexOf(bodyTagStart), text.indexOf(bodyTagEnd) ];
	let lowerBodyTagPos = [ text.indexOf(bodyTagStart.toLowerCase()), text.indexOf(bodyTagEnd.toLowerCase()) ];
	const bStart = upperBodyTagPos[0] > -1 ? upperBodyTagPos[0] : lowerBodyTagPos[0];
	const bEnd = upperBodyTagPos[1] > -1 ? upperBodyTagPos[1] : lowerBodyTagPos[1];
	let bodytext = bStart > -1 && bEnd > -1 ? text.slice(bStart + bodyTagStart.length, bEnd) : "";
	if (bodytext.length > 0) {
		const buttons = "<div><button onClick='ptsReader.toggleFrontMatter();'>Front Matter</button> " + 
						"<button onClick='ptsReader.toggleGretilNotes();'>GRETIL's Notes</button></div>";
		const fmText = text.slice(text.indexOf(frontTagStart), text.indexOf(frontTagEnd));
		const frontMatter = "<blockquote id='front-matter' style='display:none;'><br>" + fmText + "</blockquote>";
		const gnText = text.slice(text.indexOf(noteTagStart), text.indexOf(noteTagEnd));
		const hrTag = "<HR>";
		let hrTagPos = this.getTagPosList(gnText, hrTag);
		if (hrTagPos.length === 0)
			hrTagPos = this.getTagPosList(gnText, hrTag.toLowerCase());
		const betweenHr = hrTagPos.length > 0 ? gnText.slice(hrTagPos[0] + hrTag.length, hrTagPos[1]) : gnText;
		const gNote = "<blockquote id='gretil-notes' style='display:none;'>" + betweenHr + "</blockquote>";
		const mainText = text.slice(text.indexOf(textTagStart), text.indexOf(textTagEnd));
		const lines = mainText.split(/\r?\n/);
		let mainPara = "<p id='main-text' style='text-align:left;'>";
		for (let i=0; i<lines.length; i++)
			mainPara += lines[i];
		mainPara += "</p>";
		bodytext = buttons + frontMatter + gNote + mainPara;
		const pageList = mainText.match(/\[page \d\d\d\d?]/gi);
		this.updatePageList(pageList);
	}
	return bodytext;
};
ptsReader.toggleFrontMatter = function() {
	const fmatter = document.getElementById("front-matter");
	const gnote = document.getElementById("gretil-notes");
	if (gnote.style.display !== "none")
		gnote.style.display = "none";
	if (fmatter.style.display === "none")
		fmatter.style.display = "block";
	else
		fmatter.style.display = "none";
};
ptsReader.toggleGretilNotes = function() {
	const fmatter = document.getElementById("front-matter");
	const gnote = document.getElementById("gretil-notes");
	if (fmatter.style.display !== "none")
		fmatter.style.display = "none";
	if (gnote.style.display === "none")
		gnote.style.display = "block";
	else
		gnote.style.display = "none";
};
ptsReader.getTagPosList = function(text, tag) {
	const result = [];
	let pos = text.indexOf(tag);
	while (pos > -1) {
		result.push(pos);
		pos = text.indexOf(tag, pos + tag.length);
	}
	return result;
};
ptsReader.updatePageList = function(list) {
	const pageSelector = document.getElementById("pageselector");
	this.util.clearNode(pageSelector);
	for (let i=0; i<list.length; i++) {
		const opt = document.createElement("option");
		opt.value = list[i];
		opt.innerHTML = parseInt(list[i].slice(6, list[i].indexOf("]")));
		pageSelector.appendChild(opt);
	}
};
ptsReader.gotoPage = function() {
	const pageSelector = document.getElementById("pageselector");
	if (pageSelector.options.length > 0) {
		const pageToGo = pageSelector.options[pageSelector.selectedIndex].value;
		const mainText = document.getElementById("main-text");
		for (let i=0; i<mainText.children.length; i++) {
			const elem = mainText.children[i];
			if (elem.innerText === pageToGo) {
				this.util.scroll(elem, this.fixedToolBar);
				break;
			}
		}
	}
};
ptsReader.dehyphenate = function() {
	const mainText = document.getElementById("main-text");
	if (!mainText) return;
	if (this.original === null)
		this.original = mainText;
	if (this.dehyphenated === null) {
		this.dehyphenated = this.original.cloneNode(true);
		const allNodes = this.dehyphenated.childNodes;
		const hyphenedList = this.getHyphenedList(this.dehyphenated);
		for (let i=0; i<hyphenedList.length; i++) {
			const firstElm = allNodes[hyphenedList[i][0]];
			const secondElm = allNodes[hyphenedList[i][1]];
			const secondText = secondElm.textContent.trim();
			const spacePos = secondText.indexOf(" ");
			const secondFirstWord = spacePos > -1 ? secondText.slice(0, spacePos) : secondText;
			const theRest = spacePos > -1 ? secondText.slice(spacePos) : "";
			if (secondFirstWord.length > 0) {
				firstElm.textContent = firstElm.textContent.trimRight().slice(0, -1) + secondFirstWord;
				secondElm.textContent = theRest;
			}

		}
	}
	if (document.getElementById("dehyphen").checked)
		mainText.replaceWith(this.dehyphenated);
	else
		mainText.replaceWith(this.original);
};
ptsReader.getHyphenedList = function(node) {
	const result = [];
	const allNodes = node.childNodes;
	for (let i=0; i<allNodes.length; i++) {
		const elm = allNodes[i];
		if (elm.nodeType === Node.TEXT_NODE) {
			const text = elm.textContent.trim();
			if (text.match(/[^\s-;:]-$/) !== null) {
				for (let j=i+1; j<allNodes.length; j++) {
					if (allNodes[j].nodeType === Node.TEXT_NODE) {
						result.push([ i, j ]);
						break;
					}
				}
			}
		}
	}
	return result;
};
