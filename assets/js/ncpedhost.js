const ncpedHost = {};
ncpedHost.dict = {};
ncpedHost.clearNode = function(node) {
	while (node.firstChild)
		node.removeChild(node.firstChild);
};
ncpedHost.clearResult = function() {
	const result = document.getElementById("dictresult");
	this.clearNode(result);
};
ncpedHost.showWordCount = function(num, mode) {
	const wordcount = document.getElementById("wordcount");
	const exactly = mode === "exact" ? " exactly" : "";
	if (num === 0) {
		wordcount.style.display = "none";	
	} else {
		const s = num === 1 ? "" : "s";
		wordcount.innerHTML = num + " term" + s + " found" + exactly;
		wordcount.style.display = "inline";	
	}
};
ncpedHost.showSearching = function(isShown) {
	const display = isShown ? "inline" : "none";
	document.getElementById("searching").style.display = display;
};
ncpedHost.showNotFound = function() {
	document.getElementById("dictresult").innerHTML = "Nothing found";
};
ncpedHost.search = function() {
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
	let query = cutNeeded ? inputval.slice(1) : inputval;
	query = query.replace(/ṁ/g, "ṃ");
	this.dict.search(query, mode);
};
ncpedHost.showResult = function(dictItem, index){
	const result = document.getElementById("dictresult");
	const div = document.createElement("div");
	const term = dictItem.entry;
	div.id = term;
	div.innerHTML = term;
	div.style.cursor = "pointer";
	div.addEventListener("click", function(event) {
		ncpedHost.showDetail(index, event);
	});
	result.appendChild(div);
};
ncpedHost.getDetailBlock = function(dictItem) {
	const block = document.createElement("blockquote");
	block.appendChild(this.getDetail(dictItem));
	if (blockquote_class && blockquote_class.length > 0)
		block.className = blockquote_class;
	block.style.cursor = "default";
	return block;
};
ncpedHost.showDetail = function(index, event, initial, mode) {
	let item = {};
	if (mode === "indef" || mode === "wildcard") {
		if (this.dict.foundMultiList[initial])
			item = this.dict.foundMultiList[initial][index];
	} else {
		item = this.dict.foundList[index];
	}
	if (item === undefined) return;
	const termNode = document.getElementById(item.entry);
	if (termNode === null) return;
	if (termNode.children.length > 0) {
		if (event && event.target === termNode) {
			this.clearNode(termNode);
			termNode.innerHTML = item.entry;
		}
	} else {
		termNode.appendChild(this.getDetailBlock(item));
	}
};
ncpedHost.checkForShowDetails = function(foundList) {
	if (foundList.length === 0) {
		this.showNotFound();
	} else {
		if (document.getElementById("showdetails").checked) {
			for (let i=0; i<foundList.length; i++) {
				this.showDetail(i);
			}
		} else {
			if (foundList.length === 1)
				this.showDetail(0);
		}
	}
};
ncpedHost.createMultiResultNodes = function(list) {
	const result = document.getElementById("dictresult");
	for (let i=0; i<list.length; i++) {
		let div = document.createElement("div");
		div.id = list[i];
		result.appendChild(div);
	}
};
ncpedHost.showMultiResultNodes = function(list, initial, mode) {
	const result = document.getElementById(initial);
	for (let i=0; i<list[initial].length; i++) {
		let div = document.createElement("div");
		let term = list[initial][i].entry;
		div.id = term;
		div.innerHTML = term;
		div.style.cursor = "pointer";
		div.addEventListener("click", function(event) {
			ncpedHost.showDetail(i, event, initial, mode);
		});
		result.appendChild(div);
	}
};
ncpedHost.checkForShowAllDetails = function(list, initial, mode) {
	if (document.getElementById("showdetails").checked) {
		for (let i=0; i<list[initial].length; i++) {
			this.showDetail(i, null, initial, mode);
		}
	}
};
ncpedHost.getDetail = function(item) {
	const para = document.createElement("p");
	const head = document.createElement("strong");
	const term = item.entry;
	head.style = "font-size:1.2em";
	head.innerHTML = term;
	para.appendChild(head);
	para.appendChild(this.getGrammar(item.grammar));
	if (item.definition != undefined)
		para.appendChild(this.getDefinition(item.definition));
	if (item.homonyms != undefined)
		para.appendChild(this.getHomonyms(item.homonyms));
	if (item.xr != undefined)
		para.appendChild(this.getXR(item.xr));
	return para
};
ncpedHost.getGrammar = function(grammar) {
	const gramNode = document.createElement("div");
	gramNode.style = "font-size:0.75em;";
	gramNode.innerHTML = grammar === undefined ? "" : grammar;
	return gramNode;
};
ncpedHost.getDefinition = function(definition) {
	const defNode = document.createElement("ul");
	let def = typeof definition === "string" ? [ definition ] : definition;
	for (let i=0; i<def.length; i++) {
		let liNode = document.createElement("li");
		liNode.style = "font-size:1em;";
		let meaning = def[i];
		const findindef = document.getElementById("findindef");
		if (findindef && findindef.checked) {
			meaning = this.highlightMeaning(meaning);
		}
		liNode.innerHTML = meaning;
		defNode.appendChild(liNode);
	}
	return defNode;
};
ncpedHost.highlightMeaning = function(text) {
	let output = "";
	let start = 0;
	let pos = text.indexOf(this.dict.query, start);
	while (pos > -1) {
		output += text.slice(start, pos);
		output += '<span style="color:darkorange;">' + this.dict.query + "</span>";
		start = pos + this.dict.query.length;
		pos = text.indexOf(this.dict.query, start);
	}
	if (start < text.length)
		output += text.slice(start, text.length);
	return(output);
};
ncpedHost.getXR = function(xr) {
	const xrNode = document.createElement("div");
	const xrList = typeof xr === "string" ? [ xr ] : xr;
	let xrFinal = [];
	for (let i=0; i<xrList.length; i++) {
		const xr = ncpedHost.dict === ncped
					? '<em style="cursor:pointer;" onClick="ncpedHost.goXR(\'' + xrList[i] + '\');">' + xrList[i] + '</em>'
					: "<em>" + xrList[i] + "</em>";
		xrFinal.push(xr);
	}
	xrNode.style = "font-size:0.9em";
	xrNode.innerHTML = "See also: " + xrFinal.join(", ");
	return xrNode;
};
ncpedHost.goXR = function(xr) {
	textInputElem.value = "\"" + xr;
	document.getElementById("findindef").checked = false;
	this.search();
};
ncpedHost.getHomonyms = function(homonyms) {
	const homoNode = document.createElement("p");
	if (typeof homonyms === "object") {
		for (let i=0; i < homonyms.length; i++) {
			let item = homonyms[i];
			let homoChild = document.createElement("div");
			if (item.grammar != undefined)
				homoChild.appendChild(this.getGrammar(item.grammar));
			if (item.definition != undefined)
				homoChild.appendChild(this.getDefinition(item.definition));
			if (item.xr != undefined)
				homoChild.appendChild(this.getXR(item.xr));
			homoNode.appendChild(homoChild);
		}
	}
	return homoNode;
};
