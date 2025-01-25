---
title: "Thai Holy Days"
permalink: /thaiholydays
is_application: true
date: 2025-01-25 12:00:00 +0700
---

<script src="/assets/js/thaiholydays.js"></script>
<div class="thaicalarea">
<form name="calarea" onSubmit="return false">
<table class="thaicaltable">
<tr><td colspan=7 align="center">
<select name="monthSelector" onChange="selectMY()">
  <option>January</option>
  <option>February</option>
  <option>March</option>
  <option>April</option>
  <option>May</option>
  <option>June</option>
  <option>July</option>
  <option>August</option>
  <option>September</option>
  <option>October</option>
  <option>November</option>
  <option>December</option>
</select>
<select name="yearSelector" onChange="selectMY()">
<script language="JavaScript">
for (let y = thaiHolyDays.yearStart; y < thaiHolyDays.yearEnd; y++) {
  document.write("<option>" + y + "</option>");
}
</script>
</select>
</td></tr>
<tr>
<td class='thaical-dayhead'>Sun</td>
<td class='thaical-dayhead'>Mon</td>
<td class='thaical-dayhead'>Tue</td>
<td class='thaical-dayhead'>Wed</td>
<td class='thaical-dayhead'>Thu</td>
<td class='thaical-dayhead'>Fri</td>
<td class='thaical-dayhead'>Sat</td>
</tr>
<script language="JavaScript">
for (let i = 0; i < 42; i++) {
  if (i % 7 === 0) {
    document.write("<tr>");
  }
  document.write("<td><input class='thaicalcell-normal' type=text size=2 readonly=true name=cell" + i + " onClick=cellClicked(" + i + ") /></td>")
  if (i % 7 === 6) {
    document.write("</tr>");
  }
}
</script>
<tr><td colspan=7 align="center">
<input type="button" style="width:3em;" value="<<" onClick="prevYear()" />
<input type="button" style="width:3em;" value="<" onClick="prevMonth()" />
<input type="button" style="width:5em;" value="Today" onClick="setNow()" />
<input type="button" style="width:3em;" value=">" onClick="nextMonth()" />
<input type="button" style="width:3em;" value=">>" onClick="nextYear()" />
</td></tr>
<tr><td colspan=7 align=center>
<input name="textoutput" class="thaical-textoutput" readonly="true" type="text" />
</td></tr>
</table>
</form>
</div>
<script language="JavaScript">
const engyearnames = new Array("rat", "cow", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig");
const monthdays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
let hdpos, thaimonths, thaidays;
function isLeapYear(year) {
    return ((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)
}
function clearArea() {
  for(let c = 0; c < 42; c++) {
    document.calarea["cell" + c].value = " ";
    document.calarea["cell" + c].className = "thaicalcell-normal";
  }
  document.calarea.textoutput.value = "";
}
function draw(y, m) {
  const workingDate = new Date(Date.UTC(y, m, 1));
  const thisday = workingDate.getDay();
  const thismonth = workingDate.getMonth();
  const thisdate = workingDate.getDate();
  const thisyear = workingDate.getFullYear();
  if (isLeapYear(thisyear)) {
    monthdays[1] = 29;
  } else {
    monthdays[1] = 28;
  }
  let offset = thisdate;
  while (offset > 7)
    offset -= 7;
  offset = thisday - offset + 1;
  if (offset < 0)
    offset += 7;
  const dlist = new Array();
  for (let c = 0; c < offset; c++) {
    dlist.push("");
  }
  for (let c = 0; c < monthdays[thismonth]; c++) {
    dlist.push(c + 1);
  }
  const targetInput = thisyear + "-" + (thismonth + 1);
  const hdays = thaiHolyDays.computeMonth(targetInput);
  hdpos = new Array();
  thaimonths = new Array();
  thaidays = new Array();
  for (const item of hdays) {
    hdpos.push(item.date.getDate() + offset - 1);
    thaimonths.push(item.thaimonth);
    thaidays.push(item.thaiday);
  }
  clearArea();
  for (let c = 0; c < dlist.length; c++) {
    document.calarea["cell" + c].value = dlist[c];
  }
  for (let c = 0; c < hdpos.length; c++) {
    if (thaidays[c].slice(0,1) === "1") {
      if (thaidays[c].indexOf("+") > -1) {
        document.calarea["cell" + hdpos[c]].className = "thaicalcell-fullmoon";
      } else {
        document.calarea["cell" + hdpos[c]].className = "thaicalcell-newmoon";
      }
    } else {
      document.calarea["cell" + hdpos[c]].className = "thaicalcell-halfmoon";
    }
  }
  document.calarea.monthSelector.selectedIndex = thismonth;
  document.calarea.yearSelector.selectedIndex = thisyear - thaiHolyDays.yearStart;
  const today = new Date();
  if (today.getFullYear() === workingDate.getFullYear() && today.getMonth() === thismonth) {
    document.calarea["cell" + (today.getDate() + offset - 1)].className = "thaicalcell-today";
  }
  showInfo(hdays);
}
function showInfo(hdays) {
  const months = [];
  for (const hd of hdays) {
    if (months.indexOf(hd.thaimonth) === -1)
      months.push(hd.thaimonth);
  }
  let info = "lunar month " + months.join(", ") + " of year ";
  const years = [];
  for (const m of months) {
    const yr = parseInt(document.calarea.yearSelector.value);
    const ynum = document.calarea.monthSelector.selectedIndex >= 10 && parseInt(m) <= 2
                 ? thaiHolyDays.getThaiYear(yr + 1)
                 : thaiHolyDays.getThaiYear(yr);
    const yname = engyearnames[ynum];
    if (years.indexOf(yname) === -1)
      years.push(yname);
  }
  document.calarea.textoutput.value = info + years.join(", ");
}
function setNow() {
  const now = new Date();
  draw(now.getFullYear(), now.getMonth());
}
function nextMonth() {
  let y, m;
  if (document.calarea.monthSelector.selectedIndex === 11) {
    if (document.calarea.yearSelector.selectedIndex === document.calarea.yearSelector.length - 1)
      return;
    y = document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart + 1;
    m = 0;
  } else {
    y = document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart;
    m = document.calarea.monthSelector.selectedIndex + 1;
  }
  draw(y, m);
}
function prevMonth() {
  let y, m;
  if (document.calarea.monthSelector.selectedIndex === 0) {
    if (document.calarea.yearSelector.selectedIndex === 0)
      return;  
    y = document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart - 1;
    m = 11;
  } else {
    y = document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart;
    m = document.calarea.monthSelector.selectedIndex - 1;
  }
  draw(y, m);
}
function nextYear() {
  let y, m;
  if (document.calarea.yearSelector.selectedIndex === document.calarea.yearSelector.length - 1) {
      return;
  } else {
    y = document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart + 1;
    m = document.calarea.monthSelector.selectedIndex;
  }
  draw(y, m);
}
function prevYear() {
  let y, m;
  if (document.calarea.yearSelector.selectedIndex === 0) {
      return;
  } else{
    y = document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart - 1;
    m = document.calarea.monthSelector.selectedIndex;
  }
  draw(y, m);
}
function selectMY() {
  draw(document.calarea.yearSelector.selectedIndex + thaiHolyDays.yearStart, document.calarea.monthSelector.selectedIndex);
}
function cellClicked(pos) {
  for (let c = 0; c < hdpos.length; c++) {
    if (hdpos[c] === pos) {
      let mess = document.calarea.monthSelector.value.substr(0, 3) + " " +
                 document.calarea["cell" + hdpos[c]].value + ", " +
                 document.calarea.yearSelector.value + " = ";
      if (thaidays[c].charAt(0) === "1") {
        mess += thaidays[c].indexOf("+") > -1 ? "full-moon day" : "new-moon day";
      } else {
        mess += "half-moon day";
      }
      mess += " (" + thaidays[c] + ") ";
      mess += "of lunar month " + thaimonths[c];
      document.calarea.textoutput.value = mess;
    }
  }
}
setNow();
</script>

## Stand-alone version

As seen above, the limitation of the website's theme makes the program difficult to write. So, it is preferable to use this stand-alone version.

- [Calendar of Thai Holy Days (stand-alone)](https://bhaddacak.github.io/assets/dist/thaiholydays.html){:target="\_blank"}

Apart from a different design, this version gives you more information in both Thai and English. The program is self-contained and ready to run everywhere that has a JavaScript-enabled web browser. This is an ideal cross-platform application, the smallest and fastest of its kind.

To use the program in your device, go to the page above, save it to your device and open it with a web browser. For future uses, you may need to set a bookmark for it.

Here are abbreviations shown in the program:
- LY = Leap Year (*adhikasuradina*)
- EM = Extra Month (*adhikamāsa*)
- ED = Extra Day (*adhikavāra*)

Colors used in normal day-mode display are:
- Orange = full-moon (clickable)
- Blue = new-moon (clickable)
- Gray = half-moon (clickable)
- Green = today

For simplicity, the program computes and shows only the days marked as *holy*, i.e., new-moon day (15- or 14-), waxing half-moon day (8+), full-moon day (15+), and waning half-moon day (8-). For other days, you have to make your own simple count from known days nearby.

## In the context of Node.js

The calculating engine of the program can be used with Node.js. If you have this installed, copy [thaiholydays.js](https://bhaddacak.github.io/assets/js/thaiholydays.js){:target="\_blank"} to your place and type this command for help and follow what is guided:

```
$ node thaiholydays.js -h
```

In this context, you do not get calendar view, but instead just a list of days. However, you can either list one month at a time or a whole year.

## To use as an API

You can use the engine in your program by studying the stand-alone version mentioned above as an example. In fact, the calculation part is really small. The main work is about the display.

The main functions you can use in this case are `thaiHolyDays.computeMonth(dateInput)` and `thaiHolyDays.computeYear(dateInput)`. The former gives you a list of the specific month, the later the whole year of it. The argument `dateInput` is a string as you enter in the Node context. It is simply in `YYYY-MM` or `YYYYMM` format. A result of the functions is like an array exemplified below (from `thaiHolyDays.computeMonth("2025-01")`):

```js
[
  { thaimonth: '2', thaiday: '8+', date: 2025-01-06T00:00:00.000Z },
  { thaimonth: '2', thaiday: '15+', date: 2025-01-13T00:00:00.000Z },
  { thaimonth: '2', thaiday: '8-', date: 2025-01-21T00:00:00.000Z },
  { thaimonth: '2', thaiday: '15-', date: 2025-01-28T00:00:00.000Z }
]
```

## A minimum explanation

Thai lunar calendar is a messy topic. I do not want to go deep in this issue. But the calendar is really indispensable to Thai culture, especially parts related to Buddhism. Buddhists have to know when to go to temples or when to celebrate an important Buddhist day, such as Vesak (full-moon of lunar month 6).

As monks, we have to know the time of the Vassa (rain-retreat), when to shave our head (Thai monks shave their head on the day before full-moon. Some do it on the day before new-moon as well.), or when to gather in *Pāṭimokkha* recitation (in full-moon and new-moon day).

When "*holy* days" is used here, it is not meant to be sacred in any way (but these days are often taken as auspicious). By *holy* I mean simply *religion-related*. In each month we normally have 4 days of these, or (rarely) 5 days. Devout Buddhists go to temples on these occasions. The days are marked by lunar calendar.

Whereas the real calculation is too difficult to talk about, the basic idea is quite simple. As a matter of fact, days counted by the moon cycles are not equal to days calculated by the orbit of the sun. Normally, 12 lunar cycles make around 354 days, and the sun goes roughly 365 days a cycle. To use the two systems together, we have to find a way to align them.

Here is the Thai method. In a regular year, even lunar months have 30 days each, and odd lunar months have 29 days (6\*30 + 6\*29 = 354). Every 2-3 years or so, an extra month (*adhikamāsa*) have to be added. This makes that year have 13 months or 384 days totally. Traditionally, month 8 is doubled and we normally see the latter 8 as 88 in calendars of that year. In Buddhist context, the Vassa starts after the full-moon of month 8. In the case of 13-month years, the Vassa starts in month 88 instead.

That is not enough to make the alignment. Every 5-6 years or so, an extra day (*adhikavāra*) have to be added also. (By principle, the extra day will not be added in extra-month years.) In this case, the year has 355 days. And the extra day will be added to month 7, making it 30 days that year. (In a normal odd month, it has only 14 waning-moon day. In this case, it also has 15 waning-moon day.)

The hard problem of the whole matter is when to put the extra day (and the extra month, in a lesser degree). Historically speaking, we have had many methods to treat this, and disagreements abounded. What makes this difficult is that the problem is not so completely scientific that it can be solved with calculation alone. This involves a kind of personal judgment. Formally, we have to wait for the announcement from Thai Royal Astronomers for problematic cases.

Now come to our program. Formerly, I created a simple program to use personally with data calculated by spreadsheets, and I updated the data every 10 years. When my difficult works have been settled, I had time to rewrite the program. The calculation is simple because I do not do the hard things. The main data come from calculations done by Loy Chunpongthong in *Astronomical and Mathematical Thai Calendar* printed by the National Astronomical Research Institute of Thailand (NARIT).[^loy]

[^loy]: ลอย ชุนพงษ์ทอง, *ปฏิทินไทย เชิงดาราศาสตร์ และคณิตศาสตร์*, กรุงเทพ: สถาบันวิจัยดาราศาสตร์แห่งชาติ, ๒๕๕๐ (2007).

The substantial data taken are years marked by the extra-day, and, in a lesser extent, years marked by the extra-month. By the range of the calendar (around 200 years), we mostly can calculate the extra-month years by metonic-cycle number. Only 10 years defy the calculation, so I took the data directly. (For the details, please study the program.)

Please also remember that calendar is an approximation. The real full moon may be off by a day or two comparing to the calendar. If you need precise information, please use a proper scientific calculation.

To conclude, this will be the last rewrting of the program because its data now covers my lifespan and much more. By its reliability, I think it is unlikely that we will have to fix the data. But the future is really uncertain. When some discrepancies occur, however, the program is now easy to learn and fix because we really do not have real calculation here.
