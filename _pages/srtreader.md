---
title: "Siam Rath Tipitaka Reader"
permalink: /srtreader
is_application: true
date: 2023-08-05 12:00:00 +0700
---

This may be the first appearance of the full set (45 volumes) of Siam Rath Pāli canon in Roman script. The Thai script version can be found at [Learn Tripitaka](http://www.learntripitaka.com/). The source also includes the Pāli commentaries (48 volumes). All these will be available soon in `Pāli Platform 3` (forthcoming). The printed version can be downloaded here: [Vol. 1](http://www.car.chula.ac.th/rarebook/book2/clra58_0001.pdf) ... [Vol. 45](http://www.car.chula.ac.th/rarebook/book2/clra58_0045.pdf). Typically, the Thai Pāli canon is refered by volume, paragraph, and page number, e.g., 9/314/250 (=DN 10.314), but in the older system only volume and page number are used. In this tool, once a page is selected to go, the user can navigate to pages by keyboard. Dehyphenation is done by computing, so it can get wrong in some cases.

<div>
<select id="texts">
<optgroup label="Vinayo">
<option value="01.gz">1. Mahāvibhaṅgo 1</option>
<option value="02.gz">2. Mahāvibhaṅgo 2</option>
<option value="03.gz">3. Bhikkhunīvibhaṅgo</option>
<option value="04.gz">4. Mahāvaggo 1</option>
<option value="05.gz">5. Mahāvaggo 2</option>
<option value="06.gz">6. Cullavaggo 1</option>
<option value="07.gz">7. Cullavaggo 2</option>
<option value="08.gz">8. Parivāro</option>
</optgroup>
<optgroup label="Dīghanikāyo">
<option value="09.gz">9. Sīlakkhandhavaggo</option>
<option value="10.gz">10. Mahāvaggo</option>
<option value="11.gz">11. Pāṭikvaggo</option>
</optgroup>
<optgroup label="Majjhimanikāyo">
<option value="12.gz">12. Mūlapaṇṇāsakaṃ</option>
<option value="13.gz">13. Majjhimapaṇṇāsakaṃ</option>
<option value="14.gz">14. Uparipaṇṇāsakaṃ</option>
</optgroup>
<optgroup label="Saṃyuttanikāyo">
<option value="15.gz">15. Sagāthavaggo</option>
<option value="16.gz">16. Nidānavaggo</option>
<option value="17.gz">17. Khandhavāravaggo</option>
<option value="18.gz">18. Saḷāyatavaggo</option>
<option value="19.gz">19. Mahāvāravaggo</option>
</optgroup>
<optgroup label="Aṅguttaranikāyo">
<option value="20.gz">20. 1: Eka, Duka, Tikanipātā</option>
<option value="21.gz">21. 2: Catukkanipātā</option>
<option value="22.gz">22. 3: Pañcaka, Chakkanipātā</option>
<option value="23.gz">23. 4: Sattaka, Aṭṭhaka, Navakanipātā</option>
<option value="24.gz">24. 5: Dasaka, Ekādasakanipātā</option>
</optgroup>
<optgroup label="Khuddakanikāyo">
<option value="25.gz">25. Khuddakapāṭho, Dhammapadagāthā, Udānaṃ, Itivuttakaṃ, Suttanipātā</option>
<option value="26.gz">26. Vimānavatthu, Petavatthu, Theragāthā, Therīgāthā</option>
<option value="27.gz">27. Jātakaṃ 1: Eka-Cattālīsanipātajātakaṃ</option>
<option value="28.gz">28. Jātakaṃ 2: Paññāsa-Mahānipātajātakaṃ</option>
<option value="29.gz">29. Mahāniddeso</option>
<option value="30.gz">30. Cūḷaniddeso</option>
<option value="31.gz">31. Paṭisambhidāmaggo</option>
<option value="32.gz">32. Apadānaṃ 1</option>
<option value="33.gz">33. Apadānaṃ 2, Buddhavaṃso, Cariyāpiṭakaṃ</option>
</optgroup>
<optgroup label="Abhidhammo">
<option value="34.gz">34. Dhammasaṅgaṇi</option>
<option value="35.gz">35. Vibhaṅgo</option>
<option value="36.gz">36. Dhātukathā, Puggalapaññatti</option>
<option value="37.gz">37. Kathāvatthu</option>
<option value="38.gz">38. Yamakaṃ 1</option>
<option value="39.gz">39. Yamakaṃ 2</option>
<option value="40.gz">40. Paṭṭhānaṃ 1: Anulomatikapaṭṭhānaṃ Purimaṃ</option>
<option value="41.gz">41. Paṭṭhānaṃ 2: Anulomatikapaṭṭhānaṃ Pacchimaṃ</option>
<option value="42.gz">42. Paṭṭhānaṃ 3: Anulomadukapaṭṭhānaṃ Purimaṃ</option>
<option value="43.gz">43. Paṭṭhānaṃ 4: Anulomadukapaṭṭhānaṃ Pacchimaṃ</option>
<option value="44.gz">44. Paṭṭhānaṃ 5: Anulomapaṭṭhānaṃ</option>
<option value="45.gz">45. Paṭṭhānaṃ 6: Paccanīya, Anulomapaccanīya, Paccanīyānuloma</option>
</optgroup>
</select>
<button onClick="srtReader.loadText();">Load</button>
</div>
<div style="padding-top:5px;padding-bottom:10px;">
<span> Go to page: <select id="pageselector" onChange="srtReader.gotoPage();"></select></span>
<label for="showline"><input type="checkbox" id="showline" onClick="srtReader.toggleLineNo();">Line numbers</label>
<label for="dehyphen"><input type="checkbox" id="dehyphen" onClick="srtReader.dehyphenate();">Dehyphenated</label>
</div>
<div id="textdisplay"></div>
<blockquote id="preface">
<h3 style="text-align:center">Syāmaraṭṭhassa Tepiṭakārambhakathā</h3>
<p style="text-align:left">
Tepiṭakaṃ buddhavacanaṃ nāma buddhassa bhagavato dhammavinayassa samodhānaṃ hoti. Tañca yāva daḷhaṃ tiṭṭhati tāva buddhaparisāya sammāpaṭipatti sobhati. Tena buddhasāsanopatthambhakā khattiyarājāno buddhasāvakānaṃ balaṃ anuppadentā bhagavato dhammavinayaṃ saṅgītiṃ āropāpetvā potthakesu likhāpesuṃ. Etadeva tesaṃ cariyāvattaṃ.
</p>
<p style="text-align:left">
Aparabhāge buddhassa bhagavato parinibbānā chattiṃsasaṃvaccharuttaresu catussatādhikesu dvīsu saṃvaccharasahassesu atikkantesu cūḷālaṅkaraṇo nāma syāmānaṃ piyamahārājā tiṇṇaṃ piṭakānaṃ bhiyyoso patthaṭabhāvaṃ patthayanto tadā tipiṭakadhare therānutthere bhuddhassa bhagavato tepiṭakaṃ bhuddhavacanaṃ sodhāpetvā syāmaraṭṭhasmiṃ paṭhamaṃ muddāpesi. Tampana tattha tattha vissajjāpittāya itāni anavasiṭṭhaṃ hoti atidullabhaṃ. Tasmāyaṃ puna muddāpesuṃ sampattakāloyeva.
</p>
<p style="text-align:left">
Apica kho imasmiṃ saṃvacchare kālakato mahāvajirāvudho nāma mahārājā maraṇāsannakāle mama kālakatassa anussaraṇatthāya yo koci bhuddhasāsanupakaraṇo gantho muddāpito hotūti āṇāpesi. Atha paramindo mahāpajādhipako nāma mahārājā imasmiṃ kale rajjaṃ kārento mayhaṃ jeṭṭhabhāturañño manorathassa samijjhanatthāya tepiṭakaṃ bhuddhavacanameva muddāpetabbayuttakanti vicinitvā jinavarasaṅgharājappamukhe tepiṭake therānutthere ārādhetvā pubbe mudditaṃ puna sodhāpetvā tassa muddāpane attano dhanaṃ pariccajituṃ syāmaraṭṭhavāsiṃ mahājanaṃ samādapesi.
</p>
<p style="text-align:left">
Evamidaṃ tiṇṇaṃ piṭakānaṃ samūhabhūtaṃ syāmaraṭṭhassa tepiṭakaṃ rājappamukhe syāmaraṭṭhavāsinā mahājanena buddhassa bhagavato parinibbānā catussatādhikanaṃ dvinnaṃ sahassānamupari aṭṭhasaṭṭhiyā vassānamaccayena muddāpetuṃ āraddhaṃ.
</p>
<p style="text-align:left">
Yaṃ imassa tepiṭakassa muddāpitattā puññaṃ pasutaṃ tassa patti mahāvajirāvudhamahārājassa ṭhānaso upakappatu.
</p>
<p style="text-align:center">
Apica<br>
Khemī anīghā suratā ca santo,<br>
Anāturātho sukhitā averī;<br>
Devā manussā ca pajā ca serī,<br>
Bhadrānupassī ca sadā bhavantaṃ.
</p>
</blockquote>
<script src="/assets/js/srtreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
