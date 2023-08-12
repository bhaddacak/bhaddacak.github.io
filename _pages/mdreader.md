---
title: "Maṅgalatthadīpanī Reader"
permalink: /mdreader
is_application: true
date: 2023-08-10 12:00:00 +0700
---

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(mdReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="paranumselector" title="Paragraph number to go" onChange="mdReader.goParaNum();"></select>
<button title="Thai translation" onClick="mdReader.openTransThai();">Thai</button>
<button title="Synchronize with Thai"><label for="syncthai"><input type="checkbox" id="syncthai" onClick="mdReader.syncThai();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#sync"></use></svg></label></button>
<button id="volumebutton" onClick="mdReader.goVolume();">Vol.</button>
</span>
</div>
<div id="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/mdreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
mdReader.util = bcUtil;
mdReader.loadText();
</script>
