class XMLStructure {

	constructor(object, config) {

		this.id = config.id;
		this.description = config.description;
		this.openTag = config.openTag;
		this.closeTag = config.closeTag;
		this.allowedParents = config.allowedParents;
		this.allowedChildren = config.allowedChildren;
		this.allowedAttributes = config.allowedAttributes;
		this.allowedInterfaces = config.allowedInterfaces;

		this.beforeValue = "";
		this.afterValue = "";
		this.children = [];
		this.attributes = [];
		if (typeof object !== "object") {
			object = {
				beforeValue: object,
			}
		}

		if (object.children) {
			this.children = this.validityChildren(object.children, this.allowedChildren)
		}

		if (object.attributes) {
			this.attributes = this.validityAttributes(object.attributes, this.allowedAttributes)
		}

		if (object.beforeValue || object.value) {
			this.beforeValue = object.beforeValue || object.value
		}

		if (object.afterValue) {
			this.afterValue = object.afterValue
		}

	}

	buildXML(object = this, prefix="") {
		if (object.id) {
			let xml = "<" + prefix + object.openTag.slice(0, -1).split("<")[1];

			for (let i = 0; i < object.attributes.length; i++) {
				xml += " " + object.attributes[i].name + "=" + "\"" + object.attributes[i].value + "\"";
			}

			xml += ">";
			xml += object.beforeValue;

			for (let i = 0; i < object.children.length; i++) {
				xml += this.buildXML(object.children[i], prefix);
			}

			xml += object.afterValue;
			xml += "</" + prefix + object.closeTag.split("</")[1];
			return xml
		} else {
			return "";
		}
	};

	buildStructure(object = this, prefix="") {
		if (object.id) {
			let xml = {};

			xml.name = prefix + object.openTag.slice(0, -1).split("<")[1];

			xml.attributes = {};

			for (let i = 0; i < object.attributes.length; i++) {
				xml.attributes[object.attributes[i].name] = object.attributes[i].value;
			}

			xml.type = "element";
			xml.elements = [];

			if (object.afterValue.length > 0 || object.beforeValue.length > 0) {
				let t = {
					type: "text",
					text: object.beforeValue + object.afterValue
				};
				xml.elements.push(t);
			} else {
				for (let i = 0; i < object.children.length; i++) {
					xml.elements.push(this.buildStructure(object.children[i], prefix));
				}
			}
			return xml
		} else {
			return {};
		}
	}

	validityChildren(givenArray, searchArray, force=false) {
		return givenArray.filter(child => {
			if (child.id) {
				force = false;
				for (let i = 0; i < searchArray.length; i++) {
					if (searchArray[i].id === child.id) {
						force = true;
						return child
					}
				}
				if (!force) {
					let err = {
						text: `${child.id} is not a valid child of ${this.id}.`,
						valid: `\nValid Children are:` + searchArray.map(value => {return value.id})
					};
					throw new Error(err.text + err.valid + "\n")
				}
			}
		});
	};

	validityAttributes(givenArray, searchArray, force=false) {
		return givenArray.filter(child => {
			if (child.name && child.value) {
				force = false;
				for (let i = 0; i < searchArray.length; i++) {
					if (child.name === searchArray[i].name) {
						force = true;
						return child
					}
				}
				if (!force) {
					let err = {
						text: `${child.name} is not a valid attribute of ${this.id}.`,
						valid: `\nValid Attributes are:` + searchArray.map(value => {return "\n\t" + value.name})
					};
					throw new Error(err.text + err.valid + "\n")
				}
			}
		});
	};
}

module.exports = XMLStructure;