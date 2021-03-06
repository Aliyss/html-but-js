
    const XMLStructure = require("../XMLStructure.js");

    class input extends XMLStructure {

        constructor(object) {

            let config = {
                id: "input",
                description: "Form control",
                openTag: "<input>",
                closeTag: "</input>",
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
					{ "id": "img" },
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
					{ "name": "accept", "value": false },
					{ "name": "alt", "value": false },
					{ "name": "autocomplete", "value": false },
					{ "name": "autofocus", "value": false },
					{ "name": "checked", "value": false },
					{ "name": "dirname", "value": false },
					{ "name": "disabled", "value": false },
					{ "name": "form", "value": false },
					{ "name": "formaction", "value": false },
					{ "name": "formenctype", "value": false },
					{ "name": "formmethod", "value": false },
					{ "name": "formnovalidate", "value": false },
					{ "name": "formtarget", "value": false },
					{ "name": "height", "value": false },
					{ "name": "list", "value": false },
					{ "name": "max", "value": false },
					{ "name": "maxlength", "value": false },
					{ "name": "min", "value": false },
					{ "name": "minlength", "value": false },
					{ "name": "multiple", "value": false },
					{ "name": "name", "value": false },
					{ "name": "pattern", "value": false },
					{ "name": "placeholder", "value": false },
					{ "name": "readonly", "value": false },
					{ "name": "required", "value": false },
					{ "name": "size", "value": false },
					{ "name": "src", "value": false },
					{ "name": "step", "value": false },
					{ "name": "type", "value": false },
					{ "name": "value", "value": false },
					{ "name": "width", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = input;
    