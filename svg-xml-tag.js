const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const xmlTag = '<?xml version="1.0" encoding="UTF-8"?>';

const validXmlTag = (data) => data && /^<\?xml(.*)\?>/g.test(data.trim());

const isSvgFileExists = async (file) => {
    return new Promise((resolve, reject) => {
        if(path.extname(file) !== '.svg') {
            resolve(false);
        }

        fs.exists(file, resolve);
    });
}

const addXmlTag = async (input) => {
    const exists = await isSvgFileExists(input);
    
    if(exists) {
        const file = await fsPromises.readFile(input, 'utf8');

        if(!validXmlTag(file)) {
            const data = `${xmlTag}\r\n${file}`;
            await fsPromises.writeFile(input, data);

            process.stdout.write(`> ${path.basename(input)}\n`);
        }
    } 
}

module.exports = {validXmlTag, isSvgFileExists, addXmlTag};