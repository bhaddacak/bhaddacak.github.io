---
title: "Vuttodayaṃ"
permalink: /vutt
is_application: true
date: 2023-09-15 12:00:00 +0700
---

The text is taken from [CSCD](https://tipitaka.org/romn){:target="\_blank"}. For a short, survival treatment of Pāli prosody, see the maunal of [`PāliPlatform2`](/pp2man){:target="\_blank"}.

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(vuttReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="chapterselector" onChange="vuttReader.goChapter();">
<optgroup label="1. Saññāparibhāsāniddesa-paṭhamapariccheda">
<option value="Ratanattayappaṇāma">Ratanattayappaṇāma</option>
<option value="Nimitta">Nimitta</option>
<option value="Ganthaparimāṇa">Ganthaparimāṇa</option>
<option value="Abhidhānādi">Abhidhānādi</option>
<option value="Gaṇasaṅketasaññā">Gaṇasaṅketasaññā</option>
<option value="Gaṇaniyama">Gaṇaniyama</option>
<option value="Garu,lahusarūpa">Garu,lahusarūpa</option>
</optgroup>
<optgroup label="2. Mattāvuttiniddesa-dutiyapariccheda">
<option value="Gaṇaniyama">Gaṇaniyama</option>
<option value="Yatiniyama">Yatiniyama</option>
</optgroup>
<option value="3. Samavuttiniddesa-tatiyapariccheda">3. Samavuttiniddesa-tatiyapariccheda</option>
<option value="4. Aḍḍhasamavuttiniddesa-catutthapariccheda">4. Aḍḍhasamavuttiniddesa-catutthapariccheda</option>
<option value="5. Visamavuttiniddesa-pañcamapariccheda">5. Visamavuttiniddesa-pañcamapariccheda</option>
<optgroup label="6. Chappaccayavibhāga-chaṭṭhapariccheda">
<option value="Patthāranaya">Patthāranaya</option>
<option value="Naṭṭhanaya">Naṭṭhanaya</option>
<option value="Uddiṭṭhanaya">Uddiṭṭhanaya</option>
<option value="Sabbagalakriyanaya">Sabbagalakriyanaya</option>
<option value="Vuttasaṅkhyānaya">Vuttasaṅkhyānaya</option>
<option value="Vuttaaddhānaya">Vuttaaddhānaya</option>
<option value="Nigamana">Nigamana</option>
</optgroup>
</select>
<select id="suttaselector" title="Stanza number to go" onChange="vuttReader.goSutta();"></select>
</span>
</div>
<div id="textdisplay" style="text-align:left;padding-top:5px;">Loading... (please wait)</div>
<script src="/assets/js/vuttreader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
vuttReader.util = bcUtil;
vuttReader.loadText();
</script>


