---
title: "Dhammapadaṭṭhakathā Reader"
permalink: /dhpareader
is_application: true
date: 2023-08-18 12:00:00 +0700
---

This commentary to Dhammapada is taken from the traditional Thai monastic Pāli curriculum, used in Level (Parian) 2--3. From the two volumes in the Pāli commentaries, the text is arranged into 8 parts, 26 sections (vaggas), and has totally 302 stories (vatthus). To Pāli learners, this is one of the most entertaining reading materials. The conversion from Thai script has some limitations. For example, the inconsistent use of space and tab in the source makes some verses look 'collapsed' (two feet are blended). An English translation of this can be found in *Buddhist Legends* (1921) by Eugene Watson Burlingame. We have this translation here, as well as Thai translation with its Google version.

<div id="toolbar" class="fixed" style="display:none;padding-top:3px;padding-bottom:10px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(dhpaReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<button onClick="dhpaReader.showTOC(true);">TOC</button>
<select id="partselector" onClick="dhpaReader.selectPart();">
<option value="1">Part I</option>
<option value="2">Part II</option>
<option value="3">Part III</option>
<option value="4">Part IV</option>
<option value="5">Part V</option>
<option value="6">Part VI</option>
<option value="7">Part VII</option>
<option value="8">Part VIII</option>
</select>
<select id="vatthuselector" onChange="dhpaReader.goVatthu();"></select>
<button onClick="dhpaReader.loadText();">Load</button>
<button id="burlbutton" title="Burlingame's translation" onClick="dhpaReader.openTransBurl();">Burl</button>
<button title="Thai translation" onClick="dhpaReader.openTransThai();">Thai</button>
</span>
</div>
<div id="textdisplay" class="textdisplay"></div>
<script src="/assets/js/dhpareader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
dhpaReader.util = bcUtil;
dhpaReader.loadTOC();
</script>
