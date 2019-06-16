const csso = require('csso');
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

//promise, write minify code to new file
function writeOneFile(path, name, ext, codes) {
  return new Promise(function(resolve, reject) {
    var newFilename = name + ".min." + ext; //create new filename ex: abc.min.js
    //write minify code to new file
    var output = path + "/" + newFilename;
    fs.writeFile(output, codes, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve(`Successfully Written to File => ${newFilename}`)
      }
    })
  });
}

readOneFile(path.resolve(__dirname), "style.css")
  .then(result => {
    //minify css
    let content = csso.minify(result).css;
    //write one file
    writeOneFile(path.resolve(__dirname), "style", "css", content)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));