---
title: "Pāli Platform 3"
permalink: /platform3
is_article: true
date: 2025-01-02 12:00:00 +0700
---

- TOC
{:toc}

![Pāli Platform 3's About](/assets/images/platform3-about-dark.png)

Finally, `Pāli Platform 3` is here. The look is not much changed, but its functions surpass the old one in many respects. This About window has something hidden. Let us find out.

## Links

The program in its beta state is quite stable now, but testing is still needed. Let us help the making the best Pāli tool. Now the program comes with an updating system or `Patch Installer`. If patches are available, the program can load and install them to itself. This is not automatically, so the users have to learn how the system works.

### Executable

- [Pali Platform v3.0.8](https://github.com/bhaddacak/paliplatform/releases){:target="\_blank"} <svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#github-alt"></use></svg> (~150-240 MB)

### Source code

- [Pāli Platform 3](https://github.com/bhaddacak/paliplatform){:target="\_blank"} <svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#github-alt"></use></svg>

### User's manual

- [Pāli Platform: The Official Manual](/ppman){:target="\_blank"} <svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#file-pdf"></use></svg>

![Pāli Platform 3's main screen](/assets/images/platform3-main-dark.png)

## Installation guide

The program is fully portable, no installation required. On 64-bit Windows (7+), you can download the `winready` package, which is ready to run on that machine. For other platforms, please consult `README.txt` in the bundle. I will not reproduce here.

Now that *Pāli Platform: The Official Manual* is available in the recent package, the full information about the program should be read from the manual.

## Notes on CST better corrected version

After I knew that the corpus of CST4 is now has an active correction system at [Tipitaka.org XML](https://github.com/vipassanatech/tipitaka-xml){:target="\_blank"}, I have utilized this corpus in the program. Apart from the corrections already applied by the maintaining team, I have also worked on my own on some undetected points. The report of my correction can be found at [Tipiṭaka Correction Report](/correport){:target="\_blank"}.

At this occasion, I have also applied the corrections to the CSTR and Gram collection, as shown in the report. That is to say, now the CST data used by the program are possibly the most updated.

## Notes on CST4 nti-fixed version

As you may know, the original CST data in digital form are in Devanagari. The way words composed in Devanagari makes inevitably the `’nti` rendition (Antonio Costanzo told me this, not exactly but close). That is unsatisfactory for Pāli learners because some information is lost.

Consider *saṅgīti’nti*[^Cv444], for example. When we cut this into two words (this always happens in the process of tokenizing or indexing), we get *saṅgīti* and *nti*. When out of its context, the accusative marker of *saṅgīti* is lost.

[^Cv444]: *Upehi taṃ saṅgīti’nti* (Cv 444)

It is better if the rendition of this becomes *saṅgītin’ti*. Then we get *saṅgītin* and *ti*. By this way, the ending *n* unambiguously marks the word as accusative.

That is the main reason I fixed *nti* in [CSTR collection](cstpage){:target="\_blank"}. In this release of PP3, I also offer the fixed-version of CST4 data. But the user must download the file separately, rename it and replace the old one in `data/text/cst4`.

It suffices to say that *n’ti* is better than *’nti*. You can also see this in non-Devanagari-based text collections, such as, SuttaCentral.

## Notes on BJT collection

The BJT of tipitaka.lk recently bundled with the program is under [CC-BY-ND](https://creativecommons.org/licenses/by-nd/4.0/){:target="\_blank"} license. I can do only convert the text into Roman script. Even many errors were found, I left them unedited.

## Manual installation of patches

This is not recommended but sometimes you may find it necessary. When patches are available in the program's releases, you may download the files to your computer. You have two options hereafter:

1. First, `Update online info` and place the patch files in directory `cache/` (if it does not exist, create one in the program's root). Then open `Patch Installer` and install the patches with the **Skip download** option checked. If the installer cannot recognize the patches (check the info button), you cannot install them in this way.
2. If the previous method fails, you have to unpack the file manually by using your known utility (WinRAR, File Roller or the like) to unpack the file into the program's root directory, replacing the old files if asked.

**IMPORTANT:** After the manual installation, you have to restart the program using either `PPLauncher.exe`, `PPLauncher.rar`, `launch.cmd`, or `launch.sh`, NOT `run.cmd` or `run.sh`.

Since the patch installation is destructive, it can unexpectedly break the program. So, it is better to keep the original program's zip file at hand to use as an emergency recovery.

## Manual installation of DPD and SuttaCentral data

Even though the program has download helpers for DPD and SuttaCentral data, in some situations you may need to install them manually. For example, you may want to use the latest release of DPD.

### DPD

When a new release of DPD is launched, I need some time to test that its structure is not changed to the extent that it may break the program's functionality. But, sometimes I have no access to the Internet for weeks or even months. The update for the link therefore can be late.

To solve the problem *ad hoc*, you need to know how to put the file properly, but at the risk of breaking the system (rarely, I suppose).

- Download `dpd.db.tar.bz2` from the DPD Releases to your computer.
- You have two options hereafter:
    1. Unpack it yourself with your known utility and place or replace `dpd.db` in directory `data/db/`.
    2. To use the program's unpacker, you have to place `dpd.db.tar.bz2` in directory `cache/` (if not exist, create one at the program's root). Then use the `DPD downloader` to install the file with the **Skip download** option checked. Then wait for some minutes.

Recently, I added a script wrapper of `DpdUtil` (available in version RC1 onward) to ease the test. This can check the applicability of the database by a command line. After the database is unpacked or installed to the program, enter this command:

```
(Linux/macOS)
$ ./dpdutil.sh -t

(Windows)
> dpdutil -t
```

### SuttaCentral

In the case of SuttaCentral data, it will be easier because the link is unlikely to change and we use the whole zip file.

- Download the whole published source of *SuttaCentral Bilara data* from [`github.com/suttacentral/bilara-data`](https://github.com/suttacentral/bilara-data){:target="\_blank"}. The obtained file is named `bilara-data-published.zip`.
- Place or replace the file in `data/text/sc/`. If directory `sc` does not exist, create a new one.

The structure of SC data is quite stable. So, the new file is unlikely to break the program. If it is the case, however, please report this to me.

## ScUtil (SuttaCentral Utilities)

When I made the reader for SuttaCentral corpus, I made myself a tool to deal with its data. This is called `ScUtil`. It is quite useful for programming-inclined persons. So, I made it easy to access. The program can list files, show text, and many more.

To use `ScUtil`, you have to make the program ready to run first (JavaFX is required but not used), and you have to use it at the program's root directory. Open a terminal there, then use its wrapper script this way:

```
(Linux/macOS)
$ ./scutil.sh

(Windows)
> scutil
```

The program has only CLI mode and some help. Please read the help carefully. Here is an example to show MN1 in the terminal:

```
(Linux/macOS)
$ ./scutil.sh show -t mn1

(Windows)
> scutil show -t mn1
```

## Notes on Myanmar script transliteration

I have tackled with Myanmar script transformation for several days after knowing that the former conversion is wrong in many places. I myself do not know Myanmar, so it is really awkward to me to solve the problem. Thanks to Antonio Costanzo, I can handle it in the end.

Now we can convert Roman to Myanmar correspondingly well enough to the printed texts (but still not perfect). But we also lose the Myanmar to Roman converting capacity. That is inevitably because in many cases we have to manipulate the characters programmatically. Reverting the conversion is very difficult, so I drop this functionality.

Unfortunately, the conversion does not conform to any standard, and indeed it uses a lot of tinkering. The main reason is Java cannot handle Myanmar script well enough (due to the lack of standard, I guess). As a result, we have to use exclusive fonts modified for this purpose only. And the texts produced by the conversion cannot be used elsewhere without the use of these fonts.

Recently, I brought back the straight conversion of Myanmar script, available only in Batch Script Transformer. This can convert Roman text to Myanmar in a sort of standard way that can be used elsewhere. Still, the conversion is close enough to that done by the CST4 program (not identical) and far from perfect.
