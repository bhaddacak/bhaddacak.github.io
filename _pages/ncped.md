---
title: "New Concise Pali-English Dictionary"
permalink: /ncped
is_application: true
date: 2023-07-01 12:00:00 +0700
---

This *New Concise Pali-English Dictionary* is compiled by [SuttaCentral](https://suttacentral.net) from Buddhadatta's *Concise Pali-English Dictionary*, updated and corrected from Margaret Cone's *Dictionary of Pali*, then slightly modified by J.R. Bhaddacak (i.e. converting ṁ to ṃ, partitioning, and some editing). Only an asterisk (\*) at the start can be used as a wildcard.

{% include pali_input.html button="Search" function="dictHost.search();" after_clear="dictHost.clearResult();" placeholder="Search for ..." %}
{% include dict_components.html %}
<script>
let ncped_url = "/assets/ncped";
let blockquote_class = "";
</script>
<script src="/assets/js/ncpedhost.js"></script>
<script src="/assets/js/ncped.js"></script>
<script>
const dictHost = ncpedHost;
dictHost.dict = ncped;
</script>

