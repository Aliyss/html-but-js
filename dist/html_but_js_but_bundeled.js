(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

module.exports = require("./src");

},{"./src":113}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XMLStructure = function () {
	function XMLStructure(object, config) {
		_classCallCheck(this, XMLStructure);

		this.id = config.id;
		this.description = config.description;
		this.openTag = config.openTag;
		this.closeTag = config.closeTag;
		this.allowedParents = config.allowedParents;
		this.allowedChildren = config.allowedChildren;
		this.allowedAttributes = config.allowedAttributes;
		this.allowedInterfaces = config.allowedInterfaces;

		this.beforeValue = "";
		this.afterValue = "";
		this.children = [];
		this.attributes = [];
		if ((typeof object === "undefined" ? "undefined" : _typeof(object)) !== "object") {
			object = {
				beforeValue: object
			};
		}

		if (object.children) {
			this.children = this.validityChildren(object.children, this.allowedChildren);
		}

		if (object.attributes) {
			this.attributes = this.validityAttributes(object.attributes, this.allowedAttributes);
		}

		if (object.beforeValue || object.value) {
			this.beforeValue = object.beforeValue || object.value;
		}

		if (object.afterValue) {
			this.afterValue = object.afterValue;
		}
	}

	_createClass(XMLStructure, [{
		key: "buildXML",
		value: function buildXML() {
			var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
			var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			if (object.id) {
				var xml = "<" + prefix + object.openTag.slice(0, -1).split("<")[1];

				for (var i = 0; i < object.attributes.length; i++) {
					xml += " " + object.attributes[i].name + "=" + "\"" + object.attributes[i].value + "\"";
				}

				xml += ">";
				xml += object.beforeValue;

				for (var _i = 0; _i < object.children.length; _i++) {
					xml += this.buildXML(object.children[_i], prefix);
				}

				xml += object.afterValue;
				xml += "</" + prefix + object.closeTag.split("</")[1];
				return xml;
			} else {
				return "";
			}
		}
	}, {
		key: "buildStructure",
		value: function buildStructure() {
			var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
			var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			if (object.id) {
				var xml = {};

				xml.name = prefix + object.openTag.slice(0, -1).split("<")[1];

				xml.attributes = {};

				for (var i = 0; i < object.attributes.length; i++) {
					xml.attributes[object.attributes[i].name] = object.attributes[i].value;
				}

				xml.type = "element";
				xml.elements = [];

				if (object.afterValue.length > 0 || object.beforeValue.length > 0) {
					var t = {
						type: "text",
						text: object.beforeValue + object.afterValue
					};
					xml.elements.push(t);
				} else {
					for (var _i2 = 0; _i2 < object.children.length; _i2++) {
						xml.elements.push(this.buildStructure(object.children[_i2], prefix));
					}
				}
				return xml;
			} else {
				return {};
			}
		}
	}, {
		key: "validityChildren",
		value: function validityChildren(givenArray, searchArray) {
			var _this = this;

			var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			return givenArray.filter(function (child) {
				if (child.id) {
					force = false;
					for (var i = 0; i < searchArray.length; i++) {
						if (searchArray[i].id === child.id) {
							force = true;
							return child;
						}
					}
					if (!force) {
						var err = {
							text: child.id + " is not a valid child of " + _this.id + ".",
							valid: "\nValid Children are:" + searchArray.map(function (value) {
								return value.id;
							})
						};
						throw new Error(err.text + err.valid + "\n");
					}
				}
			});
		}
	}, {
		key: "validityAttributes",
		value: function validityAttributes(givenArray, searchArray) {
			var _this2 = this;

			var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			return givenArray.filter(function (child) {
				if (child.name && child.value) {
					force = false;
					for (var i = 0; i < searchArray.length; i++) {
						if (child.name === searchArray[i].name) {
							force = true;
							return child;
						}
					}
					if (!force) {
						var err = {
							text: child.name + " is not a valid attribute of " + _this2.id + ".",
							valid: "\nValid Attributes are:" + searchArray.map(function (value) {
								return "\n\t" + value.name;
							})
						};
						throw new Error(err.text + err.valid + "\n");
					}
				}
			});
		}
	}]);

	return XMLStructure;
}();

module.exports = XMLStructure;

},{}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var a = function (_XMLStructure) {
				_inherits(a, _XMLStructure);

				function a(object) {
								_classCallCheck(this, a);

								var config = {
												id: "a",
												description: "Hyperlink",
												openTag: "<a>",
												closeTag: "</a>",
												allowedParents: [{ "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "href", "value": false }, { "name": "target", "value": false }, { "name": "download", "value": false }, { "name": "rel", "value": false }, { "name": "hreflang", "value": false }, { "name": "type", "value": false }]
								};

								return _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this, object, config));
				}

				return a;
}(XMLStructure);

module.exports = a;

},{"../XMLStructure.js":2}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var abbr = function (_XMLStructure) {
				_inherits(abbr, _XMLStructure);

				function abbr(object) {
								_classCallCheck(this, abbr);

								var config = {
												id: "abbr",
												description: "Abbreviation",
												openTag: "<abbr>",
												closeTag: "</abbr>",
												allowedParents: [{ "id": "a" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (abbr.__proto__ || Object.getPrototypeOf(abbr)).call(this, object, config));
				}

				return abbr;
}(XMLStructure);

module.exports = abbr;

},{"../XMLStructure.js":2}],5:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var address = function (_XMLStructure) {
				_inherits(address, _XMLStructure);

				function address(object) {
								_classCallCheck(this, address);

								var config = {
												id: "address",
												description: "Contact information for a page or article element",
												openTag: "<address>",
												closeTag: "</address>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (address.__proto__ || Object.getPrototypeOf(address)).call(this, object, config));
				}

				return address;
}(XMLStructure);

module.exports = address;

},{"../XMLStructure.js":2}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var area = function (_XMLStructure) {
				_inherits(area, _XMLStructure);

				function area(object) {
								_classCallCheck(this, area);

								var config = {
												id: "area",
												description: "Hyperlink or dead area on an image map",
												openTag: "<area>",
												closeTag: "</area>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "alt", "value": false }, { "name": "coords", "value": false }, { "name": "shape", "value": false }, { "name": "href", "value": false }, { "name": "target", "value": false }, { "name": "download", "value": false }, { "name": "rel", "value": false }, { "name": "hreflang", "value": false }, { "name": "type", "value": false }]
								};

								return _possibleConstructorReturn(this, (area.__proto__ || Object.getPrototypeOf(area)).call(this, object, config));
				}

				return area;
}(XMLStructure);

module.exports = area;

},{"../XMLStructure.js":2}],7:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var article = function (_XMLStructure) {
				_inherits(article, _XMLStructure);

				function article(object) {
								_classCallCheck(this, article);

								var config = {
												id: "article",
												description: "Self-contained syndicatable or reusable composition",
												openTag: "<article>",
												closeTag: "</article>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (article.__proto__ || Object.getPrototypeOf(article)).call(this, object, config));
				}

				return article;
}(XMLStructure);

module.exports = article;

},{"../XMLStructure.js":2}],8:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var aside = function (_XMLStructure) {
				_inherits(aside, _XMLStructure);

				function aside(object) {
								_classCallCheck(this, aside);

								var config = {
												id: "aside",
												description: "Sidebar for tangentially related content",
												openTag: "<aside>",
												closeTag: "</aside>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (aside.__proto__ || Object.getPrototypeOf(aside)).call(this, object, config));
				}

				return aside;
}(XMLStructure);

module.exports = aside;

},{"../XMLStructure.js":2}],9:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var audio = function (_XMLStructure) {
				_inherits(audio, _XMLStructure);

				function audio(object) {
								_classCallCheck(this, audio);

								var config = {
												id: "audio",
												description: "Audio player",
												openTag: "<audio>",
												closeTag: "</audio>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "source" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "src", "value": false }, { "name": "crossorigin", "value": false }, { "name": "preload", "value": false }, { "name": "autoplay", "value": false }, { "name": "mediagroup", "value": false }, { "name": "loop", "value": false }, { "name": "muted", "value": false }, { "name": "controls", "value": false }]
								};

								return _possibleConstructorReturn(this, (audio.__proto__ || Object.getPrototypeOf(audio)).call(this, object, config));
				}

				return audio;
}(XMLStructure);

module.exports = audio;

},{"../XMLStructure.js":2}],10:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var b = function (_XMLStructure) {
				_inherits(b, _XMLStructure);

				function b(object) {
								_classCallCheck(this, b);

								var config = {
												id: "b",
												description: "Keywords",
												openTag: "<b>",
												closeTag: "</b>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, object, config));
				}

				return b;
}(XMLStructure);

module.exports = b;

},{"../XMLStructure.js":2}],11:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var base = function (_XMLStructure) {
    _inherits(base, _XMLStructure);

    function base(object) {
        _classCallCheck(this, base);

        var config = {
            id: "base",
            description: "Base URL and default target browsing context for hyperlinks and forms",
            openTag: "<base>",
            closeTag: "</base>",
            allowedParents: [{ "id": "head" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "href", "value": false }, { "name": "target", "value": false }]
        };

        return _possibleConstructorReturn(this, (base.__proto__ || Object.getPrototypeOf(base)).call(this, object, config));
    }

    return base;
}(XMLStructure);

