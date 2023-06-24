---
title: "Sutta Reader"
permalink: /suttareader
is_application: true
date: 2023-06-23 12:00:00 +0700
---

This is a simple Pāli text reader, thanks to well-organized data from [SuttaCentral](https://suttacentral.net) that makes this possible. Only English translations by Ven. Brahmali (Vinaya) and Ven. Sujato (Suttanta), which have the best coverage, are available here. The program is meant to be fast and simple. So, please consult the original website for other details. [Sutta Lister](/suttalister) here may be helpful somehow, though.
<div>
<select id="nikaya" onClick="changeNikaya();">
	<option value="vin">Vin</option>
	<option value="dn" selected>DN</option>
	<option value="mn">MN</option>
	<option value="sn">SN</option>
	<option value="an">AN</option>
	<option value="kn">KN</option>
</select>
<select id="kngroup" style="display:none;" onClick="changeKNGroup();">
	<option value="kp">Khuddakapāṭha</option>
	<option value="dhp">Dhammapada</option>
	<option value="ud">Udāna</option>
	<option value="iti">Itivuttaka</option>
	<option value="snp">Suttanipāta</option>
	<option value="thag">Theragāthā</option>
	<option value="thig">Therīgāthā</option>
	<option value="cp">Cariyāpiṭaka</option>
</select>
<select id="vingroup" style="display:none;" onClick="changeVinGroup();">
	<option value="bu-vb">Mahāvibhaṅga</option>
	<option value="bi-vb">Bhikkhunivibhaṅga</option>
	<option value="kd">Khandhaka</option>
	<option value="pvr">Parivāra</option>
</select>
<select id="groupselector" style="display:none;" onClick="changeGroup();"></select>
<select id="suttaselector"></select>
<button onClick="loadSutta();">Load</button>
<span style="padding: 3px">
<label for="mdotabove"><input type="radio" id="mdotabove" name="niggahita-radio" onClick="changeNiggahita();">ṁ</label>
<label for="mdotbelow"><input type="radio" id="mdotbelow" name="niggahita-radio" onClick="changeNiggahita();" checked>ṃ</label>
</span>
<span><label for="showtrans"><input type="checkbox" id="showtrans" onChange="showTrans();" checked>Translation</label></span>
</div>
<p id="textdisplay"></p>

<script>
const suttaCount = { "dn": 34, "mn": 152, "sn": 56, "an": 11 };
const suttaSubList = {
"sn1": [ "1>81" ], "sn2": [ "1>30" ], "sn3": [ "1>25" ], "sn4": [ "1>25" ], "sn5": [ "1>10" ], "sn6": [ "1>15" ], "sn7": [ "1>22" ], "sn8": [ "1>12" ], "sn9": [ "1>14" ], "sn10": [ "1>12" ], "sn11": [ "1>25" ], "sn12": [ "1>71", "72-81", "82", "83-92", "93-213" ], "sn13": [ "1>11" ], "sn14": [ "1>39" ], "sn15": [ "1>20" ], "sn16": [ "1>13" ], "sn17": [ "1>12", "13-20", "21>37", "38-43" ], "sn18": [ "1>11", "12-20", "21>22" ], "sn19": [ "1>21" ], "sn20": [ "1>12" ], "sn21": [ "1>12" ], "sn22": [ "1>159" ], "sn23": [ "1>22", "23-33", "34", "35>45", "46" ], "sn24": [ "1>19", "20-35", "36>45", "46-69", "70", "71", "72-95", "96" ], "sn25": [ "1>10" ], "sn26": [ "1>10" ], "sn27": [ "1>10" ], "sn28": [ "1>10" ], "sn29": [ "1>10", "11-20", "21-50" ], "sn30": [ "1>3", "4-6", "7-16", "17-46" ], "sn31": [ "1>3", "4-12", "13-22", "23-112" ], "sn32": [ "1>2", "3-12", "13-52", "53>57" ], "sn33": [ "1>5", "6-10", "11-15", "16-20", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51-54", "55" ], "sn34": [ "1>19", "20-27", "28-34", "35-40", "41-45", "46-49", "50-52", "53-54", "55" ], "sn35": [ "1>32", "33-42", "43-51", "52>170", "171-173", "174-176", "177-179", "180-182", "183-185", "186>188", "189-191", "192-194", "195-197", "198-200", "201-203", "204>206", "207-209", "210-212", "213-215", "216-218", "219-221", "222>248" ], "sn36": [ "1>31" ], "sn37": [ "1>34" ], "sn38": [ "1>16" ], "sn39": [ "1-15", "16" ], "sn40": [ "1>11" ], "sn41": [ "1>10" ], "sn42": [ "1>13" ], "sn43": [ "1>13", "14-43", "44" ], "sn44": [ "1>11" ], "sn45": [ "1>41", "42-47", "48>49", "50-54", "55>56", "57-61", "62>63", "64-68", "69>70", "71-75", "76>77", "78-82", "83>84", "85-89", "90>91", "92-95", "96>97", "98-102", "103", "104-108", "109", "110-114", "115", "116-120", "121", "122-126", "127", "128-132", "133", "134-138", "139>140", "141-145", "146-148", "149>180" ], "sn46": [ "1>76", "77-88", "89-98", "99-110", "111-120", "121-129", "130", "131-142", "143-152", "153-164", "165-174", "175-184" ], "sn47": [ "1>50", "51-62", "63-72", "73-84", "85-94", "95-104" ], "sn48": [ "1>70", "71-82", "83-92", "93-104", "105-114", "115-124", "125-136", "137-146", "147-158", "159-168", "169-178" ], "sn49": [ "1-12", "13-22", "23-34", "35-44", "45-54" ], "sn50": [ "1-12", "13-22", "23-34", "35-44", "45-54", "55-66", "67-76", "77-88", "89-98", "99-108" ], "sn51": [ "1>32", "33-44", "45-54", "55-66", "67-76", "77-86" ], "sn52": [ "1>24" ], "sn53": [ "1-12", "13-22", "23-34", "35-44", "45-54" ], "sn54": [ "1>20" ], "sn55": [ "1>74" ], "sn56": [ "1>95", "96-101", "102>104", "105-107", "108-110", "111-113", "114-116", "117-119", "120-122", "123-125", "126-128", "129-130", "131" ], 
"an1": [ "1-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-81", "82-97", "98-139", "140-149", "150-169", "170-187", "188-197", "198-208", "209-218", "219-234", "235-247", "248-257", "258-267", "268-277", "278-286", "287-295", "296-305", "306-315", "316-332", "333-377", "378-393", "394-574", "575-615", "616-627" ], "an2": [ "1-10", "11-20", "21-31", "32-41", "42-51", "52-63", "64-76", "77-86", "87-97", "98-117", "118-129", "130-140", "141-150", "151-162", "163-179", "180-229", "230-279", "280-309", "310-479" ], "an3": [ "1>155", "156-162", "163-182", "183-352" ], "an4": [ "1>276", "277-303", "304-783" ], "an5": [ "1>256", "257-263", "264", "265-271", "272", "273-285", "286", "287-292", "293", "294-302", "303>307", "308-1152" ], "an6": [ "1>119", "120-139", "140>142", "143-169", "170-649" ], "an7": [ "1>95", "96-614", "615>617", "618-644", "645-1124" ], "an8": [ "1>90", "91-117", "118>120", "121-147", "148-627" ], "an9": [ "1>73", "74-81", "82>83", "84-91", "92>94", "95-112", "113-432" ], "an10": [ "1>155", "156-166", "167>198", "199-210", "211>224", "225-228", "229-232", "233-236", "237>239", "240-266", "267-746" ], "an11": [ "1>21", "22-29", "30-69", "70-117", "118-165", "166-213", "214-261", "262-309", "310-357", "358-405", "406-453", "454-501", "502-981", "982", "983-991", "992-1151" ],
"kp": [ "1>9" ],
"dhp": [ "1-20", "21-32", "33-43", "44-59", "60-75", "76-89", "90-99", "100-115", "116-128", "129-145", "146-156", "157-166", "167-178", "179-196", "197-208", "209-220", "221-234", "235-255", "256-272", "273-289", "290-305", "306-319", "320-333", "334-359", "360-382", "383-423" ], 
"ud": [ "1>10", "1>10", "1>10", "1>10", "1>10", "1>10", "1>10", "1>10" ],
"iti": [ "1>10", "11>20", "21>27", "28>37", "38>49", "50>59", "60>69", "70>79", "80>89", "90>99", "100>112" ],
"snp": [ "1>12", "1>14", "1>12", "1>16", "1>19" ],
"thag": [ "1>120", "1>49", "1>16", "1>12", "1>12", "1>14", "1>5", "1>3", "1>1", "1>7", "1>1", "1>2", "1>1", "1>2", "1>2", "1>10", "1>3", "1>1", "1>1", "1>1", "1>1" ],
"thig": [ "1>18", "1>10", "1>8", "1>1", "1>12", "1>8", "1>3", "1>1", "1>1", "1>1", "1>1", "1>1", "1>5", "1>1", "1>1", "1>1" ],
"cp": [ "1>35" ]
};
const havingVagga = [ "ud", "iti", "snp" ];
const vinayaList = {
"bu-vb": { "pj": [ "1>4" ], "ss": [ "1>13" ], "ay": [ "1>2" ], "np": [ "1>30" ], "pc": [ "1>92" ], "pd": [ "1>4" ], "sk": [ "1>75" ] },
"bi-vb": { "pj": [ "1>8" ], "ss": [ "1>13" ], "np": [ "1>12" ], "pc": [ "1>90", "91-93", "94>96" ], "pd": [ "1", "2-8" ], "sk": [ "1", "75" ] },
"kd": "1>22",
"pvr": [ "1>16", "2>16", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" ]
};
const suttaSelector = document.getElementById("suttaselector");
let nikaya = "";
let idList = [];
let textObj = {};
let transObj = {};
changeNikaya();
function clearNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}
function changeNikaya() {
	const nikayaElem = document.getElementById("nikaya");
	const groupElem = document.getElementById("groupselector");
	const knGroupElem = document.getElementById("kngroup");
	const vinGroupElem = document.getElementById("vingroup");
	nikaya = nikayaElem.options[nikayaElem.selectedIndex].value;
	idList = [];
	textObj = {};
	transObj = {};
	clearNode(suttaSelector);
	if (nikaya === "vin") {
		vinGroupElem.style.display = "inline";
		knGroupElem.style.display = "none";
		groupElem.style.display = "none";
		changeVinGroup();
	} else if (nikaya === "kn") {
		vinGroupElem.style.display = "none";
		knGroupElem.style.display = "inline";
		groupElem.style.display = "none";
		changeKNGroup();
	} else {
		vinGroupElem.style.display = "none";
		knGroupElem.style.display = "none";
		let allsutta = suttaCount[nikaya];
		let dnORmn = nikaya === "dn" || nikaya === "mn";
		if (!dnORmn)
			clearNode(groupElem);
		let elem = dnORmn ? suttaSelector : groupElem;
		for (let i=1; i<=allsutta; i++) {
			const opt = document.createElement("option");
			opt.value = nikaya + "" + i;
			opt.innerHTML = opt.value.toUpperCase();
			elem.appendChild(opt);
		}
		if (!dnORmn) {
			groupElem.style.display = "inline";
			changeGroup()
		} else {
			groupElem.style.display = "none";
		}
	}
}
function changeGroup() {
	const groupElem = document.getElementById("groupselector");
	clearNode(suttaSelector);
	const group = groupElem.options[groupElem.selectedIndex].value;
	const slist = getSuttaList(group);
	for (let i=0; i<slist.length; i++) {
		const opt = document.createElement("option");
		opt.value = slist[i];
		opt.innerHTML = opt.value.toUpperCase();
		suttaSelector.appendChild(opt);
	}
}
function changeKNGroup() {
	const knGroupElem = document.getElementById("kngroup");
	const groupElem = document.getElementById("groupselector");
	groupElem.style.display = "none";
	clearNode(suttaSelector);
	const knGroup = knGroupElem.options[knGroupElem.selectedIndex].value;
	let slist = [];
	if (havingVagga.indexOf(knGroup) > -1) {
		const vaggaCount = suttaSubList[knGroup].length;
		for (let v=1; v<=vaggaCount; v++) {
			const seq = getNumSeq(suttaSubList[knGroup][v-1]);
			for (let n=0; n<seq.length; n++) {
				const prefix = knGroup === "iti" ? knGroup : knGroup + v + ".";
				slist.push("vagga" + v + "/" + prefix + seq[n]);
			}
		}
	} else {
		slist = getSuttaList(knGroup);
	}
	for (let i=0; i<slist.length; i++) {
		const opt = document.createElement("option");
		opt.value = slist[i];
		const slashPos = opt.value.indexOf("/");
		const txt = slashPos > -1 ? opt.value.slice(slashPos+1) : opt.value;
		opt.innerHTML = txt[0].toUpperCase() + txt.slice(1);
		suttaSelector.appendChild(opt);
	}
}
function changeVinGroup() {
	const vinGroupElem = document.getElementById("vingroup");
	clearNode(suttaSelector);
	const vinGroup = vinGroupElem.options[vinGroupElem.selectedIndex].value;
	let slist = [];
	if (vinGroup.endsWith("-vb")) {
		const vbGroup = vinayaList[vinGroup];
		const groupList = [];
		for (let g in vbGroup)
			groupList.push(g);
		for (let i=0; i<groupList.length; i++) {
			const group = groupList[i];
			const files = vbGroup[group];
			for (let f=0; f<files.length; f++) {
				if (files[f].match(/>/) != null) {
					const seq = getNumSeq(files[f]);
					for (let n=0; n<seq.length; n++)
						slist.push(group + seq[n]);
				} else {
					slist.push(group + files[f]);
				}
			}
		}
		slist.push("as1-7");
	} else {
		if (vinGroup === "kd") {
			const kdSeq = getNumSeq(vinayaList[vinGroup]);
			for (let i=0; i<kdSeq.length; i++)
				slist.push(vinGroup + kdSeq[i]);
		} else {
			const pvrList = vinayaList[vinGroup];
			for (let i=0; i<pvrList.length; i++) {
				const pvrNum = i + 1;
				if (pvrList[i] === "0") {
					slist.push(vinGroup + pvrNum);
				} else {
					const pvrSeq = getNumSeq(pvrList[i]);
					for (let n=0; n<pvrSeq.length; n++)
						slist.push(vinGroup + pvrNum + "." + pvrSeq[n]);
				}
			}
		}
	}
	for (let i=0; i<slist.length; i++) {
		const opt = document.createElement("option");
		const txt = slist[i];
		opt.value = txt;
		opt.innerHTML = txt[0].toUpperCase() + txt.slice(1);
		suttaSelector.appendChild(opt);
	}
}
function getNumSeq(input) {
	let result = [];
	const startend = input.split(">");
	const start = parseInt(startend[0]);
	const end = parseInt(startend[1]);
	for (let n=start; n<=end; n++)
		result.push(n);
	return result;
}
function getSuttaList(group) {
	let result = [];
	if (suttaSubList[group] === undefined) return result;
	let list = suttaSubList[group];
	const prefix = nikaya === "kn" ? group : group + ".";
	for (let i=0; i<list.length; i++) {
		if (list[i].match(/>/) != null) {
			const seq = getNumSeq(list[i]);
			const extra = group === "thag" || group === "thig" ? (i+1) + "." : "";
			for (let n=0; n<seq.length; n++)
				result.push(prefix + extra + seq[n]);
		} else {
			result.push(prefix + list[i]);
		}
	}
	return result;
}
function getFilePrefix(sutta) {
	let filePrefix = nikaya;
	if (!(sutta.startsWith("dn") || sutta.startsWith("mn"))) {
		if (nikaya === "vin") {
			const vinGroupElem = document.getElementById("vingroup");
			const vinGroup = vinGroupElem.options[vinGroupElem.selectedIndex].value;
			filePrefix = "pli-tv-" + vinGroup;
		} else if (nikaya === "kn") {
			const knGroupElem = document.getElementById("kngroup");
			const knGroup = knGroupElem.options[knGroupElem.selectedIndex].value;
			filePrefix = nikaya + "/" + knGroup ;
		} else {
			const groupElem = document.getElementById("groupselector");
			const group = groupElem.options[groupElem.selectedIndex].value;
			filePrefix = nikaya + "/" + group;
		}
	}
	return filePrefix;
}
function getVinayaFile(name) {
	let result = "pli-tv-" + name;
	const vinGroupElem = document.getElementById("vingroup");
	const vinGroup = vinGroupElem.options[vinGroupElem.selectedIndex].value;
	if (vinGroup.endsWith("-vb")) {
		if (name.startsWith("as"))
			result = "pli-tv-" + vinGroup + "-" + name;
		else
			result = "pli-tv-" + vinGroup + "-" + name.slice(0, 2) + "/" + "pli-tv-" + vinGroup + "-" + name;
	}
	return result;
}
function loadSutta() {
	idList = [];
	textObj = {};
	transObj = {};
	let sutta = suttaSelector.options[suttaSelector.selectedIndex].value;
	const filePrefix = getFilePrefix(sutta);
	let basket = "sutta";
	if (nikaya === "vin") {
		basket = "vinaya";
		sutta = getVinayaFile(sutta);
	}
	const suttaFile = filePrefix + "/" +  sutta + "_root-pli-ms.json";
	const request = new XMLHttpRequest();
	request.open("GET", "{{ site.bilara_url }}/root/pli/ms/" + basket + "/" + suttaFile, true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			textObj = JSON.parse(request.responseText);
			for (let id in textObj)
				idList.push(id);
			displayText();
			loadTranslation();
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
}
function loadTranslation() {
	let sutta = suttaSelector.options[suttaSelector.selectedIndex].value;
	const filePrefix = getFilePrefix(sutta);
	let translator = "sujato";
	let basket = "sutta";
	if (nikaya === "vin") {
		translator = "brahmali";
		basket = "vinaya";
		sutta = getVinayaFile(sutta);
	}
	const transFile = filePrefix + "/" + sutta + "_translation-en-" + translator + ".json";
	const request = new XMLHttpRequest();
	request.open("GET", "{{ site.bilara_url }}/translation/en/" + translator + "/" + basket + "/" + transFile, true);
	request.onload = function(){
		if (request.status >= 200 && request.status < 400) {
			transObj = JSON.parse(request.responseText);
			if (document.getElementById("showtrans").checked)
				displayTrans();
		} else {
			console.log("Error loading ajax request. Request status:" + request.status);
		}
	};
	request.onerror = function(){
		console.log("There was a connection error");
	};
	request.send();
}
function displayText() {
	const display = document.getElementById("textdisplay");
	clearNode(display);
	for (let i=0; i<idList.length; i++) {
		if (idList[i].trim().length > 0) {
			const para = document.createElement("p");
			let text = textObj[idList[i]] ? textObj[idList[i]] : "";
			if (document.getElementById("mdotbelow").checked)
				text = text.replace(/ṁ/g,'ṃ');
			let code = idList[i].slice(idList[i].lastIndexOf(":")+1);
			let element = "div";
			if (code.startsWith("0.")) {
				element = "h3";
			} else {
				if (idList[i].match(/\.0.\d/) != null)
					element = "h4";
				else if (idList[i].endsWith(".0"))
					element = "h4";
			}
			const textElem = document.createElement(element);
			textElem.id = "text-" + idList[i];
			textElem.innerHTML = text;
			const transElem = document.createElement("blockquote");
			transElem.id = "trans-" + idList[i];
			transElem.style.display = "none";
			para.appendChild(textElem);
			para.appendChild(transElem);
			display.appendChild(para);
		}
	}
}
function displayTrans() {
	for (let i=0; i<idList.length; i++) {
		if (idList[i].trim().length > 0 && transObj[idList[i]]) {
			const trans = document.getElementById("trans-" + idList[i]);
			trans.style.display = "block";
			trans.innerHTML = transObj[idList[i]];
		}
	}
}
function showTrans() {
	if (document.getElementById("showtrans").checked) {
		displayTrans();
	} else {
		displayText();
	}
}
function changeNiggahita() {
	if (idList.length === 0) return;
	for (let i=0; i<idList.length; i++) {
		if (idList[i].trim().length > 0) {
			const textNode = document.getElementById("text-" + idList[i]);
			let text = document.getElementById("mdotabove").checked
				? textNode.innerHTML.replace(/ṃ/g,'ṁ')
				: textNode.innerHTML.replace(/ṁ/g,'ṃ');
			textNode.innerHTML = text;
		}
	}
}
</script>
