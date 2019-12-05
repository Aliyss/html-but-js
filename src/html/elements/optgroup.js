
    const XMLStructure = require("../XMLStructure.js");

    class optgroup extends XMLStructure {

        constructor(object) {

            let config = {
                id: "optgroup",
                description: "Group of options in a list box",
                openTag: "<optgroup>",
                closeTag: "</optgroup>",
                allowedParents: [
                    { "id": "select" },
					{ "id": "template" }
                ],
                allowedChildren: [
                    { "id": "option" },
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
					{ "name": "translate", "value": false },
					{ "name": "disabled", "value": false },
					{ "name": "label", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = optgroup;
    