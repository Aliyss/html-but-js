
    const XMLStructure = require("../XMLStructure.js");

    class tfoot extends XMLStructure {

        constructor(object) {

            let config = {
                id: "tfoot",
                description: "Group of footer rows in a table",
                openTag: "<tfoot>",
                closeTag: "</tfoot>",
                allowedParents: [
                    { "id": "table" },
					{ "id": "template" }
                ],
                allowedChildren: [
                    { "id": "tr" },
					{ "id": "script" },
					{ "id": "template" }
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
					{ "name": "translate", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = tfoot;
    