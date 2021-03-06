import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import { getQuoteData, deleteQuote, addQuote, updateQuote } from './fileAccess/remoteFileAccess';

export const AppContext = React.createContext();

const DataProvider = (props) => {
  
  const [quoteData, setQuoteData] = useState([])
  const [authors, setAuthors] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    _refreshQuoteData()
  }, [])

  const _refreshQuoteData = async () => {
    // Get quotes from disk (quotes.json)
    const quoteData = await getQuoteData()
    setAuthors(_getAuthors(quoteData))
    setTags(_getTags(quoteData))
    setQuoteData(quoteData)
  }
  // Get Authors with count of quotes
  // [{ author, count }]
  const _getAuthors = (quoteData) => {
    // let authors = _.uniq(quoteData.map(quoteObj => quoteObj.author));
    // return _.sortBy(authors);
    let authorsObj = quoteData.reduce((accum, quote) => {
      accum[quote.author] = accum[quote.author] ? accum[quote.author] + 1 : 1
      return accum
    }, {})
    
    return _.sortBy(Object.keys(authorsObj).map(auth => ({author: auth, count: authorsObj[auth]})), ['author'])
  }

  /**
   * Return array of unique tags []
   */
  const _getTags = (quoteData) => {
    let tags =  _.chain(quoteData)
    .map(tag => tag.tags) // Get just tags
    .flatten() // flatten array of arrays to a single array
    .sortBy(tag=> tag.toLowerCase()) 
    .uniq()
    .value();
    return tags
  }
  
  const _updateQuoteData = (quoteData) => {
    setAuthors(_getAuthors(quoteData))
    setTags(_getTags(quoteData))
    setQuoteData(quoteData)
  }
  
  const onDeleteQuote = async (quoteId) => {
    // Modify the file
    let updatedQuotes = await deleteQuote(quoteId);
    // Get the new list of authros
    _updateQuoteData(updatedQuotes);
  }
  
  const onAddQuote = async (quoteObj) => {
    // Modify the file
    let updatedQuotes = await addQuote(quoteObj);
    // Get the new list of authros
    console.log(updatedQuotes)
    _updateQuoteData(updatedQuotes);
  }

  const onUpdateQuote = async (quoteObj) => {
    // update the passed quote based on ID in the quoteObj
    let updatedQuotes = await updateQuote(quoteObj);
    // Get the new list of authros
    _updateQuoteData(updatedQuotes);
  }
  /**
   * Filter quotes by selectedAuthors array, selectedTags array
   * and (soon) search quote text
   */
  const filterQuotes = (quoteData, selectedAuthors, selectedTags, searchText, rating) => {
    // Filter authors
    let quotes = selectedAuthors.length > 0 ? 
      quoteData.filter(quote => selectedAuthors.indexOf(quote.author) !== -1)
      : quoteData;
    // Filter tags, note: tags in quoteData is an array also
    quotes = selectedTags.length > 0 ?
      quotes.filter(quote => _.some(quote.tags, tag => selectedTags.includes(tag)))
      : quotes;
    if (searchText) {
      quotes = quotes.filter(quote => quote.quote.toLowerCase().includes(searchText))
    }
    if (rating) {
      quotes = quotes.filter(quote => quote.rating === parseInt(rating))
    }
    return _.sortBy(quotes, ['author']);
  }
  const randomQuote = () => {
    console.log(quoteData)
    let randomNum = Math.floor(Math.random() * Math.floor(quoteData.length))
    return quoteData[randomNum] || null
  }

  const exportQuotes = () => {
    console.log(quoteData)
  }
  return (
    <AppContext.Provider value={{
          quoteData,
          authors,
          tags,
          actions: { 
            deleteQuote: onDeleteQuote,
            addQuote: onAddQuote,
            updateQuote: onUpdateQuote,
            filterQuotes: filterQuotes,
            randomQuote: randomQuote,
            exportQuotes: exportQuotes,
          }
        }}
      >
      {props.children}
    </AppContext.Provider>
  )
  
}

export default DataProvider;