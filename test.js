const any = require('./dist/html_but_js_but_bundeled.js').html_but_js;

const {elements: {a}} = any.html;
let x = new a({
    value: "test"
});
console.log(x.buildXML());