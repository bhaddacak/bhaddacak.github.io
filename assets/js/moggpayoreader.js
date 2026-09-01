/*! moggpayoreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const moggpayoReader = {};
moggpayoReader.util = {};
moggpayoReader.nirumoggUtil = {};
moggpayoReader.chapterList = { "mogg": [], "payo": [] , "panct": [] };
moggpayoReader.suttaNumberList = { "mogg": [], "payo": [] , "panct": [] };
moggpayoReader.suttaFormulaList = { "mogg": [], "payo": [] , "panct": [] };
moggpayoReader.textCache = { "mogg": "", "payo": "" , "panct": "" };
moggpayoReader.suttaCache = { "mogg": {}, "payo": {} , "panct": {} };
moggpayoReader.fixedToolBar = false;
moggpayoReader.firstOpen = true;
moggpayoReader.getCurrBook = function() {
	const bookSelector = document.getElementById("bookselector");
	return bookSelector.options[bookSelector.selectedIndex].value;
};
moggpayoReader.getHead = function(book) {
	let result = "";
	switch (book) {
		case "kacc": result = "Moggallānabyākaraṇaṃ"; break;
		case "payo": result = "Payogasiddhi"; break;
		case "panct": result = "Moggallānapañcikāṭīkā"; break;
	}
	return result;
};
moggpayoReader.loadText = function() {
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/moggpayo.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		const payoPos = content.indexOf("<!--payogasiddhi-->");
		moggpayoReader.textCache.mogg = moggpayoReader.formatText(content.slice(0, payoPos), "mogg");
		moggpayoReader.textCache.payo = moggpayoReader.formatText(content.slice(payoPos), "payo");
		moggpayoReader.getSuttaList("mogg");
		moggpayoReader.getSuttaList("payo");
		moggpayoReader.displayText();
	};
	this.util.ajaxLoad(ajaxParams);
};
moggpayoReader.includePancika = function() {
	const bookSelector = document.getElementById("bookselector");
	const pancSelected = document.getElementById("pancika").checked;
	bookSelector.options[2].disabled = !pancSelected;
	if (this.textCache.panct.length === 0) {
		const ajaxParams = {};
		ajaxParams.address = "/assets/palitext/gram/panct.gz";
		ajaxParams.isBinary = true;
		ajaxParams.successCallback = function(response) {
			const content = window.pako.ungzip(response, { to: "string" });
			moggpayoReader.textCache.panct = moggpayoReader.formatText(content, "panct");
			moggpayoReader.getSuttaList("panct");
			moggpayoReader.updateDisplay();
		};
		this.util.ajaxLoad(ajaxParams);
	}
	if (!pancSelected && bookSelector.options[2].selected === true) {
		bookSelector.options[0].selected = true;
		this.displayText();
	} else {
		moggpayoReader.updateDisplay();
	}
};
moggpayoReader.formatText = function(text, book) {
	let result = "";
	result += this.util.makeHead(this.getHead(book));
	result += this.util.ccsaHtmlText;
	result += "<br>";
	const lines = text.split(/\r?\n/);
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
			this.chapterList[book].push(indent + ch);
		} else if (lines[i].match(/^<b>[[\d]/) !== null) {
			result += lines[i];
			const ln = lines[i].trim();
			const firstdot = ln.indexOf(".");
			const sn = ln.slice(3, ln.indexOf(".", firstdot+1));
			this.suttaNumberList[book].push(sn);
			this.suttaFormulaList[book].push(lines[i]);
		} else {
			const spaces = "&nbsp;&nbsp;&nbsp;&nbsp;";
			const tab = lines[i].startsWith("<h") ? "" : spaces;
			result += tab + lines[i].replace("\t", spaces);
		}
		if (lines[i].match(/<\/?[hp]/) === null)
			result += "<br>";
	}
	return result;
};
moggpayoReader.displayText = function() {
	this.updateDisplay();
	this.fillChapterList();
	this.fillSuttaNumberList();
};
moggpayoReader.updateDisplay = function() {
	const currBook = this.getCurrBook();
	const resultElem = document.getElementById("textdisplay");
	const onlyFormulas = document.getElementById("onlyformulas");
	const pancika = document.getElementById("pancika");
	const xRef = document.getElementById("xref");
	if (onlyFormulas.checked) {
		if (xRef.checked) {
			let resText = "";
			for (let i=0; i<this.suttaFormulaList[currBook].length; i++) {
				const text = this.suttaFormulaList[currBook][i];
				resText += text + "<br>";
				const moggNum = this.getMoggSuttaNumber(text);
				const niruNum = this.nirumoggUtil.getNiruNumber(moggNum);
				let refText = "";
				if (niruNum.length > 0)
					refText += this.nirumoggUtil.addMoggXrefLinks("Niru " + niruNum.join(", ")) + "<br>";
				if (currBook === "mogg") {
					const payoKeys = this.getPayoSuttaNumber(moggNum);
					for (const key of payoKeys)
						refText += this.suttaFormulaList.payo[this.suttaNumberList.payo.indexOf(key)] + "<br>";
					if (pancika.checked) {
						const pancInd = this.suttaNumberList.panct.indexOf(moggNum);
						if (pancInd > -1)
							refText += this.suttaFormulaList.panct[pancInd] + "<br>";
					}
				} else if (currBook === "payo") {
					refText += this.suttaFormulaList.mogg[this.suttaNumberList.mogg.indexOf(moggNum)] + "<br>";
					if (pancika.checked) {
						const pancInd = this.suttaNumberList.panct.indexOf(moggNum);
						if (pancInd > -1)
							refText += this.suttaFormulaList.panct[pancInd] + "<br>";
					}
				} else if (currBook === "panct") {
					refText += this.suttaFormulaList.mogg[this.suttaNumberList.mogg.indexOf(moggNum)] + "<br>";
					const payoKeys = this.getPayoSuttaNumber(moggNum);
					for (const key of payoKeys)
						refText += this.suttaFormulaList.payo[this.suttaNumberList.payo.indexOf(key)] + "<br>";
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
			const moggNum = this.getMoggSuttaNumber(text);
			const niruNum = this.nirumoggUtil.getNiruNumber(moggNum);
			let refText = "";
			if (niruNum.length > 0)
				refText += this.nirumoggUtil.addMoggXrefLinks("Niru " + niruNum.join(", ")) + "<br>";
			if (currBook === "mogg") {
				const payoKeys = this.getPayoSuttaNumber(moggNum);
				for (const key of payoKeys)
					refText += this.suttaCache.payo[key];
				if (pancika.checked && moggNum in this.suttaCache.panct)
					refText += this.suttaCache.panct[moggNum];
			} else if (currBook === "payo") {
				refText += this.suttaCache.mogg[moggNum];
				if (pancika.checked && moggNum in this.suttaCache.panct)
					refText += this.suttaCache.panct[moggNum];
			} else if (currBook === "panct") {
				refText += this.suttaCache.mogg[moggNum];
				const payoKeys = this.getPayoSuttaNumber(moggNum);
				for (const key of payoKeys)
					refText += this.suttaCache.payo[key];
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
moggpayoReader.getMoggSuttaNumber = function(text) {
	let result = "";
	const sutRes = text.match(/\d\.\d+/);
	if (sutRes !== null)
		result = sutRes[0];
	return result;
};
moggpayoReader.getPayoSuttaNumber = function(moggNum) {
	let result = [];
	const rex = new RegExp(moggNum.replace(".", "\\.") + "$");
	for (const key of this.suttaNumberList.payo) {
		if (key.match(rex) !== null) {
			result.push(key);
		}
	}
	return result;
};
moggpayoReader.getSuttaList = function(book) {
	const plist = this.util.getHtmlPList(this.textCache[book]);
	for (let i=0; i<plist.length; i++) {
		const pid = this.suttaNumberList[book][i];
		this.suttaCache[book][pid] = plist[i];
	}
};
moggpayoReader.changeBook = function() {
	this.displayText();
	this.util.scroll(document.getElementById("textdisplay"), this.fixedToolBar);
};
moggpayoReader.fillChapterList = function() {
	this.util.fillSelectOptions(document.getElementById("chapterselector"), this.chapterList[this.getCurrBook()]);
};
moggpayoReader.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList[this.getCurrBook()]);
};
moggpayoReader.goChapter = function() {
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
moggpayoReader.findElementAndGo = function(list, str) {
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
moggpayoReader.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.getElementsByTagName("b");
		for (let n=0; n<nodes.length; n++) {
			const text = nodes[n].textContent.trim();
			const rex = new RegExp("^" + suttaToGo.replace("[", "\\[").replace(".", "\\.") + "\\.");
			if (text.match(rex) !== null) {
				this.util.scroll(p, this.fixedToolBar);
				break;
			}
		}
	}
};

