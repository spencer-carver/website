import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import Homepage from '../src/pages/homepage';
import wrapper from "./wrapper";

function generateMarkup() {
  // run ReactDomServer to generate HTML markup for our static base files and save them for service
  const indexFileMarkup = ReactDOMServer.renderToString(<Homepage />);
    fs.writeFile("./public/index.html", wrapper(indexFileMarkup), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("Updated index.html was written to /public");
  }); 
}

generateMarkup();
