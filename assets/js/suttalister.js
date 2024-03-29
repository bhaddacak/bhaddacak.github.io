/*! suttalister.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const suttaLister = {};
suttaLister.titleList = [
"bu-vb-pj", "bu-vb-ss", "bu-vb-ay", "bu-vb-np", "bu-vb-pc", "bu-vb-pd", "bu-vb-sk", "bu-vb-as",
"bi-vb-pj", "bi-vb-ss", "bi-vb-ay", "bi-vb-np", "bi-vb-pc", "bi-vb-pd", "bi-vb-sk", "bi-vb-as",
"kd", "pvr", "dn", "mn", "sn", "an", "kp", "dhp", "ud", "iti", "snp", "thag", "thig", "cp"
];
suttaLister.groupSwitch = {
"vin": { start: 0, end: 17, shown: true },
"dn": { start: 18, end: 18, shown: true },
"mn": { start: 19, end: 19, shown: true },
"sn": { start: 20, end: 20, shown: true },
"an": { start: 21, end: 21, shown: true },
"kn": { start: 22, end: 29, shown: true },
};
suttaLister.util = {};
suttaLister.paliInput = {};
suttaLister.shownGroup = [];
suttaLister.allSutta = {};
suttaLister.idList = [];
suttaLister.loadSuttaList = function() {
	const ajaxParams = {};
	ajaxParams.address = "assets/palitext/suttalist.json";
	ajaxParams.successCallback = function(response) {
		suttaLister.allSutta = JSON.parse(response);
		suttaLister.filter();
	};
	this.util.ajaxLoad(ajaxParams);
};
suttaLister.groupSelect = function(isAll) {
	document.getElementById("cbvin").checked = isAll;
	document.getElementById("cbdn").checked = isAll;
	document.getElementById("cbmn").checked = isAll;
	document.getElementById("cbsn").checked = isAll;
	document.getElementById("cban").checked = isAll;
	document.getElementById("cbkn").checked = isAll;
	this.filter();
};
suttaLister.processGroupSwitch = function() {
	this.groupSwitch["vin"].shown = document.getElementById("cbvin").checked;
	this.groupSwitch["dn"].shown = document.getElementById("cbdn").checked;
	this.groupSwitch["mn"].shown = document.getElementById("cbmn").checked;
	this.groupSwitch["sn"].shown = document.getElementById("cbsn").checked;
	this.groupSwitch["an"].shown = document.getElementById("cban").checked;
	this.groupSwitch["kn"].shown = document.getElementById("cbkn").checked;
	this.shownGroup = [];
	for (const g in this.groupSwitch) {
		if (this.groupSwitch[g].shown) {
			for (let i=this.groupSwitch[g].start; i<=this.groupSwitch[g].end; i++)
				this.shownGroup.push(this.titleList[i]);
		}
	}
};
suttaLister.filter = function() {
	this.processGroupSwitch();
	this.idList = [];
	const query = this.paliInput.getText().toLowerCase();
	for (const s in this.allSutta) {
		const title = this.breakTitle(s).char;
		if (this.shownGroup.indexOf(title) > -1) {
			if (query.length === 0 || this.allSutta[s].toLowerCase().indexOf(query) > -1)
				this.idList.push(s);
		}
	}
	this.idList.sort(this.compareTitle);
	this.showResult();
};
suttaLister.showResult = function() {
	const resultElem = document.getElementById("listresult");
	this.util.clearNode(resultElem);
	const countElem = document.getElementById("wordcount");
	if (this.idList.length > 0) {
		const table = document.createElement("table");
		const thead = document.createElement("thead");
		thead.innerHTML = "<tr class='header'><th>Reference</th><th>Description</th></tr>";
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		for (let i=0; i<this.idList.length; i++) {
			const tr = document.createElement("tr");
			tr.style.fontSize = "0.9em";
			const id = this.idList[i];
			const link = "<a href='/suttareader?s=" + id + "' target='_blank'>" + id + "</a>";
			tr.innerHTML = "<td>" + link + "</td><td style='text-align:left;'>" + this.allSutta[id] + "</td>";
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		resultElem.appendChild(table);
		const s = this.idList.length > 1 ? "s" : "";
		countElem.innerHTML = this.idList.length + "&nbsp;item" + s + "&nbsp;found"; 
		countElem.style.display = "inline";
	} else {
		countElem.style.display = "none";
	}
};
suttaLister.breakTitle = function(title) {
	let result = { char: "", num: 0, dec: 0 };
	const parts = title.split(".");
	if (parts.length >= 2) {
		const dashPos = parts[1].indexOf("-");
		result.dec = dashPos > -1 ? parseInt(parts[1].slice(0, parts[1].indexOf("-"))) : parseInt(parts[1]);
	}
	let numStart = 0;
	for (let i=0; i<parts[0].length; i++) {
		if (!isNaN(parts[0][i])) {
			numStart = i;
			break;
		}
	}
	result.char = parts[0].slice(0, numStart);
	if (numStart < parts[0].length)
		result.num = parseInt(parts[0].slice(numStart));
	return result;
};
suttaLister.compareTitle = function(a, b) {
	let result = 0;
	const titleA = suttaLister.breakTitle(a);
	const titleB = suttaLister.breakTitle(b);
	const charDiff = suttaLister.titleList.indexOf(titleA.char) - suttaLister.titleList.indexOf(titleB.char);
	if (charDiff !== 0) {
		result = charDiff;
	} else {
		const numDiff = titleA.num - titleB.num;
		if (numDiff !== 0)
			result = numDiff;
		else 
			result = titleA.dec - titleB.dec;
	}
	return result;
};
