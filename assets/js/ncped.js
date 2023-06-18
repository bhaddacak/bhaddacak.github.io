const initList = [ "ak", "ag", "aṅ", "ac", "aj", "añ", "aṭ", "aḍ", "aṇ", "at", "ad", "an", "ap", "ab", "am", "ay", "ar", "al", "av", "as", "ah", "aḷ", "aṃ", "āk", "āg", "āc", "āj", "āñ", "āṇ", "āt", "ād", "ān", "āp", "āb", "ām", "āy", "ār", "āl", "āv", "ās", "āh", "āḷ", "ik", "iṅ", "ic", "ij", "iñ", "iṭ", "iṇ", "it", "id", "in", "ib", "im", "ir", "iv", "is", "īt", "īd", "īs", "uk", "ug", "uc", "uj", "uñ", "uṭ", "uḍ", "uṇ", "ut", "ud", "un", "up", "ub", "um", "uy", "ur", "ul", "uv", "us", "uḷ", "ūn", "ūm", "ūr", "ūs", "ūh", "ek", "ej", "eṇ", "et", "ed", "en", "em", "er", "el", "ev", "es", "eh", "eḷ", "ok", "og", "oc", "oj", "oñ", "oṭ", "oḍ", "oṇ", "ot", "od", "on", "op", "ob", "om", "oy", "or", "ol", "ov", "os", "oh", "oḷ", "ka", "kā", "ki", "kī", "ku", "kū", "ke", "ko", "kr", "kl", "kv", "kh", "ga", "gā", "gi", "gī", "gu", "gū", "ge", "go", "gh", "ca", "cā", "ci", "cī", "cu", "cū", "ce", "co", "ch", "ja", "jā", "ji", "jī", "ju", "jū", "je", "jo", "jy", "jh", "ña", "ñā", "ñe", "ṭa", "ṭh", "ḍa", "ḍā", "ḍi", "ḍe", "ta", "tā", "ti", "tī", "tu", "tū", "te", "to", "ty", "tv", "th", "da", "dā", "di", "dī", "du", "dū", "de", "do", "dv", "dh", "na", "nā", "ni", "nī", "nu", "nū", "ne", "no", "nh", "pa", "pā", "pi", "pī", "pu", "pū", "pe", "po", "pr", "pl", "ph", "ba", "bā", "bi", "bī", "bu", "be", "bo", "by", "br", "bh", "ma", "mā", "mi", "mī", "mu", "mū", "me", "mo", "ya", "yā", "yi", "yu", "yū", "ye", "yo", "ra", "rā", "ri", "ru", "rū", "re", "ro", "la", "lā", "li", "lī", "lu", "lū", "le", "lo", "va", "vā", "vi", "vī", "vu", "vū", "ve", "vo", "vy", "sa", "sā", "si", "sī", "su", "sū", "se", "so", "sn", "sv", "ha", "hā", "hi", "hī", "hu", "he", "ho", "ḷa", "ḷā" ];
const notfound = "Nothing found";
const inputElem = document.getElementById("textinput");
let query = "";
let dict = {};
let defSearchCount = 0;
let foundList = [];
let foundDefList = {};
inputElem.addEventListener("keydown", function(event) {
	if (event.key === "Enter")
		search();
});
function insertChar(ch) {
	inputElem.value = inputElem.value + ch;
	inputElem.focus();
}
function wordClear() {
	inputElem.value = "";
	inputElem.focus();
	clearResult();
}
function showWordCount(num, isExact) {
	const wordcount = document.getElementById("wordcount");
	const exactly = isExact ? " exactly" : "";
	if (num === 0) {
		wordcount.style.display = "none";	
	} else {
		const s = num === 1 ? "" : "s";
		wordcount.innerHTML = num + " term" + s + " found" + exactly;
		wordcount.style.display = "inline";	
	}
}
function updateDefResultCount() {
	let count = 0;
	for (let i=0; i<initList.length; i++) {
		if (foundDefList[initList[i]])
			count += foundDefList[initList[i]].length;
	}
	showWordCount(count);
}
function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}
function clearResult() {
	foundList = [];
	foundDefList = {};
	const result = document.getElementById("dictresult");
	showWordCount(0);
	clearNode(result);
}
function search() {
	const result = document.getElementById("dictresult");
	const findInDef = document.getElementById("findindef").checked;
	const isExact = inputElem.value.startsWith("\"");
	const inputval = isExact ? inputElem.value.slice(1) : inputElem.value;
	query = findInDef ? inputval : inputval.trim().toLowerCase();
	clearResult();
	if (query.length >= 2) {
		if (findInDef) {
			if (query.trim().length > 2) {
				document.getElementById("searching").style.display = "inline";
				defSearchCount = 0;
				defSearch();
			}
		} else {
			let initial = query.slice(0, 2);
			if (initList.indexOf(initial) >= 0) {
				if (dict[initial])
					showResult(initial, isExact);
				else
					loadDict(initial, isExact);
			} else {
				result.innerHTML = notfound;
			}
		}
	}
}
function defSearch() {
	const result = document.getElementById("dictresult");
	for (let i=0; i<initList.length; i++) {
		let div = document.createElement("div");
		div.id = initList[i];
		result.appendChild(div);
		if (dict[initList[i]])
			showDefResult(initList[i]);
		else
			loadDict(initList[i]);
	}
}
function loadDict(initial, isExact) {
	const request = new XMLHttpRequest();
	request.open("GET", ncped_url + "/" + initial + ".json", true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			dict[initial] = JSON.parse(request.responseText);
			if (document.getElementById("findindef").checked) {
				showDefResult(initial);
			} else {
				showResult(initial, isExact);
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
function showDefResult(initial) {
	defSearchCount++;
	if (defSearchCount >= initList.length) {
		document.getElementById("searching").style.display = "none";
		let foundCount = 0;
		for (let i=0; i<initList.length; i++) {
			if (foundDefList[initList[i]] && foundDefList[initList[i]].length > 0)
				foundCount++;
		}
		if (foundCount === 0) {
			document.getElementById("dictresult").innerHTML = notfound;
		} else if (foundCount === 1){
			for (let i=0; i<initList.length; i++) {
				if (foundDefList[initList[i]] && foundDefList[initList[i]].length === 1) {
					showDetail(0, null, initList[i]);
					break;
				}
			}
		}
	} else {
		if (dict[initial].length > 0) {
			foundDefList[initial] = [];
			for (let i=0; i<dict[initial].length; i++) {
				if (dict[initial][i].definition && dict[initial][i].definition.indexOf(query) > -1) {
					foundDefList[initial].push(dict[initial][i]);
				} else {
					if (dict[initial][i].homonyms) {
						for (let h=0; h<dict[initial][i].homonyms.length; h++) {
							if (dict[initial][i].homonyms[h].definition && dict[initial][i].homonyms[h].definition.indexOf(query) > -1)
								foundDefList[initial].push(dict[initial][i]);
						}
					}
				}
			}
		}
	}
	if (foundDefList[initial] && foundDefList[initial].length > 0) {
		const result = document.getElementById(initial);
		for (let i=0; i<foundDefList[initial].length; i++) {
			let div = document.createElement("div");
			let term = foundDefList[initial][i].entry;
			div.id = term;
			div.innerHTML = term;
			div.style.cursor = "pointer";
			div.addEventListener("click", function(event) {
				showDetail(i, event, initial);
			});
			result.appendChild(div);
		}
		updateDefResultCount();
		if (document.getElementById("showdetails").checked) {
			for (let i=0; i<foundDefList[initial].length; i++) {
				showDetail(i, null, initial);
			}
		}
	}
}
function showResult(initial, isExact) {
	const result = document.getElementById("dictresult");
	if (dict[initial].length > 0) {
		for (let i=0; i<dict[initial].length; i++) {
			const cond = isExact ? dict[initial][i].entry === query : dict[initial][i].entry.startsWith(query);
			if (cond) {
				let div = document.createElement("div");
				let term = dict[initial][i].entry;
				div.id = term;
				foundList.push(dict[initial][i]);
				div.innerHTML = term;
				div.style.cursor = "pointer";
				const ind = foundList.length - 1;
				div.addEventListener("click", function(event) {
					showDetail(ind, event);
				});
				result.appendChild(div);
				if (isExact)
					break;
			}
		}
		showWordCount(foundList.length, isExact);
		if (foundList.length === 0) {
			result.innerHTML = notfound;
		} else {
			if (document.getElementById("showdetails").checked) {
				for (let i=0; i<foundList.length; i++) {
					showDetail(i);
				}
			} else {
				if (foundList.length === 1) showDetail(0);
			}
		}
	} else {
		result.innerHTML = notfound;
	}
}
function showDetail(index, event, initial) {
	let item = {};
	if (document.getElementById("findindef").checked) {
		if (foundDefList[initial])
			item = foundDefList[initial][index];
	} else {
		item = foundList[index];
	}
	if (item === undefined) return;
	const termNode = document.getElementById(item.entry);
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
			let pos = meaning.indexOf(query, start);
			while (pos > -1) {
				output += meaning.slice(start, pos);
				output += '<span style="color:darkorange;">' + query + "</span>";
				start = pos + query.length;
				pos = meaning.indexOf(query, start);
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
	inputElem.value = "\"" + xr;
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

