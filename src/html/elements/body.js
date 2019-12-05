
    const XMLStructure = require("../XMLStructure.js");

    class body extends XMLStructure {

        constructor(object) {

            let config = {
                id: "body",
                description: "Document body",
                openTag: "<body>",
                closeTag: "</body>",
                allowedParents: [
                    { "id": "html" }
                ],
                allowedChildren: [
                    { "id": "a" },
					{ "id": "abbr" },
					{ "id": "address" },
					{ "id": "area" },
					{ "id": "article" },
					{ "id": "aside" },
					{ "id": "audio" },
					{ "id": "b" },
					{ "id": "bdi" },
					{ "id": "bdo" },
					{ "id": "blockquote" },
					{ "id": "br" },
					{ "id": "button" },
					{ "id": "canvas" },
					{ "id": "cite" },
					{ "id": "code" },
					{ "id": "data" },
					{ "id": "datalist" },
					{ "id": "del" },
					{ "id": "dfn" },
					{ "id": "div" },
					{ "id": "dl" },
					{ "id": "em" },
					{ "id": "embed" },
					{ "id": "fieldset" },
					{ "id": "figure" },
					{ "id": "footer" },
					{ "id": "form" },
					{ "id": "h1" },
					{ "id": "h2" },
					{ "id": "h3" },
					{ "id": "h4" },
					{ "id": "h5" },
					{ "id": "h6" },
					{ "id": "header" },
					{ "id": "hr" },
					{ "id": "i" },
					{ "id": "iframe" },
					{ "id": "img" },
					{ "id": "input" },
					{ "id": "ins" },
					{ "id": "kbd" },
					{ "id": "keygen" },
					{ "id": "label" },
					{ "id": "main" },
					{ "id": "map" },
					{ "id": "mark" },
					{ "id": "math" },
					{ "id": "meter" },
					{ "id": "nav" },
					{ "id": "noscript" },
					{ "id": "object" },
					{ "id": "ol" },
					{ "id": "output" },
					{ "id": "p" },
					{ "id": "pre" },
					{ "id": "progress" },
					{ "id": "q" },
					{ "id": "ruby" },
					{ "id": "s" },
					{ "id": "samp" },
					{ "id": "script" },
					{ "id": "section" },
					{ "id": "select" },
					{ "id": "small" },
					{ "id": "span" },
					{ "id": "strong" },
					{ "id": "sub" },
					{ "id": "sup" },
					{ "id": "svg" },
					{ "id": "table" },
					{ "id": "template" },
					{ "id": "textarea" },
					{ "id": "time" },
					{ "id": "u" },
					{ "id": "ul" },
					{ "id": "var" },
					{ "id": "video" },
					{ "id": "wbr" }
                ],
                allowedAttributes: [
                    { "name": "accesskey", "value": false },
					{ "name": "class", "value": false },
					{ "name": "contenteditable", "value": false },
					{ "name": "dir", "value": false },
					{ "name": "hidden", "value": false },
					{ "name": "id", "value": false },
					{ "name": "lang", "value": false },
					{ "name": "spellcheck", "value": false },
					{ "name": "style", "value": false },
					{ "name": "tabindex", "value": false },
					{ "name": "title", "value": false },
					{ "name": "translate", "value": false },
					{ "name": "onafterprint", "value": false },
					{ "name": "onbeforeprint", "value": false },
					{ "name": "onbeforeunload", "value": false },
					{ "name": "onhashchange", "value": false },
					{ "name": "onmessage", "value": false },
					{ "name": "onoffline", "value": false },
					{ "name": "ononline", "value": false },
					{ "name": "onpagehide", "value": false },
					{ "name": "onpageshow", "value": false },
					{ "name": "onpopstate", "value": false },
					{ "name": "onstorage", "value": false },
					{ "name": "onunload", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = body;
    