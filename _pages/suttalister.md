---
title: "Sutta Lister"
permalink: /suttalister
is_application: true
date: 2023-08-13 12:00:00 +0700
---

To ease the looking up, all suttas that can be viewed with [Sutta Reader](/suttareader) are listed here. The data from [SuttaCentral](https://suttacentral.net) are prepared offline, so they can be not up-to-date.

{% include pali_input.html search_button="Filter" search_func="suttaLister.filter();" after_clear="suttaLister.filter();" placeholder="Filter ..." %}
<div>
<span><label for="cbvin"><input type="checkbox" id="cbvin" onChange="suttaLister.filter();" checked>Vin</label> <label for="cbdn"><input type="checkbox" id="cbdn" onChange="suttaLister.filter();" checked>DN</label> <label for="cbmn"><input type="checkbox" id="cbmn" onChange="suttaLister.filter();" checked>MN</label> <label for="cbsn"><input type="checkbox" id="cbsn" onChange="suttaLister.filter();" checked>SN</label> <label for="cban"><input type="checkbox" id="cban" onChange="suttaLister.filter();" checked>AN</label> <label for="cbkn"><input type="checkbox" id="cbkn" onChange="suttaLister.filter();" checked>KN</label> <button onClick="suttaLister.groupSelect(true);">All</button> <button onClick="suttaLister.groupSelect(false);">None</button></span><span class="label" id="wordcount" style="display:none;"></span>
</div>
<div id="listresult" style="padding-top:5px"></div>
<script src="/assets/js/suttalister.js"></script>
<script>
suttaLister.util = bcUtil;
suttaLister.paliInput = paliInput;
suttaLister.loadSuttaList();
</script>