module.exports = base;

},{"../XMLStructure.js":2}],12:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var bdi = function (_XMLStructure) {
				_inherits(bdi, _XMLStructure);

				function bdi(object) {
								_classCallCheck(this, bdi);

								var config = {
												id: "bdi",
												description: "Text directionality isolation",
												openTag: "<bdi>",
												closeTag: "</bdi>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (bdi.__proto__ || Object.getPrototypeOf(bdi)).call(this, object, config));
				}

				return bdi;
}(XMLStructure);

module.exports = bdi;

},{"../XMLStructure.js":2}],13:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var bdo = function (_XMLStructure) {
				_inherits(bdo, _XMLStructure);

				function bdo(object) {
								_classCallCheck(this, bdo);

								var config = {
												id: "bdo",
												description: "Text directionality formatting",
												openTag: "<bdo>",
												closeTag: "</bdo>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (bdo.__proto__ || Object.getPrototypeOf(bdo)).call(this, object, config));
				}

				return bdo;
}(XMLStructure);

module.exports = bdo;

},{"../XMLStructure.js":2}],14:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var blockquote = function (_XMLStructure) {
				_inherits(blockquote, _XMLStructure);

				function blockquote(object) {
								_classCallCheck(this, blockquote);

								var config = {
												id: "blockquote",
												description: "A section quoted from another source",
												openTag: "<blockquote>",
												closeTag: "</blockquote>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "cite", "value": false }]
								};

								return _possibleConstructorReturn(this, (blockquote.__proto__ || Object.getPrototypeOf(blockquote)).call(this, object, config));
				}

				return blockquote;
}(XMLStructure);

module.exports = blockquote;

},{"../XMLStructure.js":2}],15:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var body = function (_XMLStructure) {
				_inherits(body, _XMLStructure);

				function body(object) {
								_classCallCheck(this, body);

								var config = {
												id: "body",
												description: "Document body",
												openTag: "<body>",
												closeTag: "</body>",
												allowedParents: [{ "id": "html" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "onafterprint", "value": false }, { "name": "onbeforeprint", "value": false }, { "name": "onbeforeunload", "value": false }, { "name": "onhashchange", "value": false }, { "name": "onmessage", "value": false }, { "name": "onoffline", "value": false }, { "name": "ononline", "value": false }, { "name": "onpagehide", "value": false }, { "name": "onpageshow", "value": false }, { "name": "onpopstate", "value": false }, { "name": "onstorage", "value": false }, { "name": "onunload", "value": false }]
								};

								return _possibleConstructorReturn(this, (body.__proto__ || Object.getPrototypeOf(body)).call(this, object, config));
				}

				return body;
}(XMLStructure);

module.exports = body;

},{"../XMLStructure.js":2}],16:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var br = function (_XMLStructure) {
				_inherits(br, _XMLStructure);

				function br(object) {
								_classCallCheck(this, br);

								var config = {
												id: "br",
												description: "Line break, e.g. in poem or postal address",
												openTag: "<br>",
												closeTag: "</br>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (br.__proto__ || Object.getPrototypeOf(br)).call(this, object, config));
				}

				return br;
}(XMLStructure);

module.exports = br;

},{"../XMLStructure.js":2}],17:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var button = function (_XMLStructure) {
				_inherits(button, _XMLStructure);

				function button(object) {
								_classCallCheck(this, button);

								var config = {
												id: "button",
												description: "Button control",
												openTag: "<button>",
												closeTag: "</button>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "autofocus", "value": false }, { "name": "disabled", "value": false }, { "name": "form", "value": false }, { "name": "formaction", "value": false }, { "name": "formenctype", "value": false }, { "name": "formmethod", "value": false }, { "name": "formnovalidate", "value": false }, { "name": "formtarget", "value": false }, { "name": "name", "value": false }, { "name": "type", "value": false }, { "name": "value", "value": false }]
								};

								return _possibleConstructorReturn(this, (button.__proto__ || Object.getPrototypeOf(button)).call(this, object, config));
				}

				return button;
}(XMLStructure);

module.exports = button;

},{"../XMLStructure.js":2}],18:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var canvas = function (_XMLStructure) {
				_inherits(canvas, _XMLStructure);

				function canvas(object) {
								_classCallCheck(this, canvas);

								var config = {
												id: "canvas",
												description: "Scriptable bitmap canvas",
												openTag: "<canvas>",
												closeTag: "</canvas>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "width", "value": false }, { "name": "height", "value": false }]
								};

								return _possibleConstructorReturn(this, (canvas.__proto__ || Object.getPrototypeOf(canvas)).call(this, object, config));
				}

				return canvas;
}(XMLStructure);

module.exports = canvas;

},{"../XMLStructure.js":2}],19:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var caption = function (_XMLStructure) {
				_inherits(caption, _XMLStructure);

				function caption(object) {
								_classCallCheck(this, caption);

								var config = {
												id: "caption",
												description: "Table caption",
												openTag: "<caption>",
												closeTag: "</caption>",
												allowedParents: [{ "id": "table" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (caption.__proto__ || Object.getPrototypeOf(caption)).call(this, object, config));
				}

				return caption;
}(XMLStructure);

module.exports = caption;

},{"../XMLStructure.js":2}],20:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var cite = function (_XMLStructure) {
				_inherits(cite, _XMLStructure);

				function cite(object) {
								_classCallCheck(this, cite);

								var config = {
												id: "cite",
												description: "Title of a work",
												openTag: "<cite>",
												closeTag: "</cite>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (cite.__proto__ || Object.getPrototypeOf(cite)).call(this, object, config));
				}

				return cite;
}(XMLStructure);

module.exports = cite;

},{"../XMLStructure.js":2}],21:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var code = function (_XMLStructure) {
				_inherits(code, _XMLStructure);

				function code(object) {
								_classCallCheck(this, code);

								var config = {
												id: "code",
												description: "Computer code",
												openTag: "<code>",
												closeTag: "</code>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (code.__proto__ || Object.getPrototypeOf(code)).call(this, object, config));
				}

				return code;
}(XMLStructure);

module.exports = code;

},{"../XMLStructure.js":2}],22:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var col = function (_XMLStructure) {
    _inherits(col, _XMLStructure);

    function col(object) {
        _classCallCheck(this, col);

        var config = {
            id: "col",
            description: "Table column",
            openTag: "<col>",
            closeTag: "</col>",
            allowedParents: [{ "id": "colgroup" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "span", "value": false }]
        };

        return _possibleConstructorReturn(this, (col.__proto__ || Object.getPrototypeOf(col)).call(this, object, config));
    }

    return col;
}(XMLStructure);

module.exports = col;

},{"../XMLStructure.js":2}],23:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var colgroup = function (_XMLStructure) {
    _inherits(colgroup, _XMLStructure);

    function colgroup(object) {
        _classCallCheck(this, colgroup);

        var config = {
            id: "colgroup",
            description: "Group of columns in a table",
            openTag: "<colgroup>",
            closeTag: "</colgroup>",
            allowedParents: [{ "id": "table" }, { "id": "template" }],
            allowedChildren: [{ "id": "col" }, { "id": "script" }, { "id": "template" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "span", "value": false }]
        };

        return _possibleConstructorReturn(this, (colgroup.__proto__ || Object.getPrototypeOf(colgroup)).call(this, object, config));
    }

    return colgroup;
}(XMLStructure);

module.exports = colgroup;

},{"../XMLStructure.js":2}],24:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var data = function (_XMLStructure) {
				_inherits(data, _XMLStructure);

				function data(object) {
								_classCallCheck(this, data);

								var config = {
												id: "data",
												description: "Machine-readable equivalent",
												openTag: "<data>",
												closeTag: "</data>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "value", "value": false }]
								};

								return _possibleConstructorReturn(this, (data.__proto__ || Object.getPrototypeOf(data)).call(this, object, config));
				}

				return data;
}(XMLStructure);

module.exports = data;

},{"../XMLStructure.js":2}],25:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var datalist = function (_XMLStructure) {
				_inherits(datalist, _XMLStructure);

				function datalist(object) {
								_classCallCheck(this, datalist);

								var config = {
												id: "datalist",
												description: "Container for options for combo box control",
												openTag: "<datalist>",
												closeTag: "</datalist>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }, { "id": "option" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (datalist.__proto__ || Object.getPrototypeOf(datalist)).call(this, object, config));
				}

				return datalist;
}(XMLStructure);

module.exports = datalist;

},{"../XMLStructure.js":2}],26:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var dd = function (_XMLStructure) {
				_inherits(dd, _XMLStructure);

				function dd(object) {
								_classCallCheck(this, dd);

								var config = {
												id: "dd",
												description: "Content for corresponding dt element(s)",
												openTag: "<dd>",
												closeTag: "</dd>",
												allowedParents: [{ "id": "dl" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (dd.__proto__ || Object.getPrototypeOf(dd)).call(this, object, config));
				}

				return dd;
}(XMLStructure);

module.exports = dd;

},{"../XMLStructure.js":2}],27:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var del = function (_XMLStructure) {
				_inherits(del, _XMLStructure);

				function del(object) {
								_classCallCheck(this, del);

								var config = {
												id: "del",
												description: "A removal from the document",
												openTag: "<del>",
												closeTag: "</del>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "cite", "value": false }, { "name": "datetime", "value": false }]
								};

								return _possibleConstructorReturn(this, (del.__proto__ || Object.getPrototypeOf(del)).call(this, object, config));
				}

				return del;
}(XMLStructure);

