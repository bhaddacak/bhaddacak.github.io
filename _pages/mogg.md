---
title: "Moggallāna's Suttas"
permalink: /mogg
is_application: true
date: 2023-09-02 12:00:00 +0700
---

This is the single-sutta version of Moggallāna. It can be accessed by URL. For example, [{{ site.url }}/mogg?1.1](/mogg?1.1){:target="\_blank"} leads to the sutta no. 1.1. For the full version, please visit [Moggallāna-Payogasiddhi](/moggpayo){:target="\_blank"}.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(moggpayoSingle);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="suttaselector" title="Sutta number to go" onChange="moggpayoSingle.goSutta();"></select>
<label for="pancika" title="Include Moggallānapañcikā"><input type="checkbox" id="pancika" onClick="moggpayoSingle.includePancika();">Pañcikā</label>
<label for="xref" title="Show Xref"><input type="checkbox" id="xref" onClick="moggpayoSingle.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#link"></use></svg></label>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/nirumoggutil.js"></script>
<script src="/assets/js/moggpayosingle.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
moggpayoSingle.util = bcUtil;
moggpayoSingle.nirumoggUtil = nirumoggUtil;
moggpayoSingle.nirumoggUtil.computeMoggNiru();
moggpayoSingle.loadText();
</script>

