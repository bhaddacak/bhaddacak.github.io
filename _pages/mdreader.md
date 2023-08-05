---
title: "Maṅgalatthadīpanī Reader"
permalink: /mdreader
is_application: true
date: 2023-08-03 12:00:00 +0700
---

<div style="padding-bottom:10px;">
<select id="paranumselector" onChange="mdReader.goParaNum();"></select>
<button onClick="mdReader.openTransThai();">Thai Tr.</button>
<button id="volumebutton" onClick="mdReader.goVolume();">Vol.</button>
</div>
<div id="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/mdreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
mdReader.loadText();
</script>
