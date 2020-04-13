# svg-xml-tag
Add xml tag on top of svg file

## Why
When we want to upload svg file to wordpress site, we have some security issues.  
First we need to allow upload svg files in functions.php file in our template dir:
```php
// wordpress template inside functions.php file
function allow_svg($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'allow_svg');
```
Now we can upload svg images to our site.
Many design softwares exported svg file after some optimizations like remove the <xml> tag from top of the file.

Wordpress looking for xml tag on the top of svg file to validate it's actually svg file.  
So if you will try to upload svg file without xml tag you will get security error.

For easy development, now you can easly adding xml tag on top of the svg files

## How
### Install
```bash
$ npm install -g svg-xml-tag
```
### Add XML tag on top of svg file
One file
```bash
$ svg-xml-tag ./filename.svg
```
Multiple files at once
```bash
$ svg-xml-tag ./*.svg
```
### Test
Enter the package folder
```bash
$ npm test
```
  
    
Have fun!

