
    const XMLStructure = require("../XMLStructure.js");

    class base extends XMLStructure {

        constructor(object) {

            let config = {
                id: "base",
                description: "Base URL and default target browsing context for hyperlinks and forms",
                openTag: "<base>",
                closeTag: "</base>",
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
					{ "name": "title", "value": false },
					{ "name": "translate", "value": false },
					{ "name": "href", "value": false },
					{ "name": "target", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = base;
    