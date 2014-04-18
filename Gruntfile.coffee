module.exports = (grunt) ->

  pkg: grunt.file.readJSON('package.json')
#    for taskName of pkg.devDependencies when taskName.substring(0, 6) is 'grunt-'
#        grunt.loadNpmTasks taskName

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-exec'

  grunt.initConfig
    exec:
      bower:
        command: 'rm -rf public/vendor && bower install'
    coffee:
      devel:
        options:
          bare: true
        files: [{
          expand: true,
          cwd: 'src/coffee',
          src: ['**/*.coffee'],
          dest: 'public/javascripts/',
          ext: '.js',}]
    stylus:
      devel:
        options:
          compress: false
        files: [{
          expand: true,
          cwd: 'src/metacss',
          src: ['**/*.styl'],
          dest: 'public/stylesheets/',
          ext: '.css',}]
    watch:
      devel:
        files: ['src/**/*']
        tasks: ['coffee:devel', 'stylus:devel']
      options:
        nospawn: false
        livereload: true

  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'compile', ['coffee:devel', 'stylus:devel']

