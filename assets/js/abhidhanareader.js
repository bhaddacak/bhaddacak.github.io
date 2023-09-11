/*! abhidhanareader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const abhidhanaReader = {};
abhidhanaReader.missingNum = [ 829, 847, 964, 1028, 1029, 1033, 1135 ];
abhidhanaReader.rangeNum = [ [11, 12], [16, 17], [18, 21], [33, 34], [42, 43], [45, 46], [47, 48], [51, 52], [53, 54], [58, 60], [62, 63], [66, 67], [75, 76], [80, 81], [85, 86], [87, 88], [118, 119], [120, 121], [133, 135], [152, 154], [177, 178], [191, 192], [194, 196], [200, 201], [206, 207], [227, 228], [230, 231], [240, 241], [254, 255], [274, 275], [279, 280], [282, 283], [286, 287], [292, 293], [319, 320], [328, 329], [333, 334], [337, 339], [344, 345], [355, 356], [377, 379], [382, 383], [386, 387], [388, 389], [399, 400], [415, 416], [438, 439], [450, 451], [471, 472], [474, 476], [477, 478], [479, 480], [487, 488], [518, 519], [529, 530], [539, 540], [546, 547], [599, 600], [613, 614], [624, 625], [629, 631], [635, 636], [649, 650], [653, 654], [655, 656], [671, 672], [679, 680], [684, 685], [693, 696], [699, 701], [704, 706], [712, 713], [714, 715], [720, 721], [745, 746], [781, 782], [788, 789], [797, 798], [813, 814], [1136, 1137], [1142, 1143], [1152, 1153], [1162, 1163], [1165, 1167], [1171, 1172], [1178, 1179], [1180, 1181], [1184, 1185], [1202, 1203] ];
abhidhanaReader.util = {};
abhidhanaReader.suttaNumberList = { "abhmain": [], "abhtika": [] };
abhidhanaReader.suttaFormulaList = { "abhmain": [], "abhtika": [] };
abhidhanaReader.textCache = { "abhmain": "", "abhtika": "" };
abhidhanaReader.suttaCache = { "abhtika": {} };
abhidhanaReader.fixedToolBar = false;
abhidhanaReader.firstOpen = true;
abhidhanaReader.loadText = function() {
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/gram/abhidhana.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		const tikaPos = content.indexOf("<!--abhidhanatika-->");
		abhidhanaReader.textCache.abhmain = abhidhanaReader.formatText(content.slice(0, tikaPos), "abhmain");
		abhidhanaReader.textCache.abhtika = abhidhanaReader.formatText(content.slice(tikaPos), "abhtika");
		abhidhanaReader.getSuttaList("abhtika");
		abhidhanaReader.displayText();
	};
	this.util.ajaxLoad(ajaxParams);
};
abhidhanaReader.formatText = function(text, book) {
	let result = "";
	const lines = text.split(/\r?\n/);
	const hpRex = new RegExp("<\\/?[hp]");
	const pstyle = "style='text-align:left;padding-top:5px;'";
	result += "<br>";
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].startsWith("<p>")) {
			result += "\n" + lines[i].replace("<p>", "<p class='" + book + "' " + pstyle + ">") + "\n";
		} else if (lines[i].startsWith("<p ")) {
			result += "\n" + lines[i].replace("<p ", "<p " + pstyle + " ") + "\n";
		} else if (lines[i].startsWith("</p>")) {
			result += "\n" + lines[i] + "\n";
		} else if (lines[i].match(/^\d+/) !== null) {
			result += lines[i];
			const ln = lines[i].trim();
			const hypos = ln.indexOf("-"); 
			const sn = hypos > -1 && hypos < 5 ? ln.slice(0, hypos) : ln.slice(0, ln.indexOf("."));
			this.suttaNumberList[book].push(sn);
		} else {
			const tab = lines[i].startsWith("<h") ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;";
			result += tab + lines[i];
		}
		if (lines[i].match(hpRex) === null)
			result += "<br>";
	}
	return result;
};
abhidhanaReader.displayText = function() {
	this.updateDisplay();
	this.fillSuttaNumberList();
};
abhidhanaReader.addBlockQuote = function(element, content) {
	const bq = document.createElement("blockquote");
	bq.innerHTML = content;
	element.appendChild(bq);
};
abhidhanaReader.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const xRef = document.getElementById("xref");
	let head = this.util.makeHead("Abhidhānappadīpikā");
	head += this.util.ccsaHtmlText;
	resultElem.innerHTML = head + this.textCache.abhmain;
	if (xRef.checked) {
		const allSuttas = resultElem.getElementsByClassName("abhmain");
		for (let i=0; i<allSuttas.length; i++) {
			const sutta = allSuttas[i].textContent.trim();
			const currSut = this.getSuttaNumber(sutta);
			const tikaNum = this.getTikaNumber(currSut);
			if (tikaNum.length === 0 || (tikaNum.length > 1 && currSut !== ""+tikaNum[1]))
				continue;
			const refText = this.suttaCache.abhtika[""+tikaNum[0]];
			this.addBlockQuote(allSuttas[i], refText);
		}
		this.addBlockQuote(document.getElementById("panama"), this.suttaCache.abhtika.panama);
		this.addBlockQuote(document.getElementById("nigamana"), this.suttaCache.abhtika.nigamana);
	}
	if (this.firstOpen)
		this.firstOpen = false;
	else
		this.util.scroll(resultElem, this.fixedToolBar);
};
abhidhanaReader.getTikaNumber = function(mainNum) {
	let result = [];
	const num = parseInt(mainNum);
	if (this.missingNum.indexOf(num) > -1)
		return result;
	for (const tuple of this.rangeNum) {
		if (num >= tuple[0] && num <= tuple[1]) {
			result = tuple;
			break;
		}
	}
	if (result.length === 0)
		result = [num];
	return result;
};
abhidhanaReader.getSuttaNumber = function(text) {
	let result = "";
	const sutRes = text.match(/^\d+/);
	if (sutRes !== null)
		result = sutRes[0];
	return result;
};
abhidhanaReader.getSuttaList = function(book) {
	const plist = this.util.getHtmlPList(this.textCache[book]);
	let num = 0;
	for (const p of plist) {
		const idmatch = p.match(/id=".*?"/)
		if (idmatch !== null) {
			const id = idmatch[0].slice(4, -1);
			this.suttaCache[book][id] = p;
		} else {
			const pid = this.suttaNumberList[book][num];
			this.suttaCache[book][pid] = p;
			num++;
		}
	}
};
abhidhanaReader.fillSuttaNumberList = function() {
	this.util.fillSelectOptions(document.getElementById("suttaselector"), this.suttaNumberList.abhmain);
};
abhidhanaReader.goChapter = function() {
	const chapSelector = document.getElementById("chapterselector");
	let chapToGo = chapSelector.options[chapSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allH4 = resultElem.getElementsByTagName("h4");
	this.findElementAndGo(allH4, chapToGo);
};
abhidhanaReader.findElementAndGo = function(list, str) {
	let success = false;
	for (let i=0; i<list.length; i++) {
		const elem = list[i];
		const text = list[i].textContent.trim();
		if (text.startsWith(str)) {
			this.util.scroll(elem, this.fixedToolBar);
			success = true;
			break;
		}
	}
	return success;
};
abhidhanaReader.goSutta = function() {
	const suttaSelector = document.getElementById("suttaselector");
	const suttaToGo = suttaSelector.options[suttaSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByClassName("abhmain");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = allP[i].childNodes;
		for (let n=0; n<nodes.length; n++) {
			const elm = nodes[n];
			if (elm.nodeType === Node.TEXT_NODE) {
				const text = nodes[n].textContent.trim();
				const rex = new RegExp("^" + suttaToGo + "\\.");
				if (text.match(rex) !== null) {
					this.util.scroll(p, this.fixedToolBar);
					break;
				}
			}
		}
	}
};


