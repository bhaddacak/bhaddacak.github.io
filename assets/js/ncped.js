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
	clearResult();
	showWordCount(0);
}
ncped.updateMultiResultCount = function() {
	let count = 0;
	for (let i=0; i<this.initList.length; i++) {
		if (this.foundMultiList[this.initList[i]])
			count += this.foundMultiList[this.initList[i]].length;
	}
	showWordCount(count);
};
ncped.search = function(query, mode) {
	this.clearResult();
	this.query = query;
	if (query.length >= 2) {
		if (mode === "indef" || mode === "wildcard") {
			if (query.trim().length > 2) {
				showSearching(true);
				this.multiSearchCount = 0;
				this.multiSearch(mode);
			}
		} else {
			let initial = query.slice(0, 2);
			if (this.initList.indexOf(initial) >= 0) {
				if (this.dict[initial])
					this.showResult(initial, mode);
				else
					this.loadDict(initial, mode);
			} else {
				showNotFound();
			}
		}
	}
}
ncped.multiSearch = function(mode) {
	createMultiResultNodes(this.initList);
	for (let i=0; i<this.initList.length; i++) {
		if (this.dict[this.initList[i]])
			this.showMultiResult(this.initList[i], mode);
		else
			this.loadDict(this.initList[i], mode);
	}
}
ncped.loadDict = function(initial, mode) {
	const request = new XMLHttpRequest();
	request.open("GET", ncped_url + "/" + initial + ".json", true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			ncped.dict[initial] = JSON.parse(request.responseText);
			if (mode === "indef" || mode === "wildcard") {
				ncped.showMultiResult(initial, mode);
			} else {
				ncped.showResult(initial, mode);
			}
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
}
ncped.showMultiResult = function(initial, mode) {
	this.multiSearchCount++;
	if (this.multiSearchCount >= this.initList.length) {
		showSearching(false);
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
					showDetail(0, null, this.initList[i]);
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
		showMultiResultNodes(this.foundMultiList, initial, mode);
		this.updateMultiResultCount();
		checkForShowAllDetails(this.foundMultiList, initial, mode);
	}
}
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
				showResult(this.dict[initial][i], ind);
				if (mode === "exact")
					break;
			}
		}
		showWordCount(this.foundList.length, mode);
		checkForShowDetails(this.foundList);
	} else {
		showNotFound();
	}
}

