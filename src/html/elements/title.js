
    const XMLStructure = require("../XMLStructure.js");

    class title extends XMLStructure {

        constructor(object) {

            let config = {
                id: "title",
                description: "Document title",
                openTag: "<title>",
                closeTag: "</title>",
                allowedParents: [
                    { "id": "head" },
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
					{ "name": "translate", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = title;
    