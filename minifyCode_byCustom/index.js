const UglifyJS = require("uglify-js");
const fs = require('fs');
const path = require('path');

function readOneFile(dir, filename) {
  return new Promise(function(resolve, reject) {
    //read file
    fs.readFile(path.resolve(dir, filename), 'utf8', function(err, contents) {
      if(err) {
        reject(err);
      } else {
        resolve(contents);
      }
    });
  });
}

function readFiles(dir, processFile) {
  // read directory
  fs.readdir(dir, (error, fileNames) => {
    if(error) throw error;
    fileNames.forEach(filename => {
      //promise , read a file
      readOneFile(dir, filename)
        .then(contents => {
          // get current file name
          const name = path.parse(filename).name;
          // get current file extension
          const ext = path.parse(filename).ext;
          // get current file path
          const filepath = path.resolve(dir, filename);
          // callback, do something with the file
          processFile(filepath, name, ext, contents);
        })
        .catch(err => {
          console.log(err);
        })
    });
  });
}
//promise, write minify code to new file
function writeJSFile(path, name, ext, codes) {
  return new Promise(function(resolve, reject) {
    var afterMinify = UglifyJS.minify(codes); //minify ES5 js code
    if(afterMinify.error) {
      reject(afterMinify.error)
    } else {
      var newFilename = name + ".min" + ext; //create new filename ex: abc.min.js
      //write minify code to new file
      var output = path + "/" + newFilename;
      fs.writeFile(output, afterMinify.code, (err) => {
        if(err) {
          reject(err)
        } else {
          resolve(`Successfully Written to File => ${newFilename}`)
        }
      })
    }
  });
}

readOneFile(path.resolve(__dirname, "src/"), "withJquery.js")
  .then(result => {
    let content = result;
    //remove comments
    content = content.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "");
    //remove new line and white spaces
    content = content.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ");
    console.log(content);
  })
  .catch(err => console.log(err));