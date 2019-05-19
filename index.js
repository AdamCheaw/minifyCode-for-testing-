var UglifyJS = require("uglify-js");
var fs = require('fs');

//read the es5 js file after es6 js file being convert by babel
fs.readFile('./build/somejs.js', 'utf8', function(err, contents) {
  var afterMinify = UglifyJS.minify(contents); //minify the code
  if(afterMinify.error) {
    console.log(afterMinify.error);
  } else {
    console.log(afterMinify.code);
    //wtite to a new js file
    fs.writeFile("./build/somejs.min.js", afterMinify.code, (err) => {
      if(err) { console.log(err) } else {
        console.log("Successfully Written to File.");
      }
    });
  }
});

console.log('after calling readFile');