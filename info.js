const aftc = require("aftc-node-tools")
const log = aftc.log;
const fs = require('fs');
const fsExtra = require('fs-extra')
const path = require('path');
var spawn = require('child_process').spawn;

// https://www.sqlitetutorial.net/sqlite-nodejs/query/
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(path.resolve('./Serumpresetdb.dat'));



// DB: Serumpresetdb
// Tables:
//  - SerumMasterInfo
//  - SerumPresetTable
aftc.cls();



let sql = "";
let crapCount = 0;


// no of presets
sql = "SELECT count(Rating) as count FROM SerumPresetTable";
// sql = "SELECT * FROM SerumPresetTable LIMIT 10";

db.get(sql, [], (err, row) => {
    if (err) {
        throw err;
    }

    log(`Found ${row.count} presets.`.green)
});



// How many presets with > 1 rating
sql = "SELECT count(Rating) as count FROM SerumPresetTable WHERE Rating > 1";
// sql = "SELECT * FROM SerumPresetTable LIMIT 10";

db.get(sql, [], (err, row) => {
    if (err) {
        throw err;
    }

    log(`Found ${row.count} presets with 2 or more stars.`.yellow)


    sql = "SELECT PresetDisplayName, PresetRelativePath, Rating FROM SerumPresetTable WHERE Rating < 2";
    // sql = "SELECT * FROM SerumPresetTable LIMIT 10";


    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            // log(row.Rating);
            if (row.Rating == 1) {
                let preset = row.PresetRelativePath + "/" + row.PresetDisplayName;
                // log(preset);
            }

        });
        log(`Found ${rows.length} presets with 0 or 1 stars.`.yellow)
        crapCount = rows.length;
    });


});









let noStarCount = 0;
sql = "SELECT Count(Rating) as count FROM SerumPresetTable WHERE Rating = 0";
// sql = "SELECT * FROM SerumPresetTable LIMIT 10";
db.get(sql, [], (err, row) => {
    if (err) {
        throw err;
    }

    noStarCount = row.count;
});

let goodCount = 0;
sql = "SELECT Count(Rating) as count FROM SerumPresetTable WHERE Rating > 1";
// sql = "SELECT * FROM SerumPresetTable LIMIT 10";
db.get(sql, [], (err, row) => {
    if (err) {
        throw err;
    }

    goodCount = row.count;

    sql = "SELECT Count(PresetDisplayName) as count FROM SerumPresetTable";
    // sql = "SELECT * FROM SerumPresetTable LIMIT 10";
    db.get(sql, [], (err, row) => {
        if (err) {
            throw err;
        }

        let p = Math.ceil((100 / row.count) * crapCount);
        log(`You have ${row.count} presets of which ${p}% are crap...`.cyan);
        log(`You have ${goodCount} good presets...`.green);
        log(`${noStarCount} presets have yet to be rated!`.red);
    });
});








// close the database connection
db.close();