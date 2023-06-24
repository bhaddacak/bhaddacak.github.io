declFunc = {
	generic: getGenericDeclensionStr,
	pronoun: getPronounDeclensionStr,
	irregular: getIrrnDeclensionStr
};
paliNumber = { "1": "eka", "2": "dvi", "3": "ti", "4": "catu" };
pron_parad = [ "sabba", "pubba" ];
pron_child_list = {
	"sabba": [ "katara", "katama", "ubhaya", "itara", "añña", "aññatara", "aññatama" ],
	"pubba": [ "para", "apara", "dakkhiṇa", "uttara", "adhara" ]
};
irrn_parad = [ "mana", "kattu", "pitu", "mātu" ];
irrn_child_list = {
	"mana": [ "aya", "aha", "ura", "ceta", "chanda", "tapa", "tama", "teja", "paya", "yasa", "raha", "vaca", "vaya", "sara", "sira" ],
	"kattu": [ "akkhātu", "abhibhavitu", "uṭṭhātu", "uppādetu", "okkamitu", "kāretu", "khattu", "khantu", "gajjitu", "gantu", "cetu", "chettu", "jetu", "ñātu", "tatu", "tātu", "dātu", "dhātu", "nattu", "netu", "nettu", "paṭisedhitu", "paṭisevitu", "panattu", "pabrūhetu", "pucchitu", "bhattu", "bhāsitu", "bhettu", "bhoddhu", "bhodhetu", "metu", "mucchitu", "vattu", "vassitu", "viññāpetu", "vinetu", "sandassetu", "sahitu", "sāvetu", "sotu", "hantu" ],
	"pitu":[ "cūlapitu", "bhātu", "jeṭṭhabhātu", "kaṇiṭṭhabhātu", "jāmātu", "mātāpitu" ],
	"mātu": [ "cūlamātu", "dhītu", "duhitu", "bhātudhītu" ]
};
function compute() {
	const inputWord = textInputElem.value.trim().toLowerCase();
	if (inputWord.length >= 2) {
		updateDeclTable(inputWord);
	} else {
		if (paliNumber[inputWord] === undefined)
			fillTable(1);
		else
			updateDeclTable(paliNumber[inputWord]);
	}
}
function getSelectedGender() {
	let result = 'm';
	const elem = document.getElementById("gendm");
	const elef = document.getElementById("gendf");
	const elen = document.getElementById("gendn");
	if (elef.checked)
		result = 'f';
	else if (elen.checked)
		result = 'n';
	return result;
}
function getFixedLastChar(term, gender) {
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
}
function getGenericParam(term, gender) {
	let result = { nclass: "generic", group: "", stem: term };
	const lastCh = getFixedLastChar(term, gender);
	if ("aāiīuū".indexOf(lastCh) > -1) {
		result.group = lastCh + "," + gender;
		result.stem = term.slice(0, term.length-1);
	} else {
		result.group = "";
	}
	return result;
}
function updateDeclTable(term) {
	const selgen = getSelectedGender();
	const forceGeneric = document.getElementById("forcegen").checked;
	let param = {};
	let computed = false;
	if (forceGeneric) {
		param = getGenericParam(term, selgen);
		computed = true;
	} else {
		const lastCh = getFixedLastChar(term, selgen);
		let group = term + ";" + lastCh + "," + selgen;
		if (paradn_pron[group] != undefined) {
			param.nclass = "pronoun";
			param.group = group;
			param.stem = term.slice(0, term.length-1);
		} else if (paradn_irrn[group] != undefined) {
			param.nclass = "irregular";
			param.group = group;
			const cutAt = term.endsWith("t") ? 3 : 1;
			param.stem = term.slice(0, term.length - cutAt);
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
			param.stem = term.slice(0, term.length - cutAt);
			computed = true;
		} else if (term.endsWith("anta")) {
			if (selgen === "f") {
				param.nclass = "generic";
				param.group = "ā," + selgen;
				param.stem = term.slice(0, term.length-1);
			} else {
				param.nclass = "irregular";
				param.group = "gacchanta;a," + selgen;
				param.stem = term.slice(0, term.length-1);
			}
			computed = true;
		} else if (term.endsWith("tar") && selgen === "m") {
			param.nclass = "irregular";
			param.group = "kattu;u,m";
			param.stem = term.slice(0, term.length-2);
			computed = true;
		} else {
			let generic = true;
			for (let i=0; i<pron_parad.length; i++) {
				if (pron_child_list[pron_parad[i]].indexOf(term) >= 0) {
					const end = selgen === "f" ? "ā" : "a";
					param.nclass = "pronoun";
					param.group = pron_parad[i] + ";" + lastCh + "," + selgen;
					param.stem = term.slice(0, term.length-1);
					generic = false;
				}
			}
			for (let i=0; i<irrn_parad.length; i++) {
				if (irrn_child_list[irrn_parad[i]].indexOf(term) >= 0) {
					if (selgen === "m" || (irrn_parad[i] === "mātu" && selgen === "f")) {
						param.nclass = "irregular";
						param.group = irrn_parad[i] + ";" + term[term.length-1] + "," + selgen;
						param.stem = term.slice(0, term.length-1);
						generic = false;
					}
				}
			}
			if (generic) {
				param = getGenericParam(term, selgen);
				computed = true;
			}
		}
	}
	if (param.group.length > 0)
		fillTable(1, param.stem, param.group, param.nclass);
	else
		fillTable(1);
	const lblComputed = document.getElementById("computed");
	if (computed)
		lblComputed.style.display = "inline";
	else
		lblComputed.style.display = "none";
}
function fillTable(tnumber, stem, group, nclass) {
	const isClear = stem === undefined;
	const lblWordClass = document.getElementById("wordclass");
	for (let i = 0; i < case_abbr.length; i++) {
 		let cas = case_abbr[i];
		for (let g = 0; g < gender_abbr.length; g++) {
			const gen = gender_abbr[g];
			const elem = document.getElementById(cas+"_"+gen+tnumber);
			if (isClear) {
				elem.innerHTML = "";
			} else {
				elem.innerHTML = declFunc[nclass](stem, group, i, g);
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
}
