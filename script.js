"use strict";

import { DateTime, Duration, Settings } from "./modules/luxon.js";

const ZONE = "Europe/London";
const ID = id => document.getElementById(id);

const table_i1 = [
    "0000 11:00 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00 09:00",
    "0500 11:15 11:15 10:30 10:00 10:00 10:00 09:30 09:00 09:00 09:00",
    "0600 13:00 13:00 12:30 11:45 11:00 10:30 10:00 10:00 09:30 09:00",
    "0800 13:00 13:00 12:30 12:00 11:30 11:00 10:30 10:00 09:30 09:00",
    "1300 13:00 13:00 12:30 11:45 11:00 10:30 10:00 10:00 09:30 09:00",
    "1330 12:45 12:45 12:15 11:45 11:00 10:30 10:00 09:45 09:15 09:00",
    "1400 12:30 12:30 12:00 11:30 11:00 10:30 10:00 09:30 09:00 09:00",
    "1430 12:15 12:15 11:45 11:15 10:45 10:15 09:45 09:15 09:00 09:00",
    "1500 12:00 12:00 11:30 11:00 10:30 10:00 09:30 09:00 09:00 09:00",
    "1530 11:45 11:45 11:15 10:45 10:15 09:45 09:15 09:00 09:00 09:00",
    "1600 11:30 11:30 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00",
    "1630 11:15 11:15 10:45 10:15 09:45 09:15 09:00 09:00 09:00 09:00",
    "1700 11:00 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00 09:00",
    "2200 11:00 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00 09:00",
];

const table_i2 = [
    "0000 11:00 11:00 09:30 09:00 09:00 09:00 09:00 09:00 09:00 09:00",
    "0500 11:15 11:15 09:30 09:00 09:00 09:00 09:00 09:00 09:00 09:00",
    "0600 13:00 13:00 11:30 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "0800 13:00 13:00 12:30 11:45 11:00 10:30 10:00 09:30 09:30 09:00",
    "1300 13:00 13:00 11:30 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "1330 12:45 12:45 11:30 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "1400 12:30 12:30 11:30 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "1430 12:15 12:15 11:30 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "1500 12:00 12:00 11:30 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "1530 11:45 11:45 11:15 10:45 10:00 09:30 09:00 09:00 09:00 09:00",
    "1600 11:30 11:30 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00",
    "1630 11:15 11:15 10:45 10:15 09:45 09:15 09:00 09:00 09:00 09:00",
    "1700 11:00 11:00 10:30 09:45 09:00 09:00 09:00 09:00 09:00 09:00",
    "2200 11:00 11:00 09:30 09:00 09:00 09:00 09:00 09:00 09:00 09:00",
];

const table_oma = [
    "0000 11:00 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00 09:00",
    "0500 12:00 12:00 11:30 11:00 10:30 10:00 09:30 09:00 09:00 09:00",
    "0515 12:15 12:15 11:45 11:15 10:45 10:15 09:45 09:15 09:00 09:00",
    "0530 12:30 12:30 12:00 11:30 11:00 10:30 10:00 09:30 09:00 09:00",
    "0545 12:45 12:45 12:15 11:45 11:15 10:45 10:15 09:45 09:15 09:00",
    "0600 13:00 13:00 12:30 12:00 11:30 11:00 10:30 10:00 09:30 09:00",
    "1330 12:45 12:45 12:15 11:45 11:15 10:45 10:15 09:45 09:15 09:00",
    "1400 12:30 12:30 12:00 11:30 11:00 10:30 10:00 09:30 09:00 09:00",
    "1430 12:15 12:15 11:45 11:15 10:45 10:15 09:45 09:15 09:00 09:00",
    "1500 12:00 12:00 11:30 11:00 10:30 10:00 09:30 09:00 09:00 09:00",
    "1530 11:45 11:45 11:15 10:45 10:15 09:45 09:15 09:00 09:00 09:00",
    "1600 11:30 11:30 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00",
    "1630 11:15 11:15 10:45 10:15 09:45 09:15 09:00 09:00 09:00 09:00",
    "1700 11:00 11:00 10:30 10:00 09:30 09:00 09:00 09:00 09:00 09:00",
];

