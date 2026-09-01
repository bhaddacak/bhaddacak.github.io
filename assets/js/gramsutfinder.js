/*! gramsutfinder.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const gramsutFinder = {};
gramsutFinder.abbrList = { "k": "kacc", "r": "rupa", "m": "mogg", "p": "payo", "n": "niru", "s": "sadd" };
gramsutFinder.groupSwitch = {
"Kacc": { shown: true },
"Rūpa": { shown: true },
"Mogg": { shown: true },
"Payo": { shown: true },
"Niru": { shown: true },
"Sadd": { shown: true },
};
gramsutFinder.util = {};
gramsutFinder.xrefUtil = {};
gramsutFinder.paliInput = {};
gramsutFinder.shownGroup = [];
gramsutFinder.allSutta = [];
gramsutFinder.shownList = [];
gramsutFinder.loadHeadList = function() {
	const ajaxParams = {};
	ajaxParams.isBinary = true;
	ajaxParams.address = "assets/palitext/gram/allheads.gz";
	ajaxParams.successCallback = function(response) {
		gramsutFinder.allSutta = JSON.parse(window.pako.ungzip(response, { to: "string" }));
		gramsutFinder.filter();
	};
	this.util.ajaxLoad(ajaxParams);
};
gramsutFinder.groupSelect = function(isAll) {
	document.getElementById("cbkacc").checked = isAll;
	document.getElementById("cbrupa").checked = isAll;
	document.getElementById("cbmogg").checked = isAll;
	document.getElementById("cbpayo").checked = isAll;
	document.getElementById("cbniru").checked = isAll;
	document.getElementById("cbsadd").checked = isAll;
	this.filter();
};
gramsutFinder.processGroupSwitch = function() {
	this.groupSwitch["Kacc"].shown = document.getElementById("cbkacc").checked;
	this.groupSwitch["Rūpa"].shown = document.getElementById("cbrupa").checked;
	this.groupSwitch["Mogg"].shown = document.getElementById("cbmogg").checked;
	this.groupSwitch["Payo"].shown = document.getElementById("cbpayo").checked;
	this.groupSwitch["Niru"].shown = document.getElementById("cbniru").checked;
	this.groupSwitch["Sadd"].shown = document.getElementById("cbsadd").checked;
	this.shownGroup = [];
	for (const g in this.groupSwitch) {
		if (this.groupSwitch[g].shown)
			this.shownGroup.push(g);
	}
};
gramsutFinder.filter = function() {
	this.processGroupSwitch();
	this.shownList = [];
	const query = this.paliInput.getText();
	for (const s of this.allSutta) {
		const title = s.slice(0, 4);
		if (this.shownGroup.indexOf(title) > -1) {
			if (query.length === 0 || s.indexOf(query) > -1)
				this.shownList.push(s);
		}
	}
	//this.shownList.sort(this.compareHead);
	this.showResult();
};
gramsutFinder.showResult = function() {
	const resultElem = document.getElementById("listresult");
	this.util.clearNode(resultElem);
	const countElem = document.getElementById("wordcount");
	if (this.shownList.length > 0) {
		const table = document.createElement("table");
		const tbody = document.createElement("tbody");
		for (const hd of this.shownList) {
			const tr = document.createElement("tr");
			tr.style.fontSize = "0.9em";
			let head = "";
			if (document.getElementById("withnotes").checked)
				head = hd;
			else
				head = hd.startsWith("Niru") ? hd.replace(/ \[.*?\]/g, "") : hd;
			const snum = this.xrefUtil.getSuttaNumber(head);
			head = this.addLink(head, snum);
			let seealso = "";
			if (document.getElementById("seealso").checked) {
				const xref = this.xrefUtil.getXref(snum);
				if (xref.length > 0)
					seealso = "<br>[" + xref.join(", ") + "]";
			}
			tr.innerHTML = "<td>" + head + seealso + "</td>";
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		resultElem.appendChild(table);
		const s = this.shownList.length > 1 ? "s" : "";
		countElem.innerHTML = this.shownList.length + "&nbsp;item" + s + "&nbsp;found"; 
		countElem.style.display = "inline";
	} else {
		countElem.style.display = "none";
	}
};
gramsutFinder.addLink = function(head, snum) {
	const book = snum.charAt(0);
	const firstdot = head.indexOf(".");
	const dotpos = book === "m" || book === "p" ? head.indexOf(".", firstdot+1) : firstdot;
	const linkStr = "<a style='cursor:pointer;' onClick=gramsutFinder.openSutta('"+snum+"');>" + head.slice(0, dotpos+1) + "</a>";
	return linkStr + head.slice(dotpos+1);
};
gramsutFinder.openSutta = function(snum) {
	const book = this.abbrList[snum.charAt(0)];
	const num = snum.slice(1);
	window.open("/" + book + "?" + num, "gramsut-" + book);
};
gramsutFinder.compareHead = function(a, b) {
	const snumA = gramsutFinder.xrefUtil.getSuttaNumber(a);
	const snumB = gramsutFinder.xrefUtil.getSuttaNumber(b);
	return gramsutFinder.xrefUtil.compareSuttaNumber(snumA, snumB);
};

