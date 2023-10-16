/*! rootmeaning.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const rootMeaning = {};
rootMeaning.util = {};
rootMeaning.paliInput = {};
rootMeaning.allMeaning = [];
rootMeaning.shownList = [];
rootMeaning.loadMeaningList = function() {
	const ajaxParams = {};
	ajaxParams.isBinary = true;
	ajaxParams.address = "assets/palitext/rootmean.gz";
	ajaxParams.successCallback = function(response) {
		rootMeaning.allMeaning = JSON.parse(window.pako.ungzip(response, { to: "string" }));
		rootMeaning.filter();
	};
	this.util.ajaxLoad(ajaxParams);
};
rootMeaning.filter = function() {
	this.shownList = [];
	const query = this.paliInput.getText();
	for (const m of this.allMeaning) {
		if (query.length === 0 || m[0].indexOf(query) > -1 || m[1].indexOf(query) > -1)
			this.shownList.push(m);
	}
	this.showResult();
};
rootMeaning.showResult = function() {
	const resultElem = document.getElementById("listresult");
	this.util.clearNode(resultElem);
	const countElem = document.getElementById("itemcount");
	if (this.shownList.length > 0) {
		const table = document.createElement("table");
		const thead = document.createElement("thead");
		const trh = document.createElement("tr");
		trh.innerHTML = "<th>Pāli</th><th>English</th>";
		thead.appendChild(trh);
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		for (const meaning of this.shownList) {
			const tr = document.createElement("tr");
			tr.style.fontSize = "0.9em";
			tr.innerHTML = "<td>" + meaning[0] + "</td><td>" + meaning[1] + "</td>";
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

