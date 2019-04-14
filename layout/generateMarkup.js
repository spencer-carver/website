const fs = require('fs');
const wrapper = require("./wrapper");

function generateTemplate() {
    fs.writeFile("./public/index.html", wrapper({}), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("Updated index.html was written to /public");
  }); 
}

generateTemplate();
