
    const XMLStructure = require("../XMLStructure.js");

    class col extends XMLStructure {

        constructor(object) {

            let config = {
                id: "col",
                description: "Table column",
                openTag: "<col>",
                closeTag: "</col>",
                allowedParents: [
                    { "id": "colgroup" },
					{ "id": "template" }
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
					{ "name": "span", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = col;
    