module.exports = del;

},{"../XMLStructure.js":2}],28:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var dfn = function (_XMLStructure) {
				_inherits(dfn, _XMLStructure);

				function dfn(object) {
								_classCallCheck(this, dfn);

								var config = {
												id: "dfn",
												description: "Defining instance",
												openTag: "<dfn>",
												closeTag: "</dfn>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (dfn.__proto__ || Object.getPrototypeOf(dfn)).call(this, object, config));
				}

				return dfn;
}(XMLStructure);

module.exports = dfn;

},{"../XMLStructure.js":2}],29:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var div = function (_XMLStructure) {
				_inherits(div, _XMLStructure);

				function div(object) {
								_classCallCheck(this, div);

								var config = {
												id: "div",
												description: "Generic flow container",
												openTag: "<div>",
												closeTag: "</div>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (div.__proto__ || Object.getPrototypeOf(div)).call(this, object, config));
				}

				return div;
}(XMLStructure);

module.exports = div;

},{"../XMLStructure.js":2}],30:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var dl = function (_XMLStructure) {
				_inherits(dl, _XMLStructure);

				function dl(object) {
								_classCallCheck(this, dl);

								var config = {
												id: "dl",
												description: "Association list consisting of zero or more name-value groups",
												openTag: "<dl>",
												closeTag: "</dl>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "dt" }, { "id": "dd" }, { "id": "script" }, { "id": "template" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (dl.__proto__ || Object.getPrototypeOf(dl)).call(this, object, config));
				}

				return dl;
}(XMLStructure);

module.exports = dl;

},{"../XMLStructure.js":2}],31:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var dt = function (_XMLStructure) {
				_inherits(dt, _XMLStructure);

				function dt(object) {
								_classCallCheck(this, dt);

								var config = {
												id: "dt",
												description: "Legend for corresponding dd element(s)",
												openTag: "<dt>",
												closeTag: "</dt>",
												allowedParents: [{ "id": "dl" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (dt.__proto__ || Object.getPrototypeOf(dt)).call(this, object, config));
				}

				return dt;
}(XMLStructure);

module.exports = dt;

},{"../XMLStructure.js":2}],32:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var em = function (_XMLStructure) {
				_inherits(em, _XMLStructure);

				function em(object) {
								_classCallCheck(this, em);

								var config = {
												id: "em",
												description: "Stress emphasis",
												openTag: "<em>",
												closeTag: "</em>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (em.__proto__ || Object.getPrototypeOf(em)).call(this, object, config));
				}

				return em;
}(XMLStructure);

module.exports = em;

},{"../XMLStructure.js":2}],33:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var embed = function (_XMLStructure) {
				_inherits(embed, _XMLStructure);

				function embed(object) {
								_classCallCheck(this, embed);

								var config = {
												id: "embed",
												description: "Plugin",
												openTag: "<embed>",
												closeTag: "</embed>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "src", "value": false }, { "name": "type", "value": false }, { "name": "width", "value": false }, { "name": "height", "value": false }]
								};

								return _possibleConstructorReturn(this, (embed.__proto__ || Object.getPrototypeOf(embed)).call(this, object, config));
				}

				return embed;
}(XMLStructure);

module.exports = embed;

},{"../XMLStructure.js":2}],34:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var fieldset = function (_XMLStructure) {
				_inherits(fieldset, _XMLStructure);

				function fieldset(object) {
								_classCallCheck(this, fieldset);

								var config = {
												id: "fieldset",
												description: "Group of form controls",
												openTag: "<fieldset>",
												closeTag: "</fieldset>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "legend" }, { "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "disabled", "value": false }, { "name": "form", "value": false }, { "name": "name", "value": false }]
								};

								return _possibleConstructorReturn(this, (fieldset.__proto__ || Object.getPrototypeOf(fieldset)).call(this, object, config));
				}

				return fieldset;
}(XMLStructure);

module.exports = fieldset;

},{"../XMLStructure.js":2}],35:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var figcaption = function (_XMLStructure) {
				_inherits(figcaption, _XMLStructure);

				function figcaption(object) {
								_classCallCheck(this, figcaption);

								var config = {
												id: "figcaption",
												description: "Caption for figure",
												openTag: "<figcaption>",
												closeTag: "</figcaption>",
												allowedParents: [{ "id": "figure" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (figcaption.__proto__ || Object.getPrototypeOf(figcaption)).call(this, object, config));
				}

				return figcaption;
}(XMLStructure);

module.exports = figcaption;

},{"../XMLStructure.js":2}],36:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var figure = function (_XMLStructure) {
				_inherits(figure, _XMLStructure);

				function figure(object) {
								_classCallCheck(this, figure);

								var config = {
												id: "figure",
												description: "Figure with optional caption",
												openTag: "<figure>",
												closeTag: "</figure>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "figcaption" }, { "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (figure.__proto__ || Object.getPrototypeOf(figure)).call(this, object, config));
				}

				return figure;
}(XMLStructure);

module.exports = figure;

},{"../XMLStructure.js":2}],37:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var footer = function (_XMLStructure) {
				_inherits(footer, _XMLStructure);

				function footer(object) {
								_classCallCheck(this, footer);

								var config = {
												id: "footer",
												description: "Footer for a page or section",
												openTag: "<footer>",
												closeTag: "</footer>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (footer.__proto__ || Object.getPrototypeOf(footer)).call(this, object, config));
				}

				return footer;
}(XMLStructure);

module.exports = footer;

},{"../XMLStructure.js":2}],38:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var form = function (_XMLStructure) {
				_inherits(form, _XMLStructure);

				function form(object) {
								_classCallCheck(this, form);

								var config = {
												id: "form",
												description: "User-submittable form",
												openTag: "<form>",
												closeTag: "</form>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "accept-charset", "value": false }, { "name": "action", "value": false }, { "name": "autocomplete", "value": false }, { "name": "enctype", "value": false }, { "name": "method", "value": false }, { "name": "name", "value": false }, { "name": "novalidate", "value": false }, { "name": "target", "value": false }]
								};

								return _possibleConstructorReturn(this, (form.__proto__ || Object.getPrototypeOf(form)).call(this, object, config));
				}

				return form;
}(XMLStructure);

module.exports = form;

},{"../XMLStructure.js":2}],39:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var h1 = function (_XMLStructure) {
				_inherits(h1, _XMLStructure);

				function h1(object) {
								_classCallCheck(this, h1);

								var config = {
												id: "h1",
												description: "Section heading",
												openTag: "<h1>",
												closeTag: "</h1>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (h1.__proto__ || Object.getPrototypeOf(h1)).call(this, object, config));
				}

				return h1;
}(XMLStructure);

module.exports = h1;

},{"../XMLStructure.js":2}],40:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var h2 = function (_XMLStructure) {
				_inherits(h2, _XMLStructure);

				function h2(object) {
								_classCallCheck(this, h2);

								var config = {
												id: "h2",
												description: "Section heading",
												openTag: "<h2>",
												closeTag: "</h2>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (h2.__proto__ || Object.getPrototypeOf(h2)).call(this, object, config));
				}

				return h2;
}(XMLStructure);

module.exports = h2;

},{"../XMLStructure.js":2}],41:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var h3 = function (_XMLStructure) {
				_inherits(h3, _XMLStructure);

				function h3(object) {
								_classCallCheck(this, h3);

								var config = {
												id: "h3",
												description: "Section heading",
												openTag: "<h3>",
												closeTag: "</h3>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (h3.__proto__ || Object.getPrototypeOf(h3)).call(this, object, config));
				}

				return h3;
}(XMLStructure);

module.exports = h3;

},{"../XMLStructure.js":2}],42:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var h4 = function (_XMLStructure) {
				_inherits(h4, _XMLStructure);

				function h4(object) {
								_classCallCheck(this, h4);

								var config = {
												id: "h4",
												description: "Section heading",
												openTag: "<h4>",
												closeTag: "</h4>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (h4.__proto__ || Object.getPrototypeOf(h4)).call(this, object, config));
				}

				return h4;
}(XMLStructure);

module.exports = h4;

},{"../XMLStructure.js":2}],43:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var h5 = function (_XMLStructure) {
				_inherits(h5, _XMLStructure);

				function h5(object) {
								_classCallCheck(this, h5);

								var config = {
												id: "h5",
												description: "Section heading",
												openTag: "<h5>",
												closeTag: "</h5>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (h5.__proto__ || Object.getPrototypeOf(h5)).call(this, object, config));
				}

				return h5;
}(XMLStructure);

module.exports = h5;

},{"../XMLStructure.js":2}],44:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var h6 = function (_XMLStructure) {
				_inherits(h6, _XMLStructure);

				function h6(object) {
								_classCallCheck(this, h6);

								var config = {
												id: "h6",
												description: "Section heading",
												openTag: "<h6>",
												closeTag: "</h6>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (h6.__proto__ || Object.getPrototypeOf(h6)).call(this, object, config));
				}

				return h6;
}(XMLStructure);

module.exports = h6;

},{"../XMLStructure.js":2}],45:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var head = function (_XMLStructure) {
    _inherits(head, _XMLStructure);

    function head(object) {
        _classCallCheck(this, head);

        var config = {
            id: "head",
            description: "Container for document metadata",
            openTag: "<head>",
            closeTag: "</head>",
            allowedParents: [{ "id": "html" }],
            allowedChildren: [{ "id": "base" }, { "id": "link" }, { "id": "meta" }, { "id": "noscript" }, { "id": "script" }, { "id": "style" }, { "id": "template" }, { "id": "title" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
        };

        return _possibleConstructorReturn(this, (head.__proto__ || Object.getPrototypeOf(head)).call(this, object, config));
    }

    return head;
}(XMLStructure);

module.exports = head;

},{"../XMLStructure.js":2}],46:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var header = function (_XMLStructure) {
				_inherits(header, _XMLStructure);

				function header(object) {
								_classCallCheck(this, header);

								var config = {
												id: "header",
												description: "Introductory or navigational aids for a page or section",
												openTag: "<header>",
												closeTag: "</header>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (header.__proto__ || Object.getPrototypeOf(header)).call(this, object, config));
				}

				return header;
}(XMLStructure);

module.exports = header;

},{"../XMLStructure.js":2}],47:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var hr = function (_XMLStructure) {
				_inherits(hr, _XMLStructure);

				function hr(object) {
								_classCallCheck(this, hr);

								var config = {
												id: "hr",
												description: "Thematic break",
												openTag: "<hr>",
												closeTag: "</hr>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (hr.__proto__ || Object.getPrototypeOf(hr)).call(this, object, config));
				}

				return hr;
}(XMLStructure);

module.exports = hr;

},{"../XMLStructure.js":2}],48:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var html = function (_XMLStructure) {
    _inherits(html, _XMLStructure);

    function html(object) {
        _classCallCheck(this, html);

        var config = {
            id: "html",
            description: "Root element",
            openTag: "<html>",
            closeTag: "</html>",
            allowedParents: [],
            allowedChildren: [{ "id": "head" }, { "id": "body" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "manifest", "value": false }]
        };

        return _possibleConstructorReturn(this, (html.__proto__ || Object.getPrototypeOf(html)).call(this, object, config));
    }

    return html;
}(XMLStructure);

