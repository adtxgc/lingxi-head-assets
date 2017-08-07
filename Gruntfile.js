/*
 * lingxi-head-assets
 * https://github.com/adtxgc/lingxi-head-assets
 *
 * Copyright (c) 2017 adtxgc
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      img: {
        expand: true,
        cwd: 'test/Test/images/',
        src: '**',
        dest: 'test/target/images/'
      },
      css: {
        expand: true,
        cwd: 'test/Test/css/',
        src: '**',
        dest: 'test/target/css/'
      },
      js: {
        expand: true,
        cwd: 'test/Test/js/',
        src: '**',
        dest: 'test/target/js/'
      },
      html: {
        expand: true,
        cwd: 'test/Test/',
        src: ['*.html'],
        dest: 'test/target/'
      },
    },

    // Configuration to be run (and then tested).
    lingxi_head_assets: {
      files: {
        src: [
          './test/target/*.html'
        ]
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['copy', 'lingxi_head_assets']);

};
