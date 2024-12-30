---
title: "Tipiṭaka Correction Report"
permalink: /correport
is_article: true
date: 2024-12-30 12:00:00 +0700
---

- TOC
{:toc}

## Chaṭṭha Saṅgāyana Tipiṭaka (CST)

As known by most Pāli students, the most complete Pāli text collection in digital form is of the CST4 contributed by Vipassana Research Institute. The most widely used version is possibly the corpus bundled with the CST4 program. Now when errors are accumulatedly detected, the collection has its online corrected version as [Tipitaka.org XML](https://github.com/vipassanatech/tipitaka-xml){:target="\_blank"}.

### Textual correction report

To keep pace with the recent corrections, I also apply the changes to the collections bundled with [Pāli Platform 3](/platform3){:target="\_blank"} (PP3), particularly the CST-Restructured and Grammatical text collection. For the former CST4 collection, now the texts are changed to the better versions. Furthermore, when I edited the files, several more errors were detected and fixed. As a result, the collections bundled with PP3 (from version RC1 onward), as well as the online collections maintained by me here, are now possibly the least erroneous ones.

To make my corrections visible, I made a report showing each instance of editing. By its complexity, I made the report in spreadsheets as shown in the links below.

> *Tipiṭaka Correction Report*
> - [Excel](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/cst4/tipitaka_correction_report.xlsx){:target="\_blank"}
> - [Gnumeric](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/cst4/tipitaka_correction_report.gnumeric){:target="\_blank"}

Here are some explanations of the spreadsheets:
- The *Main* table shows erroneous instances found in CSTR collection against the Tipitaka-XML (corrected up to August 2024). The treatments are also applied to the collection of [CST-Kit](/cstpage){:target="\_blank"}.
- The *Gram* table shows erroneous instances found in grammatical texts both in PP3 and this website.
- The erroneous instances uncommon to the both collections above are not reported.
- The *Add1* table shows erroneous instances undetected formerly in the Tipitaka-XML. These corrections are applied to the current CST4 collection, as well as the CSTR and Gram collection.
- The *Add2* table shows possibly erroneous instances with triple letters. Some obviously need to be fixed. Some need to be analyzed further.
- The *Add3* table shows some unusual sequences undetected formerly. Only some obvious cases are fixed.
- The *Unusual* table shows possibly mistreated instances in the former corrections of Tipitaka-XML.

### Character analyzing report

Before a text collection is utilized by PP3, it must be closely analyzed to find potential defects and the best way to approach the text, such as indexing strategy. When the CST4 data were used, they underwent several treatments before the collection was safely enough to be bundled.

This character analysis is not done by those who maintain the Tipitaka-XML collection. When I turn to use this better collection, I have to apply the treatments again (in fact I have done this several times with the collections based on CSCD).

To make these erroneous points visible to the text maintainers, I therefore add this report here below.

> *Tipiṭaka-XML Analyzing Report*
> - [PDF](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/cst4/tipitaka-xml_analyzing_report.pdf){:target="\_blank"}
> - [TXT](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/cst4//tipitaka-xml_analyzing_report.txt){:target="\_blank"}

Some may be curious how to do character analysis. You can see the program and other tools in [Tipiṭaka-Kit](https://github.com.bhaddacak/tipitaka-kit/){:target="\_blank"}

### Manually *nti* fixing report

When I make a Pāli text collection, I normally prefer *n’ti* over *’nti*. That is because I mainly work with Roman texts and the *’nti* version of them makes some information lost when the texts are tokenized (the accusative marker is a marked one).

Mostly we can fix the *nti* programmatically. See the actual program for this corpus in [Tipiṭaka-Kit](https://github.com/bhaddacak/tipitaka-kit/cst4){:target="\_blank"}. Unfortunately, it is far from perfect. There are some points that need manually fixes. Here is the report of the manually *nti* fixes applied to the CSTR and Gram collection, and to the alternative (corrected) CST4 collection.

> *Manually ‘nti’ Fixing Report*
> - [Excel](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/cst4/manually_nti_fixing_report.xlsx){:target="\_blank"}
> - [Gnumeric](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/cst4/manually_nti_fixing_report.gnumeric){:target="\_blank"}

## Buddha Jayanthi Tripitaka (BJT)

The BJT texts hosted in [GRETIL](http://gretil.sub.uni-goettingen.de/gretil.htm) are really messy. A better digital version of that collection is maintained by [Path Nirvana Foundation](https://pathnirvana.org){:target="\_blank"} at this [Github](https://github.com/pathnirvana/tipitaka.lk/tree/master/public/static/text){:target="\_blank"}. So, I decide to remove the GRETIL BJT corpus from PP3 and use this better version instead (available in PP3 RC1 onward).

When I worked on this corpus as I always do for every text collection I use, I also found several errors myself. So, I corrected some obvious cases of them and made a report below.

> *BJT Pāli Correction Report*
> - [Excel](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/bjt/bjt_pali_correction_report.xlsx){:target="\_blank"}
> - [Gnumeric](https://raw.githubusercontent.com/bhaddacak/tipitaka-kit/main/bjt/bjt_pali_correction_report.gnumeric){:target="\_blank"}

This corpus is easier to deal with than the CST4 XML, and it has undergone a similar treatments. You can see my programs used here at [Tipiṭaka-Kit](https://github.com/bhaddacak/tipitaka-kit){:target="\_blank"}. And please go through its `README` first.
