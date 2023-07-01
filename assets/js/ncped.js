const ncped = {};
ncped.initList = [ "ak", "ag", "aṅ", "ac", "aj", "añ", "aṭ", "aḍ", "aṇ", "at", "ad", "an", "ap", "ab", "am", "ay", "ar", "al", "av", "as", "ah", "aḷ", "aṃ", "āk", "āg", "āc", "āj", "āñ", "āṇ", "āt", "ād", "ān", "āp", "āb", "ām", "āy", "ār", "āl", "āv", "ās", "āh", "āḷ", "ik", "iṅ", "ic", "ij", "iñ", "iṭ", "iṇ", "it", "id", "in", "ib", "im", "ir", "iv", "is", "īt", "īd", "īs", "uk", "ug", "uc", "uj", "uñ", "uṭ", "uḍ", "uṇ", "ut", "ud", "un", "up", "ub", "um", "uy", "ur", "ul", "uv", "us", "uḷ", "ūn", "ūm", "ūr", "ūs", "ūh", "ek", "ej", "eṇ", "et", "ed", "en", "em", "er", "el", "ev", "es", "eh", "eḷ", "ok", "og", "oc", "oj", "oñ", "oṭ", "oḍ", "oṇ", "ot", "od", "on", "op", "ob", "om", "oy", "or", "ol", "ov", "os", "oh", "oḷ", "ka", "kā", "ki", "kī", "ku", "kū", "ke", "ko", "kr", "kl", "kv", "kh", "ga", "gā", "gi", "gī", "gu", "gū", "ge", "go", "gh", "ca", "cā", "ci", "cī", "cu", "cū", "ce", "co", "ch", "ja", "jā", "ji", "jī", "ju", "jū", "je", "jo", "jy", "jh", "ña", "ñā", "ñe", "ṭa", "ṭh", "ḍa", "ḍā", "ḍi", "ḍe", "ta", "tā", "ti", "tī", "tu", "tū", "te", "to", "ty", "tv", "th", "da", "dā", "di", "dī", "du", "dū", "de", "do", "dv", "dh", "na", "nā", "ni", "nī", "nu", "nū", "ne", "no", "nh", "pa", "pā", "pi", "pī", "pu", "pū", "pe", "po", "pr", "pl", "ph", "ba", "bā", "bi", "bī", "bu", "be", "bo", "by", "br", "bh", "ma", "mā", "mi", "mī", "mu", "mū", "me", "mo", "ya", "yā", "yi", "yu", "yū", "ye", "yo", "ra", "rā", "ri", "ru", "rū", "re", "ro", "la", "lā", "li", "lī", "lu", "lū", "le", "lo", "va", "vā", "vi", "vī", "vu", "vū", "ve", "vo", "vy", "sa", "sā", "si", "sī", "su", "sū", "se", "so", "sn", "sv", "ha", "hā", "hi", "hī", "hu", "he", "ho", "ḷa", "ḷā" ];
ncped.dict = {};
ncped.foundList = [];
ncped.foundMultiList = {};
ncped.query = "";
ncped.multiSearchCount = 0;
ncped.clearResult = function() {
	this.foundList = [];
	this.foundMultiList = {};
	dictHost.clearResult();
	dictHost.showWordCount(0);
};
ncped.updateMultiResultCount = function() {
	let count = 0;
	for (let i=0; i<this.initList.length; i++) {
		if (this.foundMultiList[this.initList[i]])
			count += this.foundMultiList[this.initList[i]].length;
	}
	dictHost.showWordCount(count);
};
ncped.searchForAnalysis = function(query, element) {
	const initial = query.slice(0, 2);
	if (this.initList.indexOf(initial) >= 0) {
		if (this.dict[initial])
			this.showResultForAnalysis(query, element);
		else
			this.loadDict(initial, { "mode": "reader", "query": query, "element": element } );
	}
}
ncped.search = function(query, mode) {
	this.clearResult();
	this.query = query;
	if (query.length >= 2) {
		if (mode === "indef" || mode === "wildcard") {
			if (query.trim().length > 2) {
				dictHost.showSearching(true);
				this.multiSearchCount = 0;
				this.multiSearch(mode);
			}
		} else {
			const initial = query.slice(0, 2);
			if (this.initList.indexOf(initial) >= 0) {
				if (this.dict[initial])
					this.showResult(initial, mode);
				else
					this.loadDict(initial, { "mode": mode });
			} else {
				dictHost.showNotFound();
			}
		}
	}
};
ncped.multiSearch = function(mode) {
	dictHost.createMultiResultNodes(this.initList);
	for (let i=0; i<this.initList.length; i++) {
		if (this.dict[this.initList[i]])
			this.showMultiResult(this.initList[i], mode);
		else
			this.loadDict(this.initList[i], { "mode": mode });
	}
};
ncped.loadDict = function(initial, opts) {
	const request = new XMLHttpRequest();
	request.open("GET", ncped_url + "/" + initial + ".json", true);
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			ncped.dict[initial] = JSON.parse(request.responseText);
			if (opts.mode === "indef" || opts.mode === "wildcard") {
				ncped.showMultiResult(initial, opts.mode);
			} else if (opts.mode == "reader") {
				ncped.showResultForAnalysis(opts.query, opts.element);
			} else {
				ncped.showResult(initial, opts.mode);
			}
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function() {
		console.log("There was a connection error");
	};
	request.send();
};
ncped.showMultiResult = function(initial, mode) {
	this.multiSearchCount++;
	if (this.multiSearchCount >= this.initList.length) {
		dictHost.showSearching(false);
		let foundCount = 0;
		for (let i=0; i<this.initList.length; i++) {
			if (this.foundMultiList[this.initList[i]] && this.foundMultiList[this.initList[i]].length > 0)
				foundCount++;
		}
		if (foundCount === 0) {
			showNotFound();
		} else if (foundCount === 1){
			for (let i=0; i<this.initList.length; i++) {
				if (this.foundMultiList[this.initList[i]] && this.foundMultiList[this.initList[i]].length === 1) {
					dictHost.showDetail(0, null, this.initList[i]);
					break;
				}
			}
		}
	} else {
		if (this.dict[initial].length > 0) {
			this.foundMultiList[initial] = [];
			for (let i=0; i<this.dict[initial].length; i++) {
				if (mode === "indef") {
					if (this.dict[initial][i].definition && this.dict[initial][i].definition.indexOf(this.query) > -1) {
						this.foundMultiList[initial].push(this.dict[initial][i]);
					} else {
						if (this.dict[initial][i].homonyms) {
							for (let h=0; h<this.dict[initial][i].homonyms.length; h++) {
								if (this.dict[initial][i].homonyms[h].definition && this.dict[initial][i].homonyms[h].definition.indexOf(this.query) > -1)
									this.foundMultiList[initial].push(this.dict[initial][i]);
							}
						}
					}
				} else if (mode === "wildcard") {
					if (this.dict[initial][i].entry.indexOf(this.query) > -1)
						this.foundMultiList[initial].push(this.dict[initial][i]);
				}
			}
		}
	}
	if (this.foundMultiList[initial] && this.foundMultiList[initial].length > 0) {
		dictHost.showMultiResultNodes(this.foundMultiList, initial, mode);
		this.updateMultiResultCount();
		dictHost.checkForShowAllDetails(this.foundMultiList, initial, mode);
	}
};
ncped.showResult = function(initial, mode) {
	if (this.dict[initial].length > 0) {
		for (let i=0; i<this.dict[initial].length; i++) {
			const cond = mode === "exact" 
						? this.dict[initial][i].entry === this.query
						: mode === "wildcard"
							? this.dict[initial][i].entry.indexOf(this.query) > -1
							: this.dict[initial][i].entry.startsWith(this.query);
			if (cond) {
				this.foundList.push(this.dict[initial][i]);
				const ind = this.foundList.length - 1;
				dictHost.showResult(this.dict[initial][i], ind);
				if (mode === "exact")
					break;
			}
		}
		dictHost.showWordCount(this.foundList.length, mode);
		dictHost.checkForShowDetails(this.foundList);
	} else {
		dictHost.showNotFound();
	}
};
ncped.showResultForAnalysis = function(query, element) {
	const initial = query.slice(0, 2);
	if (this.dict[initial].length === 0) return;
	let entry = this.getExactEntry(query);
	let isExact = true;
	if (!entry) {
		entry = this.getNearestEntry(query);
		isExact = false;
	}
	if (entry) {
		if (ppReader.shownTerms.indexOf(entry.entry) > -1) {
			ppReader.showInfo(element, "seeabove", isExact);
		} else {
			ppReader.shownTerms.push(entry.entry);
			const block = dictHost.getDetailBlock(entry);
			ppReader.addDetail(element, block, isExact);
		}
	}
};
ncped.getExactEntry = function(term) {
	let result = null;
	const initial = term.slice(0, 2);
	if (this.dict[initial] === undefined)
		return null;
	for (let i=0; i<this.dict[initial].length; i++) {
		if (this.dict[initial][i].entry === term) {
			result = this.dict[initial][i];
			break;
		}
	}
	return result;
};
ncped.getNearestEntry = function(term) {
	let result = null;
	const initial = term.slice(0, 2);
	const opts = ppReader.getOptions();
	if (opts.bestguess) {
		const bgTerm = this.getBestGuessNearest(term);
		if (bgTerm.length >= 2 )
			result = this.getExactEntry(bgTerm);
		else
			result = null;
	}
	if (result !== null) {
		let word = term;
		while (word.length > 0) {
			word = word.slice(0, word.length-1);
			const result = this.getExactEntry(word);
			if (result !== null)
				break;
		}
	}
	return result;
};
ncped.getBestGuessNearest = function(term) {
	let result = term;
	const ends = [ "o", "ena", "esu" ];
	for (let i=0; i<ends.length; i++) {
		if (term.endsWith(ends[i])) {
			result = term.slice(0, term.indexOf(ends[i])) + "a";
			break;
		}
	}
	return result;
};
