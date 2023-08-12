---
title: "Thai Translation of Maṅgalatthadīpanī"
permalink: /mdthai
is_application: true
date: 2023-08-10 12:00:00 +0700
---

Unlike the commentary to Dhammapada, the Google translation of Maṅgalatthadīpanī is really a mess, because the text has many inline Pāli explanations. So, this can only benefit to those who know Thai. The Thai translation has 5 volumes, which the first two are of the first Pāli book.

<div id="toolbar" class="fixed" style="padding-bottom:10px;padding-top:3px;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(mdThai);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="paranumselector" title="Paragraph number to go" onChange="mdThai.goParaNum();"></select>
</span>
</div>
<div id="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/mdthai.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
window.mdThai = mdThai;
mdThai.util = bcUtil;
mdThai.loadText();
</script>


