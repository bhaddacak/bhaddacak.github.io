let dict = {};
function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}
function clearResult() {
	const result = document.getElementById("dictresult");
	clearNode(result);
}
function showWordCount(num, mode) {
	const wordcount = document.getElementById("wordcount");
	const exactly = mode === "exact" ? " exactly" : "";
	if (num === 0) {
		wordcount.style.display = "none";	
	} else {
		const s = num === 1 ? "" : "s";
		wordcount.innerHTML = num + " term" + s + " found" + exactly;
		wordcount.style.display = "inline";	
	}
}
function showSearching(isShown) {
	const display = isShown ? "inline" : "none";
	document.getElementById("searching").style.display = display;
}
function showNotFound() {
	document.getElementById("dictresult").innerHTML = "Nothing found";
}
function search() {
	const result = document.getElementById("dictresult");
	const findInDef = document.getElementById("findindef").checked;
	let mode = "normal";
	let cutNeeded = false;
	const inputval = findInDef ? textInputElem.value : textInputElem.value.trim().toLowerCase();
	if (findInDef) {
		mode = "indef"
	} else if (inputval.startsWith("\"")) {
		mode = "exact";
		cutNeeded = true;
	} else if (inputval.startsWith("*")) {
		mode = "wildcard";
		cutNeeded = true;
	}
	const query = cutNeeded ? inputval.slice(1) : inputval;
	dict.search(query, mode);
}
function showResult(dictItem, index){
	const result = document.getElementById("dictresult");
	const div = document.createElement("div");
	const term = dictItem.entry;
	div.id = term;
	div.innerHTML = term;
	div.style.cursor = "pointer";
	div.addEventListener("click", function(event) {
		showDetail(index, event);
	});
	result.appendChild(div);
}
function showDetail(index, event, initial, mode) {
	let item = {};
	if (mode === "indef" || mode === "wildcard") {
		if (dict.foundMultiList[initial])
			item = dict.foundMultiList[initial][index];
	} else {
		item = dict.foundList[index];
	}
	if (item === undefined) return;
	const termNode = document.getElementById(item.entry);
	if (termNode === null) return;
	if (termNode.children.length > 0) {
		if (event && event.target === termNode) {
			clearNode(termNode);
			termNode.innerHTML = item.entry;
		}
	} else {
		const block = document.createElement("blockquote");
		block.appendChild(getDetail(item));
		if (blockquote_class && blockquote_class.length > 0)
			block.className = blockquote_class;
		block.style.cursor = "default";
		termNode.appendChild(block);
	}
}
function checkForShowDetails(foundList) {
	if (foundList.length === 0) {
		showNotFound();
	} else {
		if (document.getElementById("showdetails").checked) {
			for (let i=0; i<foundList.length; i++) {
				showDetail(i);
			}
		} else {
			if (foundList.length === 1)
				showDetail(0);
		}
	}
}
function createMultiResultNodes(list) {
	const result = document.getElementById("dictresult");
	for (let i=0; i<list.length; i++) {
		let div = document.createElement("div");
		div.id = list[i];
		result.appendChild(div);
	}
}
function showMultiResultNodes(list, initial, mode) {
	const result = document.getElementById(initial);
	for (let i=0; i<list[initial].length; i++) {
		let div = document.createElement("div");
		let term = list[initial][i].entry;
		div.id = term;
		div.innerHTML = term;
		div.style.cursor = "pointer";
		div.addEventListener("click", function(event) {
			showDetail(i, event, initial, mode);
		});
		result.appendChild(div);
	}
}
function checkForShowAllDetails(list, initial, mode) {
	if (document.getElementById("showdetails").checked) {
		for (let i=0; i<list[initial].length; i++) {
			showDetail(i, null, initial, mode);
		}
	}
}
function getDetail(item) {
	const para = document.createElement("p");
	const head = document.createElement("strong");
	const term = item.entry;
	head.style = "font-size:1.2em";
	head.innerHTML = term;
	para.appendChild(head);
	para.appendChild(getGrammar(item.grammar));
	if (item.definition != undefined)
		para.appendChild(getDefinition(item.definition));
	if (item.homonyms != undefined)
		para.appendChild(getHomonyms(item.homonyms));
	if (item.xr != undefined)
		para.appendChild(getXR(item.xr));
	return para
}
function getGrammar(grammar) {
	const gramNode = document.createElement("div");
	gramNode.style = "font-size:0.75em;";
	gramNode.innerHTML = grammar === undefined ? "" : grammar;
	return gramNode;
}
function getDefinition(definition) {
	const defNode = document.createElement("ul");
	let def = typeof definition === "string" ? [ definition ] : definition;
	for (let i=0; i<def.length; i++) {
		let liNode = document.createElement("li");
		liNode.style = "font-size:1em;";
		let meaning = def[i];
		if (document.getElementById("findindef").checked) {
			let output = "";
			let start = 0;
			let pos = meaning.indexOf(dict.query, start);
			while (pos > -1) {
				output += meaning.slice(start, pos);
				output += '<span style="color:darkorange;">' + dict.query + "</span>";
				start = pos + dict.query.length;
				pos = meaning.indexOf(dict.query, start);
			}
			if (start < meaning.length)
				output += meaning.slice(start, meaning.length);
			meaning = output;
		}
		liNode.innerHTML = meaning;
		defNode.appendChild(liNode);
	}
	return defNode;
}
function getXR(xr) {
	const xrNode = document.createElement("div");
	const xrList = typeof xr === "string" ? [ xr ] : xr;
	let xrFinal = [];
	for (let i=0; i<xrList.length; i++) {
		const xr = '<em style="cursor:pointer;" onClick="goXR(\'' + xrList[i] + '\');">' + xrList[i] + '</em>';
		xrFinal.push(xr);
	}
	xrNode.style = "font-size:0.9em";
	xrNode.innerHTML = "See also: " + xrFinal.join(", ");
	return xrNode;
}
function goXR(xr) {
	textInputElem.value = "\"" + xr;
	document.getElementById("findindef").checked = false;
	search();
}
function getHomonyms(homonyms) {
	const homoNode = document.createElement("p");
	if (typeof homonyms === "object") {
		for (let i=0; i < homonyms.length; i++) {
			let item = homonyms[i];
			let homoChild = document.createElement("div");
			if (item.grammar != undefined)
				homoChild.appendChild(getGrammar(item.grammar));
			if (item.definition != undefined)
				homoChild.appendChild(getDefinition(item.definition));
			if (item.xr != undefined)
				homoChild.appendChild(getXR(item.xr));
			homoNode.appendChild(homoChild);
		}
	}
	return homoNode;
}
