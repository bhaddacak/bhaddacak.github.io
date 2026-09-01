---
title: "Meanings of Pāli Roots"
permalink: /rootmeaning
is_application: true
date: 2023-10-12 12:00:00 +0700
---

This simple tool is added to ease learners in finding English meanings of Pāli roots. The data come from [*Pāli Roots in Saddanīti*](https://archive.org/details/ThePaliRootsInSaddaniti){:target="\_blank"} by the Venerable U Silananda. This portion is presented in the latter part of the book. Unnecessary information is stripped off here. To see the full information, please consult to book. Although we have data from only one source, they cover most of the root meanings. Some definitions from other sources may be slightly different but recognizable, e.g., *gatyaṃ* (= gatiyaṃ); *hiṃse* or *hiṃsane* (= hiṃsāyaṃ). For other exotic meanings, particularly in very long compounds, the learners have to break them apart and try to find atomic meanings here.

{% include pali_input.html search_button="Filter" search_func="rootMeaning.filter();" after_clear="rootMeaning.filter();" placeholder="Filter ..." %}
<div>
<span class="label" id="itemcount" style="display:none;"></span>
</div>
<div id="listresult" style="padding-top:5px"></div>
<script src="/assets/js/rootmeaning.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
rootMeaning.util = bcUtil;
rootMeaning.paliInput = paliInput;
rootMeaning.loadMeaningList();
</script>


