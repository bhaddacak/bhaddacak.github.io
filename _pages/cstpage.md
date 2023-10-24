---
title: "Chaṭṭha Saṅgāyana Tipiṭaka Reformatted"
permalink: /cstpage
is_article: true
date: 2023-10-24 12:00:00 +0700
---

- TOC
{:toc}

This will be the last addition here in this period before I continue writing `Pāli Platform 3`, and it is the hardest of all I have been doing so far. Unlike students of Buddhism in the past who had difficulty in finding Pāli texts to read, today we have several versions of them easily accessible via the Internet. The most complete collection is of the *Chaṭṭha Saṅgāyana Tipiṭaka* (CST), formerly known as [CSCD](https://www.tipitaka.org){:target="\_blank"} distributed by Vipassana Research Institute (VRI). This collection has been the main source of materials for many students of Buddhism and Pāli, including me.

A better edited collection recently is of [SuttaCentral](https://suttacentral.net){:target="\_blank"}. Although this is not complete, it serves as a beginner-friendly source with a good coverage of English translations. Because of the fragmented data in this site plus its idiosyncracy, albeit well-organized, it is difficult to work with in some situations.

Although the data of CST are reliable and good in many respects, the collection is not perfect. To programmers who make use of the data, several features are needed to be improved and many points are needed to be fixed so that we can make a better reader or search program. Moreover, to scholars, it should be an easier way to refer to the texts. This is a hard problem because referencing method depends heavily on the structure of the texts. Now the old days of PTS referring system have gone and several new systems arise. Here we will have another referencing system, which reflects the data we use.

That is to say, the target users of this collection are researchers and serious learners. So, we organize the texts in the way that related data are put together, able to be used at hand. And by the motto of this site, *"Buddhists should be able to read Pāli texts by themselves"*, we do not offer any translation here.

Here are a list of changes to be implemented:

- Reorganize the collection, making it easier the find related texts
- Restructure some texts, making them easier to program
- Change data format from XML to plain text (actually headless HTML to preserve some metadata)
- Fix ’nti (it should be n’ti not ’nti)
- Fix obvious typos (if any, the fixes will be reported)
- Remove some minor texts
- Remove references to publications embedded in the text

## Structure of the collection

The structure of texts presented here is shaped by text group and paragraph numbers. If a new series of numbers is introduced, it will be separated as a new book. Only when the text has clearly distinct content, it will be a book on its own even if it uses numbers form another series. Bhikkhunīvibhaņga is a marked example in this case.

The division into three baskets is retained, plus another group for extra texts (visesapakaraṇa). The three baskets now have only two classes each, the main texts (mūlagantha) and exegeses (aṭṭhakathā and ṭīkā). If subordinate texts can be linked to their main text by paragraph numbers, the relation will be shown. If not, they can be opened as individual documents. In this case, the user has to link them manually by textual comparison.

## Vinayapiṭaka

At this beginning stage, only two main books are available: Bhikkhuvibhaṅga 1 (Buv1), and Bhikkhuvibhaṅga 2 (Buv2). The sole commentary of these is Samantapāsādikā (Sp) by Buddhaghosa, which is divided in the same manner, hence Sp1 and Sp2. And linkable exegeses of Sp are Sāratthadīpanī (Sd), its main commentary, Vajirabuddhi (Vjb), and Vimativinodanī (Vmv). All these have parallel structure to the main texts. If these documents are opened by chained opening using the toolbar, they can be synchronized at once, if the option is selected. To see the how it looks like, go to [HERE](http://paliplatform.blogspot.com/2023/10/synchronization-of-cst-docs.html){:target="\_blank"}. Other texts with this structure can be used in the same manner.

The remaining texts will be added up weekly. I suppose the collection will be completed in a month.

## Guideline for text referencing

Texts in the collection can be accessed by URL, for example, to get to Bhikkhuvibhaṅga 1, you can go to [{{ site.url }}/cst?buv1](/cst?buv1){:target="\_blank"}. If a specific paragraph number is given, it can directly jump to that point, for example, [{{ site.url }}/cst?buv1=24](/cst?buv1=24){:target="\_blank"}.

More information on this topic will be added later.

## Guideline for developers

The raw data of the documents are in `/assets/palitext/cst`, compressed individually. Metadata of the texts can be found in `/assets/js/cstutil.js`. These are formatted in plain text with some HTML markups. They can be opened in a browser if they are decompressed and wrapped with a proper HTML header. To display the text with your preferred style, you have to manipulate it programmatically, mainly by substitution using regular expression. The reader I made here can be a showcase.

The internal structure of the texts is not well-settled yet. It is still subject to change, at least until the whole thing is done. Explanations of changes from CSCD and further guideline will be given when ready.

> [Table of Contents](/cst)
