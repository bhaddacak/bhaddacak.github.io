---
title: "Thai Translation of Dhammapadaṭṭhakathā"
permalink: /dhpathai
is_application: true
date: 2023-08-05 12:00:00 +0700
---

<div style="padding-bottom:10px;">
<select id="vatthuselector" onChange="dhpaThai.goVatthu();"></select>
</div>
<div id="textdisplay">Loading... (please wait)</div>
<script src="/assets/js/dhpathai.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
dhpaThai.loadText();
window.dhpaThai = dhpaThai;
</script>

