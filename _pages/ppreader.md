---
title: "Pāli Passage Reader"
permalink: /ppreader
is_application: true
date: 2023-07-06 12:00:00 +0700
---
<div>
<span><code> =a =i =u ^n ~n .t .d .n .l .m (āīūṅñṭḍṇḷṃ)</code></span> <button onClick="ppReader.showInstruction();">Instruction</button> <button onClick="ppReader.refresh();">Refresh</button>
</div>
<blockquote id="instruction" style="display:none;">
	<p>This program can break down a Pāli passage and try to find a definition of each item. The main resource is the <em>New Concise Pali-English Dictionary</em>. If an exact definition is not met, the nearest one is shown instead, marked by an asterisk (*). The program can also recognize most forms of Pāli pronouns and some of irregular nouns. Moreover, it can recognize a number of <em>sandhi</em> words.</p>
	<p>The user has to paste some text into the text area first (if the <code>Paste</code> button does not work, use <code>Ctrl-V</code> or the context menu instead), then press ANALYZE button. If some editing is needed, the text can be changed in place. This can help cutting long compounds to gain more information. The cutting can be done by hyphens or spaces. If non-English characters cannot be put directly by the user's input system, their equivalent shown above can be used.</p>
	<p>With <code>Options</code>, the user can turn on or off the analytical criteria mentioned above. Still, many instances cannot be treated correctly. If a wrong definition comes up anyway, try cutting the word into pieces.</p>
</blockquote>
<div>
<textarea id="textinput" rows="8" cols="64" spellcheck="false" style="font-size:1.0em"></textarea>
</div>
<div>
<button onClick="ppReader.clear();">Clear</button> <button onClick="ppReader.pasteText();">Paste</button> <button onClick="ppReader.analyze();">ANALYZE</button> <label for="details"><input type="checkbox" id="details" onChange="ppReader.showDetails();" checked>Details</label> <label for="options"><input type="checkbox" id="options" onChange="ppReader.showOptions();">Options</label>
</div>
<div id="optionbox" style="display:none">
	<label for="opt_pronouns"><input type="checkbox" id="opt_pronouns" checked>Pronouns</label><br>
	<label for="opt_irrns"><input type="checkbox" id="opt_irrns" checked>Common irregular nouns</label><br>
	<label for="opt_sandhis"><input type="checkbox" id="opt_sandhis" checked>Common <em>sandhi</em> words</label><br>
</div>
<hr>
<div id="analyzed_result"></div>
<script src="/assets/js/ncpedhost.js"></script>
<script src="/assets/js/ncped.js"></script>
<script src="/assets/js/decllib.js"></script>
<script src="/assets/js/ppreader.js"></script>
<script>
ncped.url = "/assets/ncped";
ncped.dictHost = ncpedHost;
ncpedHost.dict = ncped;
ppReader.dict = ncped;
ppReader.declension = declension;
ppReader.textInputElem = document.getElementById("textinput");
ppReader.processStockWords();
</script>

