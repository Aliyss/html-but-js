
    const XMLStructure = require("../XMLStructure.js");

    class img extends XMLStructure {

        constructor(object) {

            let config = {
                id: "img",
                description: "Image",
                openTag: "<img>",
                closeTag: "</img>",
                allowedParents: [
                    { "id": "a" },
					{ "id": "abbr" },
					{ "id": "area" },
					{ "id": "audio" },
					{ "id": "b" },
					{ "id": "bdi" },
					{ "id": "bdo" },
					{ "id": "br" },
					{ "id": "button" },
					{ "id": "canvas" },
					{ "id": "cite" },
					{ "id": "code" },
					{ "id": "data" },
					{ "id": "datalist" },
					{ "id": "del" },
					{ "id": "dfn" },
					{ "id": "em" },
					{ "id": "embed" },
					{ "id": "i" },
					{ "id": "iframe" },
					{ "id": "input" },
					{ "id": "ins" },
					{ "id": "kbd" },
					{ "id": "keygen" },
					{ "id": "label" },
					{ "id": "map" },
					{ "id": "mark" },
					{ "id": "math" },
					{ "id": "meter" },
					{ "id": "noscript" },
					{ "id": "object" },
					{ "id": "output" },
					{ "id": "progress" },
					{ "id": "q" },
					{ "id": "ruby" },
					{ "id": "s" },
					{ "id": "samp" },
					{ "id": "script" },
					{ "id": "select" },
					{ "id": "small" },
					{ "id": "span" },
					{ "id": "strong" },
					{ "id": "sub" },
					{ "id": "sup" },
					{ "id": "svg" },
					{ "id": "template" },
					{ "id": "textarea" },
					{ "id": "time" },
					{ "id": "u" },
					{ "id": "var" },
					{ "id": "video" },
					{ "id": "wbr" }
                ],
                allowedChildren: [
                    
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
					{ "name": "alt", "value": false },
					{ "name": "src", "value": false },
					{ "name": "crossorigin", "value": false },
					{ "name": "usemap", "value": false },
					{ "name": "ismap", "value": false },
					{ "name": "width", "value": false },
					{ "name": "height", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = img;
    