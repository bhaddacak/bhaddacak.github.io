/*! thaiholydays.js (c) J.R. Bhaddacak @license (GPL3) */
"use strict";
// defining part
const thaiHolyDays = {};
thaiHolyDays.version = "1.0";
thaiHolyDays.yearStart = 1928;
thaiHolyDays.yearEnd = 2129;
thaiHolyDays.baseDateMilis = Date.UTC(1927, 11, 1);
thaiHolyDays.yearsOfExtraDay = [ 1929, 1933, 1936, 1943, 1949, 1952, 1957, 1963, 1970, 1973, 1979, 1987, 1990, 1997, 2000, 2005, 2009, 2016, 2020, 2025, 2031, 2036, 2041, 2046, 2052, 2057, 2062, 2066, 2073, 2077, 2082, 2087, 2093, 2098, 2103, 2109, 2114, 2119, 2123, 2128 ];
thaiHolyDays.metonicNumsOfExtraMonth = [ 0, 3, 6, 8, 11, 14, 17 ];
thaiHolyDays.defiantYears = [ [2050, 384], [2051, 354], [2069, 384], [2070, 354], [2088, 384], [2089, 354], [2107, 384], [2108, 354], [2126, 384], [2127, 354] ];
thaiHolyDays.calTable = {
	// data format = Thai month : Thai lunar day (+ waxing, - waning) : number of days in each step
	y354: [ "1:8+:7", "1:15+:8", "1:8-:6", "1:14-:8", "2:8+:7", "2:15+:8", "2:8-:7", "2:15-:8", "3:8+:7", "3:15+:8", "3:8-:6", "3:14-:8", "4:8+:7", "4:15+:8", "4:8-:7", "4:15-:8", "5:8+:7", "5:15+:8", "5:8-:6", "5:14-:8", "6:8+:7", "6:15+:8", "6:8-:7", "6:15-:8", "7:8+:7", "7:15+:8", "7:8-:6", "7:14-:8", "8:8+:7", "8:15+:8", "8:8-:7", "8:15-:8", "9:8+:7", "9:15+:8", "9:8-:6", "9:14-:8", "10:8+:7", "10:15+:8", "10:8-:7", "10:15-:8", "11:8+:7", "11:15+:8", "11:8-:6", "11:14-:8", "12:8+:7", "12:15+:8", "12:8-:7", "12:15-:8" ],
	y355: [ "1:8+:7", "1:15+:8", "1:8-:6", "1:15-:8", "2:8+:7", "2:15+:8", "2:8-:7", "2:15-:8", "3:8+:7", "3:15+:8", "3:8-:6", "3:14-:8", "4:8+:7", "4:15+:8", "4:8-:7", "4:15-:8", "5:8+:7", "5:15+:8", "5:8-:6", "5:14-:8", "6:8+:7", "6:15+:8", "6:8-:7", "6:15-:8", "7:8+:7", "7:15+:8", "7:8-:7", "7:15-:8", "8:8+:7", "8:15+:8", "8:8-:7", "8:15-:8", "9:8+:7", "9:15+:8", "9:8-:6", "9:14-:8", "10:8+:7", "10:15+:8", "10:8-:7", "10:15-:8", "11:8+:7", "11:15+:8", "11:8-:6", "11:14-:8", "12:8+:7", "12:15+:8", "12:8-:7", "12:15-:8" ],
	y384: [ "1:8+:7", "1:15+:8", "1:8-:6", "1:14-:8", "2:8+:7", "2:15+:8", "2:8-:7", "2:15-:8", "3:8+:7", "3:15+:8", "3:8-:6", "3:14-:8", "4:8+:7", "4:15+:8", "4:8-:7", "4:15-:8", "5:8+:7", "5:15+:8", "5:8-:6", "5:14-:8", "6:8+:7", "6:15+:8", "6:8-:7", "6:15-:8", "7:8+:7", "7:15+:8", "7:8-:6", "7:14-:8", "8:8+:7", "8:15+:8", "8:8-:7", "8:15-:8", "88:8+:7", "88:15+:8", "88:8-:7", "88:15-:8", "9:8+:7", "9:15+:8", "9:8-:6", "9:14-:8", "10:8+:7", "10:15+:8", "10:8-:7", "10:15-:8", "11:8+:7", "11:15+:8", "11:8-:6", "11:14-:8", "12:8+:7", "12:15+:8", "12:8-:7", "12:15-:8" ]
};
thaiHolyDays.formatDateInput = function(input) {
	return input.length >= 4
			? input.indexOf("-") > -1
				? input.substr(0, 7)
				: input.substr(0, 4) + "-" + input.substr(4, 2)
			: "";
};
thaiHolyDays.getTargetMonth = function(input) {
	// convert input string to TargetMonth object, month 1 = Jan
	const result = { year: null, month: null };
	if (input !== undefined) {
		const ymd = input.split(/-/);
		result.year = isNaN(ymd[0]) || ymd[0].length === 0 ? null : parseInt(ymd[0]);
		result.month = isNaN(ymd[1]) || ymd[1].length === 0 ? null : parseInt(ymd[1]);
	}
	return result;
};
thaiHolyDays.validateTargetMonth = function(targetMonth) {
	let messResult = "";
	if (targetMonth.year === null) {
		messResult = "Error: invalid input";
	} else {
		if (targetMonth.year < this.yearStart || targetMonth.year > this.yearEnd) {
			messResult = "Error: input out of range";
		} else if (targetMonth.month !== null && (targetMonth.month < 1 || targetMonth.month > 12)) {
			messResult = "Error: invalid month number";
		}
	}
	return messResult;
};
thaiHolyDays.getDayCount = function(year) {
	if (!Number.isInteger(year)) return 0;
	if (year < this.yearStart || year > this.yearEnd) return 0;
	let defiantCount = 0;
	for (const dy of this.defiantYears) {
		if (year === dy[0]) {
			defiantCount = dy[1];
			break;
		}
	}
	return defiantCount > 0
			? defiantCount
			: this.yearsOfExtraDay.indexOf(year) > -1
				? 355
				: this.metonicNumsOfExtraMonth.indexOf((year - 1) % 19) > -1
					? 384
					: 354;
};
thaiHolyDays.getThaiYear = function(year) {
	// 0 = rat, 1 = cow, 2 = tiger, 3 = rabbit, 4 = dragon, 5 = snake, 6 = horse, 7 = goat, 8 = monkey, 9 = rooster, 10 = dog, 11 = pig
	return (year + 8) % 12;
};
thaiHolyDays.compute = function(targetMonth, isFull = false) {
	const result = [];
	const lastYear = targetMonth.year < this.yearEnd ? targetMonth.year + 1 : this.yearEnd;
	let currDateMilis = this.baseDateMilis;
	let currDate = new Date(currDateMilis);
	for (let y = this.yearStart; y <= lastYear; y++) {
		const dayCount = this.getDayCount(y);
		if (y < targetMonth.year - 1) {
			currDateMilis = currDateMilis + (dayCount * 86400000);
			currDate = new Date(currDateMilis);
		} else if (y >= targetMonth.year - 1 && y < targetMonth.year + 2) {
			const calTable = this.calTable["y" + dayCount];
			for (const md of calTable) {
				const mdArr = md.split(/:/);
				const item = { thaimonth: mdArr[0], thaiday: mdArr[1], date: new Date(currDateMilis) };
				if (targetMonth.year === currDate.getUTCFullYear()) {
					if (isFull) {
						result.push(item);
					} else {
						if (targetMonth.month === currDate.getUTCMonth() + 1)
							result.push(item);
					}
				}
				const dayStep = parseInt(mdArr[2]);
				currDateMilis = currDateMilis + (dayStep * 86400000);
				currDate = new Date(currDateMilis);
			}
		} else {
			break;
		}
	}
	return result;
};
thaiHolyDays.computeMonth = function(dateInput) {
	const target = this.formatDateInput(dateInput);
	const targetMonth = thaiHolyDays.getTargetMonth(target);
	if (targetMonth.month === null)
		targetMonth.month = 1;
	const mess = thaiHolyDays.validateTargetMonth(targetMonth);
	if (mess.length === 0) {
		return thaiHolyDays.compute(targetMonth);
	} else {
		console.log(mess);
		return [];
	}
};
thaiHolyDays.computeYear = function(dateInput) {
	const target = this.formatDateInput(dateInput);
	const targetMonth = thaiHolyDays.getTargetMonth(target);
	const mess = thaiHolyDays.validateTargetMonth(targetMonth);
	if (mess.length === 0) {
		return thaiHolyDays.compute(targetMonth, true);
	} else {
		console.log(mess);
		return [];
	}
};
thaiHolyDays.consolePrint = function(computedResult) {
	for (const item of computedResult) {
		const dpadding = item.thaiday.length === 2 ? " " : "";
		const mpadding = item.thaimonth.length === 1 ? " " : "";
		console.log(item.date.toDateString() + " | " + dpadding + item.thaiday + " | " + mpadding + item.thaimonth);
	}
};
// working part
let input;
if (typeof process !== "undefined") {
	// node context, read from arguments
	input = process.argv[2];	
}
if (input !== undefined) {
	if (input === "-h" || input === "--help") {
		console.log("Thai Holy Days v" + thaiHolyDays.version + " by J.R. Bhaddacak");
		console.log("");
		console.log("   Usage:   $ node thaiholydays.js YYYY[-][MM]");
		console.log("");
		console.log("   Examples: $ node thaiholydays.js 2025");
		console.log("             $ node thaiholydays.js 202501");
		console.log("             $ node thaiholydays.js 2025-1");
		console.log("             $ node thaiholydays.js 2025-01");
	} else {
		const target = thaiHolyDays.formatDateInput(input);
		if (target.length > 0) {
			const targetMonth = thaiHolyDays.getTargetMonth(target);
			const mess = thaiHolyDays.validateTargetMonth(targetMonth);
			if (mess.length === 0) {
				if (targetMonth.month === null) {
					// list the whole target year
					thaiHolyDays.consolePrint(thaiHolyDays.compute(targetMonth, true));
				} else {
					// list the target month
					thaiHolyDays.consolePrint(thaiHolyDays.compute(targetMonth));
				}
			} else {
				console.log(mess);
			}
		}
	}
}
