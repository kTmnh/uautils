/* UAUtils is utilities for analysing User Agent infomations such as name, versions, etc. of the browser and the OS
 * from navigator.userAgent value.
 * 
 * Copyright (c) 2012 Katsumasa Tamanaha
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var uautils = uautils || {
	/* get browser info from UA string.
	 * @param {String} ua navigator.userAgent OPTION //Optional argument for debugging.
	 * @return {Object} return as an object has valiables including name, version, versionString, vendor, engine, engineVerString.
	 * 
	 * object details;
	 * obj.name: Browser name
	 * obj.versionString: Original version number as String (like 1.1.1)
	 * obj.version: Version number converted into Number (like 1.11) so that it can be compared
	 * obj.vendor: Browser vendor
	 * obj.engine: Rendering engine
	 * obj.engineVerString:　Original version number of the rendering engine as String
	 * obj.engineVer: Rendering engine version number converted into Number
	 */
	getBrowser:function(ua) {
		var _ua = ua || navigator.userAgent;
		//Keep this browser order because Opera has MSIE string and Chrome has Safari string.
		var browser = ["Opera", "MSIE", "Firefox", "Chrome", "Safari"];
		var name = "";
		var obj = {};
		var temp;
		//Scan browser array from first if matchs with UA.
		for (var i in browser) {
			temp = _ua.match(browser[i]);
			if (temp !== null) {
				name = temp.toString();
				break;
			}
		}
		switch (name) {
			case "Opera":
				obj.name = "Opera";
				obj.vendor = "Opera Software";
				obj.engine = "Presto";
				obj.versionString = this.matchVersion(_ua, "Version", "/");
				obj.engineVerString = this.matchVersion(_ua, "Presto", "/");
				break;
			case "MSIE":
				obj.name = "Internet Explorer";
				obj.vendor = "Microsoft Corporation";
				obj.engine = "Trident";
				obj.versionString = _ua.match(/MSIE\s[0-9.]+/).toString().split(" ")[1];
				obj.engineVerString = this.matchVersion(_ua, "Trident", "/");
				break;
			case "Firefox":
				obj.name = "Firefox";
				obj.vendor = "Mozilla Foundation";
				obj.engine = "Gecko";
				obj.versionString = this.matchVersion(_ua, name, "/");
				obj.engineVerString = this.matchVersion(_ua, "Gecko", "/");
				break;
			case "Chrome":
				obj.name = "Chrome";
				obj.vendor = "Google Inc.";
				obj.engine = "Webkit";
				obj.versionString = this.matchVersion(_ua, name, "/");
				obj.engineVerString = this.matchVersion(_ua, "AppleWebKit", "/");
				break;
			case "Safari":
				obj.name = "Safari";
				obj.vendor = "Apple Inc.";
				obj.engine = "Webkit";
				obj.versionString = this.matchVersion(_ua, "Version", "/");
				obj.engineVerString = this.matchVersion(_ua, "AppleWebKit", "/");
				break;
			default:
				obj.name = "unknown";
				obj.vendor = "unknown";
				obj.engine = "unknown";
				obj.versionString = "0";
				obj.engineVerString = "0";
		}
		obj.version = this.stringVerToNumber(obj.versionString);
		obj.engineVer = this.stringVerToNumber(obj.engineVerString);
		//alert(obj.name+"/"+obj.vendor+"/"+obj.engine+"/"+obj.engineVerString+"/"+obj.engineVer);
		return obj;
	},
	/* get OS info from UA string.
	 * @param {String} ua navigator.userAgent OPTION
	 * @return {Object} return as an object has valiables including name and version.
	 */
	getOS:function(ua) {
		var _ua = ua || navigator.userAgent;
		var OS = ["BlackBerry", "Windows Phone", "Windows", "like Mac OS X", "Mac OS X", "Android", "Symbian", "Macintosh"];
		var name = "";
		var obj = {};
		var temp;
		for (var i in OS) {
			temp = _ua.match(OS[i]);
			if (temp !== null) {
				name = temp.toString();
				break;
			}
		}
		switch (name) {
			case "BlackBerry":
				break;
			case "Windows Phone":
				break;
			case "Windows":
				temp = _ua.match(/Windows\s[NTCE0-9.\s]+/).toString();
				switch (temp) {
					case "Windows 95":
						obj.name = temp;
						obj.version = 4.0;
						break;
					case "Windows 98":
						temp = _ua.match(/Win\s9x\s4.90/);
						if (temp === null) {
							obj.name = "Windows 98";
							obj.version = 4.1;
						} else {
							obj.name = "Windows Me";
							obj.version = 4.9;
						}
						break;
					case "Windows NT 4.0":
						obj.name = temp;
						obj.version = 4.0;
						break;
					case "Windows NT 5.0":
						obj.name = "Windows 2000";
						obj.version = 5.0;
						break;
					case "Windows NT 5.1":
						obj.name = "Windows XP";
						obj.version = 5.1;
						break;
					case "Windows NT 5.2":
						obj.name = "Windows 2003 Server";
						obj.version = 5.2;
						break;
					case "Windows NT 6.0":
						obj.name = "Windows Vista";
						obj.version = 6.0;
						break;
					case "Windows NT 6.1":
						obj.name = "Windows 7";
						obj.version = 6.1;
						break;
					case "Windows NT 6.2":
						obj.name = "Windows 8";
						obj.version = 6.2;
						break;
				}
				break;
			case "like Mac OS X":
				temp = _ua.match(/OS\s[0-9_]+/).toString().split("OS ")[1].split("_").join(".");
				obj.name = "iOS " + temp;
				obj.version = this.stringVerToNumber(temp);
				break;
			case "Mac OS X":
				temp = _ua.match(/OS\sX\s[0-9_]+/).toString().split("OS X ")[1].split("_").join(".");
				obj.name = "Mac OS X " + temp;
				obj.version = this.stringVerToNumber(temp);
				if (obj.version < 10.1) {
					obj.name = obj.name + " Cheetah";
				} else if (10.1 <= obj.version && obj.version < 10.2) {
					obj.name = obj.name + " Puma";
				} else if (10.2 <= obj.version && obj.version < 10.3) {
					obj.name = obj.name + " Jaguar";
				} else if (10.3 <= obj.version && obj.version < 10.4) {
					obj.name = obj.name + " Panther";
				} else if (10.4 <= obj.version && obj.version < 10.5) {
					obj.name = obj.name + " Tiger";
				} else if (10.5 <= obj.version && obj.version < 10.6) {
					obj.name = obj.name + " Leopard";
				} else if (10.6 <= obj.version && obj.version < 10.7) {
					obj.name = obj.name + " Snow Leopard";
				} else if (10.7 <= obj.version && obj.version < 10.8) {
					obj.name = obj.name + " Lion";
				} else if (10.8 <= obj.version) {
					obj.name = obj.name + " Mountain Lion";
				}
				break;
			case "Android":
				temp = _ua.match(/Android\s[0-9.]+/).toString().split(" ")[1];
				obj.name = "Android " + temp;
				obj.version = this.stringVerToNumber(temp);
				break;
			case "Symbian":
				//NOT WRITTEN YET
				obj.name = "Symbian OS";
				obj.version = 0;
				break;
			case "Macintosh":
				//NOT WRITTEN YET
				break;
			default:
		}
	},
	/* Match version number from UA string with search string and splitter string.
	 * @param userAgent {String} navigator.userAgent
	 * @param searchString {String} search string to match from userAgent.
	 * @param splitString {String} splitter for search string and version number.
	 * @return {String} extracted version number.
	 */
	matchVersion:function(userAgent, searchString, splitter) {
		var temp = searchString + "\/[0-9.]+";
		var regexp = new RegExp(temp, "i");
		var result = userAgent.match(regexp);
		if (result !== null) {
			return userAgent.match(regexp).toString().split(splitter)[1];
		} else {
			//Return "0" if not match.
			return "0";
		}
	},
	/* Convert dot separeted version String into comparable Number.
	 * Example: 1.1.1 -> 1.11
	 * @param verString {String} version string
	 * @return {Number} version number
	 */
	stringVerToNumber:function(verString) {
		var temp = verString.match(/\./);
		var left = RegExp.leftContext;
		var right = RegExp.rightContext.toString().split(".").join("");
		return Number(left + "." + right);
	}
};