module.exports = html;

},{"../XMLStructure.js":2}],49:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var i = function (_XMLStructure) {
				_inherits(i, _XMLStructure);

				function i(object) {
								_classCallCheck(this, i);

								var config = {
												id: "i",
												description: "Alternate voice",
												openTag: "<i>",
												closeTag: "</i>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, object, config));
				}

				return i;
}(XMLStructure);

module.exports = i;

},{"../XMLStructure.js":2}],50:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var iframe = function (_XMLStructure) {
				_inherits(iframe, _XMLStructure);

				function iframe(object) {
								_classCallCheck(this, iframe);

								var config = {
												id: "iframe",
												description: "Nested browsing context",
												openTag: "<iframe>",
												closeTag: "</iframe>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "src", "value": false }, { "name": "srcdoc", "value": false }, { "name": "name", "value": false }, { "name": "sandbox", "value": false }, { "name": "width", "value": false }, { "name": "height", "value": false }]
								};

								return _possibleConstructorReturn(this, (iframe.__proto__ || Object.getPrototypeOf(iframe)).call(this, object, config));
				}

				return iframe;
}(XMLStructure);

module.exports = iframe;

},{"../XMLStructure.js":2}],51:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var img = function (_XMLStructure) {
				_inherits(img, _XMLStructure);

				function img(object) {
								_classCallCheck(this, img);

								var config = {
												id: "img",
												description: "Image",
												openTag: "<img>",
												closeTag: "</img>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "alt", "value": false }, { "name": "src", "value": false }, { "name": "crossorigin", "value": false }, { "name": "usemap", "value": false }, { "name": "ismap", "value": false }, { "name": "width", "value": false }, { "name": "height", "value": false }]
								};

								return _possibleConstructorReturn(this, (img.__proto__ || Object.getPrototypeOf(img)).call(this, object, config));
				}

				return img;
}(XMLStructure);

module.exports = img;

},{"../XMLStructure.js":2}],52:[function(require,module,exports){
"use strict";

module.exports = {
    a: require("./a.js"),
    abbr: require("./abbr.js"),
    address: require("./address.js"),
    area: require("./area.js"),
    article: require("./article.js"),
    aside: require("./aside.js"),
    audio: require("./audio.js"),
    b: require("./b.js"),
    base: require("./base.js"),
    bdi: require("./bdi.js"),
    bdo: require("./bdo.js"),
    blockquote: require("./blockquote.js"),
    body: require("./body.js"),
    br: require("./br.js"),
    button: require("./button.js"),
    canvas: require("./canvas.js"),
    caption: require("./caption.js"),
    cite: require("./cite.js"),
    code: require("./code.js"),
    col: require("./col.js"),
    colgroup: require("./colgroup.js"),
    data: require("./data.js"),
    datalist: require("./datalist.js"),
    dd: require("./dd.js"),
    del: require("./del.js"),
    dfn: require("./dfn.js"),
    div: require("./div.js"),
    dl: require("./dl.js"),
    dt: require("./dt.js"),
    em: require("./em.js"),
    embed: require("./embed.js"),
    fieldset: require("./fieldset.js"),
    figcaption: require("./figcaption.js"),
    figure: require("./figure.js"),
    footer: require("./footer.js"),
    form: require("./form.js"),
    h1: require("./h1.js"),
    h2: require("./h2.js"),
    h3: require("./h3.js"),
    h4: require("./h4.js"),
    h5: require("./h5.js"),
    h6: require("./h6.js"),
    head: require("./head.js"),
    header: require("./header.js"),
    hr: require("./hr.js"),
    html: require("./html.js"),
    i: require("./i.js"),
    iframe: require("./iframe.js"),
    img: require("./img.js"),
    input: require("./input.js"),
    ins: require("./ins.js"),
    kbd: require("./kbd.js"),
    keygen: require("./keygen.js"),
    label: require("./label.js"),
    legend: require("./legend.js"),
    li: require("./li.js"),
    link: require("./link.js"),
    main: require("./main.js"),
    map: require("./map.js"),
    mark: require("./mark.js"),
    meta: require("./meta.js"),
    meter: require("./meter.js"),
    nav: require("./nav.js"),
    noscript: require("./noscript.js"),
    object: require("./object.js"),
    ol: require("./ol.js"),
    optgroup: require("./optgroup.js"),
    option: require("./option.js"),
    output: require("./output.js"),
    p: require("./p.js"),
    param: require("./param.js"),
    pre: require("./pre.js"),
    progress: require("./progress.js"),
    q: require("./q.js"),
    rb: require("./rb.js"),
    rp: require("./rp.js"),
    rt: require("./rt.js"),
    rtc: require("./rtc.js"),
    ruby: require("./ruby.js"),
    s: require("./s.js"),
    samp: require("./samp.js"),
    script: require("./script.js"),
    section: require("./section.js"),
    select: require("./select.js"),
    small: require("./small.js"),
    source: require("./source.js"),
    span: require("./span.js"),
    strong: require("./strong.js"),
    style: require("./style.js"),
    sub: require("./sub.js"),
    sup: require("./sup.js"),
    table: require("./table.js"),
    tbody: require("./tbody.js"),
    td: require("./td.js"),
    template: require("./template.js"),
    textarea: require("./textarea.js"),
    tfoot: require("./tfoot.js"),
    th: require("./th.js"),
    thead: require("./thead.js"),
    time: require("./time.js"),
    title: require("./title.js"),
    tr: require("./tr.js"),
    track: require("./track.js"),
    u: require("./u.js"),
    ul: require("./ul.js"),
    variable: require("./variable.js"),
    video: require("./video.js"),
    wbr: require("./wbr.js")
};

},{"./a.js":3,"./abbr.js":4,"./address.js":5,"./area.js":6,"./article.js":7,"./aside.js":8,"./audio.js":9,"./b.js":10,"./base.js":11,"./bdi.js":12,"./bdo.js":13,"./blockquote.js":14,"./body.js":15,"./br.js":16,"./button.js":17,"./canvas.js":18,"./caption.js":19,"./cite.js":20,"./code.js":21,"./col.js":22,"./colgroup.js":23,"./data.js":24,"./datalist.js":25,"./dd.js":26,"./del.js":27,"./dfn.js":28,"./div.js":29,"./dl.js":30,"./dt.js":31,"./em.js":32,"./embed.js":33,"./fieldset.js":34,"./figcaption.js":35,"./figure.js":36,"./footer.js":37,"./form.js":38,"./h1.js":39,"./h2.js":40,"./h3.js":41,"./h4.js":42,"./h5.js":43,"./h6.js":44,"./head.js":45,"./header.js":46,"./hr.js":47,"./html.js":48,"./i.js":49,"./iframe.js":50,"./img.js":51,"./input.js":53,"./ins.js":54,"./kbd.js":55,"./keygen.js":56,"./label.js":57,"./legend.js":58,"./li.js":59,"./link.js":60,"./main.js":61,"./map.js":62,"./mark.js":63,"./meta.js":64,"./meter.js":65,"./nav.js":66,"./noscript.js":67,"./object.js":68,"./ol.js":69,"./optgroup.js":70,"./option.js":71,"./output.js":72,"./p.js":73,"./param.js":74,"./pre.js":75,"./progress.js":76,"./q.js":77,"./rb.js":78,"./rp.js":79,"./rt.js":80,"./rtc.js":81,"./ruby.js":82,"./s.js":83,"./samp.js":84,"./script.js":85,"./section.js":86,"./select.js":87,"./small.js":88,"./source.js":89,"./span.js":90,"./strong.js":91,"./style.js":92,"./sub.js":93,"./sup.js":94,"./table.js":95,"./tbody.js":96,"./td.js":97,"./template.js":98,"./textarea.js":99,"./tfoot.js":100,"./th.js":101,"./thead.js":102,"./time.js":103,"./title.js":104,"./tr.js":105,"./track.js":106,"./u.js":107,"./ul.js":108,"./variable.js":109,"./video.js":110,"./wbr.js":111}],53:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var input = function (_XMLStructure) {
				_inherits(input, _XMLStructure);

				function input(object) {
								_classCallCheck(this, input);

								var config = {
												id: "input",
												description: "Form control",
												openTag: "<input>",
												closeTag: "</input>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "accept", "value": false }, { "name": "alt", "value": false }, { "name": "autocomplete", "value": false }, { "name": "autofocus", "value": false }, { "name": "checked", "value": false }, { "name": "dirname", "value": false }, { "name": "disabled", "value": false }, { "name": "form", "value": false }, { "name": "formaction", "value": false }, { "name": "formenctype", "value": false }, { "name": "formmethod", "value": false }, { "name": "formnovalidate", "value": false }, { "name": "formtarget", "value": false }, { "name": "height", "value": false }, { "name": "list", "value": false }, { "name": "max", "value": false }, { "name": "maxlength", "value": false }, { "name": "min", "value": false }, { "name": "minlength", "value": false }, { "name": "multiple", "value": false }, { "name": "name", "value": false }, { "name": "pattern", "value": false }, { "name": "placeholder", "value": false }, { "name": "readonly", "value": false }, { "name": "required", "value": false }, { "name": "size", "value": false }, { "name": "src", "value": false }, { "name": "step", "value": false }, { "name": "type", "value": false }, { "name": "value", "value": false }, { "name": "width", "value": false }]
								};

								return _possibleConstructorReturn(this, (input.__proto__ || Object.getPrototypeOf(input)).call(this, object, config));
				}

				return input;
}(XMLStructure);

