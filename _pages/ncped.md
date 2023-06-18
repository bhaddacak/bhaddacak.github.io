---
title: "New Concise Pali-English Dictionary"
permalink: /ncped
is_application: true
date: 2023-06-16 12:00:00 +0700
---

This *New Concise Pali-English Dictionary* is compiled by [SuttaCentral](https://suttacentral.net) from Buddhadatta's *Concise Pali-English Dictionary*, updated and corrected from Margaret Cone's *Dictionary of Pali*, then slightly modified by J.R. Bhaddacak (i.e. converting ṁ to ṃ, partitioning, and some editing).

<div>
<span style="font-size:0.8em;">
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ā');">ā</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ī');">ī</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ū');">ū</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ṅ');">ṅ</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ñ');">ñ</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ṭ');">ṭ</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ḍ');">ḍ</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ṇ');">ṇ</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ḷ');">ḷ</button>
<button style="padding-left:0.5em;padding-right:0.5em;" onClick="insertChar('ṃ');">ṃ</button>
</span>
</div>
<div style="padding: 3px">
<input type="text" id="textinput" placeholder="Search for ..." size="30">&nbsp;<span><button onClick="wordClear();">Clear</button>&nbsp;<button onClick="search();">Search</button></span>
</div>
<div>
<span><input type="checkbox" id="showdetails" onChange="search();">&nbsp;<label for="showdetails">Show details</label>&nbsp;&nbsp;<input type="checkbox" id="findindef" onChange="search();">&nbsp;<label for="findindef">Search in definitions</label></span>
<span class="label" id="wordcount" style="display:none;"></span>
<span class="label label-yellow" id="searching" style="display:none;">Searching ...</span>
</div>
<p id="dictresult"></p>
<script>
let ncped_url = "/assets/ncped";
let blockquote_class = "";
</script>
<script src="/assets/js/ncped.js"></script>
