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
  const cssImgPattern =
    /url\(("|')(\.{1,2}\/)?images\/(\w+|\w-\w)+\.(png|jpeg|jpg)\s*("|')\)/gi;
  let cssMap = {}; //对image路径转换之后的CSS文件进行缓存

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
            $("head").find("link").each((index, item) => {
              let cssPath = path.join(dirPath,
                $(item).attr("href"));
              cssPath = cssPath.split('?')[0];
              if (!cssMap[cssPath]) {
                cssMap[cssPath] = turnImgPath(cssPath);
              }
              cssStr += cssMap[cssPath];
              $(item).remove();
            });
            $('head').append('<style>' + cssStr + '</style>');
            let scriptStr = '';
            $("head").find("script").each((index, item) => {
              const scriptPath = path.join(dirPath,
                $(item).attr("src"));
              scriptStr += grunt.file.read(scriptPath.split('?')[
                0]);
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
  /**
   * @desc 把css文件中的图片路径转成相对父目录的路径
   * @arg {string} cssPath css文件路径
   * @return {string} 替换图片路径后的css文件内容字符串
   */
  function turnImgPath(cssPath) {
    let cssStr = grunt.file.read(cssPath, {
      encoding: 'utf-8'
    });
    let imgPaths = cssStr.match(cssImgPattern);
    if (!imgPaths) return cssStr;
    imgPaths.forEach(imgPath => {
      let tempPath = imgPath.replace(/\.\.\//g, "./");
      let imgPathR = imgPath.replace(/\./g, '\\.');
      imgPathR = imgPathR.replace(/\//g, '\\/');
      imgPathR = imgPathR.replace(/\(/g, '\\(');
      imgPathR = imgPathR.replace(/\)/g, '\\)');
      let pat = new RegExp(imgPathR, 'g');
      cssStr = cssStr.replace(pat, tempPath);
    });
    return cssStr;
  }

};