const table_j1 = [
    "0000 N/A N/A",
    "0615 13:15 13:15",
    "0630 13:30 13:30",
    "0645 13:45 13:45",
    "0700 14:00 14:00",
    "1330 13:45 13:45",
    "1400 13:30 13:30",
    "1430 13:15 13:15",
    "1500 13:00 13:00",
    "1530 12:45 12:45",
    "1600 12:30 12:30",
    "1630 12:15 12:15",
    "1700 12:00 12:00",
    "1730 11:45 11:45",
    "1800 11:30 11:30",
    "1830 11:15 11:15",
    "1900 N/A N/A",
];

const table_omax = [
    "0000 N/A   N/A   N/A   N/A   N/A",
    "0615 13:15 13:15 12:45 12:15 11:45",
    "0630 13:30 13:30 13:00 12:30 12:00",
    "0645 13:45 13:45 13:15 12:45 12:15",
    "0700 14:00 14:00 13:30 13:00 12:30",
    "1330 13:45 13:45 13:15 12:45 N/A",
    "1400 13:30 13:30 13:00 12:30 N/A",
    "1430 13:15 13:15 12:45 12:15 N/A",
    "1500 13:00 13:00 12:30 12:00 N/A",
    "1530 12:45 12:45 N/A   N/A   N/A",
    "1600 12:30 12:30 N/A   N/A   N/A",
    "1630 12:15 12:15 N/A   N/A   N/A",
    "1700 12:00 12:00 N/A   N/A   N/A",
    "1730 11:45 11:45 N/A   N/A   N/A",
    "1800 11:30 11:30 N/A   N/A   N/A",
    "1830 11:15 11:15 N/A   N/A   N/A",
    "1900 N/A   N/A   N/A   N/A   N/A",
];


function parse_query(q) {
    // q is a string of either 5 or 6 digits
    // The first 4 digits are the UTC time of report
    // The fifth digit is the number of sectors
    // The optional sixth digit is a timezone override -- if the digit
    //   is n the timezone is "UTC+n"
    q = q.replace(/\s+/g, "");
    if(q.length < 5 || q.length > 6 || !/^\d+$/.test(q)) {
        return null;
    }
    let report, sectors, offset;
    report = DateTime.fromFormat(q.slice(0, 4), "HHmm", { zone: "UTC" });
    if(report.invalid) {
        return null;
    }
    sectors = parseInt(q[4]);
    if(sectors == 0) {
        return null;
    }
    offset = q.length == 6 ? parseInt(q[5]) : null;
    return { report, sectors, offset };
}


function lookup_duration(table, utc_report, sectors, zone) {
    let time_str = utc_report.setZone(zone).toFormat("HHmm");
    let c = 1;
    for(; c < table.length; c++) {
        if(time_str < table[c].slice(0, 4)) {
            break;
        }
    }
    let fields = table[c - 1].split(/\s+/);
    if(sectors >= fields.length || sectors < 1 || fields[sectors] == "N/A") {
        return null;
    }
    let [hours, minutes] = fields[sectors].split(":").map(d => parseInt(d));
    return Duration.fromObject({hours, minutes});
}


export function onInputChanged() {
    let q = parse_query(ID("query").value);
    if(!q) {
        ID("result").classList.add("hidden");
        return;
    }
    let zone = (q.offset != null) ? `UTC+${q.offset}` : ZONE;
    ID("result").classList.remove("hidden");
    ID("input_report").innerText = q.report.toISOTime({ suppressSeconds: true });
    ID("input_sectors").innerText = q.sectors;
    ID("input_tz").innerText = zone;
    let durations = new Map(
        [["i1", table_i1],
         ["i2", table_i2],
         ["j1", table_j1],
         ["oma", table_oma],
         ["omax", table_omax]]
            .map(([k, v]) => [k, lookup_duration(v, q.report, q.sectors, zone)]));
    for(let k of ["i1", "i2", "oma"]) {
        durations.set(
            k + "_disc",
            durations.get(k).plus(Duration.fromObject({ hours: 2 })));
    }
    for(let k of ["j1", "omax"]) {
        durations.set(k + "_disc", durations.get(k) && durations.get("oma_disc"));
    }
    for(let [k, v] of durations) {
        ID(k).innerText = v ? q.report.plus(v).toISOTime({ suppressSeconds: true }) : "N/A";
    }
}


function main() {
    ID("query").focus();
    ID("query").value = "";
    onInputChanged();
    ID("query").addEventListener("input", onInputChanged);
    ID("help").addEventListener("click", () => ID("help-modal").showModal());
    ID("close-modal").addEventListener("click", () => ID("help-modal").close());
    navigator?.serviceWorker.register('sw.js');
}


document.addEventListener("DOMContentLoaded", main);
