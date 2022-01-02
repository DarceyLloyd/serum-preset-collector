# Serum Preset Collector

### Why did I make this?
Over time I've been getting serum presets given to me via free emails from various websites and some come packaged in with sample libraries etc etc etc. And I've ended up with a huge collection of duplicates or crap presets... So I wanted something to slim things down to only the presets I liked, so I wrote this little utility.

### Usage guide

## STEP 1.
Go through your entire serum preset collection and rate everything you like 2 stars or more
<br>WARNING: Only presets with a rating of 2 stars and more will be copied to the presets folder

## STEP 2a
Download this github repository and extract to a folder somewhere on your computer. Then find your <b>Serumpresetdb.dat</b> file and copy it to this project folder, for windows users it's located at:<br> <b>C:\Users\<your user name here>\AppData\Roaming\Xfer</b> <br>
For mac users, I'm not sure, give it a quick google, it shouldn't be hard to find

## STEP 2b
Set your preset path.
Open the start.js file and see line 19.
```
let dir = path.resolve("F:\\MusicMaker\\Presets\\Serum Presets\\Presets");
```
Set this to your serum presets path, for windows users I think this is in your MyDocuments XFER serum folder, but I moved mine...
NOTE: Windows users need to use a double \\ instead of a single \

## STEP 3.
Make sure you have nodejs installed. Google nodejs download, its' easy enough to find and free.

## STEP 4.
Open a terminal, shell, cli, dos, cmd, powershell and CD to this project directory (use commands such as CD, LS, DIR etc).<br> NOTE: Install nodejs first then open terminal, shell, cli, dos, cmd, powershell so it can find the node command

## STEP 5.
Install the tools the project needs to run by running the following command
```
npm install
```

## STEP 6.
Check what the stats of your collection and what your going to get out of it
```
node info
```

## STEP 7.
Now lets get the job done and filter off all the crap and keep what you like.<br>
NOTE: Your presets wont be touched, it's up to you to remove them and swap them out for the content of the presets folder which will be generated in this project folder. I would recommend making a backup of them for safe keeping.
```
node info
```
This will make a copy of all presets with 2 stars or more in the presets folder in this project folder.

<br>
<hr>

## Now to get your new clean/good set of presets into Serum and to start with a clean serum preset database
NOTE: It's recommended you start with a new serum preset database as it keeps all the old crap in it...

<hr>
<br>

## STEP 8.
Backup your serum database and presets folder.

## STEP 9.
Delete your serum database file and the contents of your serum user presets folder.

## STEP 10.
Copy the contents of the presets folder in this project folder to your serum presets user folder.

## STEP 11.
Start up your DAW and open serum, sit back and wait for it to scan your presets

<hr><br>
<br>

## <b>NOTE: You will loose your preset ratings but at least you will be rid of all the presets which are crap.</b>


<hr><br>
<br>


## <b>Duplicate Preset Removal.</b>

### Step 1
Download dupeGuru

### Step 2
Set to scan file contents

### Step 3
Click on more options, make sure "ignore files smaller than 10kb is unchecked"

### Step 4
Drag your serum presets folder into dupeGuru (make backup 1st) and click scan (bottom right)

### Step 5
Open "Mark" menu, select "Mark All"

### Step 6
Open "Actions" menu, select "Send marked to recycle bin"