---
title: "Chaṭṭha Saṅgāyana Tipiṭaka Restructured"
permalink: /cstpage
is_article: true
date: 2023-11-18 12:00:00 +0700
---

- TOC
{:toc}

This will be the last addition here in this period before I continue writing `Pāli Platform 3`, and it is the hardest of all I have been doing so far. Unlike students of Buddhism in the past who had difficulty in finding Pāli texts to read, today we have several versions of them easily accessible via the Internet. The most complete collection is of the *Chaṭṭha Saṅgāyana Tipiṭaka* (CST), formerly known as [CSCD](https://www.tipitaka.org){:target="\_blank"} distributed by Vipassana Research Institute. This collection has been the main source of materials for many students of Buddhism and Pāli, including me.

A better edited collection recently is of [SuttaCentral](https://suttacentral.net){:target="\_blank"}. Although this is not complete, it serves as a beginner-friendly source with a good coverage of English translations. Because of the fragmented data in this site plus its idiosyncracy, albeit well-organized, it is difficult to work with in some situations.

Although the data of CST are reliable and good in many respects, the collection is not perfect. To programmers who make use of the data, several features are needed to be improved and many points are needed to be fixed so that we can make a better reader or search program. Moreover, to scholars, it should be an easier way to refer to the texts. This is a hard problem because referencing method depends heavily on the structure of the texts. Now the old days of PTS referring system have gone and several new systems arise. Here we will have another referencing system, which reflects the data we use.

That is to say, the target users of this collection are researchers and serious learners. So, we organize the texts in the way that related works are put together, able to be used at hand. And each book in the collection is mostly identified by its name. That is the best approach to Pāli literary studies. Moreover, by the motto of this site, *"Buddhists should be able to read Pāli texts by themselves"*, we do not offer any translation here.

For more information about the structure of the collection, see [CST-Kit](https://github.com/bhaddacak/cst-kit){:target="\_blank"}.

> For the information on Pāli literature is vast and somewhat perplexing to beginners, I will ignore most of them here. For those who want to delve into the details, please consult other better sources, for example, Oskar von Hinüber's *A Handbook of Pāli Literature* (Walter de Gruyter, 1996) or K.R. Norman's *Pāli Literature* (Otto Harrassowitz, 1983).

## Vinayapiṭaka

While the main texts in the Vinaya are of a handful, their related works are rich. All the texts are listed in the tree below, including their name and abbreviation for referring. Pāli learners should know all these names and their relationships. The most important exegesis is undoubtedly Samantapāsādikā by Buddhaghosa, because several subsequent works go around it. Unlike the original, I promote the Pātimokkha, both of the Bhikkhu and Bhikkhunī, to the main group. This makes sense because by their content they are not exegeses, but recapitulations.

Most texts in the Vinaya can be synchronized in the reader. To understand how it works, see [HERE](http://paliplatform.blogspot.com/2023/10/synchronization-of-cst-docs.html){:target="\_blank"}, or better try it yourself in the reader. Other texts with this structure can be used in the same manner.

```
============
Vinayapiṭaka
============
  |- Bhikkhuvibhaṅga 1 (Buv1)
  |   |- Samantapāsādikā 1 (Sp1)
  |       |- Sāratthadīpanī 1 (Sd1)
  |       |- Vimativinodanī 1 (Vmv1)
  |       |- Vajirabuddhi 1 (Vjb1)
  |
  |- Bhikkhuvibhaṅga 2 (Buv2)
  |   |- Samantapāsādikā 2 (Sp2)
  |       |- Sāratthadīpanī 2 (Sd2)
  |       |- Vimativinodanī 2 (Vmv2)
  |       |- Vajirabuddhi 2 (Vjb2)
  |       |- Pācityādiyojanā (Pc-y)
  |
  |- Bhikkhunīvibhaṅga (Biv)
  |   |- Samantapāsādikā 3 (Sp3)
  |       |- Sāratthadīpanī 3 (Sd3)
  |       |- Vimativinodanī 3 (Vmv3)
  |       |- Bhikkhunīvibhaṅgayojanā (Biv-y)
  |
  |- Mahāvagga (Mv)
  |   |- Samantapāsādikā 4 (Sp4)
  |       |- Sāratthadīpanī 4 (Sd4)
  |       |- Vimativinodanī 4 (Vmv4)
  |       |- Vajirabuddhi 4 (Vjb4)
  |       |- Mahāvaggayojanā (Mv-y)
  |
  |- Cūḷavagga (Cv)
  |   |- Samantapāsādikā 5 (Sp5)
  |       |- Sāratthadīpanī 5 (Sd5)
  |       |- Vimativinodanī 5 (Vmv5)
  |       |- Vajirabuddhi 5 (Vjb5)
  |       |- Cūḷavaggayojanā (Cv-y)
  |
  |- Parivāra (Pvr)
  |   |- Samantapāsādikā 6 (Sp6)
  |       |- Sāratthadīpanī 6 (Sd6)
  |       |- Vimativinodanī 6 (Vmv6)
  |       |- Vajirabuddhi 6 (Vjb6)
  |       |- Parivārayojanā (Pvr-y)
  |
  |- Bhikkhupātimokkha (Bup)
  |   |- Kaṅkhāvitaraṇī (Kkh1)
  |       |- Kaṅkhāvitaraṇī-purāṇaṭīkā (Kkh-pt1)
  |       |- Kaṅkhāvitaraṇī-abhinavaṭīkā (Kkh-nt1)
  |
  |- Bhikkhunīpātimokkha (Bip)
      |- Kaṅkhāvitaraṇī (Kkh2)
          |- Kaṅkhāvitaraṇī-purāṇaṭīkā (Kkh-pt2)
          |- Kaṅkhāvitaraṇī-abhinavaṭīkā (Kkh-nt2)

  ----------------------------------------
  Independent Vinaya Exegeses/Compositions
  ----------------------------------------
      |- Vinayasaṅgaha (Vns)
      |   |- Vinayālaṅkāra (Vnl)
      |
      |- Vinayavinicchaya (Vnv)
      |   |- Vinayavinicchayaṭīkā (Vnv-t)
      |
      |- Uttaravinicchaya (Utv)
      |   |- Uttaravinicchayaṭīkā (Utv-t)
      |
      |- Khuddasikkhā (Khds)
      |   |- Khuddasikkhā-purāṇaṭīkā (Khds-pt)
      |   |- Khuddasikkhā-abhinavaṭīkā (Khds-nt)
      |
      |- Mūlasikkhā (Mls)
          |- Mūlasikkhāṭīkā (Mls-t)
```

## Suttantapiṭaka

```
==============
Suttantapiṭaka
==============
  |- Dīghanikāya
  |   |
  |   |- Sīlakkhandhavagga (D1)
  |   |   |- Sumaṅgalavilāsinī 1 (Smv1)
  |   |       |- Līnatthappakāsinī (Dīghanikāya) 1 (Lpd1)
  |   |       |- Sīlakkhandhavagga-abhinavaṭīkā (Sv-nt)
  |   |
  |   |- Mahāvagga (D2)
  |   |   |- Sumaṅgalavilāsinī 2 (Smv2)
  |   |       |- Līnatthappakāsinī (Dīghanikāya) 2 (Lpd2)
  |   |
  |   |- Pāthikavagga (D3)
  |       |- Sumaṅgalavilāsinī 3 (Smv3)
  |           |- Līnatthappakāsinī (Dīghanikāya) 3 (Lpd3)
  |
  |- Majjhimanikāya
  |   |
  |   |- Mūlapaṇṇāsa (M1)
  |   |   |- Papañcasūdanī 1 (Pps1)
  |   |       |- Līnatthappakāsinī (Majjhimanikāya) 1 (Lpm1)
  |   |
  |   |- Majjhimapaṇṇāsa (M2)
  |   |   |- Papañcasūdanī 2 (Pps2)
  |   |       |- Līnatthappakāsinī (Majjhimanikāya) 2 (Lpm2)
  |   |
  |   |- Uparipaṇṇāsa (M3)
  |       |- Papañcasūdanī 3 (Pps3)
  |           |- Līnatthappakāsinī (Majjhimanikāya) 3 (Lpm3)
  |
  |- Saṃyuttanikāya
  |   |
  |   |- Sagāthāvagga (S1)
  |   |   |- Sāratthappakāsinī 1 (Srp1)
  |   |       |- Līnatthappakāsinī (Saṃyuttanikāya) 1 (Lps1)
  |   |
  |   |- Nidānavagga (S2)
  |   |   |- Sāratthappakāsinī 2 (Srp1)
  |   |       |- Līnatthappakāsinī (Saṃyuttanikāya) 2 (Lps2)
  |   |
  |   |- Khandhavagga (S3)
  |   |   |- Sāratthappakāsinī 3 (Srp1)
  |   |       |- Līnatthappakāsinī (Saṃyuttanikāya) 3 (Lps3)
  |   |
  |   |- Saḷāyatanavagga (S4)
  |   |   |- Sāratthappakāsinī 4 (Srp4)
  |   |       |- Līnatthappakāsinī (Saṃyuttanikāya) 4 (Lps4)
  |   |
  |   |- Mahāvagga (S5)
  |       |- Sāratthappakāsinī 5 (Srp5)
  |           |- Līnatthappakāsinī (Saṃyuttanikāya) 5 (Lps5)
  |
  |- Aṅguttaranikāya
  |   |
  |   |- Ekakanipāta (A1)
  |   |   |- Manorathapūraṇī 1 (Mnp1)
  |   |       |- Sāratthamañjūsā 1 (Srm1)
  |   |
  |   |- Dukanipāta (A2)
  |   |   |- Manorathapūraṇī 2 (Mnp2)
  |   |       |- Sāratthamañjūsā 2 (Srm2)
  |   |
  |   |- Tikanipāta (A3)
  |   |   |- Manorathapūraṇī 3 (Mnp3)
  |   |       |- Sāratthamañjūsā 3 (Srm3)
  |   |
  |   |- Catukkanipāta (A4)
  |   |   |- Manorathapūraṇī 4 (Mnp4)
  |   |       |- Sāratthamañjūsā 4 (Srm4)
  |   |
  |   |- Pañcakanipāta (A5)
  |   |   |- Manorathapūraṇī 5 (Mnp5)
  |   |       |- Sāratthamañjūsā 5 (Srm5)
  |   |
  |   |- Chakkanipāta (A6)
  |   |   |- Manorathapūraṇī 6 (Mnp6)
  |   |       |- Sāratthamañjūsā 6 (Srm6)
  |   |
  |   |- Sattakanipāta (A7)
  |   |   |- Manorathapūraṇī 7 (Mnp7)
  |   |       |- Sāratthamañjūsā 7 (Srm7)
  |   |
  |   |- Aṭṭhakanipāta (A8)
  |   |   |- Manorathapūraṇī 8 (Mnp8)
  |   |       |- Sāratthamañjūsā 8 (Srm8)
  |   |
  |   |- Navakanipāta (A9)
  |   |   |- Manorathapūraṇī 9 (Mnp9)
  |   |       |- Sāratthamañjūsā 9 (Srm9)
  |   |
  |   |- Dasakanipāta (A10)
  |   |   |- Manorathapūraṇī 10 (Mnp10)
  |   |       |- Sāratthamañjūsā 10 (Srm10)
  |   |
  |   |- Ekādasakanipāta (A11)
  |       |- Manorathapūraṇī 11 (Mnp11)
  |           |- Sāratthamañjūsā 11 (Srm11)
  |
  |- Khuddakanikāya
      |
      |- Khuddakapāṭha (Khp)
      |   |- Khuddakapāṭha-aṭṭhakathā (Khp-a)
      |
      |- Dhammapada (Dhp)
      |   |- Dhammapada-aṭṭhakathā (Dhp-a)
      |
      |- Udāna (Ud)
      |   |- Udāna-aṭṭhakathā (Ud-a)
      |
      |- Itivuttaka (It)
      |   |- Itivuttaka-aṭṭhakathā (It-a)
      |
      |- Suttanipāta (Snp)
      |   |- Suttanipāta-aṭṭhakathā (Snp-a)
      |
      |- Vimānavatthu (Vv)
      |   |- Vimānavatthu-aṭṭhakathā (Vv-a)
      |
      |- Petavatthu (Pv)
      |   |- Petavatthu-aṭṭhakathā (Pv-a)
      |
      |- Theragāthā (Thag)
      |   |- Theragāthā-aṭṭhakathā (Thag-a)
      |
      |- Therīgāthā (Thig)
      |   |- Therīgāthā-aṭṭhakathā (Thig-a)
      |
      |- Therāpadāna (Ap1)
      |   |- Therāpadāna-aṭṭhakathā (Ap-a1)
      |
      |- Therīapadāna (Ap2)
      |
      |- Buddhavaṃsa (Bv)
      |   |- Buddhavaṃsa-aṭṭhakathā (Bv-a)
      |
      |- Cariyāpiṭaka (Cp)
      |   |- Cariyāpiṭaka-aṭṭhakathā (Cp-a)
      |
      |- Jātaka (Ja1)
      |   |- Jātaka-aṭṭhakathā 1 (Ja-a1)
      |
      |- Jātaka (Ja2)
      |   |- Jātaka-aṭṭhakathā 1 (Ja-a1)
      |
      |- Jātaka (Ja3)
      |   |- Jātaka-aṭṭhakathā 1 (Ja-a3)
      |
      |- Jātaka (Ja4)
      |   |- Jātaka-aṭṭhakathā 1 (Ja-a4)
      |
      |- Jātaka (Ja5)
      |   |- Jātaka-aṭṭhakathā 1 (Ja-a5)
      |
      |- Jātaka (Ja6)
      |   |- Jātaka-aṭṭhakathā 1 (Ja-a6)
      |
      |- Mahāniddesa (Nidd1)
      |   |- Mahāniddesa-aṭṭhakathā (Nidd-a1)
      |
      |- Cūḷaniddesa (Nidd2)
      |   |- Cūḷaniddesa-aṭṭhakathā (Nidd-a2)
      |
      |- Paṭisambhidāmagga (Psm)
      |   |- Paṭisambhidāmagga-aṭṭhakathā (Psm-a)
      |
      |- Milindapañha (Mil)
      |
      |- Nettippakaraṇa (Nett)
      |   |- Nettippakaraṇa-aṭṭhakathā (Nett-a)
      |   |   |- Nettippakaraṇa-ṭīkā (Nett-t)
      |   |- Nettivibhāvinī (Nettv)
      |
      |- Peṭakopadesa (Ptkp)
   
```

## Guideline for text referencing

Texts in the collection can be accessed by URL with their abbreviation, for example, to get to Bhikkhuvibhaṅga 1, you can go to [{{ site.url }}/cst?buv1](/cst?buv1){:target="\_blank"}. If a specific paragraph number is given, it can directly jump to that point. For example, [{{ site.url }}/cst?buv1=24](/cst?buv1=24){:target="\_blank"} leads to the starting point of the first Pārājika.

Some documents have complex structure with multiple number series, such as the Pātimokkha. They can be specifically accessed by adding group number in the query using a colon. For example, [{{ site.url }}/cst?bup=5:1](/cst?bup=5:1){:target="\_blank"} leads to the first rule of Pācittiya. If the group number is not used, it will always go to the first series.

### Text referencing in writings

Referring texts by URL is convenient in most online situations. In writings for publications, the format is slightly different. First, make clear to the reader that this collection is used by referring to its origin, i.e., [CST-Kit](https://github.com/bhaddacak/cst-kit){:target="\_blank"}. Then, mention texts by their abbreviation, optionally with a point of reference. This can be a paragraph number, if any, or a distinct portion of text.

For example, to the first mātikā of Pārājika rule, we can refer by **Buv1 39** or use a decimal separator like **Buv1.39** or use Roman numeral for book volume (if any) as in the legacy system, hence **Buv I 39**. To the first sermon (Dhammacakkappavattana-sutta) in Mahāvagga, we can use, for example, **Mv 13-17** or **Mv.13-17**.

| Target content | References |
|---|---|
| The first mātikā of Pārājika rule | Buv1 39, Buv1.39, Buv I 39 |
| The first sermon in Mahāvagga | Mv 13-17, Mv.13-17 |

### Referencing to exegeses

This can be baffling to new learners, but with the good organization of paragraph numbers, referring to subordinate texts is as easy as the main texts. We have two following methods:

1. **Using the name of text** (recommended). For example, at the first point mentioned above, we can refer to the commentary by **Sp1 39** and the main subcommentary by **Sd1 39**. And to the first sermon, the commentary is **Sp4 13** (there is little text here), and the main subcommentary **Sd4 13-17** (there is much more text here). See more examples in the table below.
2. **Using the traditional way**. By adding a suffix to the main text, it can change the text mentioned relatively. Adding **-a** means commentary, and adding **-t** (or -ṭ) means subcommentary. For example, the commentary to the Pārājika above can be **Buv1-a 39** (= Sp1 39), and the subcommentary **Buv1-t 39** (equivalent to Sp1-t 39 = Sd1 39). And of the first sermon can be **Mv-a 13** (= Sp4 13) and **Mv-t 13-17** (equivalent to Sp4-t 13-17 = Sd4 13-17).

| Target content | By text name | By traditional way |
|---|---|---|
| The commentary to the first mātikā above | Sp1 39, Sp1.39, Sp I 39 | Buv1-a 39, Buv-a1.39, Buv-a I 39 |
| The subcommentary to the first mātikā above | Sd1 39, Sd1.39, Sd I 39 | Buv1-t 39, Buv-t1.39, Buv-t I 39 |
| The commentary to the first sermon in Mahāvagga | Sp4 13, Sp4.13, Sp IV 13 | Mv-a 13, Mv-a.13 |
| The subcommentary to the first sermon in Mahāvagga | Sd4 13-17, Sd4.13-17, Sd IV 13-17 | Mv-t 13-17, Mv-t.13-17 |

As we have seen above, the first method is more convenient and less error-prone. Moreover, it can be used to refer to any text, not just the texts in the established hierarchy. But we have to learn how to mention a book by its name. This is not a problem because all researchers or serious students of Buddhism and Pāli should know that anyway.

However, for a simple structure of texts, using the traditional way can be less confusing. For example, to the first paragraph of the Brahmajālasutta in Dīghanikāya, we can refer to it by, for example, **D1 1**. And because there are no alternatives for exegeses in this group (except for the Sīlakkhandhavagga), we can simply refer to its commentary and subcommentary by **D1-a 1** and **D1-t 1** respectively (equivalent to **Smv1 1** and **Lpd1 1**).

### When no numbers to refer to

In some cases there is no proper series of number at all in the text. In publications, we can use page numbers for referring. In digital text like this, apart from using a bare abbreviation, we can use two following methods:

1. **Quoting a heading**. This is a rough way to do, if structure can be found at all in the text. For example, in Kaṅkhāvitaraṇī 1 (the commentary to Bhikkhupātimokkha) we can refer to the first Pārājika by **Kkh1** "Paṭhamapārājikavaṇṇanā."
2. **Quoting an excerpt**. To precisely refer to a text, there is no better way than to give a distinct portion of it. The portion should be long enough to make a unique search, for example, **Kkh1** *"Bhikkhūnaṃ sikkhāsājīvasamāpannoti yā bhikkhūnaṃ adhisīlasaṅkhātā sikkhā."*

The second method is commonly used in writing scholarly works. When a portion of text is mentioned in the body of the writing, it can be added a footnote. Then only the book abbreviation is needed in the note.

### When numbers go complex

With the structure we get from the source, the running numbers in some documents can be really complex, for example, in those of *Apadāna*, *Jātaka*, *Milindapañha*, and some others. To make the synchronization to their commentary possible, I have to add group number, separating by a colon (:), to the sequences. This may look ugly, but necessary. To precisely refer to these texts, the group number has also to be added. For instance, **Ja2.3:1** means the first gāthā of tikanipāta (group 3) of Jātaka Book 2. Other complex books can be treated in the same way.

However, for Milindapañha[^milin] the above method may not work because its numbers are so complex that they cannot be treated in the same way. By the book's structure in this collection, the numbers correspond to question numbers. So, it may be better to refer to question numbers in their group instead. The first way to do is using the decimal system with part, group, and question number. For example, the well-known carriage analogy is the first question of Part 2-3, the first group (Mahāvagga), hence **Mil 2-3.1.1**. Another way to do is using the question name directly. So, in this case it is **Mil 2-3** "Paññattipañho". 

[^milin]: The structure of Milindapañha is a little messy because it combines pieces of old and new works together. In other publications, the structure can be considerably different. Here, the original questions are in the Part 2-3 in the book (where to cut between 2 and 3 is unclear). So, I leave the structure intact and use it as it is. For more information, see Hinüber's *A Handbook of Pāli Literature*, pp. 82-86.

## Abbreviations

| Abbr. | Description |
|---|---|
| A | Aṅguttaranikāya |
| Ap | Apadāna |
| Ap-a | Apadāna-aṭṭhakathā |
| Bip | Bhikkhunīpātimokkha |
| Biv | Bhikkhunīvibhaṅga |
| Biv-y | Bhikkhunīvibhaṅga-yojanā |
| Bup | Bhikkhupātimokkha |
| Buv | Bhikkhuvibhaṅga |
| Bv | Buddhavaṃsa |
| Bv-a | Buddhavaṃsa-aṭṭhakathā |
| Cp | Cariyāpiṭaka |
| Cp-a | Cariyāpiṭaka-aṭṭhakathā |
| Cv | Cūḷavagga |
| Cv-y | Cūḷavagga-yojanā |
| D | Dīghanikāya |
| Dhp | Dhammapada |
| Dhp-a | Dhammapada-aṭṭhakathā |
| It | Itivuttaka |
| It-a | Itivuttaka-aṭṭhakathā |
| Ja | Jātaka |
| Ja-a | Jātaka-aṭṭhakathā |
| Khds | Khuddasikkhā |
| Khds-nt | Khuddasikkhā-abhinavaṭīkā |
| Khds-pt | Khuddasikkhā-purāṇaṭīkā |
| Khp | Khuddakapāṭha |
| Khp-a | Khuddakapāṭha-aṭṭhakathā |
| Kkh | Kaṅkhāvitaraṇī |
| Kkh-nt | Kaṅkhāvitaraṇī-abhinavaṭīkā |
| Kkh-pt | Kaṅkhāvitaraṇī-purāṇaṭīkā |
| Lpd | Līnatthappakāsinī[^lnp] (Dīghanikāya-ṭīkā) |
| Lpm | Līnatthappakāsinī (Majjhimanikāya-ṭīkā) |
| Lps | Līnatthappakāsinī (Saṃyuttanikāya-ṭīkā) |
| M | Majjhimanikāya |
| Mil | Milindapañha |
| Mls | Mūlasikkhā-ṭīkā |
| Mls-t | Mūlasikkhā |
| Mnp | Manorathapūraṇī (Aṅguttaranikāya-aṭṭhakathā) |
| Mv | Mahāvagga |
| Mv-y | Mahāvagga-yojanā |
| Nett | Nettippakaraṇa |
| Nett-a | Nettippakaraṇa-aṭṭhakathā |
| Nett-t | Nettippakaraṇa-ṭīkā |
| Nettv | Nettivibhāvinī |
| Nidd | Niddesa |
| Nidd-a | Niddesa-aṭṭhakathā |
| Pc-y | Pācityādiyojanā |
| Pps | Papañcasūdanī (Majjhimanikāya-aṭṭhakathā) |
| Psm | Paṭisambhidāmagga |
| Psm-a | Paṭisambhidāmagga-aṭṭhakathā |
| Ptkp | Peṭakopadesa |
| Pv | Petavatthu |
| Pv-a | Petavatthu-aṭṭhakathā |
| Pvr | Parivāra |
| Pvr-y | Parivāra-yojanā |
| S | Saṃyuttanikāya |
| Sd | Sāratthadīpanī (Vinaya-ṭīkā) |
| Smv | Sumaṅgalavilāsinī (Dīghanikāya-aṭṭhakathā) |
| Snp | Suttanipāta |
| Snp-a | Suttanipāta-aṭṭhakathā |
| Sp | Samantapāsādikā (Vinaya-aṭṭhakathā) |
| Srm | Sāratthamañjūsā (Aṅguttaranikāya-ṭīkā) |
| Srp | Sāratthappakāsinī (Saṃyuttanikāya-aṭṭhakathā) |
| Sv-nt | Sīlakkhandhavagga-abhinavaṭīkā |
| Thag | Theragāthā |
| Thag-a | Theragāthā-aṭṭhakathā |
| Thig | Therīgāthā |
| Thig-a | Therīgāthā-aṭṭhakathā |
| Ud | Udāna |
| Ud-a | Udāna-aṭṭhakathā |
| Utv | Uttaravinicchaya |
| Utv-t | Uttaravinicchaya-ṭīkā |
| Vjb | Vajirabuddhi (Vinaya-ṭīkā) |
| Vmv | Vimativinodanī (Vinaya-ṭīkā) |
| Vnl | Vinayālaṅkāra (Vinayasaṅgaha-ṭīkā) |
| Vns | Vinayasaṅgaha |
| Vnv | Vinayavinicchaya |
| Vnv-t | Vinayavinicchaya-ṭīkā |
| Vv | Vimānavatthu |
| Vv-a | Vimānavatthu-aṭṭhakathā |

[^lnp]: Līnatthappakāsinī is a common name. This form is most widely known. In the text, however, *Līnatthappakāsanā* is seen. Sometimes, it is called *Līnatthappakāsanī*.

> [Table of Contents](/cst)

## Notes
