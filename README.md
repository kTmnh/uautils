# [uautils](https://github.com/kTmnh/uautils/)
=======

uautils is a simple JavaScript utilities for analysing User Agent string.

Usage
-----
uautils is an Object has static methods such as `getBrowser()` and `getOS()`.
Call these methods to assign a value to an Object.

``` javascript
var obj = uautils.getBrowser();
```
getBrowser() can reffer browser informations.
``` javascript
//Example UA: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
var obj = uautils.getBrowser();
console.log(obj.name);  //"Chrome"
console.log(obj.version); //23.0127197
console.log(obj.versionString); //"23.0.1271.97"
console.log(obj.vendor);  //"Google Inc."
console.log(obj.engine);  //"WebKit"
console.log(obj.engineVerString); //"537.11"
console.log(obj.engineVer); //"537.11"
```
getOS() can reffer OS informations.
``` javascript
//Example UA: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
var obj = uautils.getOS();
console.log(obj.name);  //"Windows 7"
console.log(obj.version); //6.1
```
You can set custom UA string attribute.
``` javascript
//Example UA: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
var targetOS = uautils.getOS("Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)");
var currentOS = uautils.getOS(); //without an attribute, reffer to window.userAgent
```
obj.version is a Number so that you can compare.
``` javascript
var isNewerThanXP = (targetOS.version > currentOS.version) ? true : false; //true
```

Acknowledgements
-----
Copyright &copy; 2012 Katsumasa Tamanaha (kTmnh).
Released under the [MIT 
License](http://www.opensource.org/licenses/mit-license.php).