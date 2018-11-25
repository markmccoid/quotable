const electron = window.require('electron');
const { ipcRenderer, remote } = electron
//functions to access data from main electron thread
//to be used with ipc/remote communication
const path = require('path');
const fs = window.require('fs');
const _ = require('lodash');
const uuid = require('uuid/v1');
//const uuid = require('uuid');
const isDev = window.require('electron-is-dev');
// const { app } = require('electron').remote;

// make promise version of fs.readFile()
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};
// make promise version of fs.writeFile()
const writeFilePromise = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, err => {
      if (err)
        reject(err);
      else
        resolve({data: JSON.parse(data), response: 'success'});
    });
  });
};
//Can't access the remote.app. feature except from within a function.  Probably after app has loaded.
//passed either a constant with filename.ext, will return the path, relative to where the application EXE
//is located.
const getLocalFile = (dataFile) => {
  if (isDev) {
    console.log(path.join(remote.app.getAppPath(), '/data', dataFile));
    return path.join(remote.app.getAppPath(), '/data', dataFile);
  }
  return path.join(path.dirname(remote.app.getPath('exe')), '/data', dataFile);
};
const QUOTE_FILE = 'quotes.json';

//-----------------------------
//--will return an array containing a unique list
//-- of applications contained in the qvvariables.json file
//---------------------------------------------------
export const getQuoteAuthorsPromise = () => {
  return readFilePromise(getLocalFile(QUOTE_FILE))
    .then(data => {
      let quoteData = JSON.parse(data);
      let authors = _.uniq(quoteData.map(quoteObj => quoteObj.author));
      authors = _.sortBy(authors);
      return authors;
    });
};

export const getQuoteAuthors = async () => {
  let data = await readFilePromise(getLocalFile(QUOTE_FILE));
  let quotes = await JSON.parse(data);
  let authors = _.sortBy(_.uniq(quotes.map(quoteObj => quoteObj.author)));
  return authors;
};

// 
export const getQuoteData = async () => {
  let data = await readFilePromise(getLocalFile(QUOTE_FILE));
  let quotes = await JSON.parse(data);
  return quotes;
};

export const addQuote = async (quoteObj) => {
  // Add Id to object
  quoteObj = { id: uuid(), ...quoteObj };
  // Get quote data
  let data = await readFilePromise(getLocalFile(QUOTE_FILE));
  let quotes = await JSON.parse(data);
  quotes.push(quoteObj);
  let result = await writeFilePromise(getLocalFile(QUOTE_FILE), JSON.stringify(quotes))
  return quotes;
};

export const updateQuote = async (quoteObj) => {
  let quoteId = quoteObj.id;
  let data = await readFilePromise(getLocalFile(QUOTE_FILE));
  let quotes = await JSON.parse(data);
  // Filter out quote that is being updated
  quotes = quotes.filter(quote => quote.id !== quoteId)
  quotes.push(quoteObj);
  let result = await writeFilePromise(getLocalFile(QUOTE_FILE), JSON.stringify(quotes))
  return quotes;
}

export const deleteQuote = async (quoteId) => {
  // Get quote data from disk
  let data = await readFilePromise(getLocalFile(QUOTE_FILE));
  let quotes = await JSON.parse(data);
  let quotesNew = quotes.filter(quote => quote.id !== quoteId);
  let result = await writeFilePromise(getLocalFile(QUOTE_FILE), JSON.stringify(quotesNew))
  return result.data;
}

// export const getQuoteCategories = async () => {
  //   let data = await readFilePromise(getLocalFile(QUOTE_FILE));
  //   let quotes = await JSON.parse(data);
  //   let categories = _.sortBy(_.uniq(quotes.map(quoteObj => quoteObj.category)));
  //   return categories;
  // };
  