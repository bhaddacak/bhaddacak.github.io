---
title: "Kaccāyanabyākaraṇaṃ Padarūpasiddhi ca"
permalink: /kaccrupa
is_application: true
date: 2023-09-02 12:00:00 +0700
---

All the text is converted from Thai script available at [Palipage(https://sites.google.com/view/palipage). I have fixed some errors found in Kaccāyana. So, if any doubt occurs, please check the text with the version in the Chaṭṭha Saṅgāyana collection.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(kaccrupaReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="bookselector" onChange="kaccrupaReader.changeBook();">
<option value="kacc">Kaccāyana</option>
<option value="rupa">Rūpasiddhi</option>
</select>
<select id="chapterselector" style="width:18em;" onChange="kaccrupaReader.goChapter();"></select>
<select id="suttaselector" title="Sutta number to go" onChange="kaccrupaReader.goSutta();"></select>
<label for="xref" title="Show Xref"><input type="checkbox" id="xref" onClick="kaccrupaReader.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#link"></use></svg></label>
<label for="onlyformulas" title="Show only sutta heads"><input type="checkbox" id="onlyformulas" onClick="kaccrupaReader.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#heading"></use></svg></label>
</span>
</div>
<div id="textdisplay" style="text-align:left;padding-top:5px;">Loading... (please wait)</div>
<script src="/assets/js/kaccrupareader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
kaccrupaReader.util = bcUtil;
kaccrupaReader.loadText();
</script>

