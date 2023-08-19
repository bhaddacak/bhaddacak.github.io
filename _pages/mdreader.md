---
title: "Maṅgalatthadīpanī Reader"
permalink: /mdreader
is_application: true
date: 2023-08-16 12:00:00 +0700
---

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(mdReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="paranumselector" title="Paragraph number to go" onChange="mdReader.goParaNum();"></select>
<button title="Thai translation" onClick="mdReader.openTransThai();">Thai</button>
<label for="syncthai" title="Synchronize with Thai"><input type="checkbox" id="syncthai" onClick="mdReader.syncThai();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#sync"></use></svg></label>
<button id="volumebutton" onClick="mdReader.goVolume();">Vol.</button>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/mdreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
mdReader.util = bcUtil;
mdReader.loadText();
</script>