module.exports = input;

},{"../XMLStructure.js":2}],54:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var ins = function (_XMLStructure) {
				_inherits(ins, _XMLStructure);

				function ins(object) {
								_classCallCheck(this, ins);

								var config = {
												id: "ins",
												description: "An addition to the document",
												openTag: "<ins>",
												closeTag: "</ins>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "cite", "value": false }, { "name": "datetime", "value": false }]
								};

								return _possibleConstructorReturn(this, (ins.__proto__ || Object.getPrototypeOf(ins)).call(this, object, config));
				}

				return ins;
}(XMLStructure);

module.exports = ins;

},{"../XMLStructure.js":2}],55:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var kbd = function (_XMLStructure) {
				_inherits(kbd, _XMLStructure);

				function kbd(object) {
								_classCallCheck(this, kbd);

								var config = {
												id: "kbd",
												description: "User input",
												openTag: "<kbd>",
												closeTag: "</kbd>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (kbd.__proto__ || Object.getPrototypeOf(kbd)).call(this, object, config));
				}

				return kbd;
}(XMLStructure);

module.exports = kbd;

},{"../XMLStructure.js":2}],56:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var keygen = function (_XMLStructure) {
				_inherits(keygen, _XMLStructure);

				function keygen(object) {
								_classCallCheck(this, keygen);

								var config = {
												id: "keygen",
												description: "Cryptographic key-pair generator form control",
												openTag: "<keygen>",
												closeTag: "</keygen>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "autofocus", "value": false }, { "name": "challenge", "value": false }, { "name": "disabled", "value": false }, { "name": "form", "value": false }, { "name": "keytype", "value": false }, { "name": "name", "value": false }]
								};

								return _possibleConstructorReturn(this, (keygen.__proto__ || Object.getPrototypeOf(keygen)).call(this, object, config));
				}

				return keygen;
}(XMLStructure);

module.exports = keygen;

},{"../XMLStructure.js":2}],57:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var label = function (_XMLStructure) {
				_inherits(label, _XMLStructure);

				function label(object) {
								_classCallCheck(this, label);

								var config = {
												id: "label",
												description: "Caption for a form control",
												openTag: "<label>",
												closeTag: "</label>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "form", "value": false }, { "name": "for", "value": false }]
								};

								return _possibleConstructorReturn(this, (label.__proto__ || Object.getPrototypeOf(label)).call(this, object, config));
				}

				return label;
}(XMLStructure);

module.exports = label;

},{"../XMLStructure.js":2}],58:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var legend = function (_XMLStructure) {
				_inherits(legend, _XMLStructure);

				function legend(object) {
								_classCallCheck(this, legend);

								var config = {
												id: "legend",
												description: "Caption for fieldset",
												openTag: "<legend>",
												closeTag: "</legend>",
												allowedParents: [{ "id": "fieldset" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (legend.__proto__ || Object.getPrototypeOf(legend)).call(this, object, config));
				}

				return legend;
}(XMLStructure);

module.exports = legend;

},{"../XMLStructure.js":2}],59:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var li = function (_XMLStructure) {
				_inherits(li, _XMLStructure);

				function li(object) {
								_classCallCheck(this, li);

								var config = {
												id: "li",
												description: "List item",
												openTag: "<li>",
												closeTag: "</li>",
												allowedParents: [{ "id": "ol" }, { "id": "ul" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "value", "value": false }]
								};

								return _possibleConstructorReturn(this, (li.__proto__ || Object.getPrototypeOf(li)).call(this, object, config));
				}

				return li;
}(XMLStructure);

module.exports = li;

},{"../XMLStructure.js":2}],60:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var link = function (_XMLStructure) {
				_inherits(link, _XMLStructure);

				function link(object) {
								_classCallCheck(this, link);

								var config = {
												id: "link",
												description: "Link metadata",
												openTag: "<link>",
												closeTag: "</link>",
												allowedParents: [{ "id": "head" }, { "id": "template" }, { "id": "noscript" }, { "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "href", "value": false }, { "name": "crossorigin", "value": false }, { "name": "rel", "value": false }, { "name": "media", "value": false }, { "name": "hreflang", "value": false }, { "name": "type", "value": false }, { "name": "sizes", "value": false }]
								};

								return _possibleConstructorReturn(this, (link.__proto__ || Object.getPrototypeOf(link)).call(this, object, config));
				}

				return link;
}(XMLStructure);

module.exports = link;

},{"../XMLStructure.js":2}],61:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var main = function (_XMLStructure) {
				_inherits(main, _XMLStructure);

				function main(object) {
								_classCallCheck(this, main);

								var config = {
												id: "main",
												description: "Main content of a document",
												openTag: "<main>",
												closeTag: "</main>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (main.__proto__ || Object.getPrototypeOf(main)).call(this, object, config));
				}

				return main;
}(XMLStructure);

module.exports = main;

},{"../XMLStructure.js":2}],62:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var map = function (_XMLStructure) {
				_inherits(map, _XMLStructure);

				function map(object) {
								_classCallCheck(this, map);

								var config = {
												id: "map",
												description: "Image map",
												openTag: "<map>",
												closeTag: "</map>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "area" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "name", "value": false }]
								};

								return _possibleConstructorReturn(this, (map.__proto__ || Object.getPrototypeOf(map)).call(this, object, config));
				}

				return map;
}(XMLStructure);

module.exports = map;

},{"../XMLStructure.js":2}],63:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var mark = function (_XMLStructure) {
				_inherits(mark, _XMLStructure);

				function mark(object) {
								_classCallCheck(this, mark);

								var config = {
												id: "mark",
												description: "Highlight",
												openTag: "<mark>",
												closeTag: "</mark>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (mark.__proto__ || Object.getPrototypeOf(mark)).call(this, object, config));
				}

				return mark;
}(XMLStructure);

module.exports = mark;

},{"../XMLStructure.js":2}],64:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var meta = function (_XMLStructure) {
				_inherits(meta, _XMLStructure);

				function meta(object) {
								_classCallCheck(this, meta);

								var config = {
												id: "meta",
												description: "Text metadata",
												openTag: "<meta>",
												closeTag: "</meta>",
												allowedParents: [{ "id": "head" }, { "id": "template" }, { "id": "noscript" }, { "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "name", "value": false }, { "name": "http-equiv", "value": false }, { "name": "content", "value": false }, { "name": "charset", "value": false }]
								};

								return _possibleConstructorReturn(this, (meta.__proto__ || Object.getPrototypeOf(meta)).call(this, object, config));
				}

				return meta;
}(XMLStructure);

module.exports = meta;

},{"../XMLStructure.js":2}],65:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var meter = function (_XMLStructure) {
				_inherits(meter, _XMLStructure);

				function meter(object) {
								_classCallCheck(this, meter);

								var config = {
												id: "meter",
												description: "Gauge",
												openTag: "<meter>",
												closeTag: "</meter>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "value", "value": false }, { "name": "min", "value": false }, { "name": "max", "value": false }, { "name": "low", "value": false }, { "name": "high", "value": false }, { "name": "optimum", "value": false }]
								};

								return _possibleConstructorReturn(this, (meter.__proto__ || Object.getPrototypeOf(meter)).call(this, object, config));
				}

				return meter;
}(XMLStructure);

module.exports = meter;

},{"../XMLStructure.js":2}],66:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var nav = function (_XMLStructure) {
				_inherits(nav, _XMLStructure);

				function nav(object) {
								_classCallCheck(this, nav);

								var config = {
												id: "nav",
												description: "Section with navigational links",
												openTag: "<nav>",
												closeTag: "</nav>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (nav.__proto__ || Object.getPrototypeOf(nav)).call(this, object, config));
				}

				return nav;
}(XMLStructure);

module.exports = nav;

},{"../XMLStructure.js":2}],67:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var noscript = function (_XMLStructure) {
				_inherits(noscript, _XMLStructure);

				function noscript(object) {
								_classCallCheck(this, noscript);

								var config = {
												id: "noscript",
												description: "Fallback content for script",
												openTag: "<noscript>",
												closeTag: "</noscript>",
												allowedParents: [{ "id": "head" }, { "id": "template" }, { "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "base" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "body" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "caption" }, { "id": "cite" }, { "id": "code" }, { "id": "col" }, { "id": "colgroup" }, { "id": "data" }, { "id": "datalist" }, { "id": "dd" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "dt" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figcaption" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "head" }, { "id": "header" }, { "id": "hr" }, { "id": "html" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "legend" }, { "id": "li" }, { "id": "link" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "meta" }, { "id": "meter" }, { "id": "nav" }, { "id": "object" }, { "id": "ol" }, { "id": "optgroup" }, { "id": "option" }, { "id": "output" }, { "id": "p" }, { "id": "param" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "rb" }, { "id": "rp" }, { "id": "rt" }, { "id": "rtc" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "source" }, { "id": "span" }, { "id": "strong" }, { "id": "style" }, { "id": "sub" }, { "id": "sup" }, { "id": "table" }, { "id": "tbody" }, { "id": "td" }, { "id": "template" }, { "id": "textarea" }, { "id": "tfoot" }, { "id": "th" }, { "id": "thead" }, { "id": "time" }, { "id": "title" }, { "id": "tr" }, { "id": "track" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (noscript.__proto__ || Object.getPrototypeOf(noscript)).call(this, object, config));
				}

				return noscript;
}(XMLStructure);

module.exports = noscript;

},{"../XMLStructure.js":2}],68:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var object = function (_XMLStructure) {
				_inherits(object, _XMLStructure);

				function object(_object) {
								_classCallCheck(this, object);

								var config = {
												id: "object",
												description: "Image, nested browsing context, or plugin",
												openTag: "<object>",
												closeTag: "</object>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "param" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "data", "value": false }, { "name": "type", "value": false }, { "name": "typemustmatch", "value": false }, { "name": "name", "value": false }, { "name": "usemap", "value": false }, { "name": "form", "value": false }, { "name": "width", "value": false }, { "name": "height", "value": false }]
								};

								return _possibleConstructorReturn(this, (object.__proto__ || Object.getPrototypeOf(object)).call(this, _object, config));
				}

				return object;
}(XMLStructure);

