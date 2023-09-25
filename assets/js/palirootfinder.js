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
palirootFinder.bookSelect = function(isAll) {
	document.getElementById("cbdp").checked = isAll;
	//document.getElementById("cbdm").checked = isAll;
	document.getElementById("cbsd").checked = isAll;
	//document.getElementById("cbds").checked = isAll;
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
};
palirootFinder.unique = function() {
	document.getElementById("sortorder").disabled = document.getElementById("unique").checked;
	this.filter();
};
palirootFinder.filter = function() {
	this.processBookSwitch();
	this.processGroupSwitch();
	this.shownList = [];
	const query = this.paliInput.getText();
	for (const r of this.allRoot) {
		if (this.shownBook.indexOf(r.book) > -1) {
			if (r.book === "sd") {
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
			const name1 = r1.root;
			const name2 = r2.root;
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
palirootFinder.computeUnique = function(list) {
	const varElem = document.getElementById("variant");
	const result = [];
	const uniqueList = {};
	for (const rt of list) {
		if (!varElem.checked && (rt.var === "sy" || rt.var === "sm"))
			continue;
		const rn = rt.root.split(" ");
		const rref = rn[0];
		const rname = rn[1];
		const rvar = rt.var === "sy" || rt.var === "sm" ? rt.var : "";
		if (rname in uniqueList) {
			const root = uniqueList[rname];
			root.book = root.book + ", " + this.bookName[rt.book];
			const reflink = rt.book === "sd"
							? "<a style='cursor:pointer;' onClick=palirootFinder.openRef('"+rref+"');>" + rref + "</a>" + rvar
							: rref;
			root.ref = root.ref + ", " + reflink;
			root.def = root.def + ", " + rt.def;
			root.grp = root.grp + ", " + this.getRootGroup(rt);
			uniqueList[rname] = root;
		} else {
			const root = {};
			root.book = this.bookName[rt.book];
			root.ref = rt.book === "sd"
						? "<a style='cursor:pointer;' onClick=palirootFinder.openRef('"+rref+"');>" + rref + "</a>" + rvar
						: rref;
			root.def = rt.def;
			root.grp = this.getRootGroup(rt);
			uniqueList[rname] = root;
		}
	}
	for (const rt in uniqueList) {
		const root = {};
		root.root = rt;
		root.book = uniqueList[rt].book;
		root.ref = uniqueList[rt].ref;
		root.def = uniqueList[rt].def;
		root.grp = uniqueList[rt].grp;
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
		trh.innerHTML = "<th>Book</th><th>Ref.</th><th>Root</th><th>Definition</th><th>Group</th>";
		thead.appendChild(trh);
		table.appendChild(thead);
		const tbody = document.createElement("tbody");
		for (const rt of this.shownList) {
			const tr = document.createElement("tr");
			tr.style.fontSize = "0.9em";
			let row = "";
			if (document.getElementById("unique").checked) {
				row = "<td style='width:4em;'>" + rt.book + "</td>";
				row += "<td style='width:4em;'>" + rt.ref + "</td>";
				row += "<td>" + rt.root + "</td>";
				row += "<td>" + rt.def + "</td>";
				row += "<td style='width:5em;'>" + rt.grp + "</td>";
			} else {
				const spos = rt.root.indexOf(" ");
				const rref = rt.root.slice(0, spos);
				const rvar = rt.var === "sy" || rt.var === "sm" ? rt.var : "";
				const rname = rt.root.slice(spos + 1);
				const reflink = rt.book === "sd"
					? "<a style='cursor:pointer;' onClick=palirootFinder.openRef('"+rref+"');>" + rref + "</a>" + rvar
					: rref;
				row = "<td>" + this.bookName[rt.book] + "</td>";
				row += "<td>" + reflink + "</td>";
				row += "<td>" + rname + "</td>";
				row += "<td>" + rt.def + "</td>";
				row += "<td style='width:5em;'>" + this.getRootGroup(rt) + "</td>";
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
palirootFinder.openRef = function(rnum) {
	window.open("/sadddha?d=" + rnum, "paliroot-refwin");
};
palirootFinder.sortRootList = function(list, bywhat) {
	let result = [];
	if (bywhat === "name") {
		result = list.sort(function(r1, r2) {
			const name1 = r1.root.split(" ")[1];
			const name2 = r2.root.split(" ")[1];
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
