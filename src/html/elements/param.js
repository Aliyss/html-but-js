
    const XMLStructure = require("../XMLStructure.js");

    class param extends XMLStructure {

        constructor(object) {

            let config = {
                id: "param",
                description: "Parameter for object",
                openTag: "<param>",
                closeTag: "</param>",
                allowedParents: [
                    { "id": "object" },
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
					{ "name": "name", "value": false },
					{ "name": "value", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = param;
    