"use strict"

const fsP = require('fs/promises');
const argv = process.argv;
const axios = require("axios");

// reads the file and outputs contents in console.
async function cat() {
    let path = argv[2];
    let contents;
    try {
        contents = await fsP.readFile(path, "utf8");
    } catch (err) {
        console.error(`Error reading ${path}: 
        Error: ENOENT: no such file or directory, open '${path}'`);
        // logging error?
        process.exit(1);
    }
    console.log(contents);
}
// use debugger to look at err object

// makes a request to a URL and outputs contents in console.
async function webCat() {
    let url = argv[2];
    let resp;
    try {
        resp = await axios({
            method: 'GET',
            url: url,
            timeout: 1000
        });
    } catch {
        console.log(`Error. ${url} not a valid URL`);
        process.exit(1);
    }
    console.log(resp.data.slice(0, 80), "...");
}

// tries to create a URL out of the argument passed in. returns true if URL.
function checkURL() {
    try {
        let url = new URL(argv[2]);
        return true;
    } catch {
        return false;
    }
}

// Checks if input is a URL or not. If input is URL, runs webCat(), if not, runs cat().
async function main() {
    let isValidURL = checkURL();

    if (isValidURL) {
        await webCat();
    } else {
        await cat();
    }
    console.log("done")
}

main();

// keep argv in main function
