/*! kaccrupareader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const kaccrupaReader = {};
kaccrupaReader.util = {};
kaccrupaReader.chapterList = { "kacc": [], "rupa": [] };
kaccrupaReader.suttaNumberList = { "kacc": [], "rupa": [] };
kaccrupaReader.suttaFormulaList = { "kacc": [], "rupa": [] };
kaccrupaReader.textCache = { "kacc": "", "rupa": "" };
kaccrupaReader.suttaCache = { "kacc": {}, "rupa": {} };
kaccrupaReader.fixedToolBar = false;
kaccrupaReader.firstOpen = true;
kaccrupaReader.getCurrBook = function() {
	const bookSelector = document.getElementById("bookselector");
	return bookSelector.options[bookSelector.selectedIndex].value;
};
kaccrupaReader.loadText = function() {
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/kaccrupa.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		const rupaPos = content.indexOf("<!--rupasiddhi-->");
		kaccrupaReader.textCache.kacc = kaccrupaReader.formatText(content.slice(0, rupaPos), "kacc");
		kaccrupaReader.textCache.rupa = kaccrupaReader.formatText(content.slice(rupaPos), "rupa");
		kaccrupaReader.getSuttaList("kacc");
		kaccrupaReader.getSuttaList("rupa");
		kaccrupaReader.displayText();
	};
	this.util.ajaxLoad(ajaxParams);
};
kaccrupaReader.formatText = function(text, book) {
	let result = "";
	const head = book === "kacc" ? "Kaccāyanavyākaraṇaṃ" : "Padarūpasiddhi";
	result += this.util.makeHead(head);
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	const hpRex = new RegExp("<\\/?[hp]");
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			result += "\n" + lines[i].replace("<p>", "<p class='" + book + "' style='text-align:left;padding-top:5px;'>") + "\n";
		} else if (lines[i].startsWith("</p>")) {
			result += "\n" + lines[i] + "\n";
		} else if (lines[i].startsWith("<h3>") || lines[i].startsWith("<h4>")) {
			result += lines[i];
			const ln = lines[i];
			const ch = ln.slice(ln.indexOf(">")+1, ln.lastIndexOf("<")).trim();
			const indent = ch.match(/^\d/) === null ? "- " : "";
			if (!(book === "kacc" && lines[i].startsWith("<h4>")))
				this.chapterList[book].push(indent + ch);
		} else if (lines[i].match(/^<b>\d+[.,]/) !== null) {
			result += lines[i];
			const ln = lines[i].trim();
			const sn = ln.slice(3, ln.indexOf("."));
			this.suttaNumberList[book].push(sn);
			this.suttaFormulaList[book].push(lines[i]);
		} else {
			const tab = lines[i].startsWith("<h") ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;";
			result += tab + lines[i];
		}
		if (lines[i].match(hpRex) === null)
			result += "<br>";
	}
	return result;
};
kaccrupaReader.displayText = function() {
	this.updateDisplay();
	this.fillChapterList();
	this.fillSuttaNumberList();
};
kaccrupaReader.updateDisplay = function() {
	const currBook = this.getCurrBook();
	const resultElem = document.getElementById("textdisplay");
	const onlyFormulas = document.getElementById("onlyformulas");
	const xRef = document.getElementById("xref");
	if (onlyFormulas.checked) {
		if (xRef.checked) {
			let resText = "";
			for (let i=0; i<this.suttaFormulaList[currBook].length; i++) {
				const text = this.suttaFormulaList[currBook][i];
				resText += text + "<br>";
				const currSut = this.getSuttaNumber(text);
				let refText = "";
				if (currBook === "kacc") {
					const rupaNums = this.getRupaSuttaNumber(currSut);
					for (const key of rupaNums)
						refText += this.suttaFormulaList.rupa[this.suttaNumberList.rupa.indexOf(key)] + "<br>";
				} else {
					const kaccKeys = this.getKaccSuttaKey(currSut);
					for (const key of kaccKeys)
						refText += this.suttaFormulaList.kacc[this.suttaNumberList.kacc.indexOf(key)] + "<br>";
				}
				if (refText.endsWith("<br>"))
					refText = refText.slice(0, -4);
				if (refText.length > 0)
					resText += "<blockquote>" + refText + "</blockquote>";
			}
			resultElem.innerHTML = resText;
		} else {
			resultElem.innerHTML = this.suttaFormulaList[currBook].join("<br>");
		}
	} else {
		resultElem.innerHTML = this.textCache[currBook];
	}
	document.getElementById("chapterselector").disabled = onlyFormulas.checked;
	document.getElementById("suttaselector").disabled = onlyFormulas.checked;
	if (xRef.checked && !onlyFormulas.checked) {
		const allSuttas = resultElem.getElementsByClassName(currBook);
		for (let i=0; i<allSuttas.length; i++) {
			const text = allSuttas[i].textContent.trim();
			const currSut = this.getSuttaNumber(text);
			let refText = "";
			if (currBook === "kacc") {
				const rupaNums = this.getRupaSuttaNumber(currSut);
				for (const key of rupaNums)
					refText += this.suttaCache.rupa[key];
			} else {
				const kaccKeys = this.getKaccSuttaKey(currSut);
				for (const key of kaccKeys)
					refText += this.suttaCache.kacc[key];
			}
			if (refText.length > 0) {
				const bq = document.createElement("blockquote");
				bq.innerHTML = refText;
				allSuttas[i].appendChild(bq);
			}
		}
	}
	if (this.firstOpen)
		this.firstOpen = false;
	else
		this.util.scroll(resultElem, this.fixedToolBar);
};
kaccrupaReader.getSuttaNumber = function(text) {
	let result = "";
	const withTag = text.startsWith("<b>");
	const sutRes = withTag ? text.match(/^<b>\d+/) : text.match(/^\d+/);
	if (sutRes !== null)
		result = withTag ? sutRes[0].slice(3) : sutRes[0];
	return result;
};
kaccrupaReader.getKaccSuttaKey = function(rupaNum) {
	let result = [];
	if (rupaNum === "88")
		return ["271, 88, 308"];
	for (const key of this.suttaNumberList.kacc) {
		if (key.endsWith(" " + rupaNum))
			result.push(key);
	}
	return result;
};
kaccrupaReader.getRupaSuttaNumber = function(kaccNum) {
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
kaccrupaReader.getSuttaList = function(book) {
	const plist = this.util.getHtmlPList(this.textCache[book]);
	for (let i=0; i<plist.length; i++) {
		const pid = this.suttaNumberList[book][i];
		this.suttaCache[book][pid] = plist[i];
	}
};
kaccrupaReader.changeBook = function() {
	this.displayText();
	this.util.scroll(document.getElementById("textdisplay"), this.fixedToolBar);
};
kaccrupaReader.fillChapterList = function() {
	this.util.fillSelectOptions(document.getElementById("chapterselector"), this.chapterList[this.getCurrBook()]);
};
kaccrupaReader.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList[this.getCurrBook()]);
};
kaccrupaReader.goChapter = function() {
	const chapSelector = document.getElementById("chapterselector");
	let chapToGo = chapSelector.options[chapSelector.selectedIndex].value.trim();
	if (chapToGo.startsWith("- "))
		chapToGo = chapToGo.slice(2);
	const resultElem = document.getElementById("textdisplay");
	const allH3 = resultElem.getElementsByTagName("h3");
	const res3 = this.findElementAndGo(allH3, chapToGo);
	if (!res3) {
		const allH4 = resultElem.getElementsByTagName("h4");
		this.findElementAndGo(allH4, chapToGo);
	}
};
kaccrupaReader.findElementAndGo = function(list, str) {
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
kaccrupaReader.goSutta = function() {
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

