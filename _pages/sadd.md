---
title: "Saddanīti's Suttas"
permalink: /sadd
is_application: true
date: 2023-08-19 12:00:00 +0700
---

This is a convenient version of Saddanīti Suttamālā. It displays one sutta at a time, and can be access by URL. For example, [{{ site.url }}/sadd/1](/sadd/1) leads to the sutta no.&nbsp;1. This can be used as an easy reference point.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(saddReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="suttaselector" title="Sutta number to go" onChange="saddReader.goSutta();"></select>
</span>
</div>
<div id="textdisplay" class="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/saddreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
saddReader.util = bcUtil;
saddReader.loadText();
</script>

