---
title: "PTS Pali-English Dictionary"
permalink: /ptsped
is_application: true
date: 2023-08-08 12:00:00 +0700
---

This program is based on *The Pali Text Society's Pali-English Dictionary* revised in accordance with the 2015 "Reprint with corrections" by K.R. Norman, William Pruitt and Peter Jackson. The digital version is released by [Buddhadust](http://buddhadust.net/) (proofread 2021). We are grateful to the great effort that makes this happen. For more information, see [PTSPED](https://vpnry.github.io/ptsped/) and Buddhadust.

{% include pali_input.html search_button="Search" search_func="ptspedHost.search();" aug_button="NCPED" aug_func="ptspedHost.openNcped();" after_clear="ptspedHost.clearResult();" placeholder="Search for ..." %}
{% include dict_components.html def_search=false %}
<script src="/assets/js/ptspedhost.js"></script>
<script src="/assets/js/ptsped.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
ptsped.url = "/assets/ptsped";
ptsped.util = bcUtil;
ptspedHost.dict = ptsped;
ptspedHost.paliInput = paliInput;
const urlQuery = ptspedHost.getUrlParams();
if ("query" in urlQuery) {
	ptspedHost.paliInput.setText(urlQuery.query);
	ptspedHost.search();
}
</script>


