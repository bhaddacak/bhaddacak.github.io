---
title: "Declension Table Calculator"
permalink: /declension
is_application: true
date: 2023-06-15 12:00:00 +0700
---

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
<input type="text" id="wordinput" placeholder="Enter a raw word" size="30">&nbsp;<span><button onClick="wordClear();">Clear</button>&nbsp;<button onClick="compute();">Compute</button></span>
</div>
<div>
<span style="padding: 3px">
<input type="radio" id="gendm" name="gender-radio" value="m" onChange="compute();" checked><label for="gendm">masculine</label>
<input type="radio" id="gendf" name="gender-radio" value="f" onChange="compute();"><label for="gendf">feminine</label>
<input type="radio" id="gendn" name="gender-radio" value="n" onChange="compute();"><label for="gendn">neuter</label>
</span>
<span><input type="checkbox" id="forcegen" onChange="compute();"><label for="forcegen">Force generic</label></span>
<span class="label" id="wordclass" style="display:none;"></span>
<span class="label label-green" id="computed" style="display:none;">computed</span>
</div>
<p>
<table>
	<thead>
		<tr><th colspan="2">Case</th><th>Singular</th><th>Plural</th></tr>
	</thead>
	<tbody>
		<tr><td>1</td><td>nom.</td><td><span id="nom_sg1"></span></td><td><span id="nom_pl1"></span></td></tr>
		<tr><td>2</td><td>acc.</td><td><span id="acc_sg1"></span></td><td><span id="acc_pl1"></span></td></tr>
		<tr><td>3</td><td>ins.</td><td><span id="ins_sg1"></span></td><td><span id="ins_pl1"></span></td></tr>
		<tr><td>4</td><td>dat.</td><td><span id="dat_sg1"></span></td><td><span id="dat_pl1"></span></td></tr>
		<tr><td>5</td><td>abl.</td><td><span id="abl_sg1"></span></td><td><span id="abl_pl1"></span></td></tr>
		<tr><td>6</td><td>gen.</td><td><span id="gen_sg1"></span></td><td><span id="gen_pl1"></span></td></tr>
		<tr><td>7</td><td>loc.</td><td><span id="loc_sg1"></span></td><td><span id="loc_pl1"></span></td></tr>
		<tr><td>ā</td><td>voc.</td><td><span id="voc_sg1"></span></td><td><span id="voc_pl1"></span></td></tr>
	</tbody>
</table>
</p>

<script src="/assets/js/decllib.js"></script>
<script src="/assets/js/declprog.js"></script>

> The declension table can be calculated from the following inputs:
> - a pronoun in raw form e.g. amha tumha ta etc. (including number 1--4)
> - an irregular noun or its related word e.g. mana rāja atta kattu pitu etc.
> - a word ending with -tar, declining as *kattu* or *kattar* (only m.)
> - a word ending with -ant (not -antu), declining as *guṇavant* or *guṇavantu*
> - a word ending with -anta, declining as *gacchanta*
> - otherwise a generic word (ending with a valid vowel)
>
> All recognizable whole-word inputs are:
> - *Pronouns*: amha, tumha, ta, eta, ima, amu, ka, kiṃ, kiṃci, ya, sabba, katara, katama, ubhaya, itara, añña, aññatara, aññatama, pubba, para, apara, dakkhiṇa, uttara, adhara, eka (1), dvi (2), ti (3), catu (4), and ubho
> - *Irregular nouns*:
> 	- Masculine: *mana* and its group, rāja, brahma, atta, ātuma, satthu, *kattu* and its group, *pitu* and its group, yuva, addhā, muddhā, sā, bhavanta, karonta, arahanta, santa 
> 	- Others: *mātu* and its group (f.), kamma (nt.), go (m., f.), gacchanta (m., nt.), himavant (m.), satimant (m.), guṇavant (m., f., nt.)
>
> The computed results can be totally meaningless.

