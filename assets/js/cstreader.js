/*! cstreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const cstReader = {};
cstReader.cst_url = "";
cstReader.util = {};
cstReader.params = {};
cstReader.headSelectorOptions = [];
cstReader.subheadSelectorOptions = [];
cstReader.paranumList = [];
cstReader.textCache = "";
cstReader.cstInfo = {};
cstReader.bookInfo = {};
cstReader.exegWindows = {};
cstReader.fixedToolBar = false;
cstReader.abbr = { "vin": "Vinaya", "sut": "Suttanta", "abh": "Abhidhamma", "mul": "Mūla", "att": "Aṭṭhakathā", "tik": "Ṭīkā", "ann": "Añña", "exe": "Exegesis" };
cstReader.titleDef = {
	"vinmul": "Main texts in the Vinaya (Vinayapiṭake mūlaganthā)",
	"vinexe": "Exegetical works in the Vinaya (Vinayapiṭake aṭṭhakathā ṭīkā ca)",
};
cstReader.instruction = "<strong>Instruction:</strong> Please read this first! Texts can be synchronized only with their opener. So, when opening individual documents here, they cannot be synced together. To sync them, they must be opened by their parent text with the <strong>toolbar</strong> provided. Chained synchonization can also be done by chained opening. The synchronization is done only for paragraph numbers.";
cstReader.getUrlParams = function() {
	const result = {};
	const vars = this.util.getUrlVars(location.href);
	for (const v in vars) {
		const dotPos = v.indexOf(".");
		let key, val;
		if (dotPos > -1) {
			key = v.slice(0, dotPos);
			val = v.slice(dotPos + 1);
		} else {
			key = v;
			val = vars[v];
		}
		result[key] = val;
	}
	return result;
};
cstReader.loadCstInfo = function() {
	const ajaxParams = {};
	ajaxParams.address = this.cst_url + "/cstinfo.json";
	ajaxParams.successCallback = function(response) {
		cstReader.cstInfo = JSON.parse(response);
		cstReader.loadTOC();
	};
	ajaxParams.failureCallback = function() {
		document.getElementById("textdisplay").innerHTML = "Unable to load CST information";
	};
	this.util.ajaxLoad(ajaxParams);
};
cstReader.loadTOC = function() {
	this.params = this.getUrlParams();
	const pkeys = Object.keys(this.params);
	if (pkeys.length > 0)
		this.loadText(pkeys[0]);
	else
		this.showTOC();
};
cstReader.showTOC = function() {
	const texts = { "vinmul": [], "vinexe": [],
					"sutmul": [], "sutexe": [],
					"abhmul": [], "abhexe": [] };
	for (const b in this.cstInfo) {
		const book = this.cstInfo[b];
		texts[book.group + book.class].push(book);
	}
	const resultElem = document.getElementById("textdisplay");
	this.util.clearNode(resultElem);
	const helpBox = document.createElement("blockquote");
	helpBox.innerHTML = this.instruction;
	resultElem.appendChild(helpBox);
	for (const t in texts) {
		if (texts[t].length > 0) {
			this.showTocTable(t, texts[t]);
		}
	}
};
cstReader.showTocTable = function(groupclass, list) {
	const resultElem = document.getElementById("textdisplay");
	const titleStr = this.titleDef[groupclass];
	const ppos = titleStr.indexOf("(");
	const tdiv = document.createElement("div");
	tdiv.style.paddingTop = "10px";
	let title = "<span style='font-weight:bold;font-size:1.2em;'>" + titleStr.slice(0, ppos) + "</span>";
	title += "<span style='font-weight:bold;font-size:1em;'>" + titleStr.slice(ppos) + "</span>";
	tdiv.innerHTML = title;
	resultElem.appendChild(tdiv);
	const table = document.createElement("table");
	table.style.fontSize = "0.9em";
	const thead = document.createElement("thead");
	thead.innerHTML = "<tr><th>Ref.</th><th>Book name</th><th>Description</th><th>Com.</th></tr>";
	table.appendChild(thead);
	const tbody = document.createElement("tbody");
	for (const item of list) {
		const tr = document.createElement("tr");
		const ref = "<a href='/cst?" + item.ref + "' target='_blank'>" + this.util.capitalize(item.ref) + "</a>";
		let row = "<td>" + ref + "</td>";
		const altname = item.altname.length > 0 ? " (" + item.altname.replace(/ (\d+)$/, "&nbsp;$1") + ")": "";
		row += "<td>" + item.name.replace(/ (\d+)$/, "&nbsp;$1") + altname + "</td>";
		row += "<td>" + item.description + "</td>";
		let commen = "";
		for (const com of item.commentary) {
			commen += "<a href='/cst?" + com + "' target='_blank'>" + this.util.capitalize(com) + "</a>, ";
		}
		commen = commen.slice(0, -2);
		row += "<td>" + commen + "</td>";
		tr.innerHTML = row;
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	resultElem.appendChild(table);
};
cstReader.loadText = function(ref) {
	this.bookInfo = this.cstInfo[ref];
	if (this.bookInfo === undefined) {
		document.getElementById("textdisplay").innerHTML = "Content not found";
		return;
	}
	const ajaxParams = {};
	ajaxParams.address = this.cst_url + "/gz/" + this.bookInfo.file;
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		cstReader.textCache = cstReader.formatText(window.pako.ungzip(response, { to: "string" }), cstReader.bookInfo);
		cstReader.displayText(cstReader.params[ref]);	
	};
	ajaxParams.failureCallback = function() {
		document.getElementById("textdisplay").innerHTML = "Content not found";
	};
	this.util.ajaxLoad(ajaxParams);
	document.title = this.bookInfo.name;
	document.getElementById("toolbar").style.display = "block";
	if (!this.fixedToolBar)
		this.util.toggleToolBar(this);
};
cstReader.formatText = function(text, book) {
	let result = "";
	result += this.util.makeHead(book.name);
	result += this.util.ccsaHtmlText;
	const lines = text.split(/\r?\n/);
	result += "<br>";
	let currHeadIndex = -1;
	let optgroupStarted = false;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].trim().length > 0) {
			const line = lines[i].replaceAll(/(\[.*?\])/g, "<span style='color:gray;'>$1</span>");
			if (line.startsWith("<h")) {
				result += line.replace(/<h2/, "<h2 style='text-align:center;'");
				if (line.startsWith("<h3")) {
					const t = this.util.getInnerText(line);
					this.headSelectorOptions.push("<option value='" + t + "'>" + t + "</option>");
					currHeadIndex++;
					this.subheadSelectorOptions[currHeadIndex] = [];
					if (optgroupStarted) {
						this.subheadSelectorOptions[currHeadIndex].push("</optgroup>");
						optgroupStarted = false;
					}
				} else if (line.startsWith("<h4")) {
					const t = this.util.getInnerText(line);
					this.subheadSelectorOptions[currHeadIndex].push("<option value='" + t + "'>" + t + "</option>");
				}
			} else if (line.startsWith("<div class=\"group")) {
				const t = this.util.getInnerText(line);
				if (optgroupStarted)
					this.subheadSelectorOptions[currHeadIndex].push("</optgroup>");
				this.subheadSelectorOptions[currHeadIndex].push("<optgroup label='" + t + "'>");
				optgroupStarted = true;
				result += line;
			} else if (line.startsWith("<div class=\"centre")) {
				result += line.replace(/<div/, "<div style='text-align:center;'");
			} else if (line.startsWith("<div class=\"indent")) {
				result += line.replace(/>/, ">\t\t");
			} else if (line.startsWith("<div class=\"gatha")) {
				if (line.indexOf("\"gathalast\"") > -1)
					result += line.replace(/>/, ">\t").replace(/div /, "div style='padding-bottom:12px;' ");
				else
					result += line.replace(/>/, ">\t");
			} else if (line.match(/^\d+/) !== null) {
				const pnum = line.match(/^[0-9-]+/)[0];
				this.paranumList.push(pnum);
				const br = lines[i-2].startsWith("<h") ? "" : "<br>";
				result += br + "\t" + line.replace(/^([0-9-]+)/, "<strong>$1</strong>") + "<br>";
			} else {
				const br = line.startsWith("<div") ? "" : "<br>";
				const tab = line.startsWith("<div") ? "" : "\t";
				result += tab + line + br;
			}
		}
	}
	if (optgroupStarted) {
		this.subheadSelectorOptions[currHeadIndex].push("</optgroup>");
		optgroupStarted = false;
	}
	return result;
};
cstReader.displayText = function(pnum) {
	this.updateDisplay();
	this.fillHeadSelector();
	this.fillParaNumList();
	if (this.bookInfo.commentary.length > 0) {
		const exegBar = document.getElementById("exegbar");
		exegBar.style.display = "inline";
		for (const com of this.bookInfo.commentary) {
			const exItem = this.cstInfo[com];
			const exButt = document.createElement("button");
			exButt.title = exItem.name;
			exButt.innerHTML = "<svg class='icon'><use xlink:href='/assets/fontawesome/custom.svg#scroll'></use></svg>";
			exButt.addEventListener("click", function() {
				cstReader.openBook(exItem.ref);
			});
			exegBar.appendChild(exButt);
		}
	}
	if (pnum.length > 0)
		this.goParaNum(pnum);
};
cstReader.updateDisplay = function() {
	const resultElem = document.getElementById("textdisplay");
	const text = document.getElementById("withnotes").checked
				? this.textCache
				: this.textCache.replaceAll(/ ?\[.*?\]/g, "");
	resultElem.innerHTML = text;
};
cstReader.openBook = function(ref) {
	const win = window.open("/cst?" + ref, "cst-" + ref);
	this.exegWindows[ref] = win;
};
cstReader.fillParaNumList = function() {
	this.util.fillSelectOptions(document.getElementById("paranumselector"), this.paranumList);
};
cstReader.fillHeadSelector = function() {
	const headSelector = document.getElementById("headselector");
	headSelector.innerHTML = this.headSelectorOptions.join("\n");
	this.fillSubheadSelector(headSelector.selectedIndex);
};
cstReader.fillSubheadSelector = function(index) {
	const subheadSelector = document.getElementById("subheadselector");
	if (this.subheadSelectorOptions[index].length > 0) {
		subheadSelector.innerHTML = this.subheadSelectorOptions[index].join("\n");
		subheadSelector.style.display = "inline";
	} else {
		subheadSelector.style.display = "none";
	}
};
cstReader.findElementAndGo = function(list, str) {
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
cstReader.goHead = function() {
	const headSelector = document.getElementById("headselector");
	const headToGo = headSelector.options[headSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allH3 = resultElem.getElementsByTagName("h3");
	this.findElementAndGo(allH3, headToGo);
	this.fillSubheadSelector(headSelector.selectedIndex);
};
cstReader.goSubhead = function() {
	const subheadSelector = document.getElementById("subheadselector");
	const subheadToGo = subheadSelector.options[subheadSelector.selectedIndex].value;
	const resultElem = document.getElementById("textdisplay");
	const allH4 = resultElem.getElementsByTagName("h4");
	this.findElementAndGo(allH4, subheadToGo);
};
cstReader.goParaNum = function(pnum) {
	const paranumSelector = document.getElementById("paranumselector");
	const pnumToGo = pnum === undefined || pnum.length === 0 ? paranumSelector.options[paranumSelector.selectedIndex].value : pnum;
	const resultElem = document.getElementById("textdisplay");
	const allElm = resultElem.getElementsByTagName("strong");
	for (let i=0; i<allElm.length; i++) {
		const text = allElm[i].textContent.trim();
		const dpos = text.indexOf("-");
		const reStart = new RegExp("^" + pnumToGo + "-?");
		const reEnd = new RegExp("-" + pnumToGo + "$");
		if (text === pnumToGo || text.match(reStart) !== null || text.match(reEnd) !== null) {
			this.util.scroll(allElm[i], this.fixedToolBar);
			this.util.setSelectSelection(paranumSelector, text);
			break;
		} else if (dpos > -1) {
			const nstart = parseInt(text.slice(0, dpos));
			const nend = parseInt(text.slice(dpos + 1));
			const pnum = parseInt(pnumToGo);
			if (pnum > nstart && pnum < nend) {
				this.util.scroll(allElm[i], this.fixedToolBar);
				this.util.setSelectSelection(paranumSelector, text);
				break;
			}
		}
	}
	this.syncExegesis(pnum);
};
cstReader.syncExegesis = function(pnum) {
	const syncExeg = document.getElementById("syncexeg");
	if (syncExeg.checked) {
		for (const win in this.exegWindows) {
			if ("document" in this.exegWindows[win]) {
				const paranumSelector = document.getElementById("paranumselector");
				const pnToGo = pnum === undefined || pnum.length === 0 ? paranumSelector.options[paranumSelector.selectedIndex].value.replace(/-.*/, "") : pnum;
				this.exegWindows[win].cstReader.goParaNum(pnToGo);
			}
		}
	}
};

