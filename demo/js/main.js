// Load necessary elements from my package. Github: https://github.com/Aliyss/html-but-js
const {elements: {a, title, body, div, h1, h2, p, strong, li, ul, ol, code, pre, canvas, main, nav, header, iframe}} = html_but_js.html;

// Assign static Values like name, description, etc. of project
let project = {
	name: "html_but_js",
	description: "Ctrl + U → Be surprised!",
	script: new a({
		value: "script.js",
		attributes: [
			{
				name: "href",
				value: "js/script.js"
			}
		]
	}).buildXML(),
	main: new a({
		value: "main.js",
		attributes: [
			{
				name: "href",
				value: "js/main.js"
			},
		]
	}).buildXML(),
	github: new a({
		value: "Github Repo",
		attributes: [
			{
				name: "href",
				value: "https://github.com/Aliyss/html-but-js"
			},
			{
				name: "target",
				value: "_blank"
			},
			{
				name: "rel",
				value: "noreferrer"
			},
		]
	}).buildXML(),
};

let website = {
	main_content: [
		{
			title: "Introduction",
			short_text:
				`Why use HTML if you can use JS instead? ${project.name} is an alternative method for Web ` +
				`Developers to create Websites, ` +
				`by using JS Code only. The core concept behind ${project.name} is to minimize the manual creation ` +
				`of html tags and at the same time minimize the amount of errors which may not be visible in ` +
				`production.\n\n` +
				`The other benefit of ${project.name} (if used correctly, I still haven't figured it all out) is ` +
				`minimizing the amount of code necessary for a website. ` +
				`In the long-term ${project.name} will successfully help apply the necessary changes with minimum ` +
				`effort.`
		},
		{
			title: "Script",
			short_text:
				`Currently the whole module of is loaded in one file. In this case the file is ` +
				`named ${project.script}. ` +
				`The code for this website is the ${project.main} file. ` +
				`For the full source code feel free to check the ${project.github}.`
		},
		{
			title: "Extract",
			short_text:
				`The main part you will find in the code is buildXML(). This function converts the object which it ` +
				`called with to a valid HTML String. When the object is created it is cleaned from any invalid children ` +
				`it may contain.`,
			placeholder: true
		},
		{
			title: "Limitations",
			short_text:
				`Currently the ${project.name} only works for html tags. It will check and mark invalid code. ` +
				`However it will not work with enhanced HTML editors like Vue, Angular or React. For those it ` +
				`would be necessary to use the value and force the html content to be loaded. ` +
				`Additionally it will accept any CSS styling applied to the html tags.\n\n` +
				`The plan is to build a more elaborate structure, which would allow the implementations of plugins. ` +
				`Adding to that it should also support CSS styling in the future.`
		},
		{
			title: "Bugs & Features",
			short_text:
				`Since the project is not as big as it could be, there aren't many bugs. However there are some ` +
				`changes which could be made or added: `,
			bulletin: [
				{
					value: "Make <b style='color: midnightblue'>white-space:pre-wrap default</b> for text, but add a " +
						"remove toggle. " +
						"As it will mainly be written in JS."
				},
				{
					value: "Add <b style='color: midnightblue'>optional markdown support</b> for text written in the " +
						"JS file. This would save a " +
						"lot of time, when writing text."
				},
				{
					value: "Allow <b style='color: midnightblue'>auto-clean to be disabled</b> in other word toggleable. " +
						"This is a work in progress " +
						"and might be implemented soon."
				},
				{
					value: "<s style='color: green'>Add <b>optional html within text support</b>. This can be used to force html content to be " +
						"loaded as well as add markdown to the selected text.</s>"
				},
				{
					value: "Add <b style='color: midnightblue'>Dynamic Content Support</b>. The idea here is to add an " +
						"EventHandler to the JS-Object in " +
						"question, which automatically updates the content on the website limited to the scope " +
						"of the JS-Object."
				}
			]
		},
		{
			title: "Future",
			numbered_list: [
				{
					value: "Fix/Add everything mentioned in Bugs & Features."
				},
				{
					value: "Integration of CSS styling.",
				},
				{
					value: "Add plugin compatibility"
				}
			]
		},
	],
	cookies: [
		{
			name: "visited_at",
			value: new Date()
		}
	],
};

/* Functions needed to write less code and create elements faster and more dynamically. */

// createAnchor creates a header with an anchor, so linking between them gets easier.
let createAnchor = (text, header = h2) => {
	return new header({
		afterValue: text,
		children: [
			new a({
				attributes: [
					{
						name: "id",
						value: text.toLowerCase()
					}
				]
			})
		],
	});
};

// switchContent creates a list of items based on the input.
let switchContent = (swcontent) => {
	let content = [];
	if (swcontent.short_text) {
		content.push(
			new p({
				value: swcontent.short_text,
			})
		);
	}
	if (swcontent.bulletin) {
		let list = new ul();
		for (let i = 0; i < swcontent.bulletin.length; i++) {
			list.children.push(
				new li({
					value: swcontent.bulletin[i].value
				})
			)
		}
		content.push(list)
	}
	if (swcontent.numbered_list) {
		let list = new ol();
		for (let i = 0; i < swcontent.numbered_list.length; i++) {
			list.children.push(
				new li({
					value: swcontent.numbered_list[i].value
				})
			)
		}
		content.push(list)
	}
	if (swcontent.placeholder) {
		content.push(
			new div({
				attributes: [
					{
						name: "id",
						value: swcontent.title.toLowerCase() + "_placeholder"
					}
				]
			})
		)
	}
	return content;
};

