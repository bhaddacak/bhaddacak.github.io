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
	"sutmul": "Main texts in the Suttanta (Suttantapiṭake mūlaganthā)",
	"sutexe": "Exegetical works in the Suttanta (Suttantapiṭake aṭṭhakathā ṭīkā ca)",
	"abhmul": "Main texts in the Abhidhamma (Abhidhammapiṭake mūlaganthā)",
	"abhexe": "Exegetical works in the Abhidhamma (Abhidhammapiṭake aṭṭhakathā ṭīkā ca)",
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
	thead.innerHTML = "<tr><th style='width:4.5em;'>Ref.</th><th>Book name</th><th>Description</th><th style='width:4.5em;'>Com.</th></tr>";
	table.appendChild(thead);
	const tbody = document.createElement("tbody");
	for (const item of list) {
		const tr = document.createElement("tr");
		const ref = "<a href='/cst?" + item.ref + "' target='_blank'>" + this.util.capitalize(item.ref) + "</a>";
		let row = "<td>" + ref + "</td>";
		const altname = item.altname.length > 0 ? " (" + item.altname.join(", ").replace(/ (\d+)$/, "&nbsp;$1") + ")": "";
		row += "<td>" + item.name.replace(/ (\d+)$/, "&nbsp;$1") + altname + "</td>";
		row += "<td>" + item.description + "</td>";
		let commen = "";
		for (const com of item.commentary) {
			commen += "<a href='/cst?" + com + "' target='_blank'>" + this.util.capitalize(com) + "</a>,<br>";
		}
		commen = commen.slice(0, -5);
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
	let paranumGroupIndex = -1;
	let optgroupStarted = false;
	for (let i=0; i<lines.length; i++) {
		if (lines[i].startsWith("<!--"))
			continue;
		if (lines[i].trim().length > 0) {
			const line = lines[i].replaceAll(/(\[.*?\])/g, "<span style='color:gray;'>$1</span>");
			if (line.startsWith("<h")) {
				if (line.startsWith("<h2")) {
					result += line.replace(/<h2/, "<h2 style='text-align:center;'");
				} else if (line.startsWith("<h3")) {
					const t = this.util.getInnerText(line);
					this.headSelectorOptions.push("<option value='" + t + "'>" + t + "</option>");
					currHeadIndex++;
					this.subheadSelectorOptions[currHeadIndex] = [];
					if (optgroupStarted) {
						this.subheadSelectorOptions[currHeadIndex-1].push("</optgroup>");
						optgroupStarted = false;
					}
					result += line.replace(/<h3/, "<h3 id='" + t + "'");
				} else if (line.startsWith("<h4")) {
					const t = this.util.getInnerText(line);
					this.subheadSelectorOptions[currHeadIndex].push("<option value='" + currHeadIndex + ":" + t + "'>" + t + "</option>");
					result += line.replace(/<h4/, "<h4 id='" + currHeadIndex + ":" + t + "'");
				}
			} else if (line.startsWith("<div class=\"group")) {
				const t = this.util.getInnerText(line);
				if (optgroupStarted)
					this.subheadSelectorOptions[currHeadIndex].push("</optgroup>");
				this.subheadSelectorOptions[currHeadIndex].push("<optgroup label='" + t + "'>");
				optgroupStarted = true;
				result += line.replace(/<div/, "<div style='padding-top:10px;'");
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
				if (paranumGroupIndex === -1) {
					paranumGroupIndex++;
					this.paranumList.push([]);
				} else {
					// if another series starts
					if (pnum === "1" || pnum.startsWith("1-")) {
						paranumGroupIndex++;
						this.paranumList.push([]);
					}
				}
				this.paranumList[paranumGroupIndex].push(pnum);
				const br = lines[i-2].startsWith("<h") ? "" : "<br>";
				const numId = "pn" + (paranumGroupIndex + 1) + ":" + pnum;
				result += br + "\t" + line.replace(/^([0-9-]+)/, "<strong id='" + numId + "'>$1</strong>") + "<br>";
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
		document.getElementById("syncexeg").disabled = !this.bookInfo.linkable;
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
	const paranumSelector = document.getElementById("paranumselector");
	if (this.paranumList.length > 0) {
		paranumSelector.style.display = "inline";
		const nlist = [];
		const vlist = [];
		for (let i=0; i < this.paranumList.length; i++) {
			for (let j=0; j < this.paranumList[i].length; j++) {
				nlist.push(this.paranumList[i][j]);
				vlist.push((i+1) + ":" + this.paranumList[i][j]);
			}
		}
		this.util.fillSelectOptions(paranumSelector, nlist, vlist);
	}
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
cstReader.goHead = function() {
	const headSelector = document.getElementById("headselector");
	const headToGo = headSelector.options[headSelector.selectedIndex].value;
	const targetElem = document.getElementById(headToGo);
	this.util.scroll(targetElem, this.fixedToolBar);
	this.fillSubheadSelector(headSelector.selectedIndex);
};
cstReader.goSubhead = function() {
	const subheadSelector = document.getElementById("subheadselector");
	const subheadToGo = subheadSelector.options[subheadSelector.selectedIndex].value;
	const targetElem = document.getElementById(subheadToGo);
	this.util.scroll(targetElem, this.fixedToolBar);
};
cstReader.goParaNum = function(pnum) {
	let success = false;
	const paranumSelector = document.getElementById("paranumselector");
	const pnumToGo = pnum === undefined || pnum.length === 0
				? paranumSelector.options[paranumSelector.selectedIndex].value
				: pnum.indexOf(":") > -1
					? pnum
					: "1:" + pnum;
	const resultElem = document.getElementById("textdisplay");
	const pnumElem = document.getElementById("pn" + pnumToGo);
	if (pnumElem !== null) {
		// if exactly found, go to it
		this.util.scroll(pnumElem, this.fixedToolBar);
		this.util.setSelectSelection(paranumSelector, pnumToGo);
		success = true;
	} else {
		// if not, search in ranges through all
		const pnumCode = pnumToGo.split(":");
		const pnToGo = pnumCode[1];
		const allElm = resultElem.getElementsByTagName("strong");
		for (let i=0; i<allElm.length; i++) {
			const elemId = allElm[i].id;
			if (elemId === undefined || elemId === null)
				continue;
			const nCode = elemId.slice(2).split(":");
			if (pnumCode[0] !== nCode[0])
				continue;
			const numStr = nCode[1];
			const dpos = numStr.indexOf("-");
			const reStart = new RegExp("^" + pnToGo + "-?");
			const reEnd = new RegExp("-" + pnToGo + "$");
			if (numStr === pnToGo || numStr.match(reStart) !== null || numStr.match(reEnd) !== null) {
				this.util.scroll(allElm[i], this.fixedToolBar);
				this.util.setSelectSelection(paranumSelector, nCode[0] + ":" + numStr);
				success = true;
				break;
			} else if (dpos > -1) {
				const nstart = parseInt(numStr.slice(0, dpos));
				const nend = parseInt(numStr.slice(dpos + 1));
				const pnum = parseInt(pnToGo);
				if (pnum > nstart && pnum < nend) {
					this.util.scroll(allElm[i], this.fixedToolBar);
					this.util.setSelectSelection(paranumSelector, nCode[0] + ":" + numStr);
					success = true;
					break;
				}
			}
		}
	}
	this.syncExegesis(pnumToGo);
	return success;
};
cstReader.syncExegesis = function(pnum) {
	const syncExeg = document.getElementById("syncexeg");
	if (syncExeg.checked) {
		for (const win in this.exegWindows) {
			if ("document" in this.exegWindows[win]) {
				const paranumSelector = document.getElementById("paranumselector");
				const selVal = paranumSelector.options[paranumSelector.selectedIndex].value;
				const pn = pnum === undefined || pnum.length === 0 ? selVal : pnum;
				let pnToGo = [pn];
				if (pn.indexOf("-") > -1) {
					const colPos = pn.indexOf(":");
					const grpNum = pn.slice(0, colPos);
					const nums = pn.slice(colPos + 1).split("-");
					pnToGo = [grpNum + ":" + nums[0], grpNum + ":" + nums[1]];
				}
				if (!this.exegWindows[win].cstReader.goParaNum(pnToGo[0]) && pnToGo.length > 1)
					this.exegWindows[win].cstReader.goParaNum(pnToGo[1])
			}
		}
	}
};

