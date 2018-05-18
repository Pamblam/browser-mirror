
module.exports = function(grunt) {
	
	var pkg = grunt.file.readJSON('package.json');
	pkg.version = pkg.version.split(".");
	var subversion = pkg.version.pop();
	subversion++;
	pkg.version.push(subversion);
	pkg.version = pkg.version.join(".");
	grunt.file.write('package.json', JSON.stringify(pkg, null, 2));
	
	console.log("-----------------------------------------");
	console.log("  Building Browser-Mirror Version "+pkg.version);
	console.log("-----------------------------------------");
	
	grunt.initConfig({
		pkg: pkg,
		'string-replace': {
			source: {
				files: {
					"README.md": "README.md",
					"bm": "bm",
					"bm.1": "bm.1"
				},
				options: {
					replacements: [{
						pattern: /v\d+.\d+.\d+/g,
						replacement: 'v<%= pkg.version %>'
					}]
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-string-replace');
	
	grunt.registerTask('default', [
		'string-replace'
	]);
	
};