---
title: "Grammatical Sutta Finder"
permalink: /gramsut
is_application: true
date: 2023-09-04 12:00:00 +0700
---

This application lists all grammatical suttas (only heads) found in Pāli grammar books. The books' name has two forms, truncated and single-letter, i.e., Kacc (k), Rūpa (r), Mogg (m), Payo (p), Niru (n), and Sadd (s). The see-also data, shown in the brackets, are mainly reconstructed from notes in Niruttidīpanī. These are not yet well-checked, so irrelevancy can be found in some places. Only Niruttidīpanī has notes in the heads, mostly about references. Removing these notes can reduce noise in the result.

{% include pali_input.html search_button="Filter" search_func="gramsutFinder.filter();" after_clear="gramsutFinder.filter();" placeholder="Filter ..." %}
<div>
<span>
<label for="cbkacc"><input type="checkbox" id="cbkacc" onChange="gramsutFinder.filter();" checked>Kacc</label>
<label for="cbrupa"><input type="checkbox" id="cbrupa" onChange="gramsutFinder.filter();" checked>Rūpa</label>
<label for="cbmogg"><input type="checkbox" id="cbmogg" onChange="gramsutFinder.filter();" checked>Mogg</label>
<label for="cbpayo"><input type="checkbox" id="cbpayo" onChange="gramsutFinder.filter();" checked>Payo</label>
<label for="cbniru"><input type="checkbox" id="cbniru" onChange="gramsutFinder.filter();" checked>Niru</label>
<label for="cbsadd"><input type="checkbox" id="cbsadd" onChange="gramsutFinder.filter();" checked>Sadd</label>
<button onClick="gramsutFinder.groupSelect(true);">All</button>
<button onClick="gramsutFinder.groupSelect(false);">None</button>
</span>
</div>
<div>
<span>
<label for="seealso"><input type="checkbox" id="seealso" onChange="gramsutFinder.filter();">See also</label>
<label for="withnotes"><input type="checkbox" id="withnotes" onChange="gramsutFinder.filter();">Notes in heads</label>
</span>
<span class="label" id="wordcount" style="display:none;"></span>
</div>
<div id="listresult" style="padding-top:5px"></div>
<script src="/assets/js/xrefutil.js"></script>
<script src="/assets/js/gramsutfinder.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
gramsutFinder.util = bcUtil;
gramsutFinder.xrefUtil = xrefUtil;
gramsutFinder.paliInput = paliInput;
gramsutFinder.loadHeadList();
</script>

