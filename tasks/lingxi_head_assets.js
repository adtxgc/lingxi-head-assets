/*
 * lingxi-head-assets
 * https://github.com/adtxgc/lingxi-head-assets
 *
 * Copyright (c) 2017 adtxgc
 * Licensed under the MIT license.
 */

'use strict';

const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('lingxi_head_assets',
    'extract resource references (js,css) from the head tag embed them inline',
    function() {
      this.files.forEach(file => {
        file.src.forEach(filePath => {
          if (grunt.file.isFile(filePath)) {
            const fileStr = grunt.file.read(filePath, {
              encoding: 'utf-8'
            });
            const $ = cheerio.load(fileStr);
            //获取html所在目录
            const dirPath = path.dirname(filePath);
            let cssStr = '';
            $("link").each((index, item) => {
              const cssPath = path.join(dirPath,
                $(item).attr("href"));
              cssStr += grunt.file.read(cssPath);
              $(item).remove();
            });
            $('head').append('<style>' + cssStr + '</style>');
            let scriptStr = '';
            $("script").each((index, item) => {
              const scriptPath = path.join(dirPath,
                $(item).attr("src"));
              scriptStr += grunt.file.read(scriptPath);
              $(item).remove();
            });
            $('head').append('<script>' + scriptStr + '</script>');
            grunt.file.write(filePath, $.html(), {
              encoding: 'utf-8'
            });
          } else {
            grunt.log.error('"' + filePath + '" is not exists');
          }
        });
      })
    });

};