module.exports = object;

},{"../XMLStructure.js":2}],69:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var ol = function (_XMLStructure) {
				_inherits(ol, _XMLStructure);

				function ol(object) {
								_classCallCheck(this, ol);

								var config = {
												id: "ol",
												description: "Ordered list",
												openTag: "<ol>",
												closeTag: "</ol>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "li" }, { "id": "script" }, { "id": "template" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "reversed", "value": false }, { "name": "start", "value": false }, { "name": "type", "value": false }]
								};

								return _possibleConstructorReturn(this, (ol.__proto__ || Object.getPrototypeOf(ol)).call(this, object, config));
				}

				return ol;
}(XMLStructure);

module.exports = ol;

},{"../XMLStructure.js":2}],70:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var optgroup = function (_XMLStructure) {
    _inherits(optgroup, _XMLStructure);

    function optgroup(object) {
        _classCallCheck(this, optgroup);

        var config = {
            id: "optgroup",
            description: "Group of options in a list box",
            openTag: "<optgroup>",
            closeTag: "</optgroup>",
            allowedParents: [{ "id": "select" }, { "id": "template" }],
            allowedChildren: [{ "id": "option" }, { "id": "script" }, { "id": "template" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "disabled", "value": false }, { "name": "label", "value": false }]
        };

        return _possibleConstructorReturn(this, (optgroup.__proto__ || Object.getPrototypeOf(optgroup)).call(this, object, config));
    }

    return optgroup;
}(XMLStructure);

module.exports = optgroup;

},{"../XMLStructure.js":2}],71:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var option = function (_XMLStructure) {
    _inherits(option, _XMLStructure);

    function option(object) {
        _classCallCheck(this, option);

        var config = {
            id: "option",
            description: "Option in a list box or combo box control",
            openTag: "<option>",
            closeTag: "</option>",
            allowedParents: [{ "id": "select" }, { "id": "datalist" }, { "id": "optgroup" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "disabled", "value": false }, { "name": "label", "value": false }, { "name": "selected", "value": false }, { "name": "value", "value": false }]
        };

        return _possibleConstructorReturn(this, (option.__proto__ || Object.getPrototypeOf(option)).call(this, object, config));
    }

    return option;
}(XMLStructure);

module.exports = option;

},{"../XMLStructure.js":2}],72:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var output = function (_XMLStructure) {
				_inherits(output, _XMLStructure);

				function output(object) {
								_classCallCheck(this, output);

								var config = {
												id: "output",
												description: "Calculated output value",
												openTag: "<output>",
												closeTag: "</output>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "for", "value": false }, { "name": "form", "value": false }, { "name": "name", "value": false }]
								};

								return _possibleConstructorReturn(this, (output.__proto__ || Object.getPrototypeOf(output)).call(this, object, config));
				}

				return output;
}(XMLStructure);

module.exports = output;

},{"../XMLStructure.js":2}],73:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var p = function (_XMLStructure) {
				_inherits(p, _XMLStructure);

				function p(object) {
								_classCallCheck(this, p);

								var config = {
												id: "p",
												description: "Paragraph",
												openTag: "<p>",
												closeTag: "</p>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, object, config));
				}

				return p;
}(XMLStructure);

module.exports = p;

},{"../XMLStructure.js":2}],74:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var param = function (_XMLStructure) {
    _inherits(param, _XMLStructure);

    function param(object) {
        _classCallCheck(this, param);

        var config = {
            id: "param",
            description: "Parameter for object",
            openTag: "<param>",
            closeTag: "</param>",
            allowedParents: [{ "id": "object" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "name", "value": false }, { "name": "value", "value": false }]
        };

        return _possibleConstructorReturn(this, (param.__proto__ || Object.getPrototypeOf(param)).call(this, object, config));
    }

    return param;
}(XMLStructure);

module.exports = param;

},{"../XMLStructure.js":2}],75:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var pre = function (_XMLStructure) {
				_inherits(pre, _XMLStructure);

				function pre(object) {
								_classCallCheck(this, pre);

								var config = {
												id: "pre",
												description: "Block of preformatted text",
												openTag: "<pre>",
												closeTag: "</pre>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (pre.__proto__ || Object.getPrototypeOf(pre)).call(this, object, config));
				}

				return pre;
}(XMLStructure);

module.exports = pre;

},{"../XMLStructure.js":2}],76:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var progress = function (_XMLStructure) {
				_inherits(progress, _XMLStructure);

				function progress(object) {
								_classCallCheck(this, progress);

								var config = {
												id: "progress",
												description: "Progress bar",
												openTag: "<progress>",
												closeTag: "</progress>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "value", "value": false }, { "name": "max", "value": false }]
								};

								return _possibleConstructorReturn(this, (progress.__proto__ || Object.getPrototypeOf(progress)).call(this, object, config));
				}

				return progress;
}(XMLStructure);

module.exports = progress;

},{"../XMLStructure.js":2}],77:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var q = function (_XMLStructure) {
				_inherits(q, _XMLStructure);

				function q(object) {
								_classCallCheck(this, q);

								var config = {
												id: "q",
												description: "Quotation",
												openTag: "<q>",
												closeTag: "</q>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "cite", "value": false }]
								};

								return _possibleConstructorReturn(this, (q.__proto__ || Object.getPrototypeOf(q)).call(this, object, config));
				}

				return q;
}(XMLStructure);

module.exports = q;

},{"../XMLStructure.js":2}],78:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var rb = function (_XMLStructure) {
				_inherits(rb, _XMLStructure);

				function rb(object) {
								_classCallCheck(this, rb);

								var config = {
												id: "rb",
												description: "Ruby base",
												openTag: "<rb>",
												closeTag: "</rb>",
												allowedParents: [{ "id": "ruby" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (rb.__proto__ || Object.getPrototypeOf(rb)).call(this, object, config));
				}

				return rb;
}(XMLStructure);

module.exports = rb;

},{"../XMLStructure.js":2}],79:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var rp = function (_XMLStructure) {
				_inherits(rp, _XMLStructure);

				function rp(object) {
								_classCallCheck(this, rp);

								var config = {
												id: "rp",
												description: "Parenthesis for ruby annotation text",
												openTag: "<rp>",
												closeTag: "</rp>",
												allowedParents: [{ "id": "ruby" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (rp.__proto__ || Object.getPrototypeOf(rp)).call(this, object, config));
				}

				return rp;
}(XMLStructure);

module.exports = rp;

},{"../XMLStructure.js":2}],80:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var rt = function (_XMLStructure) {
				_inherits(rt, _XMLStructure);

				function rt(object) {
								_classCallCheck(this, rt);

								var config = {
												id: "rt",
												description: "Ruby annotation text",
												openTag: "<rt>",
												closeTag: "</rt>",
												allowedParents: [{ "id": "ruby" }, { "id": "         rtc" }, { "id": "         template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (rt.__proto__ || Object.getPrototypeOf(rt)).call(this, object, config));
				}

				return rt;
}(XMLStructure);

module.exports = rt;

},{"../XMLStructure.js":2}],81:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var rtc = function (_XMLStructure) {
				_inherits(rtc, _XMLStructure);

				function rtc(object) {
								_classCallCheck(this, rtc);

								var config = {
												id: "rtc",
												description: "Ruby annotation text container",
												openTag: "<rtc>",
												closeTag: "</rtc>",
												allowedParents: [{ "id": "ruby" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (rtc.__proto__ || Object.getPrototypeOf(rtc)).call(this, object, config));
				}

				return rtc;
}(XMLStructure);

module.exports = rtc;

},{"../XMLStructure.js":2}],82:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var ruby = function (_XMLStructure) {
				_inherits(ruby, _XMLStructure);

				function ruby(object) {
								_classCallCheck(this, ruby);

								var config = {
												id: "ruby",
												description: "Ruby annotation(s)",
												openTag: "<ruby>",
												closeTag: "</ruby>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }, { "id": "rp" }, { "id": "rt" }, { "id": "         rb" }, { "id": "rtc" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (ruby.__proto__ || Object.getPrototypeOf(ruby)).call(this, object, config));
				}

				return ruby;
}(XMLStructure);

module.exports = ruby;

},{"../XMLStructure.js":2}],83:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var s = function (_XMLStructure) {
				_inherits(s, _XMLStructure);

				function s(object) {
								_classCallCheck(this, s);

								var config = {
												id: "s",
												description: "Inaccurate text",
												openTag: "<s>",
												closeTag: "</s>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, object, config));
				}

				return s;
}(XMLStructure);

module.exports = s;

},{"../XMLStructure.js":2}],84:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var samp = function (_XMLStructure) {
				_inherits(samp, _XMLStructure);

				function samp(object) {
								_classCallCheck(this, samp);

								var config = {
												id: "samp",
												description: "Computer output",
												openTag: "<samp>",
												closeTag: "</samp>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (samp.__proto__ || Object.getPrototypeOf(samp)).call(this, object, config));
				}

				return samp;
}(XMLStructure);

module.exports = samp;

},{"../XMLStructure.js":2}],85:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var script = function (_XMLStructure) {
				_inherits(script, _XMLStructure);

				function script(object) {
								_classCallCheck(this, script);

								var config = {
												id: "script",
												description: "Embedded script",
												openTag: "<script>",
												closeTag: "</script>",
												allowedParents: [{ "id": "head" }, { "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }, { "id": "script-supporting" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "src", "value": false }, { "name": "type", "value": false }, { "name": "charset", "value": false }, { "name": "async", "value": false }, { "name": "defer", "value": false }, { "name": "crossorigin", "value": false }]
								};

								return _possibleConstructorReturn(this, (script.__proto__ || Object.getPrototypeOf(script)).call(this, object, config));
				}

				return script;
}(XMLStructure);

module.exports = script;

},{"../XMLStructure.js":2}],86:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var section = function (_XMLStructure) {
				_inherits(section, _XMLStructure);

				function section(object) {
								_classCallCheck(this, section);

								var config = {
												id: "section",
												description: "Generic document or application section",
												openTag: "<section>",
												closeTag: "</section>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (section.__proto__ || Object.getPrototypeOf(section)).call(this, object, config));
				}

				return section;
}(XMLStructure);

module.exports = section;

},{"../XMLStructure.js":2}],87:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var select = function (_XMLStructure) {
				_inherits(select, _XMLStructure);

				function select(object) {
								_classCallCheck(this, select);

								var config = {
												id: "select",
												description: "List box control",
												openTag: "<select>",
												closeTag: "</select>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "option, optgroup" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "autofocus", "value": false }, { "name": "disabled", "value": false }, { "name": "form", "value": false }, { "name": "multiple", "value": false }, { "name": "name", "value": false }, { "name": "required", "value": false }, { "name": "size", "value": false }]
								};

								return _possibleConstructorReturn(this, (select.__proto__ || Object.getPrototypeOf(select)).call(this, object, config));
				}

				return select;
}(XMLStructure);

