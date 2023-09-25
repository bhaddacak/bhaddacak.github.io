---
title: "Pāli Root Finder"
permalink: /paliroot
is_application: true
date: 2023-09-25 12:00:00 +0700
---

All Pāli roots known to us are collected here from various sources. By now, only roots from [Saddanīti Dhātumālā](/sadddha) and Pāli Dhātupāṭha are available. Materials from other sources will be added when ready. [Pāli Dhātupāṭha and Dhātumañjūsā](https://archive.org/details/palidhatupathadh00andeuoft) in book form are edited by Dines Andersen and Helmer Smith (1921). If any doubt occurs, please consult the book directly. Abbreviations used here are *pāṭ* (Dhātupāṭha), *mañ* (Dhātumañjūsā), *māl* (Dhātumālā), *saṅ* (Dhātvatthasaṅgaha), *sy* (Thai variant), and *sm* (Smith's variant). Variants are only of Dhātumālā. The recent Dhātvatthasaṅgaha was composed by the Thera of Visuddhārāma in Mandalay. This text is converted from Thai script available at [Palipage](https://sites.google.com/view/palipage). It is worth knowing that Dhātupāṭha is used by Moggallāna school, whereas Dhātumañjūsā is used by Kaccayāna school. The two books use slightly different naming and grouping scheme. So, we see 9 groups for the former, but 8 for the latter (also for Dhātumālā). This can be confusing. So, I use lowercase Roman for the 9-group scheme, i.e., *i--ix*, and uppercase for the 8-group, i.e., *I--VIII*.

{% include pali_input.html search_button="Filter" search_func="palirootFinder.filter();" after_clear="palirootFinder.filter();" placeholder="Filter ..." %}
<div>
<span>
<label for="cbdp" title="Pāli Dhātupāṭha"><input type="checkbox" id="cbdp" onChange="palirootFinder.filter();" checked>Pāṭha</label>
<label for="cbdm" title="Kaccāyana-Dhātumañjūsā"><input type="checkbox" id="cbdm" onChange="palirootFinder.filter();" disabled>Mañjūsā</label>
<label for="cbsd" title="Saddanīti Dhātumālā"><input type="checkbox" id="cbsd" onChange="palirootFinder.filter();" checked>Mālā</label>
<label for="cbds" title="Dhātvatthasaṅgaha"><input type="checkbox" id="cbds" onChange="palirootFinder.filter();" disabled>Saṅgaha</label>
<button onClick="palirootFinder.bookSelect(true);">All</button>
<button onClick="palirootFinder.bookSelect(false);">None</button>
</span>
</div>
<div style="padding-top:5px;">
<button onClick="palirootFinder.toggleGroupSelector();">Group Selection</button>
<select id="sortorder" onClick="palirootFinder.filter();">
<option value="none">Original order</option>
<option value="name">Sorted by name</option>
<option value="def">Sorted by def</option>
</select>
<label for="unique"><input type="checkbox" id="unique" onChange="palirootFinder.unique();">Unique</label>
<label for="variant"><input type="checkbox" id="variant" onChange="palirootFinder.filter();">Variants</label>
<span class="label" id="itemcount" style="display:none;"></span>
</div>
<div id="groupselector" style="font-family:'Arundina Pali Sans Mono';font-size:0.8em;padding-top:5px;display:none;">
<div>
<span>
Dhātupāṭha:&nbsp;
<button onClick="palirootFinder.groupSelect(9, true);">All</button>
<button onClick="palirootFinder.groupSelect(9, false);">None</button>
<label for="g91" title="i bhū"><input type="checkbox" id="g91" onChange="palirootFinder.filter();" checked>i</label>
<label for="g92" title="ii rudha"><input type="checkbox" id="g92" onChange="palirootFinder.filter();" checked>ii</label>
<label for="g93" title="iii diva"><input type="checkbox" id="g93" onChange="palirootFinder.filter();" checked>iii</label>
<label for="g94" title="iv tuda"><input type="checkbox" id="g94" onChange="palirootFinder.filter();" checked>iv</label>
<label for="g95" title="v ji"><input type="checkbox" id="g95" onChange="palirootFinder.filter();" checked>v</label>
<label for="g96" title="vi kī"><input type="checkbox" id="g96" onChange="palirootFinder.filter();" checked>vi</label>
<label for="g97" title="vii su"><input type="checkbox" id="g97" onChange="palirootFinder.filter();" checked>vii</label>
<label for="g98" title="viii tana"><input type="checkbox" id="g98" onChange="palirootFinder.filter();" checked>viii</label>
<label for="g99" title="ix cura"><input type="checkbox" id="g99" onChange="palirootFinder.filter();" checked>ix</label>
</span>
</div>
<div>
<span>
Other books:
<button onClick="palirootFinder.groupSelect(8, true);">All</button>
<button onClick="palirootFinder.groupSelect(8, false);">None</button>
<label for="g81" title="I bhū"><input type="checkbox" id="g81" onChange="palirootFinder.filter();" checked>I</label>
<label for="g82" title="II rudha"><input type="checkbox" id="g82" onChange="palirootFinder.filter();" checked>II</label>
<label for="g83" title="III divu"><input type="checkbox" id="g83" onChange="palirootFinder.filter();" checked>III</label>
<label for="g84" title="IV su"><input type="checkbox" id="g84" onChange="palirootFinder.filter();" checked>IV</label>
<label for="g85" title="V kī"><input type="checkbox" id="g85" onChange="palirootFinder.filter();" checked>V</label>
<label for="g86" title="VI gaha"><input type="checkbox" id="g86" onChange="palirootFinder.filter();" checked>VI</label>
<label for="g87" title="VII tanu"><input type="checkbox" id="g87" onChange="palirootFinder.filter();" checked>VII</label>
<label for="g88" title="VIII cura"><input type="checkbox" id="g88" onChange="palirootFinder.filter();" checked>VIII</label>
</span>
</div>
</div>
<div id="listresult" style="padding-top:5px"></div>
<script src="/assets/js/palirootfinder.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
palirootFinder.util = bcUtil;
palirootFinder.paliInput = paliInput;
palirootFinder.loadRootList();
</script>


