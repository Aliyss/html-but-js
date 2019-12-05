
    const XMLStructure = require("../XMLStructure.js");

    class source extends XMLStructure {

        constructor(object) {

            let config = {
                id: "source",
                description: "Media source for video or audio",
                openTag: "<source>",
                closeTag: "</source>",
                allowedParents: [
                    { "id": "video" },
					{ "id": "audio" },
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
					{ "name": "src", "value": false },
					{ "name": "type", "value": false },
					{ "name": "media", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = source;
    