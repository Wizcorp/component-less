# component-less

A plugin to transpile Sass files for the component builder.

## Install

$ npm install component-less

## Usage
  
Add your `.less` files to the `styles` array in your `component.json`:

```javascript
{
	"styles": [
		"base.less",
		"button.css"
	]
}
```

Use the plugin during your build process:

```javascript
var Builder = require('component-builder');
var less = require('component-less');
var fs = require('fs');

var builder = new Builder(__dirname);

builder.use(less);

builder.build(function (err, res) {
	if (err) {
		throw err
	}

	fs.writeFileSync('build/build.js', res.require + res.js);

	if (res.css) {
		fs.writeFileSync('build/build.css', res.css);
	}
});
```

## License
MIT
