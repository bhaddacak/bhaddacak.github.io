---
title: "Chaṭṭha Saṅgāyana Tipiṭaka Restructured"
permalink: /cst
is_application: true
date: 2023-11-26 12:00:00 +0700
---

<div id="toolbar" class="fixed" style="display:none;padding-top:3px;padding-bottom:10px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(cstReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="headselector" style="width:15em;" onChange="cstReader.goHead();"></select>
<select id="subheadselector" style="width:15em;display:none;" onChange="cstReader.goSubhead();"></select>
<select id="paranumselector" style="display:none;" onChange="cstReader.goParaNum();"></select>
<label for="withnotes" title="Show redactional notes"><input type="checkbox" id="withnotes" onClick="cstReader.updateDisplay();" checked><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#sticky-note"></use></svg></label>
<span id="exegbar" style="display:none;">
<label for="syncexeg" title="Synchronize with exegesis"><input type="checkbox" id="syncexeg" onClick="cstReader.syncExegesis();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#sync"></use></svg></label>
</span>
</span>
<span class="label" id="suttainfo" style="display:none;"></span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/cstreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
window.cstReader = cstReader;
cstReader.cst_url = "{{ site.cst_url }}";
cstReader.util = bcUtil;
cstReader.loadCstInfo();
cstReader.loadSuttaInfo();
</script>
