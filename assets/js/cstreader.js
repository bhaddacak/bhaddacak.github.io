/*! cstreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const cstReader = {};
cstReader.util = {};
cstReader.dataUtil = {};
cstReader.params = {};
cstReader.headSelectorOptions = [];
cstReader.subheadSelectorOptions = [];
cstReader.paranumList = [];
cstReader.textCache = "";
cstReader.bookInfo = {};
cstReader.exegWindows = {};
cstReader.fixedToolBar = false;
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
	for (const b in this.dataUtil.bookInfo) {
		const book = this.dataUtil.bookInfo[b];
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
	const titleStr = this.dataUtil.titleDef[groupclass];
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
	this.bookInfo = this.dataUtil.bookInfo[ref];
	const ajaxParams = {};
	ajaxParams.address = "/assets/palitext/cst/" + this.bookInfo.file;
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		cstReader.textCache = cstReader.formatText(window.pako.ungzip(response, { to: "string" }), cstReader.bookInfo);
		cstReader.displayText(cstReader.params[ref]);	
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
			if (lines[i].startsWith("<h")) {
				result += lines[i].replace(/<h2/, "<h2 style='text-align:center;'");
				if (lines[i].startsWith("<h3")) {
					const t = this.util.getInnerText(lines[i]);
					this.headSelectorOptions.push("<option value='" + t + "'>" + t + "</option>");
					currHeadIndex++;
					this.subheadSelectorOptions[currHeadIndex] = [];
					if (optgroupStarted) {
						this.subheadSelectorOptions[currHeadIndex].push("</optgroup>");
						optgroupStarted = false;
					}
				} else if (lines[i].startsWith("<h4")) {
					const t = this.util.getInnerText(lines[i]);
					this.subheadSelectorOptions[currHeadIndex].push("<option value='" + t + "'>" + t + "</option>");
				}
			} else if (lines[i].startsWith("<span class=\"group")) {
				const t = this.util.getInnerText(lines[i]);
				if (optgroupStarted)
					this.subheadSelectorOptions[currHeadIndex].push("</optgroup>");
				this.subheadSelectorOptions[currHeadIndex].push("<optgroup label='" + t + "'>");
				optgroupStarted = true;
				let line = lines[i].replace(/<\/?span.*?>/, "");
				result += "<strong>" + line + "</strong><br>";
			} else if (lines[i].startsWith("<span class=\"center")) {
				let line = lines[i].replace(/<\/?span.*?>/, "");
				line = "<div style='text-align:center;'>" + line + "</div>";
				result += line;
			} else if (lines[i].startsWith("<span class=\"indent")) {
				result += "\t\t" + lines[i] + "<br><br>";
			} else if (lines[i].startsWith("<span class=\"gatha")) {
				result += "\t" + lines[i] + "<br>";
			} else if (lines[i].match(/^\d+/) !== null) {
				const pnum = lines[i].match(/^[0-9-]+/)[0];
				this.paranumList.push(pnum);
				const br = lines[i-2].startsWith("<h") ? "" : "<br>";
				result += br + "\t" + lines[i].replace(/^([0-9-]+)/, "<strong>$1</strong>") + "<br>";
			} else {
				result += "\t" + lines[i] + "<br>";
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
			const exItem = this.dataUtil.bookInfo[com];
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

