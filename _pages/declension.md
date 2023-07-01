---
title: "Declension Table Calculator"
permalink: /declension
is_application: true
date: 2023-06-30 12:00:00 +0700
---

{% include pali_input.html button="Compute" function="declHost.compute()" after_clear="declHost.fillTable(1)" placeholder="Enter a raw word" %}
<div>
<span style="padding: 3px">
<label for="gendm"><input type="radio" id="gendm" name="gender-radio" value="m" onChange="declHost.compute();" checked>m.</label>
<label for="gendf"><input type="radio" id="gendf" name="gender-radio" value="f" onChange="declHost.compute();">f.</label>
<label for="gendn"><input type="radio" id="gendn" name="gender-radio" value="n" onChange="declHost.compute();">nt.</label>
</span>
<span><label for="forcegen"><input type="checkbox" id="forcegen" onChange="declHost.compute();">Force generic</label></span>
<span class="label" id="wordclass" style="display:none;"></span><span class="label label-green" id="computed" style="display:none;">computed</span>
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
> 	- Masculine: *mana* and its group, rāja, brahma, atta, ātuma, satthu, *kattu* and its group, *pitu* and its group, yuva, addhā, muddhā, sā, bhavanta, karonta, arahanta, santa, mahanta 
> 	- Others: *mātu* and its group (f.), kamma (nt.), go (m., f.), gacchanta (m., nt.), himavant (m.), satimant (m.), guṇavant (m., f., nt.)
>
> The computed results can be totally meaningless.

