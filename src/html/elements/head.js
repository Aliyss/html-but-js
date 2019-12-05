
    const XMLStructure = require("../XMLStructure.js");

    class head extends XMLStructure {

        constructor(object) {

            let config = {
                id: "head",
                description: "Container for document metadata",
                openTag: "<head>",
                closeTag: "</head>",
                allowedParents: [
                    { "id": "html" }
                ],
                allowedChildren: [
                    { "id": "base" },
					{ "id": "link" },
					{ "id": "meta" },
					{ "id": "noscript" },
					{ "id": "script" },
					{ "id": "style" },
					{ "id": "template" },
					{ "id": "title" }
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

    module.exports = head;
    