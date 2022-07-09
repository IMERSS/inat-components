module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            shared: {
                files: [
                    { expand: true, src: ["**"], cwd: "shared/", dest: "packages/inat-components/src/__shared" },
                    { expand: true, src: ["**"], cwd: "shared/", dest: "packages/inat-components-utils/src/__shared" },
                ]
            }
        }
    });

    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.registerTask("default", ["copy"]);
}
