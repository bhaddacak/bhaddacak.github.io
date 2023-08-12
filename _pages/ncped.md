---
title: "New Concise Pali-English Dictionary"
permalink: /ncped
is_application: true
date: 2023-08-08 12:00:00 +0700
---

This *New Concise Pali-English Dictionary* is compiled by [SuttaCentral](https://suttacentral.net) from Buddhadatta's *Concise Pali-English Dictionary*, updated and corrected from Margaret Cone's *Dictionary of Pali*, then slightly modified by J.R. Bhaddacak (i.e. converting ṁ to ṃ, partitioning, and some editing). Only an asterisk (\*) at the start can be used as a wildcard.

{% include pali_input.html search_button="Search" search_func="ncpedHost.search();" aug_button="PTSPED" aug_func="ncpedHost.openPtsped();" after_clear="ncpedHost.clearResult();" placeholder="Search for ..." %}
{% include dict_components.html def_search=true %}
<script src="/assets/js/ncpedhost.js"></script>
<script src="/assets/js/ncped.js"></script>
<script>
ncped.url = "/assets/ncped";
ncped.util = bcUtil;
ncpedHost.dict = ncped;
ncpedHost.paliInput = paliInput;
const urlQuery = ncpedHost.getUrlParams();
if ("query" in urlQuery) {
	ncpedHost.paliInput.setText(urlQuery.query);
	ncpedHost.search();
}
</script>

