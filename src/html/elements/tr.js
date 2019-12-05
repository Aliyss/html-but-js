
    const XMLStructure = require("../XMLStructure.js");

    class tr extends XMLStructure {

        constructor(object) {

            let config = {
                id: "tr",
                description: "Table row",
                openTag: "<tr>",
                closeTag: "</tr>",
                allowedParents: [
                    { "id": "table" },
					{ "id": "thead" },
					{ "id": "tbody" },
					{ "id": "tfoot" },
					{ "id": "template" }
                ],
                allowedChildren: [
                    { "id": "th" },
					{ "id": "td" },
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

    module.exports = tr;
    