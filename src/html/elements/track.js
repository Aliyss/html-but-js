
    const XMLStructure = require("../XMLStructure.js");

    class track extends XMLStructure {

        constructor(object) {

            let config = {
                id: "track",
                description: "Timed text track",
                openTag: "<track>",
                closeTag: "</track>",
                allowedParents: [
                    { "id": "audio" },
					{ "id": "video" },
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
					{ "name": "default", "value": false },
					{ "name": "kind", "value": false },
					{ "name": "label", "value": false },
					{ "name": "src", "value": false },
					{ "name": "srclang", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = track;
    