---
title: "Pāli Platform 3"
permalink: /platform3
is_article: true
date: 2024-10-18 12:00:00 +0700
---

- TOC
{:toc}

![Pāli Platform 3's About](/assets/images/platform3-about-dark.png)

Finally, `Pāli Platform 3` is here. The look is not much different, but its functions surpass the old one in many respects. This About window has something hidden. Let us find out.

## Links

The program in its beta state is quite stable now, but testing is still needed. Let us help the making the best Pāli tool. Now the program comes with an updating system or `Patch Installer`. If patches are available, the program can load and install them to itself. This is not automatically, so the users have to learn how the system works.

### Executable

- [PaliPlatform3.0-beta1](https://github.com/bhaddacak/paliplatform/releases){:target="\_blank"} <svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#github-alt"></use></svg> (~140-220 MB)<span class="label label-green">new</span>

### Source code

- [Pāli Platform 3](https://github.com/bhaddacak/paliplatform){:target="\_blank"} <svg class="icon"><use xlink:href="/assets/fontawesome/custom.svg#github-alt"></use></svg>

![Pāli Platform 3's main screen](/assets/images/platform3-main-dark.png)

## Installation guide

The program is fully portable, no installation required. On 64-bit Windows (7+), you can download the `winready` package, which is ready to run on that machine. For other platforms, please consult `README.txt` in the bundle. I will not reproduce here.

Since there is no dedicated manual for this version yet, please take time to learn the program by yourselves. It is really powerful. Most windows has their help, and the interface is easy to understand. You have to be familiar with it first. This product comes from countless hours of my engineering effort in years. 

For the old manual, see [PP2Man](ppmanual).

## Notes on CST4 nti-fixed version

As you may know, the original CST data in digital form are in Devanagari. The way words composed in Devanagari makes inevitably the `’nti` rendition (Antonio Costanzo told me this, not exactly but close). That is unsatisfactory for Pāli learners because some information is lost.

Consider *saṅgīti’nti*[^Cv444], for example. When we cut this into two words (this always happens in the process of tokenizing or indexing), we get *saṅgīti* and *nti*. When out of its context, the accusative marker of *saṅgīti* is lost.

[^Cv444]: *Upehi taṃ saṅgīti’nti* (Cv 444)

It is better if the rendition of this becomes *saṅgītin’ti*. Then we get *saṅgītin* and *ti*. By this way, the ending *n* unambiguously marks the word as accusative.

That is the main reason I fixed *nti* in [CSTR collection](cstpage). In this release of PP3, I also offer the fixed-version of CST4 data. But the user must download the file separately, rename it and replace the old one in `data/text/cst4`.

It suffices to say that *n’ti* is better than *’nti*. You can also see this in non-Devanagari-based text collections, such as, SuttaCentral.

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
