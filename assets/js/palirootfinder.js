/*! palirootfinder.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const palirootFinder = {};
palirootFinder.bookSwitch = {
"dp": { shown: true },
"dm": { shown: true },
"sd": { shown: true },
"ds": { shown: true },
};
palirootFinder.bookName = { "dp": "pāṭ", "dm": "mañ", "sd": "māl", "ds":"saṅ" };
palirootFinder.groupSwitch = {
"g81": { shown: true },
"g82": { shown: true },
"g83": { shown: true },
"g84": { shown: true },
"g85": { shown: true },
"g86": { shown: true },
"g87": { shown: true },
"g88": { shown: true },
"g91": { shown: true },
"g92": { shown: true },
"g93": { shown: true },
"g94": { shown: true },
"g95": { shown: true },
"g96": { shown: true },
"g97": { shown: true },
"g98": { shown: true },
"g99": { shown: true },
};
palirootFinder.rootGroup = {
"8g" : [ "I&nbsp;bhū", "II&nbsp;rudha", "III&nbsp;divu", "IV&nbsp;su", "V&nbsp;kī", "VI&nbsp;gaha", "VII&nbsp;tanu", "VIII&nbsp;cura" ],
"9g" : [ "i&nbsp;bhū", "ii&nbsp;rudha", "iii&nbsp;diva", "iv&nbsp;tuda", "v&nbsp;ji", "vi&nbsp;kī", "vii&nbsp;su", "viii&nbsp;tana", "ix&nbsp;cura" ]
};
palirootFinder.util = {};
palirootFinder.paliInput = {};
palirootFinder.shownBook = [];
palirootFinder.shownGroup = [];
palirootFinder.allRoot = [];
palirootFinder.shownList = [];
palirootFinder.loadRootList = function() {
	const ajaxParams = {};
	ajaxParams.isBinary = true;
	ajaxParams.address = "assets/palitext/rootdef.gz";
	ajaxParams.successCallback = function(response) {
		palirootFinder.allRoot = JSON.parse(window.pako.ungzip(response, { to: "string" }));
		palirootFinder.filter();
	};
	this.util.ajaxLoad(ajaxParams);
};
palirootFinder.toggleNotes = function() {
	const noteBox = document.getElementById("notebox");
	if (noteBox.style.display === "none")
		noteBox.style.display = "block";
	else
		noteBox.style.display = "none";
};
palirootFinder.bookSelect = function(isAll) {
	document.getElementById("cbdp").checked = isAll;
	document.getElementById("cbdm").checked = isAll;
	document.getElementById("cbsd").checked = isAll;
	document.getElementById("cbds").checked = isAll;
	this.filter();
};
palirootFinder.processBookSwitch = function() {
	this.bookSwitch["dp"].shown = document.getElementById("cbdp").checked;
	this.bookSwitch["dm"].shown = document.getElementById("cbdm").checked;
	this.bookSwitch["sd"].shown = document.getElementById("cbsd").checked;
	this.bookSwitch["ds"].shown = document.getElementById("cbds").checked;
	this.shownBook = [];
	for (const b in this.bookSwitch) {
		if (this.bookSwitch[b].shown)
			this.shownBook.push(b);
	}
};
palirootFinder.groupSelect = function(cls, isAll) {
	for (let i=1; i<=cls; i++)
		document.getElementById("g"+cls+i).checked = isAll;
	this.filter();
};
palirootFinder.processGroupSwitch = function() {
	for (let i=1; i<=8; i++)
		this.groupSwitch["g8"+i].shown = document.getElementById("g8"+i).checked;
	for (let i=1; i<=9; i++)
		this.groupSwitch["g9"+i].shown = document.getElementById("g9"+i).checked;
	this.shownGroup = [];
	for (const g in this.groupSwitch) {
		if (this.groupSwitch[g].shown)
			this.shownGroup.push(g);
	}
};
palirootFinder.toggleGroupSelector = function() {
	const groupSelector = document.getElementById("groupselector");
	if (groupSelector.style.display === "none")
		groupSelector.style.display = "block";
	else
		groupSelector.style.display = "none";
	document.getElementById("uniqueoptions").style.display = "none";
};
palirootFinder.toggleUniqueOptions = function() {
	const uOptions = document.getElementById("uniqueoptions");
	if (uOptions.style.display === "none")
		uOptions.style.display = "block";
	else
		uOptions.style.display = "none";
	document.getElementById("groupselector").style.display = "none";
};
palirootFinder.unique = function() {
	const isUnique = document.getElementById("unique").checked;
	document.getElementById("sortorder").disabled = isUnique;
	document.getElementById("uniquebutton").disabled = !isUnique;
	if (!isUnique)
		document.getElementById("uniqueoptions").style.display = "none";
	this.filter();
};
palirootFinder.filter = function() {
	this.processBookSwitch();
	this.processGroupSwitch();
	this.shownList = [];
	const query = this.paliInput.getText();
	for (const r of this.allRoot) {
		if (this.shownBook.indexOf(r.book) > -1) {
			if (r.book === "dm" || r.book === "sd" || r.book === "ds") {
				if (!document.getElementById("variant").checked && (r.var === "sy" || r.var === "sm"))
					continue;
			}
			const gprefix = r.book === "dp" ? "g9" : "g8";
			if (this.shownGroup.indexOf(gprefix + r.grp) > -1) {
				if (query.length === 0 || r.root.indexOf(query) > -1 || r.def.indexOf(query) > -1)
					this.shownList.push(r);
			}
		}
	}
	if (document.getElementById("unique").checked) {
		this.shownList = this.computeUnique(this.shownList).sort(function(r1, r2) {
			const name1 = r1.key;
			const name2 = r2.key;
			return palirootFinder.util.comparePali(name1, name2);
		});
	} else {
		const orderElem = document.getElementById("sortorder");
		const sortOrder = orderElem.options[orderElem.selectedIndex].value;
		if (sortOrder !== "none")
			this.shownList = this.sortRootList(this.shownList, sortOrder);
	}
	this.showResult();
};
palirootFinder.getUniqueKey = function(rname) {
	let result = rname;
	if (rname.length === 1)
		result = rname;
	else if (document.getElementById("uopt-xx").checked)
		result = rname.slice(0, -1);
	else if (document.getElementById("uopt-x").checked && this.util.paliLength(rname) > 2)
		result = rname.slice(0, -1);
	else if (rname.endsWith("o") && document.getElementById("uopt-o").checked)
		result = rname.slice(0, -1) + "a";
	else if (document.getElementById("uopt-u").checked && rname.endsWith("u"))
		result = rname.slice(0, -1) + "a";
	else if (document.getElementById("uopt-aa").checked && rname.endsWith("ā"))
		result = rname.slice(0, -1) + "a";
	else if (document.getElementById("uopt-ii").checked && rname.endsWith("ī"))
		result = rname.slice(0, -1) + "i";
	return result;
};
palirootFinder.computeUnique = function(list) {
	const varElem = document.getElementById("variant");
	const result = [];
	const uniqueList = {};
	for (const rt of list) {
		if (!varElem.checked && (rt.var === "sy" || rt.var === "sm"))
			continue;
		const key = this.getUniqueKey(rt.root);
		const rvar = rt.var === "sy" || rt.var === "sm" ? rt.var : "";
		if (key in uniqueList) {
			const root = uniqueList[key];
			const book = this.bookName[rt.book];
			const reflink = rt.book === "sd" || rt.book === "ds"
						? "<a style='cursor:pointer;' onClick=palirootFinder.openRef('"+rt.book+"','"+rt.ref+"');>" + book + "&nbsp;" + rt.ref + "</a>" + rvar
						: book + "&nbsp;" + rt.ref + rvar;
			root.bookref.push(reflink);
			if (root.root.indexOf(rt.root) === -1)
				root.root.push(rt.root);
			root.def.push("- "+rt.def);
			root.grp.push(this.getRootGroup(rt));
			uniqueList[key] = root;
		} else {
			const root = {};
			const book = this.bookName[rt.book];
			const reflink = rt.book === "sd" || rt.book === "ds"
						? "<a style='cursor:pointer;' onClick=palirootFinder.openRef('"+rt.book+"','"+rt.ref+"');>" + book + "&nbsp;" + rt.ref + "</a>" + rvar
						: book + "&nbsp;" + rt.ref + rvar;
			root.bookref = [reflink];
			root.root = [rt.root];
			root.def = ["- "+rt.def];
			root.grp = [this.getRootGroup(rt)];
			uniqueList[key] = root;
		}
	}
	for (const key in uniqueList) {
		const root = {};
		root.key = key;
		root.root = uniqueList[key].root.join(", ");
		root.bookref = uniqueList[key].bookref.join(",<br>");
		root.def = uniqueList[key].def.join(",<br>");
		root.grp = uniqueList[key].grp.join(",<br>");
		result.push(root);
	}
	return result;
};
palirootFinder.showResult = function() {
	const resultElem = document.getElementById("listresult");
	this.util.clearNode(resultElem);
	const countElem = document.getElementById("itemcount");
	if (this.shownList.length > 0) {
		const table = document.createElement("table");
		const thead = document.createElement("thead");
		const trh = document.createElement("tr");
		trh.style.fontSize = "0.9em";
		trh.innerHTML = "<th>Reference</th><th>Root</th><th>Definition</th><th>Group</th>";
		thead.appendChild(trh);
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		for (const rt of this.shownList) {
			const tr = document.createElement("tr");
			tr.style.fontSize = "0.85em";
			let row = "";
			if (document.getElementById("unique").checked) {
				row = "<td style='width:4em;'>" + rt.bookref + "</td>";
				row += "<td>" + rt.root + "</td>";
				row += "<td>" + rt.def + "</td>";
				row += "<td style='width:4em;'>" + rt.grp + "</td>";
			} else {
				const rvar = rt.var === "sy" || rt.var === "sm" ? rt.var : "";
				const reflink = rt.book === "sd" || rt.book === "ds"
					? "<a style='cursor:pointer;' onClick=palirootFinder.openRef('"+rt.book+"','"+rt.ref+"');>" + this.bookName[rt.book] + "&nbsp;" + rt.ref + "</a>" + rvar
					: this.bookName[rt.book] + "&nbsp;" + rt.ref + rvar;
				row = "<td style='width:4em;'>" + reflink + "</td>";
				row += "<td>" + rt.root + "</td>";
				row += "<td>" + rt.def + "</td>";
				row += "<td style='width:4em;'>" + this.getRootGroup(rt) + "</td>";
			}
			tr.innerHTML = row;
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
palirootFinder.getRootGroup = function(root) {
	const grp = parseInt(root.grp);
	const result = root.book === "dp" ? this.rootGroup["9g"][grp-1] : this.rootGroup["8g"][grp-1];
	return result;
};
palirootFinder.openRef = function(book, rnum) {
	const page = book === "sd" ? "sadddha?d" : "dhatva?s";
	window.open("/" + page + "=" + rnum, "paliroot-refwin");
};
palirootFinder.sortRootList = function(list, bywhat) {
	let result = [];
	if (bywhat === "name") {
		result = list.sort(function(r1, r2) {
			const name1 = r1.root;
			const name2 = r2.root;
			return palirootFinder.util.comparePali(name1, name2);
		});
	} else if (bywhat === "def") {
		result = list.sort(function(r1, r2) {
			const def1 = r1.def;
			const def2 = r2.def;
			return palirootFinder.util.comparePali(def1, def2);
		});
	} else {
		result = list;
	}
	return result;
};
