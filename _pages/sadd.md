---
title: "Saddanīti's Suttas"
permalink: /sadd
is_application: true
date: 2023-08-26 12:00:00 +0700
---

This is a convenient version of Saddanīti Suttamālā. It displays one sutta at a time, and can be accessed by URL. For example, [{{ site.url }}/sadd?1](/sadd?1) leads to the sutta no. 1. This can be used as an easy reference point.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(saddSingle);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="suttaselector" title="Sutta number to go" onChange="saddSingle.goSutta();"></select>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/saddsingle.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
saddSingle.util = bcUtil;
saddSingle.loadText();
</script>

