#!/usr/bin/env node
const fs = require('fs');
const argv = require('yargs').argv;
const path = require('path');
const fsPromises = fs.promises;

const xmlTag = '<?xml version="1.0" encoding="UTF-8"?>';

const valid = (data) => data && /^<\?xml(.*)\?>/g.test(data.trim());

const isSvgFile = async (file) => {
    return new Promise((resolve, reject) => {
        if(path.extname(file) !== '.svg') {
            resolve(false);
        }

        fs.exists(file, resolve);
    });
}

const addXmlTag = async (input) => {
    const exists = await isSvgFile(input);
    
    if(exists) {
        const file = await fsPromises.readFile(input, 'utf8');

        if(!valid(file)) {
            const data = `${xmlTag}\r\n${file}`;
            await fsPromises.writeFile(input, data);

            process.stdout.write(`> ${path.basename(input)}\n`);
        }
    } 
}

argv._.forEach(async file => await addXmlTag(file))