module.exports = select;

},{"../XMLStructure.js":2}],88:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var small = function (_XMLStructure) {
				_inherits(small, _XMLStructure);

				function small(object) {
								_classCallCheck(this, small);

								var config = {
												id: "small",
												description: "Side comment",
												openTag: "<small>",
												closeTag: "</small>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (small.__proto__ || Object.getPrototypeOf(small)).call(this, object, config));
				}

				return small;
}(XMLStructure);

module.exports = small;

},{"../XMLStructure.js":2}],89:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var source = function (_XMLStructure) {
    _inherits(source, _XMLStructure);

    function source(object) {
        _classCallCheck(this, source);

        var config = {
            id: "source",
            description: "Media source for video or audio",
            openTag: "<source>",
            closeTag: "</source>",
            allowedParents: [{ "id": "video" }, { "id": "audio" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "src", "value": false }, { "name": "type", "value": false }, { "name": "media", "value": false }]
        };

        return _possibleConstructorReturn(this, (source.__proto__ || Object.getPrototypeOf(source)).call(this, object, config));
    }

    return source;
}(XMLStructure);

module.exports = source;

},{"../XMLStructure.js":2}],90:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var span = function (_XMLStructure) {
				_inherits(span, _XMLStructure);

				function span(object) {
								_classCallCheck(this, span);

								var config = {
												id: "span",
												description: "Generic phrasing container",
												openTag: "<span>",
												closeTag: "</span>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (span.__proto__ || Object.getPrototypeOf(span)).call(this, object, config));
				}

				return span;
}(XMLStructure);

module.exports = span;

},{"../XMLStructure.js":2}],91:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var strong = function (_XMLStructure) {
				_inherits(strong, _XMLStructure);

				function strong(object) {
								_classCallCheck(this, strong);

								var config = {
												id: "strong",
												description: "Importance",
												openTag: "<strong>",
												closeTag: "</strong>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (strong.__proto__ || Object.getPrototypeOf(strong)).call(this, object, config));
				}

				return strong;
}(XMLStructure);

module.exports = strong;

},{"../XMLStructure.js":2}],92:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var style = function (_XMLStructure) {
				_inherits(style, _XMLStructure);

				function style(object) {
								_classCallCheck(this, style);

								var config = {
												id: "style",
												description: "Embedded styling information",
												openTag: "<style>",
												closeTag: "</style>",
												allowedParents: [{ "id": "head" }, { "id": "noscript" }, { "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "varies" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "media", "value": false }, { "name": "type", "value": false }]
								};

								return _possibleConstructorReturn(this, (style.__proto__ || Object.getPrototypeOf(style)).call(this, object, config));
				}

				return style;
}(XMLStructure);

module.exports = style;

},{"../XMLStructure.js":2}],93:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var sub = function (_XMLStructure) {
				_inherits(sub, _XMLStructure);

				function sub(object) {
								_classCallCheck(this, sub);

								var config = {
												id: "sub",
												description: "Subscript",
												openTag: "<sub>",
												closeTag: "</sub>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (sub.__proto__ || Object.getPrototypeOf(sub)).call(this, object, config));
				}

				return sub;
}(XMLStructure);

module.exports = sub;

},{"../XMLStructure.js":2}],94:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var sup = function (_XMLStructure) {
				_inherits(sup, _XMLStructure);

				function sup(object) {
								_classCallCheck(this, sup);

								var config = {
												id: "sup",
												description: "Superscript",
												openTag: "<sup>",
												closeTag: "</sup>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (sup.__proto__ || Object.getPrototypeOf(sup)).call(this, object, config));
				}

				return sup;
}(XMLStructure);

module.exports = sup;

},{"../XMLStructure.js":2}],95:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var table = function (_XMLStructure) {
				_inherits(table, _XMLStructure);

				function table(object) {
								_classCallCheck(this, table);

								var config = {
												id: "table",
												description: "Table",
												openTag: "<table>",
												closeTag: "</table>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "caption" }, { "id": "colgroup" }, { "id": "thead" }, { "id": "tbody" }, { "id": "tfoot" }, { "id": "tr" }, { "id": "script" }, { "id": "template" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "border", "value": false }]
								};

								return _possibleConstructorReturn(this, (table.__proto__ || Object.getPrototypeOf(table)).call(this, object, config));
				}

				return table;
}(XMLStructure);

module.exports = table;

},{"../XMLStructure.js":2}],96:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var tbody = function (_XMLStructure) {
    _inherits(tbody, _XMLStructure);

    function tbody(object) {
        _classCallCheck(this, tbody);

        var config = {
            id: "tbody",
            description: "Group of rows in a table",
            openTag: "<tbody>",
            closeTag: "</tbody>",
            allowedParents: [{ "id": "table" }, { "id": "template" }],
            allowedChildren: [{ "id": "tr" }, { "id": "script" }, { "id": "template" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
        };

        return _possibleConstructorReturn(this, (tbody.__proto__ || Object.getPrototypeOf(tbody)).call(this, object, config));
    }

    return tbody;
}(XMLStructure);

module.exports = tbody;

},{"../XMLStructure.js":2}],97:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var td = function (_XMLStructure) {
				_inherits(td, _XMLStructure);

				function td(object) {
								_classCallCheck(this, td);

								var config = {
												id: "td",
												description: "Table cell",
												openTag: "<td>",
												closeTag: "</td>",
												allowedParents: [{ "id": "tr" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "colspan", "value": false }, { "name": "rowspan", "value": false }, { "name": "headers", "value": false }]
								};

								return _possibleConstructorReturn(this, (td.__proto__ || Object.getPrototypeOf(td)).call(this, object, config));
				}

				return td;
}(XMLStructure);

module.exports = td;

},{"../XMLStructure.js":2}],98:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var template = function (_XMLStructure) {
				_inherits(template, _XMLStructure);

				function template(object) {
								_classCallCheck(this, template);

								var config = {
												id: "template",
												description: "Template",
												openTag: "<template>",
												closeTag: "</template>",
												allowedParents: [{ "id": "metadata" }, { "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }, { "id": "script-supporting" }, { "id": "colgroup" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "base" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "body" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "caption" }, { "id": "cite" }, { "id": "code" }, { "id": "col" }, { "id": "colgroup" }, { "id": "data" }, { "id": "datalist" }, { "id": "dd" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "dt" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figcaption" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "head" }, { "id": "header" }, { "id": "hr" }, { "id": "html" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "legend" }, { "id": "li" }, { "id": "link" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "meta" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "optgroup" }, { "id": "option" }, { "id": "output" }, { "id": "p" }, { "id": "param" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "rb" }, { "id": "rp" }, { "id": "rt" }, { "id": "rtc" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "source" }, { "id": "span" }, { "id": "strong" }, { "id": "style" }, { "id": "sub" }, { "id": "sup" }, { "id": "table" }, { "id": "tbody" }, { "id": "td" }, { "id": "textarea" }, { "id": "tfoot" }, { "id": "th" }, { "id": "thead" }, { "id": "time" }, { "id": "title" }, { "id": "tr" }, { "id": "track" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (template.__proto__ || Object.getPrototypeOf(template)).call(this, object, config));
				}

				return template;
}(XMLStructure);

module.exports = template;

},{"../XMLStructure.js":2}],99:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var textarea = function (_XMLStructure) {
				_inherits(textarea, _XMLStructure);

				function textarea(object) {
								_classCallCheck(this, textarea);

								var config = {
												id: "textarea",
												description: "Multiline text field",
												openTag: "<textarea>",
												closeTag: "</textarea>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "autofocus", "value": false }, { "name": "cols", "value": false }, { "name": "dirname", "value": false }, { "name": "disabled", "value": false }, { "name": "form", "value": false }, { "name": "maxlength", "value": false }, { "name": "minlength", "value": false }, { "name": "name", "value": false }, { "name": "placeholder", "value": false }, { "name": "readonly", "value": false }, { "name": "required", "value": false }, { "name": "rows", "value": false }, { "name": "wrap", "value": false }]
								};

								return _possibleConstructorReturn(this, (textarea.__proto__ || Object.getPrototypeOf(textarea)).call(this, object, config));
				}

				return textarea;
}(XMLStructure);

