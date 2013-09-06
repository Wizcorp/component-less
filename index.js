var async = require('async');
var path = require('path');
var less = require('less');
var fs = require('fs');


function isLess(filename) {
	var ext = path.extname(filename);
	if (ext === '.less') {
		return true;
	}
	return false;
}


module.exports = function (builder, options) {

	options = options || {};

	builder.hook('before styles', function (builder, callback) {
		if (!builder.config.styles) {
			return callback();
		}

		var files = builder.config.styles;
		var parser = new less.Parser(options.env || {});

		async.forEach(files, function (file, cb) {

			var stylesheet = builder.path(file);
			var cssConfig = options.cssConfig || {};
			var data;

			if (!cssConfig.compress && !isLess(file)) {
				return cb();
			}

			try {
				data = fs.readFileSync(stylesheet, 'utf8');
			} catch (error) {
				return cb(new Error('Error while reading "' + stylesheet + '".'));
			}

			parser.parse(data, function (error, tree) {
				if (error) {
					return cb(error);
				}

				var css = tree.toCSS(cssConfig);

				var newFile = path.basename(file, path.extname(file)) + ((cssConfig.compress) ? '-compressed' : '') + '.css';
				builder.addFile('styles', newFile, css);
				builder.removeFile('styles', file);

				cb();
			});


		}, callback);

	});
};
