/*! tepdict.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const tepDict = {};
tepDict.util = {};
tepDict.paliInput = {};
tepDict.tpDict = [];
tepDict.teDict = {};
tepDict.epDict = [];
tepDict.shownTepList = [];
tepDict.shownCepdList = [];
tepDict.toggleNotes = function() {
	const noteBox = document.getElementById("notebox");
	if (noteBox.style.display === "none")
		noteBox.style.display = "block";
	else
		noteBox.style.display = "none";
};
tepDict.loadCepd = function() {
	const ajaxParams = {};
	ajaxParams.isBinary = true;
	ajaxParams.address = "assets/palitext/cepd.gz";
	ajaxParams.successCallback = function(response) {
		tepDict.epDict = JSON.parse(window.pako.ungzip(response, { to: "string" }));
		tepDict.ready();
	};
	this.util.ajaxLoad(ajaxParams);
};
tepDict.ready = function() {
	document.getElementById("listresult").innerText = "Ready to search";
};
tepDict.includeTpd = function() {
	if (this.tpDict.length > 0) {
		this.filter();
	} else {
		const messElem = document.getElementById("tpdload");
		messElem.style.display = "inline";
		const ajaxParams = {};
		ajaxParams.isBinary = true;
		ajaxParams.address = "assets/palitext/tpdict.gz";
		ajaxParams.successCallback = function(response) {
			tepDict.tpDict = JSON.parse(window.pako.ungzip(response, { to: "string" }));
			messElem.style.display = "none";
			tepDict.filter();
		};
		this.util.ajaxLoad(ajaxParams);
	}
};
tepDict.includeLexte = function() {
	if (Object.keys(this.teDict).length > 0) {
		this.filter();
	} else {
		const messElem = document.getElementById("lexteload");
		messElem.style.display = "inline";
		const ajaxParams = {};
		ajaxParams.isBinary = true;
		ajaxParams.address = "assets/palitext/tedict.gz";
		ajaxParams.successCallback = function(response) {
			tepDict.teDict = JSON.parse(window.pako.ungzip(response, { to: "string" }));
			messElem.style.display = "none";
			tepDict.filter();
		};
		this.util.ajaxLoad(ajaxParams);
	}
};
tepDict.filter = function() {
	this.shownTepList = [];
	this.shownCepdList = [];
	const query = this.paliInput.getText();
	if (query.length >= 2) {
		if (document.getElementById("tpd").checked) {
			for (const entry of this.tpDict) {
				if (document.getElementById("lexte").checked && this.teDict[entry.id] && this.teDict[entry.id].indexOf(query) > -1)
					this.shownTepList.push(entry);
				else if (entry.term.indexOf(query) > -1 || entry.def.indexOf(query) > -1)
					this.shownTepList.push(entry);
			}
		}
		if (document.getElementById("cepd").checked) {
			for (const entry of this.epDict) {
				if (entry.eng.indexOf(query) > -1 || entry.pali.indexOf(query) > -1)
					this.shownCepdList.push(entry);
			}
		}
	}
	this.showResult();
};
tepDict.showResult = function() {
	const resultElem = document.getElementById("listresult");
	this.util.clearNode(resultElem);
	const query = this.paliInput.getText();
	const countElem = document.getElementById("itemcount");
	const withLexTE = document.getElementById("lexte").checked;
	const total = this.shownTepList.length + this.shownCepdList.length;
	if (total > 0) {
		const table = document.createElement("table");
		const thead = document.createElement("thead");
		const trh = document.createElement("tr");
		trh.innerHTML = "<th>Eng/Thai</th><th>Pāli</th>";
		thead.appendChild(trh);
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		if (document.getElementById("cepd").checked && this.shownCepdList.length > 0) {
			const trh = document.createElement("tr");
			trh.innerHTML = "<th colspan='2'>English-Pāli dictionary</th>";
			tbody.appendChild(trh);
			for (const entry of this.shownCepdList) {
				const tr = document.createElement("tr");
				tr.style.fontSize = "0.9em";
				const term = entry.eng.indexOf(query) > -1
					? entry.eng.replace(query, "<span style='color:darkorange;'>"+query+"</span>")
					: entry.eng;
				const def = entry.pali.indexOf(query) > -1
					? entry.pali.replace(query, "<span style='color:darkorange;'>"+query+"</span>")
					: entry.pali;
				tr.innerHTML = "<td>" + term + "</td><td>" + def + "</td>";
				tbody.appendChild(tr);
			}
		}
		if (document.getElementById("tpd").checked && this.shownTepList.length > 0) {
			const trh = document.createElement("tr");
			const ehead = withLexTE ? "English-" : "";
			trh.innerHTML = "<th colspan='2'>Thai-" + ehead + "Pāli dictionary</th>";
			tbody.appendChild(trh);
			for (const entry of this.shownTepList) {
				const tr = document.createElement("tr");
				tr.style.fontSize = "0.9em";
				let term = entry.term.indexOf(query) > -1
					? entry.term.replace(query, "<span style='color:darkorange;'>"+query+"</span>")
					: entry.term;
				if (withLexTE && this.teDict[entry.id]) {
					term = term + " [" + this.teDict[entry.id].replace(query, "<span style='color:darkorange;'>"+query+"</span>") + "]";
				}
				const def = entry.def.indexOf(query) > -1
					? entry.def.replace(query, "<span style='color:darkorange;'>"+query+"</span>")
					: entry.def;
				tr.innerHTML = "<td>" + term + "</td><td>" + def + "</td>";
				tbody.appendChild(tr);
			}
		}
		table.appendChild(tbody);
		resultElem.appendChild(table);
		const s = total > 1 ? "s" : "";
		countElem.innerHTML = total + "&nbsp;item" + s + "&nbsp;found"; 
		countElem.style.display = "inline";
	} else {
		countElem.style.display = "none";
	}
};


