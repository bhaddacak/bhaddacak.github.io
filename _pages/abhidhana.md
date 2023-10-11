---
title: "Abhidhānappadīpikā"
permalink: /abhidhana
is_application: true
date: 2023-09-12 12:00:00 +0700
---

The main text is converted from Thai script available at [Palipage](https://sites.google.com/view/palipage){:target="\_blank"}. It is better than that in the CSCD. The ṭīkā is taken from [CSCD](https://tipitaka.org/romn){:target="\_blank"}. There are totally 1,203 stanzas. But in the ṭīkā, 7 of them are missing (or, perhaps, intendedly left out), i.e., no. 829, 847, 964, 1028, 1029, 1033, and, 1135.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(abhidhanaReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="chapterselector" onChange="abhidhanaReader.goChapter();">
<optgroup label="1. Saggakaṇḍa">
<option value="1.1">1.1. buddhādivagga</option>
<option value="1.2">1.2. saggādivagga</option>
<option value="1.3">1.3. disādivagga</option>
<option value="1.4">1.4. kusalādivagga</option>
<option value="1.5">1.5. cittādivagga</option>
</optgroup>
<optgroup label="2. Bhūkaṇḍa">
<option value="2.1">2.1. bhūmivagga </option>
<option value="2.2">2.2. puravagga</option>
<option value="2.3">2.3. naravagga</option>
<option value="2.4">2.4. catubbaṇṇavagga</option>
<option value="2.5">2.5. araññavagga </option>
<option value="2.6">2.6. araññādivagga </option>
<option value="2.7">2.7. pātālavagga </option>
</optgroup>
<optgroup label="3. Sāmaññakaṇḍa">
<option value="3.1">3.1. visesyādhīnavagga </option>
<option value="3.2">3.2. saṃkiṇṇavagga </option>
<option value="3.3">3.3. anekatthavagga </option>
<option value="3.4">3.4. abyayavagga</option>
</optgroup>
</select>
<select id="suttaselector" title="Stanza number to go" onChange="abhidhanaReader.goSutta();"></select>
<label for="xref" title="Show Xref"><input type="checkbox" id="xref" onClick="abhidhanaReader.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#link"></use></svg></label>
</span>
</div>
<div id="textdisplay" style="text-align:left;padding-top:5px;">Loading... (please wait)</div>
<script src="/assets/js/abhidhanareader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
abhidhanaReader.util = bcUtil;
abhidhanaReader.loadText();
</script>


