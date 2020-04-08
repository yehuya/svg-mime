#!/usr/bin/env node
const fs = require('fs');
const argv = require('yargs').argv;

const xml = '<?xml version="1.0" encoding="UTF-8"?>';

const valid = (data) => data && /^<\?xml/g.test(data.trim());

const run = async (input, output = null) => {
    const exists = await fs.existsSync(input);
    
    if(exists) {
        const file = fs.readFileSync(input, 'utf8');

        if(!valid(file)) {
            const data = `${xml}\r\n${file}`;
            await fs.writeFileSync(input, data);
        }
    }
}

argv._.forEach(async file => await run(file, null))
