---
title: "Niruttidīpanī's Suttas"
permalink: /niru
is_application: true
date: 2023-09-05 12:00:00 +0700
---

This is the single-sutta version of Niruttidīpanī. It can be accessed by URL. For example, [{{ site.url }}/niru?1](/niru?1) leads to the sutta no. 1. For the full version, please visit [Niruttidīpanī](/nirutti).

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(niruSingle);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="suttaselector" title="Sutta number to go" onChange="niruSingle.goSutta();"></select>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/nirumoggutil.js"></script>
<script src="/assets/js/nirusingle.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
niruSingle.util = bcUtil;
niruSingle.nirumoggUtil = nirumoggUtil;
niruSingle.loadText();
</script>
