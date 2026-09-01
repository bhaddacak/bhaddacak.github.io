---
title: Thai-English-Pāli Dictionary
permalink: /tepdict
is_application: true
date: 2023-10-16 12:00:00 +0700
---
<div>
<button onClick="tepDict.toggleNotes();">Instruction</button>
<div id="notebox" style="display:none;">
<blockquote>
<p>
This is an amalgamation of three dictionaries. The first one is the well-known <em>Concise English-Pāli Dictionary</em> (CEPD) by Ven. A.P. Buddhadatta. This may be redundant to the <em>Concise Pāli-English Dictionary</em> (CPED). But I often find what I am looking for in this dictionary.
</p>
<p>
The second is Thai-Pāli Dictionary (TPD) written by Phramahābodhivaṅsācāraya (Thongdee Suratejo), published in 2016. The same data in Thai can be found at <a href="http://palidict.com" target="\_blank">PALIdict</a>. Except Thai terms, I convert all Pāli to Roman script. For those who know Thai, this dictionary can help a lot, because of its multitude of words and originality. To ease non-Thai learners, I also add <a href="https://lexitron.nectec.or.th" target="\_blank">Thai-English Lexitron Dictionary</a>, the third one. This inclusion has some limitations because many Thai words in TPD do not have English equivalents. And this dictionary does not stand alone. It depends on TPD. (For other Thai-English dictionaries, see <a href="https://www.lexilogos.com/english/thai_dictionary.htm" target="\_blank">Lexilogos</a>.)
</p>
<p>
<strong>CAVEAT:</strong> Concerning Thai-English dictionary used here, as for the matching is done by computation alone, irrelevancies can be found. For example, the program cannot differentiate Thai homonyms. If this occurs, all possible English meanings are put together so that the users have to select the right meaning by themselves. Only some meanings given are relevant to the Pāli definition. (To see what it looks like, try searching "frog" with all dictionaries selected.) At worst, English meanings can be out of place altogether. That is because the two compilers may have different pictures in mind, so they interpret the terms differently. This can be the case in idiomatic or figurative Thai words or phrases.
</p>
Here are grammatical abbreviations used in Thai-Pāli Dictionary:
<ul>
<li>adj (adjective, <em>guṇanāma</em>)</li>
<li>adv (adverb, <em>kiriyāvisesana</em>)</li>
<li>f (feminine)</li>
<li>idm (idiom)</li>
<li>ind (indeclinable)</li>
<li>int (interjection)</li>
<li>kit (<em>kita</em>, primary derivative)</li>
<li>m (masculine)</li>
<li>n (noun)</li>
<li>nt (neuter)</li>
<li>pfx (prefix, <em>upasagga</em>)</li>
<li>prn (pronoun, <em>sabbanāma</em>)</li>
<li>v (verb, <em>ākhyāta</em>)</li>
<li>vi (<em>vibhatta</em>, inflected term)</li>
<li>ā (<em>ālapana</em>, addressing word)</li>
</ul>
<p>
Be careful with the gender markers. In CEPD they precede terms, but in TPD they come after. I parsimoniously use comma in TPD, so you can see a list of word without delimiters. It is only in necessary cases when comma is used. The list of Thai terms here are not sorted strictly in dictionary order. They sorted nonetheless by simple digital order, which is reasonably good enough. That is to say, Thai words starting with a vowel will appear after all consonant-starting terms.
</p>
<p>
Searching can be done by entering either Pāli or English or Thai as a query (>= 2 characters long). If anyone find glitches in the data, please inform me to make the application more useful. These dictionaries are really helpful, particularly when you learn to say or write things in Pāli.
</p>
</blockquote>
</div>
</div>
{% include pali_input.html search_button="Search" search_func="tepDict.filter();" after_clear="tepDict.filter();" placeholder="Search for ..." %}
<div>
<label for="cepd" title="Concise English-Pali Dictionary"><input type="checkbox" id="cepd" onChange="tepDict.filter();" checked>E-P dict</label>
<label for="tpd" title="Thai-Pāli Dictionary"><input type="checkbox" id="tpd" onChange="tepDict.includeTpd();">T-P dict</label>
<label for="lexte" title="Thai-English Lexitron Dictionary"><input type="checkbox" id="lexte" onChange="tepDict.includeLexte();">T-E dict</label>
<span class="label" id="itemcount" style="display:none;"></span>
<span class="label label-yellow" id="tpdload" style="display:none;">T-P dict loading</span>
<span class="label label-yellow" id="lexteload" style="display:none;">T-E dict loading</span>
</div>
<div id="listresult" style="padding-top:5px">Loading... (please wait)</div>
<script src="/assets/js/tepdict.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
tepDict.util = bcUtil;
tepDict.paliInput = paliInput;
tepDict.loadCepd();
</script>



