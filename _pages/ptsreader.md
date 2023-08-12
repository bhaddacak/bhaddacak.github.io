---
title: "PTS Tipitaka Reader"
permalink: /ptsreader
is_application: true
date: 2023-08-08 12:00:00 +0700
---

This collection of the Pali Text Society's Pāli canon is taken from [GRETIL](http://gretil.sub.uni-goettingen.de/gretil.html), with several HTML fixes after careful validations. The text is intact, but its display is slightly changed to ease the reader. This tool can help students find references to the legacy publications. For the full set of the text, please see at GRETIL or better use `Pāli Platform 3` (forthcoming). For the text's information and copyright notice, see *Front Matter*. Once a page is selected to go, the user can navigate to pages by keyboard. Dehyphenation is done by computing, so it can get wrong in some cases.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(ptsReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="texts">
<optgroup label="Vinaya">
<option value="vin1maou.gz">Mahavagga</option>
<option value="vin2cuou.gz">Cullavagga</option>
<option value="vin3s1ou.gz">Suttavibhanga 1</option>
<option value="vin4s2ou.gz">Suttavibhanga 2</option>
<option value="vin5paou.gz">Parivara</option>
</optgroup>
<optgroup label="DN">
<option value="dighn1ou.gz">Digha-Nikaya 1</option>
<option value="dighn2ou.gz">Digha-Nikaya 2</option>
<option value="dighn3ou.gz">Digha-Nikaya 3</option>
</optgroup>
<optgroup label="MN">
<option value="majjn1ou.gz">Majjhima-Nikaya 1: 1-76</option>
<option value="majjn2ou.gz">Majjhima-Nikaya 2: 77-106</option>
<option value="majjn3ou.gz">Majjhima-Nikaya 3: 107-152</option>
</optgroup>
<optgroup label="SN">
<option value="samyu1ou.gz">Samyutta-Nikaya 1</option>
<option value="samyu2ou.gz">Samyutta-Nikaya 2</option>
<option value="samyu3ou.gz">Samyutta-Nikaya 3</option>
<option value="samyu4ou.gz">Samyutta-Nikaya 4</option>
<option value="samyu5ou.gz">Samyutta-Nikaya 5</option>
</optgroup>
<optgroup label="AN">
<option value="angut1ou.gz">Anguttara-Nikaya 1</option>
<option value="angut2ou.gz">Anguttara-Nikaya 2</option>
<option value="angut3ou.gz">Anguttara-Nikaya 3</option>
<option value="angut4ou.gz">Anguttara-Nikaya 4</option>
<option value="angut5ou.gz">Anguttara-Nikaya 5</option>
</optgroup>
<optgroup label="KN">
<option value="khudp_ou.gz">Khuddakapatha</option>
<option value="dhampdou.gz">Dhammapada</option>
<option value="udana_ou.gz">Udana</option>
<option value="itivutou.gz">Itivuttaka</option>
<option value="sutnipou.gz">Suttanipata</option>
<option value="vimvatou.gz">Vimanavatthu</option>
<option value="petvatou.gz">Petavatthu</option>
<option value="theragou.gz">Theragatha</option>
<option value="therigou.gz">Therigatha</option>
<option value="apadanou.gz">Apadana</option>
<option value="budvmsou.gz">Buddhavamsa</option>
<option value="carpitou.gz">Cariyapitaka</option>
<option value="jatak1ou.gz">Jataka I</option>
<option value="jatak2ou.gz">Jataka II-III</option>
<option value="jatak3ou.gz">Jataka IV-IX</option>
<option value="jatak4ou.gz">Jataka X-XV</option>
<option value="jatak5ou.gz">Jataka XVI-XXI</option>
<option value="jatak6ou.gz">Jataka XXII</option>
<option value="nidde1ou.gz">Mahaniddesa</option>
<option value="nidde2ou.gz">Culaniddesa</option>
<option value="patis1ou.gz">Patisambhidamagga 1</option>
<option value="patis2ou.gz">Patisambhidamagga 2</option>
</optgroup>
<optgroup label="Abhidhamma">
<option value="dhamsgou.gz">Dhammasangani</option>
<option value="vibhanou.gz">Vibhanga</option>
<option value="dhatukou.gz">Dhatukatha</option>
<option value="pugpanou.gz">Puggalapannati</option>
<option value="kathavou.gz">Kathavatthu</option>
<option value="yamak1ou.gz">Yamaka I</option>
<option value="yamak2ou.gz">Yamaka II</option>
<option value="patti1ou.gz">Tikapatthana I</option>
<option value="patti2ou.gz">Tikapatthana II</option>
<option value="patti3ou.gz">Tikapatthana III</option>
<option value="patdukou.gz">Dukapatthana</option>
</optgroup>
</select>
<button onClick="ptsReader.loadText();">Load</button>
<select id="pageselector" title="Page to go" onChange="ptsReader.gotoPage();"></select>
<button title="Dehyphenated"><label for="dehyphen"><input type="checkbox" id="dehyphen" onClick="ptsReader.dehyphenate();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#wrench"></use></svg></label></button>
</span>
</div>
<div id="textdisplay"></div>
<script src="/assets/js/ptsreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>ptsReader.util=bcUtil;</script>
