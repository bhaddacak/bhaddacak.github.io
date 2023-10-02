---
title: "Dhātvatthasaṅgaha"
permalink: /dhatva
is_application: true
date: 2023-10-02 12:00:00 +0700
---

This recent text was composed by Visuddhācāra Thera in Mandalay, finished in 1889. The text is converted from Thai script available at [Palipage](https://sites.google.com/view/palipage). I also fix some missing verses by using Thai edition of <em>Dhātvatthasaṅgahapāṭhanissaya</em> (MCU Press, 1992). Unlike other books on Pāli roots which group roots by their group and sort them by ending, Dhātvatthasaṅgaha sorts the roots by starting letters and divides chapters by alphabetic group. This can ease modern readers considerably. By this way of presentation, root groups are described in the text body, which is in verses. Here are key words: *bhū, bhvā* (I bhū); *ru* (II rudhi); *di* (III divu); *su, svā* (IV su); *ki, kī* (V kī); *ga, go* (VI gaha); *ta, to* (VII tanu); and *cu, cro* (VIII cura). There are totally 1637 roots in the book, as counted by the author himself. For a better search function, consider using [Pāli Root Finder](/paliroot).

<div id="toolbar" style="padding-bottom:10px;padding-top:3px;z-index:10;">
<span class="toolbarbg">
<button onClick="bcUtil.toggleToolBar(dhatvaReader);"><svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#window-maximize"></use></svg></button>
<select id="chapterselector" onChange="dhatvaReader.goChapter();">
<option value="1">1. Sarādikadhātvatthakaṇḍa</option>
<option value="2">2. Kakārādikadhātvatthakaṇḍa</option>
<option value="3">3. Khādityakkharādikadhātvatthakaṇḍa</option>
<option value="4">4. Cavaggaṭavaggaaṭṭhakkharādikadhātvatthakaṇḍa</option>
<option value="5">5. Tavaggādikadhātvatthakaṇḍa</option>
<option value="6">6. Pavaggādikadhātvatthakaṇḍa</option>
<option value="7">7. Avaggādikadhātvatthakaṇḍa</option>
</select>
<select id="verseselector" title="Stanza number to go" onChange="dhatvaReader.goVerse();"></select>
</span>
</div>
<div id="textdisplay" style="text-align:left;padding-top:5px;">Loading... (please wait)</div>
<script src="/assets/js/dhatvareader.js"></script>
<script src="/assets/js/pako_inflate.min.js"></script>
<script>
dhatvaReader.util = bcUtil;
dhatvaReader.loadText();
</script>



