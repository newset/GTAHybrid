var postcss = require('postcss');
var path = require('path');

module.exports = postcss.plugin('postcss-autoimport', function (opts) {
    opts = opts || {};
    opts.paths = opts.paths || [];
    opts.root = opts.root || process.cwd();

    var files = opts.paths;
    var importedFiles = files.reverse().map(function (file) {
        return path.relative(opts.root, file);
    });

    return function (root) {
        importedFiles.forEach(function (file) {
            root.prepend({
                name: 'import',
                params: '"' + file + '"'
            });
        });
    };
});