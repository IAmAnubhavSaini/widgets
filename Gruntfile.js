module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: []
            },
            files: ['hypertexts/*.html', 'hypertexts/Examples/*.html']
        },
        jshint: {
            options: {
                globals: {
                    jquery: true
                }
            },
            files: ['javascripts/widgets/TopTaker.widget.js', '!src/jq.js', '!src/bs.js', '!src/jqui.js']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bootlint');

    grunt.registerTask('release-the-hounds', ['bootlint', 'jshint']);
};
