const { cls } = require("aftc-node-tools");
const aftc = require("aftc-node-tools")
const log = aftc.log;
const fs = require('fs');
const fsExtra = require('fs-extra')
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let dbFile = path.resolve('./Serumpresetdb.dat');
if (fsExtra.existsSync(dbFile)=== false){
    cls();
    log("YOU NEED TO COPY YOUR Serumpresetdb.dat file to this project folder!".red);
    return;
}




// ###### SET YOUR PATH TO YOUR SERUM PRESETS BELOW
let dir = path.resolve("F:\\MusicMaker\\Presets\\Serum Presets\\Presets");
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #



aftc.cls();
log("Please wait this can take a while....".green);

// log(dir);
let db = new sqlite3.Database(dbFile);
let sql = "SELECT Category, PresetDisplayName, PresetRelativePath, Rating FROM SerumPresetTable WHERE Rating > 1";

start()

async function start() {

    let presetsDir = path.resolve("./presets");


    // Setup presets dir (for your new presets)
    let presetsDirExists = await fsExtra.existsSync(presetsDir);
    if (presetsDirExists === true) {
        // delete it so we start fresh
        // await fsExtra.rmdir(presetsDir)
        await fsExtra.rmdir(presetsDir, { recursive: true });
        await fsExtra.mkdir(presetsDir)
    } else {
        await fsExtra.mkdir(presetsDir)
    }


    setTimeout(async () => {
        await stage2();
    }, 1500)

}
// - - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - -- - - - - - - - - - - - - - - -


async function stage2() {


    db.all(sql, [], async (err, rows) => {
        if (err) {
            throw err;
        }

        let errorCount = 0;
        let presetsCopies = 0;
        let foldersCreated = 0;

        for await (let row of rows) {
            let category = "Misc";
            if (row.Category != "") {
                category = row.Category;

                // Fix some category names
                if (category == "Hit/Stab") {
                    category = "Hits & Stabs";
                }
                // category = category.replace("/"," & ");

            }

            let folder = path.resolve("./presets/" + category)
            // log(folder)

            let folderExists = await fsExtra.existsSync(folder);
            if (folderExists === false) {
                foldersCreated++;
                await fsExtra.mkdir(folder);
            }

            let source = path.resolve((dir + "/" + row.PresetRelativePath + "/" + row.PresetDisplayName + ".fxp"));
            let exists = await fsExtra.existsSync(source);

            if (exists == false) {
                errorCount++;
                log(`ERROR: Unable to find file: ${source}`)
            } else {
                let target = path.resolve("./presets/" + category + "/" + row.PresetDisplayName + ".fxp");
                // log(target);

                await fsExtra.copy(source, target);
                presetsCopies++;
            }



        }

        log(`User category folders created: ${foldersCreated}`.yellow)
        log(`${presetsCopies} presets copied to the appropriate category folders`.yellow)
        log("Done...\n".green)

        log("Your next steps".green)
        log("1. Backup your serum database and presets folder.".cyan);
        log("2. Delete your serum database file and the contents of your serum user presets folder.".cyan);
        log("3. Copy the contents of the presets folder in this project folder to your serum presets user folder.".cyan);
        log("4. Start up your DAW and open serum, sit back and wait for it to scan your presets.".cyan);



    });








    // close the database connection
    db.close();


}