const fs = require('fs');
const fsPromises = fs.promises;
const {validXmlTag, isSvgFileExists, xmlTag} = require('./svg-xml-tag');

describe('validXmlTag()', () => {
    test('No xml tag', () => {
        const svg = `
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>
        `;
    
        const valid = validXmlTag(svg);
        expect(valid).toBe(false);
    });
    
    test('Exists xml tag', () => {
        const svg = `
            <?xml version="1.0" encoding="UTF-8"?>
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>
        `;
    
        const valid = validXmlTag(svg);
        expect(valid).toBe(true);
    });
});

describe('isSvgFileExists()', () => {
    beforeEach(async () => {
        await fsPromises.writeFile('./tmp.svg', `
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>
        `);

        await fsPromises.open('./tmp.txt', 'w+');
    });

    afterEach(async () => {
        await fsPromises.unlink('./tmp.svg');
        await fsPromises.unlink('./tmp.txt');
    });

    test('Exists svg file', async () => {
        const exists = await isSvgFileExists('./tmp.svg');
        expect(exists).toBe(true);
    });

    test('not svg file', async () => {
        const exists = await isSvgFileExists('./tmp.txt');
        expect(exists).toBe(false);
    });

    test('svg file not exists', async () => {
        const exists = await isSvgFileExists('./tmp1.svg');
        expect(exists).toBe(false);
    });
});