module.exports = textarea;

},{"../XMLStructure.js":2}],100:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var tfoot = function (_XMLStructure) {
    _inherits(tfoot, _XMLStructure);

    function tfoot(object) {
        _classCallCheck(this, tfoot);

        var config = {
            id: "tfoot",
            description: "Group of footer rows in a table",
            openTag: "<tfoot>",
            closeTag: "</tfoot>",
            allowedParents: [{ "id": "table" }, { "id": "template" }],
            allowedChildren: [{ "id": "tr" }, { "id": "script" }, { "id": "template" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
        };

        return _possibleConstructorReturn(this, (tfoot.__proto__ || Object.getPrototypeOf(tfoot)).call(this, object, config));
    }

    return tfoot;
}(XMLStructure);

module.exports = tfoot;

},{"../XMLStructure.js":2}],101:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var th = function (_XMLStructure) {
				_inherits(th, _XMLStructure);

				function th(object) {
								_classCallCheck(this, th);

								var config = {
												id: "th",
												description: "Table header cell",
												openTag: "<th>",
												closeTag: "</th>",
												allowedParents: [{ "id": "tr" }, { "id": "template" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "ul" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "colspan", "value": false }, { "name": "rowspan", "value": false }, { "name": "headers", "value": false }, { "name": "scope", "value": false }, { "name": "abbr", "value": false }]
								};

								return _possibleConstructorReturn(this, (th.__proto__ || Object.getPrototypeOf(th)).call(this, object, config));
				}

				return th;
}(XMLStructure);

module.exports = th;

},{"../XMLStructure.js":2}],102:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var thead = function (_XMLStructure) {
    _inherits(thead, _XMLStructure);

    function thead(object) {
        _classCallCheck(this, thead);

        var config = {
            id: "thead",
            description: "Group of heading rows in a table",
            openTag: "<thead>",
            closeTag: "</thead>",
            allowedParents: [{ "id": "table" }, { "id": "template" }],
            allowedChildren: [{ "id": "tr" }, { "id": "script" }, { "id": "template" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
        };

        return _possibleConstructorReturn(this, (thead.__proto__ || Object.getPrototypeOf(thead)).call(this, object, config));
    }

    return thead;
}(XMLStructure);

module.exports = thead;

},{"../XMLStructure.js":2}],103:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var time = function (_XMLStructure) {
				_inherits(time, _XMLStructure);

				function time(object) {
								_classCallCheck(this, time);

								var config = {
												id: "time",
												description: "Machine-readable equivalent of date- or time-related data",
												openTag: "<time>",
												closeTag: "</time>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "datetime", "value": false }]
								};

								return _possibleConstructorReturn(this, (time.__proto__ || Object.getPrototypeOf(time)).call(this, object, config));
				}

				return time;
}(XMLStructure);

module.exports = time;

},{"../XMLStructure.js":2}],104:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var title = function (_XMLStructure) {
    _inherits(title, _XMLStructure);

    function title(object) {
        _classCallCheck(this, title);

        var config = {
            id: "title",
            description: "Document title",
            openTag: "<title>",
            closeTag: "</title>",
            allowedParents: [{ "id": "head" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "translate", "value": false }]
        };

        return _possibleConstructorReturn(this, (title.__proto__ || Object.getPrototypeOf(title)).call(this, object, config));
    }

    return title;
}(XMLStructure);

module.exports = title;

},{"../XMLStructure.js":2}],105:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var tr = function (_XMLStructure) {
    _inherits(tr, _XMLStructure);

    function tr(object) {
        _classCallCheck(this, tr);

        var config = {
            id: "tr",
            description: "Table row",
            openTag: "<tr>",
            closeTag: "</tr>",
            allowedParents: [{ "id": "table" }, { "id": "thead" }, { "id": "tbody" }, { "id": "tfoot" }, { "id": "template" }],
            allowedChildren: [{ "id": "th" }, { "id": "td" }, { "id": "script" }, { "id": "template" }],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
        };

        return _possibleConstructorReturn(this, (tr.__proto__ || Object.getPrototypeOf(tr)).call(this, object, config));
    }

    return tr;
}(XMLStructure);

module.exports = tr;

},{"../XMLStructure.js":2}],106:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var track = function (_XMLStructure) {
    _inherits(track, _XMLStructure);

    function track(object) {
        _classCallCheck(this, track);

        var config = {
            id: "track",
            description: "Timed text track",
            openTag: "<track>",
            closeTag: "</track>",
            allowedParents: [{ "id": "audio" }, { "id": "video" }, { "id": "template" }],
            allowedChildren: [],
            allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "default", "value": false }, { "name": "kind", "value": false }, { "name": "label", "value": false }, { "name": "src", "value": false }, { "name": "srclang", "value": false }]
        };

        return _possibleConstructorReturn(this, (track.__proto__ || Object.getPrototypeOf(track)).call(this, object, config));
    }

    return track;
}(XMLStructure);

module.exports = track;

},{"../XMLStructure.js":2}],107:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var u = function (_XMLStructure) {
				_inherits(u, _XMLStructure);

				function u(object) {
								_classCallCheck(this, u);

								var config = {
												id: "u",
												description: "Keywords",
												openTag: "<u>",
												closeTag: "</u>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, object, config));
				}

				return u;
}(XMLStructure);

module.exports = u;

},{"../XMLStructure.js":2}],108:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var ul = function (_XMLStructure) {
				_inherits(ul, _XMLStructure);

				function ul(object) {
								_classCallCheck(this, ul);

								var config = {
												id: "ul",
												description: "List",
												openTag: "<ul>",
												closeTag: "</ul>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "address" }, { "id": "area" }, { "id": "article" }, { "id": "aside" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "blockquote" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "div" }, { "id": "dl" }, { "id": "em" }, { "id": "embed" }, { "id": "fieldset" }, { "id": "figure" }, { "id": "footer" }, { "id": "form" }, { "id": "h1" }, { "id": "h2" }, { "id": "h3" }, { "id": "h4" }, { "id": "h5" }, { "id": "h6" }, { "id": "header" }, { "id": "hr" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "main" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "nav" }, { "id": "noscript" }, { "id": "object" }, { "id": "ol" }, { "id": "output" }, { "id": "p" }, { "id": "pre" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "section" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "table" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "li" }, { "id": "script" }, { "id": "template" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (ul.__proto__ || Object.getPrototypeOf(ul)).call(this, object, config));
				}

				return ul;
}(XMLStructure);

module.exports = ul;

},{"../XMLStructure.js":2}],109:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var variable = function (_XMLStructure) {
				_inherits(variable, _XMLStructure);

				function variable(object) {
								_classCallCheck(this, variable);

								var config = {
												id: "var",
												description: "Variable",
												openTag: "<var>",
												closeTag: "</var>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "video" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "video" }, { "id": "wbr" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (variable.__proto__ || Object.getPrototypeOf(variable)).call(this, object, config));
				}

				return variable;
}(XMLStructure);

module.exports = variable;

},{"../XMLStructure.js":2}],110:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var video = function (_XMLStructure) {
				_inherits(video, _XMLStructure);

				function video(object) {
								_classCallCheck(this, video);

								var config = {
												id: "video",
												description: "Video player",
												openTag: "<video>",
												closeTag: "</video>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "wbr" }],
												allowedChildren: [{ "id": "source" }],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }, { "name": "src", "value": false }, { "name": "crossorigin", "value": false }, { "name": "poster", "value": false }, { "name": "preload", "value": false }, { "name": "autoplay", "value": false }, { "name": "mediagroup", "value": false }, { "name": "loop", "value": false }, { "name": "muted", "value": false }, { "name": "controls", "value": false }, { "name": "width", "value": false }, { "name": "height", "value": false }]
								};

								return _possibleConstructorReturn(this, (video.__proto__ || Object.getPrototypeOf(video)).call(this, object, config));
				}

				return video;
}(XMLStructure);

module.exports = video;

},{"../XMLStructure.js":2}],111:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XMLStructure = require("../XMLStructure.js");

var wbr = function (_XMLStructure) {
				_inherits(wbr, _XMLStructure);

				function wbr(object) {
								_classCallCheck(this, wbr);

								var config = {
												id: "wbr",
												description: "Line breaking opportunity",
												openTag: "<wbr>",
												closeTag: "</wbr>",
												allowedParents: [{ "id": "a" }, { "id": "abbr" }, { "id": "area" }, { "id": "audio" }, { "id": "b" }, { "id": "bdi" }, { "id": "bdo" }, { "id": "br" }, { "id": "button" }, { "id": "canvas" }, { "id": "cite" }, { "id": "code" }, { "id": "data" }, { "id": "datalist" }, { "id": "del" }, { "id": "dfn" }, { "id": "em" }, { "id": "embed" }, { "id": "i" }, { "id": "iframe" }, { "id": "img" }, { "id": "input" }, { "id": "ins" }, { "id": "kbd" }, { "id": "keygen" }, { "id": "label" }, { "id": "map" }, { "id": "mark" }, { "id": "math" }, { "id": "meter" }, { "id": "noscript" }, { "id": "object" }, { "id": "output" }, { "id": "progress" }, { "id": "q" }, { "id": "ruby" }, { "id": "s" }, { "id": "samp" }, { "id": "script" }, { "id": "select" }, { "id": "small" }, { "id": "span" }, { "id": "strong" }, { "id": "sub" }, { "id": "sup" }, { "id": "svg" }, { "id": "template" }, { "id": "textarea" }, { "id": "time" }, { "id": "u" }, { "id": "var" }, { "id": "video" }],
												allowedChildren: [],
												allowedAttributes: [{ "name": "accesskey", "value": false }, { "name": "class", "value": false }, { "name": "contenteditable", "value": false }, { "name": "dir", "value": false }, { "name": "hidden", "value": false }, { "name": "id", "value": false }, { "name": "lang", "value": false }, { "name": "spellcheck", "value": false }, { "name": "style", "value": false }, { "name": "tabindex", "value": false }, { "name": "title", "value": false }, { "name": "translate", "value": false }]
								};

								return _possibleConstructorReturn(this, (wbr.__proto__ || Object.getPrototypeOf(wbr)).call(this, object, config));
				}

				return wbr;
}(XMLStructure);

module.exports = wbr;

},{"../XMLStructure.js":2}],112:[function(require,module,exports){
"use strict";

module.exports = {
    elements: require("./elements")
};

},{"./elements":52}],113:[function(require,module,exports){
"use strict";

module.exports = {
  html: require("./html")
};

},{"./html":112}]},{},[1]);
