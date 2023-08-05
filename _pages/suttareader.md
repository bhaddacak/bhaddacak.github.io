---
title: "Sutta Reader"
permalink: /suttareader
is_application: true
date: 2023-07-05 12:00:00 +0700
---

This is a simple Pāli text reader, thanks to well-organized data from [SuttaCentral](https://suttacentral.net) that makes this possible. Only English translations by Ven. Brahmali (Vinaya) and Ven. Sujato (Suttanta), which have the best coverage, are available here. The program is meant to be fast and simple. So, please consult the original website for other details. [Sutta Lister](/suttalister) here may be helpful somehow, though.
<div>
<select id="nikaya" onClick="suttaReader.changeNikaya();">
	<option value="vin">Vin</option>
	<option value="dn" selected>DN</option>
	<option value="mn">MN</option>
	<option value="sn">SN</option>
	<option value="an">AN</option>
	<option value="kn">KN</option>
</select>
<select id="kngroup" style="display:none;" onClick="suttaReader.changeKNGroup();">
	<option value="kp">Khuddakapāṭha</option>
	<option value="dhp">Dhammapada</option>
	<option value="ud">Udāna</option>
	<option value="iti">Itivuttaka</option>
	<option value="snp">Suttanipāta</option>
	<option value="thag">Theragāthā</option>
	<option value="thig">Therīgāthā</option>
	<option value="cp">Cariyāpiṭaka</option>
</select>
<select id="vingroup" style="display:none;" onClick="suttaReader.changeVinGroup();">
	<option value="bu-vb">Mahāvibhaṅga</option>
	<option value="bi-vb">Bhikkhunivibhaṅga</option>
	<option value="kd">Khandhaka</option>
	<option value="pvr">Parivāra</option>
</select>
<select id="groupselector" style="display:none;" onClick="suttaReader.changeGroup();"></select>
<select id="suttaselector"></select>
<button onClick="suttaReader.loadSutta();">Load</button>
<span style="padding: 3px">
<label for="mdotabove"><input type="radio" id="mdotabove" name="niggahita-radio" onClick="suttaReader.changeNiggahita();">ṁ</label>
<label for="mdotbelow"><input type="radio" id="mdotbelow" name="niggahita-radio" onClick="suttaReader.changeNiggahita();" checked>ṃ</label>
</span>
<span><label for="showtrans"><input type="checkbox" id="showtrans" onChange="suttaReader.showTrans();" checked>Translation</label></span>
</div>
<div id="textdisplay"></div>
<script src="/assets/js/suttareader.js"></script>
<script>
	suttaReader.bilara_url = "{{ site.bilara_url }}";
	const urlSutta = suttaReader.getUrlParams();
	if ("sutta" in urlSutta)
		suttaReader.setToSutta(urlSutta.sutta);
	else
		suttaReader.changeNikaya();
</script>
