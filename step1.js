"use strict"

const fsP = require('fs/promises')
const argv = process.argv;

async function cat(){
    try {
        let contents = await fsP.readFile(argv[2], "utf8");
        console.log(contents);
    } catch (err) {
        console.log(`Error reading ${argv[2]}: 
            Error: ENOENT: no such file or directory, open '${argv[2]}'`)
        process.exit(1);
    }
}

cat();