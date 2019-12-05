
    const XMLStructure = require("../XMLStructure.js");

    class html extends XMLStructure {

        constructor(object) {

            let config = {
                id: "html",
                description: "Root element",
                openTag: "<html>",
                closeTag: "</html>",
                allowedParents: [
                    
                ],
                allowedChildren: [
                    { "id": "head" },
					{ "id": "body" }
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
					{ "name": "manifest", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = html;
    