'use strict';

const Router = require('express');
const router = new Router();
const path = require('path');
const fs = require('fs');

// папка статики
const MAINPATH = __dirname.slice(0, __dirname.length - 8) + "/static";

function SendFiles(dir, url) {
  // читаем все файлы папки
  fs.readdir(MAINPATH + `/${dir}`, (err, files) => {
    if (err) return err;
    for(let file of files){
      // убираем расширение файла
      const FileName = file.substring(0, file.indexOf('.'));
      // присваиваем url адрес + имя файла
      router.get(`/${url}` + FileName, async function(req, res) {
        res.status(200).sendFile(MAINPATH + `/${dir}/` + file);
      });
    }
  });
};

// файлы фронтенда
SendFiles('frontend/html', '');
SendFiles('frontend/css', 'css/');
SendFiles('frontend/js', 'js/');

// файлы 
SendFiles('assets/images', 'image/');
SendFiles('assets/css', 'css/');

// редиректы
router.get('/', async function(req, res) {
  res.status(301).redirect("/index");
});

module.exports = router;