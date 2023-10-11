---
title: "Pāli Root Finder"
permalink: /paliroot
is_application: true
date: 2023-10-10 12:00:00 +0700
---

<div style="padding-bottom:5px;">
<button onClick="palirootFinder.toggleNotes();">Notes</button> To see the instructional notes, click the button.
<div id="notebox" style="display:none;">
<blockquote>
<p>
All Pāli roots known to us are collected here from various sources, including <em>Pāli Dhātupāṭha</em> (pāṭ), <em>Dhātumañjūsā</em> (mañ), <a href="/sadddha" target = "_blank"><em>Saddanīti Dhātumālā</em></a> (māl), and <a href="/dhatva" target = "_blank"><em>Dhātvatthasaṅgaha</em></a> (saṅ). Hence, this is the most exhaustive collection of Pāli roots.
</p>
<p>
The data of Pāli Dhātupāṭha and Dhātumañjūsā are taken from the book edited by <a href="https://archive.org/details/palidhatupathadh00andeuoft" target="_blank">Dines Andersen and Helmer Smith</a> (1921). If any doubt occurs, please consult the book directly. There are things to be concerned about the two. First, as for Dhātupāṭha is used by Moggallāna school whereas Dhātumañjūsā is used by Kaccayāna school, the two books use slightly different naming and grouping scheme. The former has 9 groups, the latter 7 (according to Andersen and Smith's book). However, schools following Kaccāyana scheme widely use 8-group classification, including Saddanīti and Dhātvatthasaṅgaha.
</p>
<p>
To prevent confusion, I therefore treat the issue this way. I use lowercase Roman numbers for the 9-group scheme, i.e., <em>i-ix</em>, and uppercase for the 8-group, i.e., <em>I-VIII</em>. To make the system consistent, so I put Dhātumañjūsā in the 8-group by changing group VI and VII described by Andersen and Smith to group <em>VII tanu</em> and <em>VIII cura</em> respectively. This means Dhātumañjūsā does not has group <em>VI gaha</em>. The word <em>gaha</em> itself belongs to group <em>V kī</em> in this book.
</p>
<p>
Second, concerning the numbers, Dhātupāṭha gives the total number of roots as 639, but some roots have a variation, which repeats the count. So, we see 643 totally in the finder (some numbers are repeated, i.e., 547, 554, 563, and 609). I also use the number of roots for Dhātumañjūsā, not stanzas' number. Unfortunately, Andersen and Smith miscounted (in stanza 90) <em>kuṭa cchede ca koṭille; agā sajjhāyanādisu</em>. These two roots were counted as one, number 526. It is not the case that either root is already listed elsewhere because many roots are indeed duplicate. To correct this, I have to renumber the roots of Dhātumañjūsā from 527 onward. This gives us 885 roots totally (not 884). To those who want to check the roots against the published book, so keep in mind that for the number 527 and the greater you have to subtract the number by 1 before looking at the book.
</p>
<p>
Third, I spent several days checking root names and definitions in Dhātumañjūsā against Thai edition (Wat Chakdaeng, 2013). So, we can see a number of variants in this book (if the user selects the option). The variants are marked by <em>sy</em> (Syāma). It is worth paying attention to the Thai variants because they underwent some validation and meaning checking (but several roots are still unknown to Thai experts).
</p>
<p>
Finally, unlike Dhātupāṭha that most definitions are kept intact (except double-character fixes), I edit definitions in Dhātumañjūsā by removing unrelated words (e.g., <em>ca</em> and other fillers) to make them less distracting. By the constraints of prosodic meter, reading directly from the source may cause new learners a hard time. So, here all roots and definitions are made clear by their form. Still, some cryptic and circular definitions can be found.
</p>
<p>
Saddanīti Dhātumālā also has variants. They are marked by <em>sy</em> (Thai, Bhūmibalo edition, 2016), and <em>sm</em> (the <a href="https://archive.org/details/SaddanitiAggavamsasPaliGrammar02" target="_blank">Smith's edition</a>). It is worth noting that several roots in Dhātumālā, 1687 distinctively counted by Smith, are duplicate here, and the numbers given are definition numbers not the counting.
</p>
<p>
The recent Dhātvatthasaṅgaha was composed by the Thera of Visuddhārāma in Mandalay. This book can fulfill what are missing in the old texts. Several days are spent to make the data programmable. And several corrections are made against Thai edition of <em>Dhātvatthasaṅgahapāṭhanissaya</em> (MCU Press, 1992), in which some noteworthy variants are found (marked by <em>sy</em>). The reference numbers used in this book are stanzas' number, which can link to the text directly. I do not have enough time to recheck the whole thing. If anyone finds unusual instances, please kindly inform me.
</p>
<p>
The program here is quite powerful. It can give you perspectives unaware to ancient scholars. Features in the finder are self-explained, so no detailed guidance is needed. The user just has to play around and experiment. However, you should know that filtering operates before grouping by Unique function. If you want to search in the Unique result, it is better to use search facility in the browser.
</p>
</blockquote>
</div>
</div>
{% include pali_input.html search_button="Filter" search_func="palirootFinder.filter();" after_clear="palirootFinder.filter();" placeholder="Filter ..." %}
<div>
<span>
<label for="cbdp" title="Pāli Dhātupāṭha"><input type="checkbox" id="cbdp" onChange="palirootFinder.filter();" checked>Pāṭha</label>
<label for="cbdm" title="Kaccāyana-Dhātumañjūsā"><input type="checkbox" id="cbdm" onChange="palirootFinder.filter();" checked>Mañjūsā</label>
<label for="cbsd" title="Saddanīti Dhātumālā"><input type="checkbox" id="cbsd" onChange="palirootFinder.filter();" checked>Mālā</label>
<label for="cbds" title="Dhātvatthasaṅgaha"><input type="checkbox" id="cbds" onChange="palirootFinder.filter();" checked>Saṅgaha</label>
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
<button id="uniquebutton" onClick="palirootFinder.toggleUniqueOptions();" title="Unique options" disabled><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#tasks"></use></svg></button>
<label for="variant"><input type="checkbox" id="variant" onChange="palirootFinder.filter();">Variants</label>
<span class="label" id="itemcount" style="display:none;"></span>
</div>
<div id="uniqueoptions" style="padding-top:5px;display:none;">
<label for="uopt-o"><input type="checkbox" id="uopt-o" onChange="palirootFinder.filter();" checked>Treat o ending as -a</label><br>
<label for="uopt-u"><input type="checkbox" id="uopt-u" onChange="palirootFinder.filter();">Treat u ending as -a</label><br>
<label for="uopt-aa"><input type="checkbox" id="uopt-aa" onChange="palirootFinder.filter();">Treat ā ending as -a</label><br>
<label for="uopt-ii"><input type="checkbox" id="uopt-ii" onChange="palirootFinder.filter();">Treat ī ending as -i</label><br>
<label for="uopt-x"><input type="checkbox" id="uopt-x" onChange="palirootFinder.filter();">Ignore the ending for length &gt; 2 (overriding all above)</label><br>
<label for="uopt-xx"><input type="checkbox" id="uopt-xx" onChange="palirootFinder.filter();">Ignore the ending (overriding all above)</label><br>
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