// Ajax Function calls the Github Repo's ReadMe file.
let ajax = (config) => {

	let xhr = new XMLHttpRequest();

	xhr.open(config.method, config.url, config.async);
	xhr.setRequestHeader(config.headers.name, config.headers.value);

	xhr.onload = () => {
		config.rebound(xhr)
	};

	xhr.onerror = () => {
		config.rebound(xhr)
	};

	xhr.send(config.rebound);
};

// Cookies Function sets the cookies to the defined value
resetCookies = (cookies = null) => {
	let cookie = "";
	if (cookies === null) {
		document.cookie = cookie;
		return;
	}
	for (let i = 0; i < cookies.length; i++) {
		cookie += cookies[i].name + "=" + cookies[i].value + ";"
	}
	document.cookie = cookie;
};

/* Initial Website Content. */
let main_title = new div({
	children: [
		new h1({
			children: [
				new a({
					value: project.name,
					attributes: [
						{
							name: "href",
							value: "https://github.com/Aliyss/html-but-js"
						},
						{
							name: "target",
							value: "_blank"
						},
						{
							name: "rel",
							value: "noreferrer"
						}
					]
				})
			]
		}),
		new p({
			children: [
				new strong({
					value: project.description
				})
			]
		})
	],
});

let title_div = new header({
	children: [
		main_title
	],
	attributes: [
		{
			name: "class",
			value: "title"
		}
	]
});

let main_content = new main({
	children: [
		new div({
			attributes: [
				{
					name: "id",
					value: "extract_placeholder"
				}
			]
		})
	],
});

let navigation_list = new ul({
	children: [],
	attributes: [
		{
			name: "id",
			value: "navigation_list"
		},
	]
});

for (let i = 0; i < website.main_content.length; i++) {
	let newAnchor = createAnchor(website.main_content[i].title);
	let switchCon = switchContent(website.main_content[i]);
	main_content.children.push(
		new div({
			children: [
				newAnchor
			].concat(switchCon),
			attributes: [
				{
					name: "class",
					value: "main_content " + website.main_content[i].title.toLowerCase()
				}
			]
		})
	);
	navigation_list.children.push(
		new li({
			children: [
				new a({
					afterValue: website.main_content[i].title,
					attributes: [
						{
							name: "href",
							value: "#" + website.main_content[i].title.toLowerCase()
						}
					]
				})
			]
		})
	)
}

let main_content_prologue = new nav({
	children: [
		navigation_list
	],
	attributes: [
		{
			name: "class",
			value: "main_content prologue"
		},
	]
});

let main_content_epilogue = new div({
	children: [],
	attributes: [
		{
			name: "class",
			value: "main_content epilogue"
		}
	]
});

let c = new canvas({
		attributes: [
			{
				name: "id",
				value: "canvasSection"
			},
		]
	})
;

let content_div = new div({
	children: [
		main_content_prologue,
		main_content,
		main_content_epilogue,
	],
	attributes: [
		{
			name: "class",
			value: "content"
		},
	]
});

let b = new body({
	children: [
		title_div,
		c,
		content_div,
	]
});

document.addEventListener('DOMContentLoaded', function () {
	function draw_canvas() {

		//paint the text
		let canvas = document.getElementById('canvasSection');

		let ctx = canvas.getContext('2d');
		//get DPI
		let dpi = window.devicePixelRatio;

		function fix_dpi() {
			// This is totally stolen, but I couldn't handle the blur.
			let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
			let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
			canvas.setAttribute('height', style_height * dpi);
			canvas.setAttribute('width', style_width * dpi);
		}

		ctx.strokeStyle = "Black";

		let Y = 0.5;
		let X = 0;
		let length = 40;
		let speed = 5;

		drawLine(0,);

		function drawLine(x=X,y=Y) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + length, y);
			ctx.stroke();
		}

		function moveLine() {
			X += speed;

			if (X < 0 || X > 600 - 40) {
				speed = speed * -1;
			}
		}

		function rebound() {
			fix_dpi();
			ctx.clearRect(0, 0, +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2), +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2));
			moveLine();
			drawLine();
			requestAnimationFrame(rebound);
		}

		rebound();
	}

	draw_canvas()
}, false);


document.body.innerHTML = b.buildXML();
/* All the Ajax */

// Moved this function lower than the ones above, so I still know what I'm doing.
content_edit = (xhr) => {
	let xhr_data = {};
	xhr_data.status = xhr.statusText;

	if (xhr.status !== 200) {
		return;
	}

	xhr_data = JSON.parse(xhr.responseText);
	let xcodex = new pre({
		children: [
			new code({
				value: xhr_data.files["html_but_js_demo.js"].content,
				attributes: [
					{
						name: "class",
						value: "language-javascript"
					}
				]
			})
		],
		attributes: [
			{
				name: "class",
				value: "language-javascript"
			}
		]
	});
	document.getElementById("extract_placeholder").outerHTML = xcodex.buildXML();
	Prism.highlightAll()
};

website.ajax_config = {
	method: 'GET',
	url: 'https://api.github.com/gists/8d332ae0d67f64a4f1d8dc1e9eff5df8',
	async: true,
	headers: {
		name: 'Content-Type',
		value: 'application/json'
	},
	rebound: content_edit
};

// Call Ajax
ajax(website.ajax_config);

// Set Cookies
resetCookies(website.cookies);

