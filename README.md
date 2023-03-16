Instructions:

1. Make sure you have node.js installed.
2. Run npm install (Installs masto.js)
3. Create a document (data.json) in the same directory as the JS file. 
  - Refer to https://pastebin.com/LbuP9bMK for the formatting.
  - This document should have a maximum of 5 names/emails pairs at one time.
4. Run `node ./main.js`
5. It will generate an account, and a password String to a new file (data.txt)
6. This file will be auto generated if it doesnt exist.
7. Rate Limit is 5reqs/30min. It should take about 6h synchronously for 61 students

Note: if the name is Jeon Wonje, the username will be generated as JeonWonje. (space removed)