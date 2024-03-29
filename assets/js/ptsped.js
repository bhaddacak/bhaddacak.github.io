/*! ptsped.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const ptsped = {};
ptsped.initList = [ "a", "ā", "i", "ī", "u", "ū", "e", "o", "k", "g", "c", "j", "ñ", "ṭ", "ḍ", "t", "d", "n", "p", "b", "m", "y", "r", "l", "v", "s", "h", "ḷ" ];
ptsped.util = {};
ptsped.dictHost = {};
ptsped.dict = {};
ptsped.foundList = [];
ptsped.url = "";
ptsped.query = "";
ptsped.clearResult = function() {
	this.foundList = [];
	this.dictHost.clearResult();
	this.dictHost.showWordCount(0);
};
ptsped.search = function(query, host) {
	this.dictHost = host;
	this.clearResult();
	this.query = query;
	const initial = query.slice(0, 1);
	if (this.initList.indexOf(initial) >= 0) {
		if (this.dict[initial])
			this.showResult(initial);
		else
			this.loadDict(initial);
	} else {
		this.dictHost.showNotFound();
	}
};
ptsped.loadDict = function(initial) {
	const ajaxParams = {};
	ajaxParams.address = this.url + "/" + initial + ".gz";
	ajaxParams.isBinary = true;
	ajaxParams.successCallback = function(response) {
		ptsped.dict[initial] = JSON.parse(window.pako.ungzip(response, { to: "string" }));
		ptsped.showResult(initial);
	};
	this.util.ajaxLoad(ajaxParams);
};
ptsped.showResult = function(initial) {
	if (this.dict[initial].length > 0) {
		for (let i=0; i<this.dict[initial].length; i++) {
			const cond = this.dict[initial][i].t.startsWith(this.query);
			if (cond) {
				this.foundList.push(this.dict[initial][i]);
				const ind = this.foundList.length - 1;
				this.dictHost.showResult(this.dict[initial][i], ind);
			}
		}
		this.dictHost.showWordCount(this.foundList.length);
		this.dictHost.checkForShowDetails(this.foundList);
	} else {
		this.dictHost.showNotFound();
	}
};
