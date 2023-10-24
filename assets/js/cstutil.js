/*! cstutil.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
const cstUtil = {};
cstUtil.abbr = { "vin": "Vinaya", "sut": "Suttanta", "abh": "Abhidhamma", "mul": "Mūla", "att": "Aṭṭhakathā", "tik": "Ṭīkā", "ann": "Añña", "exe": "Exegesis" };
cstUtil.titleDef = {
	"vinmul": "Main texts in the Vinaya (Vinayapiṭake mūlaganthā)",
	"vinexe": "Exegetical works in the Vinaya (Vinayapiṭake aṭṭhakathā ṭīkā ca)",
};
cstUtil.bookInfo = {
	"buv1": {
		"group": "vin",
		"class": "mul",
		"ref": "buv1",
		"file": "cst-v-buv1.gz",
		"name": "Bhikkhuvibhaṅga 1",
		"altname": "Mahāvibhaṅga 1",
		"cscdclass": "mul",
		"description": "The Vinaya of Bhikkhus from Pārājika to Nissaggiya-pācittiya",
		"commentary": [ "sp1" ]
	},
	"buv2": {
		"group": "vin",
		"class": "mul",
		"ref": "buv2",
		"file": "cst-v-buv2.gz",
		"name": "Bhikkhuvibhaṅga 2",
		"altname": "Mahāvibhaṅga 2",
		"cscdclass": "mul",
		"description": "The Vinaya of Bhikkhus from Pācittiya to Adhikaraṇasamatha",
		"commentary": [ "sp2" ]
	},
	"sp1": {
		"group": "vin",
		"class": "exe",
		"ref": "sp1",
		"file": "cst-v-sp1.gz",
		"name": "Samantapāsādikā 1",
		"altname": "",
		"cscdclass": "att",
		"description": "The commentary on Bhikkhu-Vinaya from Pārājika to Nissaggiya-pācittiya",
		"commentary": [ "sd1", "vjb1", "vmv1" ]
	},
	"sp2": {
		"group": "vin",
		"class": "exe",
		"ref": "sp2",
		"file": "cst-v-sp2.gz",
		"name": "Samantapāsādikā 2",
		"altname": "",
		"cscdclass": "att",
		"description": "The commentary on Bhikkhu-Vinaya from Pācittiya to Adhikaraṇasamatha",
		"commentary": [ "sd2", "vjb2", "vmv2" ]
	},
	"sd1": {
		"group": "vin",
		"class": "exe",
		"ref": "sd1",
		"file": "cst-v-sd1.gz",
		"name": "Sāratthadīpanī 1",
		"altname": "",
		"cscdclass": "tik",
		"description": "The main commentary to Samantapāsādikā 1",
		"commentary": []
	},
	"sd2": {
		"group": "vin",
		"class": "exe",
		"ref": "sd2",
		"file": "cst-v-sd2.gz",
		"name": "Sāratthadīpanī 2",
		"altname": "",
		"cscdclass": "tik",
		"description": "The main commentary to Samantapāsādikā 2",
		"commentary": []
	},
	"vjb1": {
		"group": "vin",
		"class": "exe",
		"ref": "vjb1",
		"file": "cst-v-vjb1.gz",
		"name": "Vajirabuddhi 1",
		"altname": "",
		"cscdclass": "tik",
		"description": "A commentary on Samantapāsādikā 1",
		"commentary": []
	},
	"vjb2": {
		"group": "vin",
		"class": "exe",
		"ref": "vjb2",
		"file": "cst-v-vjb2.gz",
		"name": "Vajirabuddhi 2",
		"altname": "",
		"cscdclass": "tik",
		"description": "A commentary on Samantapāsādikā 2",
		"commentary": []
	},
	"vmv1": {
		"group": "vin",
		"class": "exe",
		"ref": "vmv1",
		"file": "cst-v-vmv1.gz",
		"name": "Vimativinodanī 1",
		"altname": "",
		"cscdclass": "tik",
		"description": "A commentary on Samantapāsādikā 1",
		"commentary": []
	},
	"vmv2": {
		"group": "vin",
		"class": "exe",
		"ref": "vmv2",
		"file": "cst-v-vmv2.gz",
		"name": "Vimativinodanī 2",
		"altname": "",
		"cscdclass": "tik",
		"description": "A commentary on Samantapāsādikā 2",
		"commentary": []
	}
};
