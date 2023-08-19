/*! dhpathai.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const dhpaThai = {};
dhpaThai.vaggaList = {
	thai: [["๑. ยมกวรรค วรรณนา"], ["๒. อัปปมาทวรรค วรรณนา", "๓. จิตตวรรค วรรณนา"], ["๔. ปุปผวรรค วรรณนา", "๕. พาลวรรค วรรณนา"], ["๖. บัณฑิตวรรค วรรณนา", "๗. อรหันตวรรค วรรณนา", "๘. สหัสสวรรค วรรณนา"], ["๙. ปาปวรรค วรรณนา", "๑๐. ทัณฑวรรค วรรณนา", "๑๑. ชราวรรค วรรณนา"], ["๑๒. อัตตวรรค วรรณนา", "๑๓. โลกวรรค วรรณนา", "๑๔. พุทธวรรค วรรณนา", "๑๕. สุขวรรค วรรณนา", "๑๖. ปิยวรรค วรรณนา", "๑๗. โกธวรรค วรรณนา"], ["๑๘. มลวรรค วรรณนา", "๑๙. ธัมมัฏฐวรรค วรรณนา", "๒๐. มัคควรรค วรรณนา", "๒๑. ปกิณณกวรรค วรรณนา", "๒๒. นิรยวรรค วรรณนา", "๒๓. นาควรรค วรรณนา"], ["๒๔. ตัณหาวรรค วรรณนา", "๒๕. ภิกขุวรรค วรรณนา", "๒๖. พราหมณวรรค วรรณนา"]],
	google: [["01. Yamakavaggavaṇṇanā"], ["02. Appamādavaggavaṇṇanā", "03. Cittavaggavaṇṇanā"],["04. Pupphavaggavaṇṇanā", "05. Bālavaggavaṇṇanā"], ["06. Paṇḍitavaggavaṇṇanā", "07. Arahantavaggavaṇṇanā", "08. Sahassavaggavaṇṇanā"], ["09. Pāpavaggavaṇṇanā", "10. Daṇḍavaggavaṇṇanā", "11. Jarāvaggavaṇṇanā"], ["12. Attavaggavaṇṇanā", "13. Lokavaggavaṇṇanā", "14. Buddhavaggavaṇṇanā", "15. Sukhavaggavaṇṇanā", "16. Piyavaggavaṇṇanā", "17. Kodhavaggavaṇṇanā"], ["18. Malavaggavaṇṇanā", "19. Dhammaṭṭhavaggavaṇṇanā", "20. Maggavaggavaṇṇanā", "21. Pakiṇṇakavaggavaṇṇanā", "22. Nirayavaggavaṇṇanā", "23. Nāgavaggavaṇṇanā"], ["24. Taṇhāvaggavaṇṇanā", "25. Bhikkhuvaggavaṇṇanā", "26. Brāhmaṇavaggavaṇṇanā"]] };
dhpaThai.partList = [[1, 14], [15, 32], [33, 59], [60, 94], [95, 126], [127, 181], [182, 239], [240, 302]];
dhpaThai.util = {};
dhpaThai.params = {};
dhpaThai.textCache = { thai: { head: "", text: "", vatthuList: [] }, google: { head: "", text: "", vatthuList: [] } };
dhpaThai.lang = "thai";
dhpaThai.fixedToolBar = true;
dhpaThai.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("pt" in vars)
		result["part"] = vars.pt;
	if ("vt" in vars)
		result["vatthu"] = vars.vt;
	if (!("part" in result || "vatthu" in result)) {
		result["vatthu"] = "1";
	} else if ("vatthu" in result && !("part" in result)) {
		const pt = this.getPart(result.vatthu);
		if (pt > -1)
			result["part"] = "" + pt;
	}
	return result;
};
dhpaThai.getPart = function(vatthu) {
	let result = -1;
	const vt = typeof vatthu !== "number" ? parseInt(vatthu) : vatthu;
	for (let i=0; i<this.partList.length; i++) {
		const vrange = this.partList[i];
		if (vt >= vrange[0] && vt <= vrange[1]) {
			result = i + 1;
			break;
		}
	}
	return result;
};
dhpaThai.loadText = function() {
	this.params = this.getUrlParams();
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/dhpa/dhpa0" + this.params.part + "th.gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		const gmark = "<!--google-translate-->";
		const gmpos = content.indexOf(gmark);
		dhpaThai.textCache.thai = dhpaThai.formatText("thai", content.slice(0, gmpos));
		dhpaThai.textCache.google = dhpaThai.formatText("google", content.slice(gmpos));
		const thaiPList = dhpaThai.util.getHtmlPList(dhpaThai.textCache.thai.text);
		const googPList = dhpaThai.util.getHtmlPList(dhpaThai.textCache.google.text);
		const textBody = dhpaThai.util.interweaveHtmlP(thaiPList, googPList);
		dhpaThai.displayText(textBody);
	};
	ajaxParams.failureCallback = function() {
		document.getElementById("textdisplay").innerHTML = "Content not found";
	};
	this.util.ajaxLoad(ajaxParams);
};
dhpaThai.displayText = function(textBody) {
	const resultElem = document.getElementById("textdisplay");
	let head = this.util.makeHead(this.textCache.thai.head);
	head += this.util.ccsaHtmlText;
	resultElem.innerHTML = head + textBody;
	this.fillVatthuSelector("thai");
	this.goVatthu("thai", this.params.vatthu);
};
dhpaThai.formatText = function(lang, text) {
	const result = {};
	result.vatthuList = [];
	if (lang === "thai" )
		result.head = "อรรถกถาธรรมบทแปล ภาค " + this.util.thaiNum[this.params.part];
	else
		result.head = "The Commentary to Dhammapada, Part " + this.params.part;
	const lines = text.split(/\r?\n/);
	const topicRex = lang === "thai" ? new RegExp("\\[[๐๑๒๓๔๕๖๗๘๙]+\\]$") : new RegExp("\\[\\d+\\]$");
	const className = "trans-" + lang;
	let resultText = "";
	let pstarted = false;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/page \d\d\d\d/) !== null) {
			const clss = " class='" + className + "'";
			const disp = lang === "thai" ? "" : "display:none;";
			const pstyle = " style='text-align:left;padding-top:5px;" + disp + "'";
			if (!pstarted) {
				resultText += "\n<p" + clss + pstyle + ">\n";
				pstarted = true;
			} else {
				resultText += "\n</p>\n<p" + clss + pstyle + ">\n";
			}
			resultText += lines[i];
		} else if (lines[i].match(topicRex) !== null) {
			let vhead = lines[i];
			vhead = vhead.replace(/<sup>.*<\/sup>/i, "");
			vhead = vhead.replace(/\*/, "").replace(/ {2,}/, " ");
			result.vatthuList.push(vhead);
			resultText += "<strong>" + lines[i] + "</strong>";
		} else {
			resultText += lines[i];
		}
		resultText += "<br>";
	}
	resultText += "\n</p>\n";
	result.text = resultText;
	return result;
};
dhpaThai.fillVatthuSelector = function(lang) {
	const vaggas = this.vaggaList[lang][this.params.part-1];
	const optgs = [];
	for (let i=0; i<vaggas.length; i++) {
		const optg = document.createElement("optgroup");
		optg.label = vaggas[i];
		optgs.push(optg);
	}
	const vattSelector = document.getElementById("vatthuselector");
	this.util.clearNode(vattSelector);
	let vgnum = 0;
	let optgElem = optgs[vgnum];
	const vheadRex = lang === "thai" ? new RegExp("^ ๑\\. ") : new RegExp("^\\s*1\\. ");
	for (let i=0; i<this.textCache[lang].vatthuList.length; i++) {
		const vt = this.textCache[lang].vatthuList[i];
		if (i > 0 && vt.match(vheadRex) !== null) {
			vgnum++;
			optgElem = optgs[vgnum];
		}
		const vtnum = vt.slice(vt.indexOf("[")+1, -1);
		const opt = document.createElement("option");
		opt.value = lang === "thai" ? this.util.toArabicNum(vtnum) : vtnum;
		opt.innerText = vt;
		optgElem.appendChild(opt);
	}
	for (let i=0; i<optgs.length; i++)
		vattSelector.appendChild(optgs[i]);
	vattSelector.style.width = "30em";
};
dhpaThai.goVatthu = function(lang, vatthu) {
	if (lang === undefined)
		lang = this.lang;
	const vattSelector = document.getElementById("vatthuselector");
	let vatToGo;
	if (vatthu === undefined) {
		const vt = vattSelector.options[vattSelector.selectedIndex].value;
		vatToGo = lang === "thai" ? this.util.toThaiNum(vt) : vt;
	} else {
		const selInd = this.util.findSelectIndex(vattSelector, vatthu);
		if (selInd > -1)
			vattSelector.options[selInd].selected = true;
		vatToGo = lang === "thai" ? this.util.toThaiNum(vatthu) : vatthu;
	}
	vatToGo = "[" + vatToGo + "]";
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.getElementsByTagName("strong");
		for (let n=0; n<nodes.length; n++) {
			if (nodes[n].textContent.indexOf(vatToGo) > -1) {
				p.scrollIntoView();
				break;
			}
		}
	}
};
dhpaThai.updateDisplay = function() {
	const gtrans = document.getElementById("googletrans");
	const interw = document.getElementById("interwoven");
	const head = document.getElementById("texthead");
	const vattSelector = document.getElementById("vatthuselector");
	const saveVatt = vattSelector.options[vattSelector.selectedIndex].value;
	head.innerText = gtrans.checked ? this.textCache.google.head : this.textCache.thai.head;
	if (gtrans.checked) {
		this.fillVatthuSelector("google");
	} else {
		this.fillVatthuSelector("thai");
		interw.checked = false;
	}
	const tElems = document.getElementsByClassName("trans-thai");
	for (let i=0; i<tElems.length; i++) {
		if (gtrans.checked && !interw.checked)
			tElems[i].style.display = "none";
		else
			tElems[i].style.display = "block";
	}
	const gElems = document.getElementsByClassName("trans-google");
	for (let i=0; i<gElems.length; i++) {
		if (gtrans.checked)
			gElems[i].style.display = "block";
		else
			gElems[i].style.display = "none";
	}
	this.lang = gtrans.checked ? "google" : "thai";
	this.goVatthu(this.lang, saveVatt);
};
dhpaThai.interweaveText = function() {
	const gtrans = document.getElementById("googletrans");
	const interw = document.getElementById("interwoven");
	if (interw.checked) {
		if (gtrans.checked === false)
			gtrans.checked = true;
	}
	this.updateDisplay();
};
