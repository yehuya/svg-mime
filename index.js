#!/usr/bin/env node
const argv = require('yargs').argv;
const {addXmlTag} = require('./svg-xml-tag');

argv._.forEach(async file => await addXmlTag(file));
