
    const XMLStructure = require("../XMLStructure.js");

    class option extends XMLStructure {

        constructor(object) {

            let config = {
                id: "option",
                description: "Option in a list box or combo box control",
                openTag: "<option>",
                closeTag: "</option>",
                allowedParents: [
                    { "id": "select" },
					{ "id": "datalist" },
					{ "id": "optgroup" },
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
					{ "name": "disabled", "value": false },
					{ "name": "label", "value": false },
					{ "name": "selected", "value": false },
					{ "name": "value", "value": false }
                ],
            };

            super(object, config);
        }
    }

    module.exports = option;
    