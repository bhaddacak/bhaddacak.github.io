---
title: "Kaccāyana's Suttas"
permalink: /kacc
is_application: true
date: 2023-09-02 12:00:00 +0700
---

This is the single-sutta version of Kaccāyana. It can be accessed by URL. For example, [{{ site.url }}/kacc?1](/kacc?1) leads to the sutta no. 1. For the full version, please visit [Kaccāyana-Rūpasiddhi](/kaccrupa).

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(kaccrupaSingle);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="suttaselector" title="Sutta number to go" onChange="kaccrupaSingle.goSutta();"></select>
<label for="xref" title="Show Xref"><input type="checkbox" id="xref" onClick="kaccrupaSingle.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#link"></use></svg></label>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/kaccrupasingle.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
kaccrupaSingle.util = bcUtil;
kaccrupaSingle.loadText();
</script>
