var async = require('async');
var path = require('path');
var less = require('less');
var fs = require('fs');


function isLess(filename) {
	return path.extname(filename) === '.less';
}


module.exports = function (builder, options) {
	options = options || {};

	builder.hook('before styles', function (builder, callback) {
		if (!builder.config.styles) {
			return callback();
		}

		// Make a copy of the list of files to parse
		var files = builder.config.styles.slice(0);

		async.each(files, function (file, cb) {
			var stylesheet = builder.path(file);

			var env = options.env || {};
			env.paths = env.paths || [];
			env.paths.push(path.dirname(stylesheet));
			env.filename = stylesheet;

			var parser = new less.Parser(env);
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

				builder.removeFile('styles', file);
				builder.addFile('styles', file, css);

				cb();
			});
		}, callback);
	});
};
