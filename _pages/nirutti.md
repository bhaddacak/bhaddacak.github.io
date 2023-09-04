---
title: "Niruttidīpanī"
permalink: /nirutti
is_application: true
date: 2023-09-03 12:00:00 +0700
---

The text is taken from [CSCD](https://tipitaka.org/romn). Each sutta has references to other works, if any. But only the first number of Kaccāyana (ka.), Rūpasiddhi (rū.), and Saddanīti Suttamālā (nī.) can link to the target suttas, as well as to the Moggallāna (mo.) itself. The references, except for Moggallāna which I made them myself, are not well-checked. If any disagreement found upon the cross-references, please kindly inform me.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(niruttiReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="chapterselector" onChange="niruttiReader.goChapter();"></select>
<select id="suttaselector" title="Sutta number to go" onChange="niruttiReader.goSutta();"></select>
<label for="onlyformulas" title="Show only sutta heads"><input type="checkbox" id="onlyformulas" onClick="niruttiReader.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#heading"></use></svg></label>
</span>
</div>
<div id="textdisplay" style="text-align:left;padding-top:5px;">Loading... (please wait)</div>
<script src="/assets/js/nirumoggutil.js"></script>
<script src="/assets/js/niruttireader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
niruttiReader.util = bcUtil;
niruttiReader.nirumoggUtil = nirumoggUtil;
niruttiReader.loadText();
</script>



