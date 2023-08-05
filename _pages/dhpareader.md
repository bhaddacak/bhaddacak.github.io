---
title: "Dhammapadaṭṭhakathā Reader"
permalink: /dhpareader
is_application: true
date: 2023-08-05 12:00:00 +0700
---

This commentary to Dhammapada is taken from the traditional Thai monastic Pāli curriculum, used in Level (Parian) 2--3. From the two volumes in the Pāli commentaries, the text is arranged into 8 parts, 26 sections (vaggas), and has totally 302 stories (vatthus). To Pāli learners, this is one of the most entertaining reading materials. The conversion from Thai script has some limitations. For example, the inconsistent use of space and tab in the source makes some verses look 'collapsed' (two feet are blended). An English translation of this can be found in *Buddhist Legends* (1921) by Eugene Watson Burlingame (Vols: [1](https://archive.org/details/buddhistlegends01burluoft), [2](https://archive.org/details/buddhistlegends02burluoft), [3](https://archive.org/details/buddhistlegends03burluoft)). However, We have full Thai translation here. As for now Google translation is quite good, and this will be added later.

<div id="toolbar" style="display:none">
<button onClick="dhpaReader.showTOC();">TOC</button>
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
<button onClick="dhpaReader.openTransThai();">Thai Tr.</button>
<label for="synctrans"><input type="checkbox" id="synctrans">Sync</label>
</div>
<div id="textdisplay"></div>
<script src="/assets/js/dhpareader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
dhpaReader.loadTOC();
</script>
