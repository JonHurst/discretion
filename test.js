"use strict";

import {onInputChanged} from "./script.js";
import { DateTime, Settings } from "./modules/luxon.js";


const query = document.getElementById("query");
const result = document.getElementById("result");
const output = document.getElementById("output");

function add_output(s, class_) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(s));
    if( class_) {
        p.classList.add(class_);
    }
    output.appendChild(p);
    return p;
}


add_output("KEY: query report sectors zone i1 i1_disc i2 i2_disc oma oma_disc j1 j1_disc omax omax_disc ...result", "key");


let mock_now = DateTime.fromObject({year: 2025, month: 1, day:1 });
Settings.now = () => mock_now;
add_output(mock_now.toISODate(), "date");

let expected = {
    "05001": "05001 05:00Z 1 Europe/London 16:15Z 18:15Z 16:15Z 18:15Z 17:00Z 19:00Z N/A N/A N/A N/A",
    "050010": "050010 05:00Z 1 UTC+0 16:15Z 18:15Z 16:15Z 18:15Z 17:00Z 19:00Z N/A N/A N/A N/A",
    "05002": "05002 05:00Z 2 Europe/London 16:15Z 18:15Z 16:15Z 18:15Z 17:00Z 19:00Z N/A N/A N/A N/A",
    "05594": "05594 05:59Z 4 Europe/London 15:59Z 17:59Z 14:59Z 16:59Z 17:44Z 19:44Z N/A N/A N/A N/A",
    "06152": "06152 06:15Z 2 Europe/London 19:15Z 21:15Z 19:15Z 21:15Z 19:15Z 21:15Z 19:30Z 21:15Z 19:30Z 21:15Z",
    "06154": "06154 06:15Z 4 Europe/London 18:00Z 20:00Z 17:00Z 19:00Z 18:15Z 20:15Z N/A N/A 18:30Z 20:15Z",
    "14003": "14003 14:00Z 3 Europe/London 02:00Z 04:00Z 01:30Z 03:30Z 02:00Z 04:00Z N/A N/A 03:00Z 04:00Z",
    "21595": "21595 21:59Z 5 Europe/London 07:29Z 09:29Z 06:59Z 08:59Z 07:29Z 09:29Z N/A N/A N/A N/A",
    "16009": "16009 16:00Z 9 Europe/London 01:00Z 03:00Z 01:00Z 03:00Z 01:00Z 03:00Z N/A N/A N/A N/A",
}


for(let v of ["05001", "050010", "05002", "05594", "06152", "06154",
              "14003", "21595", "16009"]) {
    query.value = v;
    onInputChanged();
    let r = `${v} ${result.innerText.replace(/\s+/g, " ")}`;
    let check = (r == expected[v] ? "Ok" : "Failed");
    add_output(`${r} ...${check}`, check);
}

mock_now = DateTime.fromObject({year: 2025, month: 6, day:1 });
add_output(mock_now.toISODate(), "date");

expected = {
    "04001": "04001 04:00Z 1 Europe/London 15:15Z 17:15Z 15:15Z 17:15Z 16:00Z 18:00Z N/A N/A N/A N/A",
    "040011": "040011 04:00Z 1 UTC+1 15:15Z 17:15Z 15:15Z 17:15Z 16:00Z 18:00Z N/A N/A N/A N/A",
    "050010": "050010 05:00Z 1 UTC+0 16:15Z 18:15Z 16:15Z 18:15Z 17:00Z 19:00Z N/A N/A N/A N/A",
    "050013": "050013 05:00Z 1 UTC+3 18:00Z 20:00Z 18:00Z 20:00Z 18:00Z 20:00Z 19:00Z 20:00Z 19:00Z 20:00Z",
};

for(let v of ["04001", "040011", "050010", "050013"]) {
    query.value = v;
    onInputChanged();
    let r = `${v} ${result.innerText.replace(/\s+/g, " ")}`;
    let check = (r == expected[v] ? "Ok" : "Failed");
    add_output(`${r} ...${check}`, check);
}

result.style = "display:none;";
