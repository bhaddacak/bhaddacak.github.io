---
title: "Moggallānabyākaraṇaṃ Payogasiddhi ca"
permalink: /moggpayo
is_application: true
date: 2023-09-02 12:00:00 +0700
---

The source of all the text comes from [CSCD](https://tipitaka.org/romn). The sutta numbers in Moggallāna are made easier to navigate. And since the sutta numbers in Payogasiddhi are really confusing and wrong in several places, I have added new running numbers and corrected the references to Moggallāna. This can relieve the headache from finding the corresponding suttas. Moggallānapañcikā can be included by the reader's selection. The numbers of the Pañcikā's suttas correspond to the main text, but the heads are truncated. Links to Niruttidīpanī are also shown in cross references. As the 7th chapter of Moggallāna was not formerly part of the text, so there are no commentaries for this.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(moggpayoReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="bookselector" onChange="moggpayoReader.changeBook();">
<option value="mogg">Moggallāna</option>
<option value="payo">Payogasiddhi</option>
<option value="panc" disabled>Moggallānapañcikā</option>
</select>
<select id="chapterselector" onChange="moggpayoReader.goChapter();"></select>
<select id="suttaselector" title="Sutta number to go" onChange="moggpayoReader.goSutta();"></select>
<label for="pancika" title="Include Moggallānapañcikā"><input type="checkbox" id="pancika" onClick="moggpayoReader.includePancika();">Pañcikā</label>
<label for="xref" title="Show Xref"><input type="checkbox" id="xref" onClick="moggpayoReader.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#link"></use></svg></label>
<label for="onlyformulas" title="Show only sutta heads"><input type="checkbox" id="onlyformulas" onClick="moggpayoReader.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#heading"></use></svg></label>
</span>
</div>
<div id="textdisplay" style="text-align:left;padding-top:5px;">Loading... (please wait)</div>
<script src="/assets/js/nirumoggutil.js"></script>
<script src="/assets/js/moggpayoreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
moggpayoReader.util = bcUtil;
moggpayoReader.nirumoggUtil = nirumoggUtil;
moggpayoReader.nirumoggUtil.computeMoggNiru();
moggpayoReader.loadText();
</script>


