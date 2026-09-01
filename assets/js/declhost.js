/*! declhost.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const declHost = {};
declHost.paliInput = {};
declHost.declension = {};
declHost.declFunc = {};
declHost.paliNumber = { "1": "eka", "2": "dvi", "3": "ti", "4": "catu" };
declHost.pron_parad = [ "sabba", "pubba" ];
declHost.pron_child_list = {
	"sabba": [ "katara", "katama", "ubhaya", "itara", "añña", "aññatara", "aññatama" ],
	"pubba": [ "para", "apara", "dakkhiṇa", "uttara", "adhara" ]
};
declHost.irrn_parad = [ "mana", "kattu", "pitu", "mātu" ];
declHost.irrn_child_list = {
	"mana": [ "aya", "aha", "ura", "ceta", "chanda", "tapa", "tama", "teja", "paya", "yasa", "raha", "vaca", "vaya", "sara", "sira" ],
	"kattu": [ "akkhātu", "abhibhavitu", "uṭṭhātu", "uppādetu", "okkamitu", "kāretu", "khattu", "khantu", "gajjitu", "gantu", "cetu", "chettu", "jetu", "ñātu", "tatu", "tātu", "dātu", "dhātu", "nattu", "netu", "nettu", "paṭisedhitu", "paṭisevitu", "panattu", "pabrūhetu", "pucchitu", "bhattu", "bhāsitu", "bhettu", "bhoddhu", "bhodhetu", "metu", "mucchitu", "vattu", "vassitu", "viññāpetu", "vinetu", "sandassetu", "sahitu", "sāvetu", "sotu", "hantu" ],
	"pitu":[ "cūlapitu", "bhātu", "jeṭṭhabhātu", "kaṇiṭṭhabhātu", "jāmātu", "mātāpitu" ],
	"mātu": [ "cūlamātu", "dhītu", "duhitu", "bhātudhītu" ]
};
declHost.init = function(declObj) {
	this.declension = declObj;
	this.declFunc = {
		generic: declObj.getGenericDeclensionStr,
		pronoun: declObj.getPronounDeclensionStr,
		irregular: declObj.getIrrnDeclensionStr
	};
};
declHost.compute = function() {
	const inputWord = this.paliInput.getText().trim().toLowerCase();
	if (inputWord.length >= 2) {
		this.updateDeclTable(inputWord);
	} else {
		if (this.paliNumber[inputWord] === undefined)
			this.fillTable(1);
		else
			this.updateDeclTable(this.paliNumber[inputWord]);
	}
};
declHost.getSelectedGender = function() {
	let result = "m";
	const elef = document.getElementById("gendf");
	const elen = document.getElementById("gendn");
	if (elef.checked)
		result = "f";
	else if (elen.checked)
		result = "n";
	return result;
};
declHost.getFixedLastChar = function(term, gender) {
	let lastCh = term.charAt(term.length-1);
	switch (gender) {
		case "m":
			if (lastCh === "ā") lastCh = "a";
			break;
		case "f":
			if (lastCh === "a") lastCh = "ā";
			break;
		case "n":
			if (lastCh === "ā") lastCh = "a";
			else if (lastCh === "ī") lastCh = "i";
			else if (lastCh === "ū") lastCh = "u";
			break;
	}
	return lastCh;
};
declHost.getGenericParam = function(term, gender) {
	let result = { nclass: "generic", group: "", stem: term };
	const lastCh = this.getFixedLastChar(term, gender);
	if ("aāiīuū".indexOf(lastCh) > -1) {
		result.group = lastCh + "," + gender;
		result.stem = term.slice(0, -1);
	} else {
		result.group = "";
	}
	return result;
};
declHost.updateDeclTable = function(term) {
	const selgen = this.getSelectedGender();
	const forceGeneric = document.getElementById("forcegen").checked;
	let param = {};
	let computed = false;
	if (forceGeneric) {
		param = this.getGenericParam(term, selgen);
		computed = true;
	} else {
		const lastCh = this.getFixedLastChar(term, selgen);
		let group = term + ";" + lastCh + "," + selgen;
		if (this.declension.paradn_pron[group] !== undefined) {
			param.nclass = "pronoun";
			param.group = group;
			param.stem = term.slice(0, -1);
		} else if (this.declension.paradn_irrn[group] !== undefined) {
			param.nclass = "irregular";
			param.group = group;
			const cutAt = term.endsWith("t") ? 3 : 1;
			param.stem = term.slice(0, -cutAt);
		} else if (term === "go") {
			const end = selgen === "f" ? "ā" : "a";
			param.nclass = "irregular";
			param.group = selgen === "n" ? "" : "go;" + end + "," + selgen;
			param.stem = "g";
		} else if (term === "kiṃ" || term === "ka") {
			const end = selgen === "f" ? "ā" : "a";
			param.nclass = "pronoun";
			param.group = "kiṃ;" + end + "," + selgen;
			param.stem = "k";
		} else if (term === "ubho") {
			const end = selgen === "f" ? "ā" : "a";
			param.nclass = "pronoun";
			param.group = "ubho;" + end + "," + selgen;
			param.stem = "ubh";
		} else if (term.endsWith("ant")) {
			param.nclass = "irregular";
			param.group = "guṇavant;t," + selgen;
			const cutAt = term.endsWith("u") ? 4 : 3;
			param.stem = term.slice(0, -cutAt);
			computed = true;
		} else if (term.endsWith("anta")) {
			if (selgen === "f") {
				param.nclass = "generic";
				param.group = "ā," + selgen;
				param.stem = term.slice(0, -1);
			} else {
				param.nclass = "irregular";
				param.group = "gacchanta;a," + selgen;
				param.stem = term.slice(0, -1);
			}
			computed = true;
		} else if (term.endsWith("tar") && selgen === "m") {
			param.nclass = "irregular";
			param.group = "kattu;u,m";
			param.stem = term.slice(0, -2);
			computed = true;
		} else {
			let generic = true;
			for (let i=0; i<this.pron_parad.length; i++) {
				if (this.pron_child_list[this.pron_parad[i]].indexOf(term) >= 0) {
					param.nclass = "pronoun";
					param.group = this.pron_parad[i] + ";" + lastCh + "," + selgen;
					param.stem = term.slice(0, -1);
					generic = false;
				}
			}
			for (let i=0; i<this.irrn_parad.length; i++) {
				if (this.irrn_child_list[this.irrn_parad[i]].indexOf(term) >= 0) {
					if (selgen === "m" || (this.irrn_parad[i] === "mātu" && selgen === "f")) {
						param.nclass = "irregular";
						param.group = this.irrn_parad[i] + ";" + term[term.length-1] + "," + selgen;
						param.stem = term.slice(0, -1);
						generic = false;
					}
				}
			}
			if (generic) {
				param = this.getGenericParam(term, selgen);
				computed = true;
			}
		}
	}
	if (param.group.length > 0)
		this.fillTable(1, param.stem, param.group, param.nclass);
	else
		this.fillTable(1);
	const lblComputed = document.getElementById("computed");
	if (computed)
		lblComputed.style.display = "inline";
	else
		lblComputed.style.display = "none";
};
declHost.fillTable = function(tnumber, stem, group, nclass) {
	const isClear = stem === undefined;
	const lblWordClass = document.getElementById("wordclass");
	for (let i = 0; i < this.declension.case_abbr.length; i++) {
		let cas = this.declension.case_abbr[i];
		for (let n = 0; n < this.declension.number_abbr.length; n++) {
			const num = this.declension.number_abbr[n];
			const elem = document.getElementById(cas+"_"+num+tnumber);
			if (isClear) {
				elem.innerHTML = "";
			} else {
				elem.innerHTML = declHost.declFunc[nclass](stem, group, i, n);
			}
		}
	}
	if (isClear || document.getElementById("forcegen").checked) {
		lblWordClass.innerHTML = "";
		lblWordClass.style.display = "none";
	} else {
		lblWordClass.innerHTML = nclass;
		lblWordClass.style.display = "inline";
	}
};
