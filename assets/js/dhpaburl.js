/*! dhpaburl.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const dhpaBurl = {};
dhpaBurl.vaggaList = [
	["Book 1. Pairs, Yamaka Vagga", "Book 2. Heedfulness, Appamada Vagga"], 
	["Book 3. Thoughts, Citta Vagga ", "Book 4. Flowers, Puppha Vagga ", "Book 5. The Simpleton, Bala Vagga ", "Book 6. The Wise Man, Pandita Vagga ", "Book 7. The Arahat, Arahanta Vagga ", "Book 8. Thousands, Sahassa Vagga ", "Book 9. Evil, Papa Vagga ", "Book 10. The Rod or Punishment, Danda Vagga ", "Book 11. Old Age, Jara Vagga ", "Book 12. Self, Atta Vagga"], 
	["Book 13. The World, Loka Vagga ", "Book 14. The Enlightened, Buddha Vagga ", "Book 15. Happiness, Sukha Vagga ", "Book 16. Objects of Affection, Piya Vagga ", "Book 17. Anger, Kodha Vagga ", "Book 18. Blemishes, Mala Vagga ", "Book 19. The Righteous, Dhammattha Vagga ", "Book 20. The Path, Magga Vagga ", "Book 21. Miscellaneous, Pakinnaka Vagga ", "Book 22. Hell, Niraya Vagga ", "Book 23. The Elephant, Naga Vagga ", "Book 24. Thirst or Craving, Tanha Vagga ", "Book 25. The Monk, Bhikkhu Vagga ", "Book 26. The Brahman, Brahmana Vagga"]];
dhpaBurl.romanNum = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
dhpaBurl.volumeList = [[1, 23], [24, 136], [137, 302]];
dhpaBurl.util = {};
dhpaBurl.params = {};
dhpaBurl.currVol = 1;
dhpaBurl.vatthuList = [];
dhpaBurl.fixedToolBar = true;
dhpaBurl.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	if ("vt" in vars)
		result["vatthu"] = vars.vt;
	else
		result["vatthu"] = "1";
	return result;
};
dhpaBurl.getVolumeNum = function(vtnum) {
	const vt = typeof vtnum === "string" ? parseInt(vtnum) : vtnum;
	let result = -1;
	for (let i=0; i<this.volumeList.length; i++) {
		if (vt >= this.volumeList[i][0] && vt <= this.volumeList[i][1]) {
			result = i + 1;
			break;
		}
	}
	return result;
};
dhpaBurl.loadText = function() {
	this.params = this.getUrlParams();
	const vol = this.getVolumeNum(this.params.vatthu);
	if (vol < 0) {
		document.getElementById("textdisplay").innerText = "Content not found";
		return;
	} else {
		this.currVol = vol;
	}
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/dhpa/dhpabg0" + vol + ".gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		const content = window.pako.ungzip(response, { to: "string" });
		dhpaBurl.displayText(dhpaBurl.formatText(content));
	};
	this.util.ajaxLoad(ajaxParams);
};
dhpaBurl.displayText = function(textObj) {
	const resultElem = document.getElementById("textdisplay");
	let head = this.util.makeHead(textObj.head);
	head += this.util.ccsaHtmlText;
	resultElem.innerHTML = head + textObj.text;
	this.vatthuList = textObj.topicList;
	this.fillVatthuSelector();
	this.goVatthu(this.params.vatthu);
};
dhpaBurl.formatText = function(text) {
	const result = {};
	result.topicList = [];
	result.head = "Translation of the Legends of <br>the Dhammapada Commentary, Vol. " + this.romanNum[this.currVol];
	const lines = text.split(/\r?\n/);
	const topicRex = new RegExp("\\[ \\d+ \\]$");
	let resultText = "<br>";
	let pstarted = false;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].match(/page \d\d\d/) !== null) {
			const pstyle = " style='text-align:left;padding-top:5px;'";
			if (!pstarted) {
				resultText += "<p" + pstyle + ">";
				pstarted = true;
			} else {
				resultText += "</p><p" + pstyle + ">";
			}
			resultText += lines[i];
		} else if (lines[i].match(topicRex) !== null) {
			let vhead = lines[i];
			result.topicList.push(vhead);
			resultText += "<strong>" + lines[i] + "</strong>";
		} else {
			resultText += lines[i];
		}
		resultText += "<br>";
	}
	resultText += "</p>";
	result.text = resultText;
	return result;
};
dhpaBurl.fillVatthuSelector = function() {
	const vaggas = this.vaggaList[this.currVol-1];
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
	const allHead = document.getElementsByTagName("strong");
	for (let i=0; i<allHead.length; i++) {
		const head = allHead[i].textContent;
		if (i > 0 && head.match(/ 1\. /) !== null) {
			vgnum++;
			optgElem = optgs[vgnum];
		}
		const vtnum = head.slice(head.indexOf("[")+1, -1).trim();
		const opt = document.createElement("option");
		opt.value = vtnum;
		opt.innerText = head;
		optgElem.appendChild(opt);
	}
	for (let i=0; i<optgs.length; i++)
		vattSelector.appendChild(optgs[i]);
};
dhpaBurl.goVatthu = function(vatthu) {
	const vattSelector = document.getElementById("vatthuselector");
	let vatToGo;
	if (vatthu === undefined) {
		const vt = vattSelector.options[vattSelector.selectedIndex].value;
		vatToGo = vt;
	} else {
		const selInd = this.util.findSelectIndex(vattSelector, vatthu);
		if (selInd > -1)
			vattSelector.options[selInd].selected = true;
		vatToGo = vatthu;
	}
	vatToGo = "[ " + vatToGo + " ]";
	const resultElem = document.getElementById("textdisplay");
	const allP = resultElem.getElementsByTagName("p");
	for (let i=0; i<allP.length; i++) {
		const p = allP[i];
		const nodes = p.getElementsByTagName("strong");
		for (let n=0; n<nodes.length; n++) {
			if (nodes[n].textContent.indexOf(vatToGo) > -1) {
				this.util.scroll(p, this.fixedToolBar);
				break;
			}
		}
	}
};

