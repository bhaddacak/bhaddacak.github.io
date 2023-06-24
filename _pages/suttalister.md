---
title: "Sutta Lister"
permalink: /suttalister
is_application: true
date: 2023-06-24 12:00:00 +0700
---

To ease the looking up, all suttas that can be viewed with [Sutta Reader](/suttareader) are listed here. The data from [SuttaCentral](https://suttacentral.net) are prepared offline, so they can be not up-to-date.

{% include pali_input.html button="Filter" function="filter();" after_clear="filter();" placeholder="Filter ..." %}
<div>
<span><label for="cbvin"><input type="checkbox" id="cbvin" onChange="filter();" checked>Vin</label>&nbsp;<label for="cbdn"><input type="checkbox" id="cbdn" onChange="filter();" checked>DN</label>&nbsp;<label for="cbmn"><input type="checkbox" id="cbmn" onChange="filter();" checked>MN</label>&nbsp;<label for="cbsn"><input type="checkbox" id="cbsn" onChange="filter();" checked>SN</label>&nbsp;<label for="cban"><input type="checkbox" id="cban" onChange="filter();" checked>AN</label>&nbsp;<label for="cbkn"><input type="checkbox" id="cbkn" onChange="filter();" checked>KN</label>&nbsp;<button onClick="groupSelect(true);">All</button>&nbsp;<button onClick="groupSelect(false);">None</button></span><span class="label" id="wordcount" style="display:none;"></span>
</div>
<p id="listresult"></p>
<script>
const titleList = [
"bu-vb-pj", "bu-vb-ss", "bu-vb-ay", "bu-vb-np", "bu-vb-pc", "bu-vb-pd", "bu-vb-sk", "bu-vb-as",
"bi-vb-pj", "bi-vb-ss", "bi-vb-ay", "bi-vb-np", "bi-vb-pc", "bi-vb-pd", "bi-vb-sk", "bi-vb-as",
"kd", "pvr", "dn", "mn", "sn", "an", "kp", "dhp", "ud", "iti", "snp", "thag", "thig", "cp"
];
let groupSwitch = {
"vin": { start: 0, end: 17, shown: true },
"dn": { start: 18, end: 18, shown: true },
"mn": { start: 19, end: 19, shown: true },
"sn": { start: 20, end: 20, shown: true },
"an": { start: 21, end: 21, shown: true },
"kn": { start: 22, end: 29, shown: true },
};
let shownGroup = [];
let allSutta = {};
let idList = [];
const resultElem = document.getElementById("listresult");
loadSuttaList();
function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}
function loadSuttaList() {
	const request = new XMLHttpRequest();
	request.open("GET", "assets/data/suttalist.json", true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			allSutta = JSON.parse(request.responseText);
			filter();
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
}
function groupSelect(isAll) {
	document.getElementById("cbvin").checked = isAll;
	document.getElementById("cbdn").checked = isAll;
	document.getElementById("cbmn").checked = isAll;
	document.getElementById("cbsn").checked = isAll;
	document.getElementById("cban").checked = isAll;
	document.getElementById("cbkn").checked = isAll;
	filter();
}
function processGroupSwitch() {
	groupSwitch["vin"].shown = document.getElementById("cbvin").checked;
	groupSwitch["dn"].shown = document.getElementById("cbdn").checked;
	groupSwitch["mn"].shown = document.getElementById("cbmn").checked;
	groupSwitch["sn"].shown = document.getElementById("cbsn").checked;
	groupSwitch["an"].shown = document.getElementById("cban").checked;
	groupSwitch["kn"].shown = document.getElementById("cbkn").checked;
	shownGroup = [];
	for (let g in groupSwitch) {
		if (groupSwitch[g].shown) {
			for (let i=groupSwitch[g].start; i<=groupSwitch[g].end; i++)
				shownGroup.push(titleList[i]);
		}
	}
}
function filter() {
	processGroupSwitch();
	idList = [];
	const text = textInputElem.value.toLowerCase();
	for (let s in allSutta) {
		const title = breakTitle(s).char;
		if (shownGroup.indexOf(title) > -1) {
			if (text.length === 0 || allSutta[s].toLowerCase().indexOf(text) > -1)
				idList.push(s);
		}
	}
	idList.sort(compareTitle);
	showResult();
}
function showResult() {
	clearNode(resultElem);
	const countElem = document.getElementById("wordcount");
	if (idList.length > 0) {
		const table = document.createElement("table");
		const thead = document.createElement("thead");
		thead.innerHTML = "<tr class='header'><th>Reference</th><th>Description</th></tr>";
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		for (let i=0; i<idList.length; i++) {
			const tr = document.createElement("tr");
			tr.style.fontSize = "0.9em";
			tr.innerHTML = "<td>" + idList[i] + "</td><td style='text-align:left;'>" + allSutta[idList[i]] + "</td>";
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		resultElem.appendChild(table);
		const s = idList.length > 1 ? "s" : "";
		countElem.innerHTML = idList.length + " item" + s + " found"; 
		countElem.style.display = "inline";
	} else {
		countElem.style.display = "none";
	}
}
function breakTitle(title) {
	let result = { char: "", num: 0, dec: 0 };
	const parts = title.split(".");
	if (parts.length >= 2) {
		const dashPos = parts[1].indexOf("-");
		result.dec = dashPos > -1 ? parseInt(parts[1].slice(0, parts[1].indexOf("-"))) : parseInt(parts[1]);
	}
	let numStr = "";
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
}
function compareTitle(a, b) {
	let result = 0;
	const titleA = breakTitle(a);
	const titleB = breakTitle(b);
	const charDiff = titleList.indexOf(titleA.char) - titleList.indexOf(titleB.char);
	if (charDiff != 0) {
		result = charDiff;
	} else {
		const numDiff = titleA.num - titleB.num;
		if (numDiff != 0)
			result = numDiff;
		else 
			result = titleA.dec - titleB.dec;
	}
	return result;
}
</script>
