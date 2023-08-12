---
title: "Thai Translation of Dhammapadaṭṭhakathā"
permalink: /dhpathai
is_application: true
date: 2023-08-09 12:00:00 +0700
---

The translation also has the output from *Google Translate*. It is quite helpful with limitations. When Google meets difficult Pāli explanations, it can go crazy. In many parts, however, the translation is amazingly comprehensible. Yet, some sentences can be downright wrong and out of context. So, be careful and do not rely much on this, always look at the Pāli yourselves.

<div id="toolbar" class="fixed" style="padding-bottom:10px;padding-top:3px;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(dhpaThai);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="vatthuselector" onChange="dhpaThai.goVatthu();"></select>
<button title="Google translation"><label for="googletrans"><input type="checkbox" id="googletrans" onClick="dhpaThai.updateDisplay();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#google"></use></svg></label></button>
<button title="Interwoven"><label for="interwoven"><input type="checkbox" id="interwoven" onClick="dhpaThai.interweaveText();"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#random"></use></svg></label></button>
</span>
</div>
<div id="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/dhpathai.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
dhpaThai.util = bcUtil;
dhpaThai.loadText();
</script>

