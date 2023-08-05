/*! dhpathai.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const dhpaThai = {};
dhpaThai.thaiNum = "๐๑๒๓๔๕๖๗๘๙";
dhpaThai.vaggaList = [["๑. ยมกวรรค วรรณนา"], ["๒. อัปปมาทวรรค วรรณนา", "๓. จิตตวรรค วรรณนา"], ["๔. ปุปผวรรค วรรณนา", "๕. พาลวรรค วรรณนา"], ["๖. บัณฑิตวรรค วรรณนา", "๗. อรหันตวรรค วรรณนา", "๘. สหัสสวรรค วรรณนา"], ["๙. ปาปวรรค วรรณนา", "๑๐. ทัณฑวรรค วรรณนา", "๑๑. ชราวรรค วรรณนา"], ["๑๒. อัตตวรรค วรรณนา", "๑๓. โลกวรรค วรรณนา", "๑๔. พุทธวรรค วรรณนา", "๑๕. สุขวรรค วรรณนา", "๑๖. ปิยวรรค วรรณนา", "๑๗. โกธวรรค วรรณนา"], ["๑๘. มลวรรค วรรณนา", "๑๙. ธัมมัฏฐวรรค วรรณนา", "๒๐. มัคควรรค วรรณนา", "๒๑. ปกิณณกวรรค วรรณนา", "๒๒. นิรยวรรค วรรณนา", "๒๓. นาควรรค วรรณนา"], ["๒๔. ตัณหาวรรค วรรณนา", "๒๕. ภิกขุวรรค วรรณนา", "๒๖. พราหมณวรรค วรรณนา"]]; 
dhpaThai.partList = [[1, 14], [15, 32], [33, 59], [60, 94], [95, 126], [127, 181], [182, 239], [240, 302]];
dhpaThai.vatthuList = [];
dhpaThai.getUrlParams = function() {
	const result = {};
	const url = location.href;
	const qpos = url.indexOf("?");
	if (qpos > -1) {
		const params = url.slice(qpos);
		const ppos = params.indexOf("pt=");
		if (ppos > -1) {
			let part = params.slice(ppos + 3);
			const apos = part.indexOf("&");
			part = apos > -1 ? part.slice(0, apos) : part;
			result["part"] = part;
		}
		const vpos = params.indexOf("vt=");
		if (vpos > -1) {
			let vatthu = params.slice(vpos + 3);
			const apos = vatthu.indexOf("&");
			vatthu = apos > -1 ? vatthu.slice(0, apos) : vatthu;
			result["vatthu"] = vatthu;
		}
	} else {
		result["vatthu"] = 1;
	}
	if ("vatthu" in result && !("part" in result)) {
		const vt = parseInt(result.vatthu);
		for (let i=0; i<this.partList.length; i++) {
			const vrange = this.partList[i];
			if (vt >= vrange[0] && vt <= vrange[1]) {
				result["part"] = i + 1;
				break;
			}
		}
	}
	return result;
};
dhpaThai.loadText = function() {
	const params = this.getUrlParams();
	const request = new XMLHttpRequest();
	request.responseType = "arraybuffer"; 
	request.open("GET", "/assets/palitext/dhpa/dhpa0" + params.part + "th.gz", true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			const content = window.pako.ungzip(request.response, { to: "string" });
			dhpaThai.displayText(content, params.part, params.vatthu);
		} else {
			document.getElementById("textdisplay").innerHTML = "Content not found";
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
};
dhpaThai.displayText = function(text, part, vatthu) {
	const resultElem = document.getElementById("textdisplay");
	resultElem.innerHTML = this.formatText(text, part);
	this.fillVatthuSelector(part);
	this.goVatthu(vatthu);
};
dhpaThai.formatText = function(text, part) {
	let result = "";
	result += "<h3 style='text-align:center;'>อรรถกถาธรรมบทแปล ภาค " + this.thaiNum[part] + "</h3>";
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
		} else if (lines[i].match(/\[[๐๑๒๓๔๕๖๗๘๙]+]$/) !== null) {
			let vhead = lines[i];
			vhead = vhead.replace(/<sup>.*<\/sup>/i, "");
			vhead = vhead.replace(/\*/, "").replace(/ {2,}/, " ");
			this.vatthuList.push(vhead);
			result += "<strong>" + lines[i] + "</strong>";
		} else {
			result += lines[i].replace(/^\t/, "&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		result += "<br>";
	}
	result += "</p>";
	return result;
};
dhpaThai.toArabicNum = function(num) {
	let result = "";
	for (let i=0; i<num.length; i++) {
		const ch = num.charAt(i);
		const chPos = this.thaiNum.indexOf(ch);
		if (chPos > -1)
			result += chPos;
	}
	return result;
};
dhpaThai.toThaiNum = function(num) {
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
dhpaThai.fillVatthuSelector = function(part) {
	const vaggas = this.vaggaList[part-1];
	let optgs = [];
	for (let i=0; i<vaggas.length; i++) {
		const optg = document.createElement("optgroup");
		optg.label = vaggas[i];
		optgs.push(optg);
	}
	const vattSelector = document.getElementById("vatthuselector");
	let vgnum = 0;
	let optgElem = optgs[vgnum];
	for (let i=0; i<this.vatthuList.length; i++) {
		const vt = this.vatthuList[i];
		if (i > 0 && vt.match(/ ๑\. /) !== null) {
			vgnum++;
			optgElem = optgs[vgnum];
		}
		const vtnum = vt.slice(vt.indexOf("[")+1, -1);
		const opt = document.createElement("option");
		opt.value = this.toArabicNum(vtnum);
		opt.innerText = vt;
		optgElem.appendChild(opt);
	}
	for (let i=0; i<optgs.length; i++)
		vattSelector.appendChild(optgs[i]);
};
dhpaThai.goVatthu = function(vatthu) {
	let vatToGo = "[" + this.toThaiNum(vatthu) + "]";
	const vattSelector = document.getElementById("vatthuselector");
	if (vatthu === undefined) {
		vatToGo = "[" + this.toThaiNum(vattSelector.options[vattSelector.selectedIndex].value) + "]";
	} else {
		for (let i=0; i<vattSelector.options.length; i++) {
			if (vattSelector.options[i].value === vatthu) {
				vattSelector.options[i].selected = true;
				break;
			}
		}
	}
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
