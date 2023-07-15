/*! ppreader.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const ppReader = {};
ppReader.textInputElem = {};
ppReader.dict = {};
ppReader.declension = {};
ppReader.charTable = {
	"=a": "ā", "=i": "ī", "=u": "ū", "\\^n": "ṅ", "~n": "ñ", "\\.t": "ṭ", "\\.d": "ḍ", "\\.n": "ṇ", "\\.l": "ḷ", "\\.m": "ṃ",
	"=A": "Ā", "=I": "Ī", "=U": "Ū", "\\^N": "Ṅ", "~N": "Ñ", "\\.T": "Ṭ", "\\.D": "Ḍ", "\\.N": "Ṇ", "\\.L": "Ḷ", "\\.M": "Ṃ"
};
ppReader.stockPronWords = {
	"tumha:3": "tumha;a,m", "amha:3": "amha;a,m",
	"ta:m": "ta;a,m", "ta:f": "ta;ā,f", "ta:n": "ta;a,n",
	"eta:m": "eta;a,m", "eta:f": "eta;ā,f", "eta:n": "eta;a,n",
	"ima:m": "ima;a,m", "ima:f": "ima;ā,f", "ima:n": "ima;a,n",
	"amu:m": "amu;u,m", "amu:f": "amu;u,f", "amu:n": "amu;u,n",
	"kiṃ:m": "kiṃ;a,m", "kiṃ:f": "kiṃ;ā,f", "kiṃ:n": "kiṃ;a,n",
	"kiṃci:m": "kiṃci;i,m", "kiṃci:f": "kiṃci;i,f", "kiṃci:n": "kiṃci;i,n",
	"sabba:m": "sabba;a,m", "sabba:f": "sabba;ā,f", "sabba:n": "sabba;a,n",
	"katara:m": "sabba;a,m", "katara:f": "sabba;ā,f", "katara:n": "sabba;a,n",
	"katama:m": "sabba;a,m", "katama:f": "sabba;ā,f", "katama:n": "sabba;a,n",
	"ubhaya:m": "sabba;a,m", "ubhaya:f": "sabba;ā,f", "ubhaya:n": "sabba;a,n",
	"itara:m": "sabba;a,m", "itara:f": "sabba;ā,f", "itara:n": "sabba;a,n",
	"añña:m": "sabba;a,m", "añña:f": "sabba;ā,f", "añña:n": "sabba;a,n",
	"aññatara:m": "sabba;a,m", "aññatara:f": "sabba;ā,f", "aññatara:n": "sabba;a,n",
	"aññatama:m": "sabba;a,m", "aññatama:f": "sabba;ā,f", "aññatama:n": "sabba;a,n",
	"pubba:m": "pubba;a,m", "pubba:f": "pubba;ā,f", "pubba:n": "pubba;a,n",
	"para:m": "pubba;a,m", "para:f": "pubba;ā,f", "para:n": "pubba;a,n",
	"apara:m": "pubba;a,m", "apara:f": "pubba;ā,f", "apara:n": "pubba;a,n",
	"dakkhiṇa:m": "pubba;a,m", "dakkhiṇa:f": "pubba;ā,f", "dakkhiṇa:n": "pubba;a,n",
	"uttara:m": "pubba;a,m", "uttara:f": "pubba;ā,f", "uttara:n": "pubba;a,n",
	"adhara:m": "pubba;a,m", "adhara:f": "pubba;ā,f", "adhara:n": "pubba;a,n",
	"ya:m": "ya;a,m", "ya:f": "ya;ā,f", "ya:n": "ya;a,n",
	"eka:m": "eka;a,m", "eka:f": "eka;ā,f", "eka:n": "eka;a,n",
	"dvi:3": "dvi;i,m", "ubho:3": "ubho;a,m", 
	"ti:m": "ti;i,m", "ti:f": "ti;i,f", "ti:n": "ti;i,n",
	"catu:m": "catu;u,m", "catu:f": "catu;u,f", "catu:n": "catu;u,n"
};
ppReader.stockIrrnWords = {
	"mana:m": "mana;a,m", "aya:m": "mana;a,m", "aha:m": "mana;a,m", "ura:m": "mana;a,m", "ceta:m": "mana;a,m", "chanda:m": "mana;a,m", "tapa:m": "mana;a,m", "tama:m": "mana;a,m", "teja:m": "mana;a,m", "paya:m": "mana;a,m", "yasa:m": "mana;a,m", "raha:m": "mana;a,m", "vaca:m": "mana;a,m", "vaya:m": "mana;a,m", "sara:m": "mana;a,m", "sira:m": "mana;a,m", 
	"rāja:m": "rāja;a,m", "brahma:m": "brahma;a,m", "atta:m": "atta;a,m", "ātuma:m": "ātuma;a,m", "yuva:m": "yuva;a,m", "kamma:n": "kamma;a,n", "go:m": "go;a,m", "satthu:m": "satthu;u,m", "kattu:m": "kattu;u,m",
	"pitu:m": "pitu;u,m", "bhātu:m": "pitu;u,m", "jāmātu:m": "pitu;u,m", "mātāpitu:m": "pitu;u,m",
	"mātu:m": "mātu;u,f", "dhītu:m": "mātu;u,f", "duhitu:m": "mātu;u,f",
	"bhagavant:m": "guṇavant;t,m", "bhavanta:m": "bhavanta;a,m", "santa:m": "santa;a,m", "mahanta:m": "mahanta;a,m"
};
ppReader.sandhiWords = {
	"nāhaṃ": "na+ahaṃ", "yaṃnūnāhaṃ": "yaṃnūna+ahaṃ", "panāhaṃ": "pana+ahaṃ", "khvāhaṃ": "kho+ahaṃ", "cāhaṃ": "ca+ahaṃ", "sacāhaṃ": "sace+ahaṃ", "handāhaṃ": "handa+ahaṃ", "svāhaṃ": "so+ahaṃ", "idhāhaṃ": "idha+ahaṃ", "tāhaṃ": "te+ahaṃ", "vatāhaṃ": "vata+ahaṃ", "evāhaṃ": "eva+ahaṃ", "tadāhaṃ": "tadā+ahaṃ", "tassāhaṃ": "tassa+ahaṃ", "kadāhaṃ": "kadā+ahaṃ", "yenāhaṃ": "yena+ahaṃ", "sāhaṃ": "sā+ahaṃ", "sohaṃ": "so+ahaṃ", "tathāhaṃ": "tathā+ahaṃ", "tenāhaṃ": "tena+ahaṃ", "imāhaṃ": "imā+ahaṃ", "tāvāhaṃ": "tāva+ahaṃ", "apāhaṃ": "api+ahaṃ", "yathāhaṃ": "yathā+ahaṃ", "ekāhaṃ": "ekā+ahaṃ", "ekohaṃ": "eko+ahaṃ", "tathūpamāhaṃ": "tathā+upamā+ahaṃ", "esāhaṃ": "esā+ahaṃ", "esohaṃ": "eso+ahaṃ", "athāhaṃ": "atha+ahaṃ", "imināhaṃ": "iminā+ahaṃ", "nāmāhaṃ": "nāma+ahaṃ", "tesāhaṃ": "tesā+ahaṃ", "kathāhaṃ": "kathaṃ+ahaṃ", "māhaṃ": "mā+ahaṃ", "ekamidāhaṃ": "ekaṃ+idha+ahaṃ", "yāvāhaṃ": "yāva+ahaṃ", "kyāhaṃ": "kiṃ+ahaṃ", "vāhaṃ": "vā+ahaṃ", "tasmāhaṃ": "tasmā+ahaṃ", "yvāhaṃ": "yo+ahaṃ", "yadāhaṃ": "yadā+ahaṃ", "idānāhaṃ": "idāni+ahaṃ", "hetaṃ": "hi+etaṃ", "hetāni": "hi+etāni", "nohetaṃ": "no+hi+etaṃ", "sametāyasmā": "sametu+āyasmā", "matthi": "me+atthi", "asantettha": "asanto+ettha", "nasi": "na+asi", "yassete": "yassa+ete", "māvuso": "mā+āvuso", "itthāyaṃ": "itthī+ayaṃ", "ānentetaṃ": "ānentu+etaṃ", "metaṃ": "me+etaṃ", "mokāso": "me+okāso", "esāvuso": "eso+āvuso", "kutettha": "kuto+ettha", "sāpi": "sā+api", "sopi": "so+api", "sāva": "sā+iva", "bandhusseva": "bandhussa+iva", "tassedaṃ": "tassa+idaṃ", "latāva": "latā+iva", "lateva": "latā+iva", "ceti": "ca+iti", "guṇeneti": "guṇena+iti", "cūbhayaṃ": "ca+ubhayaṃ", "saddhīdha": "saddhā+idha", "tatrāyaṃ": "tatra+ayaṃ", "nāyyo": "na+ayyo", "nāssa": "na+assa", "māyyo": "mā+ayyo", "māssu": "mā+assu", "tadāssu": "tadā+assu", "kadāssu": "kadā+assu", "vāssa": "vā+assa", "tasmāssa": "tasmā+assa", "tatrāssa": "tatra+assa", "taṇhāssa": "taṇhā+assa", "katvātra": "katvā+atra", "sādhūti": "sādhu+iti", "tyāhaṃ": "te+ahaṃ", "tyāssa": "te+assa", "myāyaṃ": "me+ayaṃ", "khvassa": "kho+assa", "yvāyaṃ": "yo+ayaṃ", "svāyaṃ": "so+ayaṃ", "svāssa": "so+assa", "svāgataṃ": "su+āgataṃ", "hetuttho": "hetu+attho", "hetuattho": "hetu+attho", "dhātuttho": "dhātu+attho", "iccassa": "iti+assa", "iccetaṃ": "iti+etaṃ", "itīti": "iti+iti", "itīdaṃ": "iti+idaṃ", "itveva": "iti+eva;", "idheva": "idha+eva", "yathariva": "yathā+eva", "tathariva": "tathā+eva", "manuññaṃ": "mano+aññaṃ", "gavassaṃ": "go+assaṃ", "yajjevaṃ": "yadi+evaṃ", "yathayidaṃ": "yathā+idaṃ", "sammadeva": "sammā+eva", "yasmātiha": "yasmā+iha", "sabbhireva": "sabbhi+eva", "yāvañcidha": "yāva+ca+idha", "taññeva": "taṃ+eva", "evañhi": "evaṃ+hi", "yañhi": "yaṃ+hi", "tañhi": "taṃ+hi", "tamahaṃ": "taṃ+ahaṃ", "tamāha": "taṃ+āha", "yamāha": "yaṃ+āha", "tamāhu": "taṃ+āhu", "yamāhu": "yaṃ+āhu", "evametaṃ": "evaṃ+etaṃ", "ahameva": "ahaṃ+eva", "tvameva": "tvaṃ+eva", "tayidaṃ": "taṃ+idaṃ", "tadate": "taṃ+te", "etadakiñci": "etaṃ+kiñci", "tāsāhaṃ": "tāsaṃ+ahaṃ", "idampi": "idaṃ+api", "kindāni": "kiṃ+idāni", "tvaṃsi": "tvaṃ+asi", "tadaminā": "taṃ+iminā", "evumaṃ": "evaṃ+imaṃ", "kahaṃ": "kaṃ+ahaṃ", "kehaṃ": "kaṃ+ahaṃ", "tampi": "taṃ+pi", "yampi": "yaṃ+pi", "nālaṃ": "na+alaṃ", "alañca": "alaṃ+ca"
};
ppReader.tokens = [];
ppReader.shownTerms = [];
ppReader.declPronProducts = {};
ppReader.declIrrnProducts = {};
ppReader.processStockWords = function() {
	for (const w in this.stockPronWords) {
		const term = w.slice(0, w.indexOf(":"));
		const cutAt = term.endsWith("ṃ") ? 2 : 1;
		const stem = term.slice(0, -cutAt);
		const prod = this.declension.getPronounDeclensionAll(stem, this.stockPronWords[w])
		this.declPronProducts[w] = prod;
	}
	for (const w in this.stockIrrnWords) {
		const term = w.slice(0, w.indexOf(":"));
		const cutAt = term.endsWith("t") ? 3 : 1;
		const stem = term.slice(0, -cutAt);
		const prod = this.declension.getIrrnDeclensionAll(stem, this.stockIrrnWords[w])
		this.declIrrnProducts[w] = prod;
	}
};
ppReader.showOptions = function() {
	const optShown = document.getElementById("options").checked;
	const optBox = document.getElementById("optionbox");
	const display = optShown ? "block" : "none";
	optBox.style.display = display;
};
ppReader.getOptions = function() {
	const opts = {};
	opts["pronouns"] = document.getElementById("opt_pronouns").checked;
	opts["irrns"] = document.getElementById("opt_irrns").checked;
	opts["sandhis"] = document.getElementById("opt_sandhis").checked;
	return opts;
};
ppReader.clearNode = function(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
};
ppReader.showInstruction = function() {
	const instruction = document.getElementById("instruction");
	if (instruction.style.display === "none")
		instruction.style.display = "block";
	else
		instruction.style.display = "none";
};
ppReader.clear = function() {
	this.textInputElem.value = "";
	this.clearNode(document.getElementById("analyzed_result"));
};
ppReader.pasteText = function() {
	window.navigator.clipboard.readText().then(clipText => this.textInputElem.value = clipText);
};
ppReader.analyze = function() {
	ppReader.tokens = [];
	ppReader.shownTerms = [];
	this.refresh();
	this.tokenize();
	this.showList();
	this.showDetails();
};
ppReader.refresh = function() {
	let text = this.textInputElem.value;
	for (const ch in ppReader.charTable) {
		const regex = new RegExp(ch, "g");
		text = text.replace(regex, ppReader.charTable[ch]);
	}
	text = text.replace(/ṁ/g, "ṃ");
	this.textInputElem.value = text;
};
ppReader.tokenize = function() {
	const re = /[^A-Za-zÑĀĪŪḌḶṂṄṆṬñāīūḍḷṃṅṇṭ]+/;
	const terms = this.textInputElem.value.toLowerCase().split(re);
	for (let i=0; i<terms.length; i++) {
		if (terms[i].length > 0)
			this.tokens.push(terms[i] + ":" + i);
	}
};
ppReader.findTermInStock = function(term) {
	let result = {};
	const opts = this.getOptions();
	if (opts.pronouns) {
		for (const t in this.declPronProducts) {
			const prod = this.declPronProducts[t];
			if (term in prod)
				result[t] = prod[term];
		}
	}
	if (opts.irrns) {
		for (const t in this.declIrrnProducts) {
			const prod = this.declIrrnProducts[t];
			if (term in prod)
				result[t] = prod[term];
		}
	}
	return result;
};
ppReader.createStockInfoBox = function(termsInfo) {
	const block = document.createElement("blockquote");
	block.className = "box-dark";
	for (const t in termsInfo) {
		const elem = document.createElement("div");
		const det = termsInfo[t];
		const cas = det.cas;
		let casStr = this.declension.case_abbr[cas[0]] + ".";
		for (let c=1; c<cas.length; c++)
			casStr += "/" + this.declension.case_abbr[cas[c]] + ".";
		const num = det.num;
		let numStr = this.declension.number_abbr[num[0]] + ".";
		for (let n=1; n<num.length; n++)
			numStr += "/" + this.declension.number_abbr[num[n]] + ".";
		let [ term, gen ] = t.split(":");
		if (gen === "n") gen = "nt";
		const genStr = gen === "3" ? "" : "(" + gen + "." + ") ";
		elem.innerHTML = "<strong>" + term + "</strong> " + genStr + casStr + " " + numStr;
		block.appendChild(elem);
	}
	return block;
};
ppReader.createSandhiInfoBox = function(term) {
	const block = document.createElement("blockquote");
	block.className = "box-dark";
	const elem = document.createElement("div");
	const info = this.sandhiWords[term];
	const re = new RegExp("\\+", "g");
	const infoStr = info ? info.replace(re, " + ") : "";
	elem.innerHTML = infoStr;
	block.appendChild(elem);
	return block;
};
ppReader.showList = function() {
	const result = document.getElementById("analyzed_result");
	this.clearNode(result);
	for (let i=0; i<this.tokens.length; i++) {
		const term = this.tokens[i].slice(0, this.tokens[i].indexOf(":"));
		const div = document.createElement("div");
		div.id = this.tokens[i];
		const head = document.createElement("div");
		head.id = div.id + "-head";
		head.innerHTML = term;
		head.addEventListener("click", function(event) {
			ppReader.showDetail(div.id, event);
		});
		div.appendChild(head);
		const dictDetail = document.createElement("div");
		dictDetail.id = div.id + "-detail";
		dictDetail.style.display = "none";
		div.appendChild(dictDetail);
		if (this.getOptions().sandhis && term in this.sandhiWords) {
			const block = this.createSandhiInfoBox(term);
			this.addDetail(dictDetail, block, true);
		}
		const termsInStock = this.findTermInStock(term);
		if (Object.keys(termsInStock).length > 0) {
			const block = this.createStockInfoBox(termsInStock);
			this.addDetail(dictDetail, block, true);
		}
		result.appendChild(div);
		this.dict.searchForAnalysis(term, dictDetail, this);
	}
};
ppReader.showInfo = function(node, type, isExact) {
	const head = node.parentNode.firstElementChild;
	if (type === "seeabove") {
		const span = document.createElement("span");
		span.style.fontSize = "0.8em";
		const nearest = isExact ? " the" : " a similar";
		span.innerHTML = "&nbsp;(See" + nearest + " definition above or below)"
		head.appendChild(span);
	}
};
ppReader.addDetail = function(node, block, isExact) {
	const head = node.parentNode.firstElementChild;
	const term = head.innerText;
	const star = isExact ? "" : "*";
	head.innerHTML = "<strong>" + term + star + "</strong>";
	head.style.cursor = "pointer";
	node.appendChild(block);
};
ppReader.showDetail = function(id, event) {
	const head = document.getElementById(id + "-head");
	if (event && event.target.parentNode === head) {
		const detail = document.getElementById(id + "-detail");
		const display = detail.style.display === "none" ? "block" : "none";
		detail.style.display = display;
	}
};
ppReader.showDetails = function() {
	const display = document.getElementById("details").checked ? "block" : "none";
	for (let i=0; i<this.tokens.length; i++) {
		const id = this.tokens[i] + "-detail";
		const elem = document.getElementById(id);
		if (elem)
			elem.style.display = display;
	}
};
