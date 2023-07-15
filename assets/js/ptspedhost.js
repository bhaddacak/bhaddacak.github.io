/*! ptspedhost.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const ptspedHost = {};
ptspedHost.dict = null;
ptspedHost.paliInput = null;
ptspedHost.blockquote_class = "";
ptspedHost.clearNode = function(node) {
	while (node.firstChild)
		node.removeChild(node.firstChild);
};
ptspedHost.clearResult = function() {
	const result = document.getElementById("dictresult");
	this.clearNode(result);
};
ptspedHost.showWordCount = function(num) {
	const wordcount = document.getElementById("wordcount");
	if (num === 0) {
		wordcount.style.display = "none";	
	} else {
		const s = num === 1 ? "" : "s";
		wordcount.innerHTML = num + " term" + s + " found";
		wordcount.style.display = "inline";	
	}
};
ptspedHost.showSearching = function(isShown) {
	const display = isShown ? "inline" : "none";
	document.getElementById("searching").style.display = display;
};
ptspedHost.showNotFound = function() {
	document.getElementById("dictresult").innerHTML = "Nothing found";
};
ptspedHost.search = function() {
	const result = document.getElementById("dictresult");
	const query = this.paliInput.getText().trim().toLowerCase();
	this.dict.search(query, this);
};
ptspedHost.showResult = function(dictItem, index){
	const result = document.getElementById("dictresult");
	const div = document.createElement("div");
	const term = dictItem.t;
	div.id = term;
	div.innerHTML = term;
	div.style.cursor = "pointer";
	div.addEventListener("click", function(event) {
		ptspedHost.showDetail(index, event);
	});
	result.appendChild(div);
};
ptspedHost.showDetail = function(index, event) {
	let item = {};
	item = this.dict.foundList[index];
	if (item === undefined) return;
	const termNode = document.getElementById(item.t);
	if (termNode === null) return;
	if (termNode.children.length > 0) {
		if (event && event.target === termNode) {
			this.clearNode(termNode);
			termNode.innerHTML = item.t;
		}
	} else {
		termNode.appendChild(this.getDetailBlock(item));
	}
};
ptspedHost.checkForShowDetails = function(foundList) {
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
ptspedHost.cleanDetail = function(text) {
	let result = text;
	result = result.replace(/href=\"#/gi, "title=\"#");
	return result;
}
ptspedHost.getDetail = function(item) {
	const para = document.createElement("p");
	const body = document.createElement("div");
	body.innerHTML = this.cleanDetail(item.d);
	para.appendChild(body);
	return para
};
ptspedHost.getDetailBlock = function(dictItem) {
	const block = document.createElement("blockquote");
	block.appendChild(this.getDetail(dictItem));
	if (this.blockquote_class && this.blockquote_class.length > 0)
		block.className = this.blockquote_class;
	block.style.cursor = "default";
	return block;
};

