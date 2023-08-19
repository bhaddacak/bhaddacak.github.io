---
title: "Saddanītippakaraṇassa Suttamālā"
permalink: /saddsut
is_application: true
date: 2023-08-17 12:00:00 +0700
---

The Roman text of Suttamālā is converted from Thai script available at [*PāliPage*](https://sites.google.com/view/palipage). While cleaning up, I accidentally corrected a few points. Although the text is mostly well-edited, glitches can be found more than that. For a serious citation, therefore, please check against the [Helmer Smith](https://archive.org/details/SaddanitiAggavamsasPaliGrammar03)'s edition first.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(saddsutReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="chapterselector" onChange="saddsutReader.goChapter();">
<option value="1">1. Sandhikappa</option>
<option value="2">2. Nāmakappa</option>
<option value="3">3. Kārakakappa</option>
<option value="4">4. Samāsakappa</option>
<option value="5">5. Taddhitakappa</option>
<option value="6">6. Ākhyātakappa</option>
<option value="7">7. Kitakappa</option>
<option value="8">8. Catupadavibhāga</option>
<option value="9">9. Pāḷinayādisaṅgaha</option>
</select>
<select id="suttaselector" title="Sutta number to go" onChange="saddsutReader.goSutta();"></select>
<label for="onlyformulas"><input type="checkbox" id="onlyformulas" onClick="saddsutReader.updateDisplay();">Only formulas</label>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/saddsutreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
saddsutReader.util = bcUtil;
saddsutReader.loadText();
</script>
