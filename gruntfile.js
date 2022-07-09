module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            shared: {
                files: [
                    { expand: true, src: ["**"], cwd: "shared/", dest: "packages/inat-components/src/__shared" },
                    { expand: true, src: ["**"], cwd: "shared/", dest: "packages/inat-components-utils/src/__shared" },
                ]
            }
        },
        watch: {
            scripts: {
                files: ["shared/**"],
                tasks: ["copy"],
                options: {
                    spawn: false
                },
            },
        },
    });

    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("default", ["copy"]);
}
