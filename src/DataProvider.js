import React from 'react';
import _ from 'lodash';

import { getQuoteData, deleteQuote, addQuote } from './fileAccess/remoteFileAccess';

export const AppContext = React.createContext();

class DataProvider extends React.Component {
  
  state = {
    quoteData: [],
    authors: [],
    tags: []
  };

  componentDidMount() {
    this._refreshQuoteData();
  }

  _refreshQuoteData = async () => {
    // Get quotes from disk (quotes.json)
    const quoteData = await getQuoteData();
    let authors = this._getAuthors(quoteData);
    let tags = this._getTags(quoteData);
    this.setState({ quoteData: quoteData, authors, tags });
  }
  // Get Authors with count of quotes
  // [{ author, count }]
  _getAuthors = (quoteData) => {
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
  _getTags = (quoteData) => {
    let tags =  _.chain(quoteData)
    .map(tag => tag.tags) // Get just tags
    .flatten() // flatten array of arrays to a single array
    .sortBy(tag=> tag.toLowerCase()) 
    .uniq()
    .value();
    return tags
  }
  
  _updateQuoteData = (quoteData) => {
    let authors = this._getAuthors(quoteData);
    let tags = this._getTags(quoteData);
    this.setState({ quoteData: quoteData, authors, tags });
  }
  
  deleteQuote = async (quoteId) => {
    // Modify the file
    let updatedQuotes = await deleteQuote(quoteId);
    // Get the new list of authros
    this._updateQuoteData(updatedQuotes);
  }
  
  addQuote = async (quoteObj) => {
    // Modify the file
    let updatedQuotes = await addQuote(quoteObj);
    // Get the new list of authros
    this._updateQuoteData(updatedQuotes);
  }
  /**
   * Filter quotes by selectedAuthors array, selectedTags array
   * and (soon) search quote text
   */
  filterQuotes = (quoteData, selectedAuthors, selectedTags, searchText, rating) => {
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
  randomQuote = () => {
    let { quoteData } = this.state;
    console.log(quoteData)
    let randomNum = Math.floor(Math.random() * Math.floor(quoteData.length))
    return quoteData[randomNum] || null
  }
  render() {
    return (
      <AppContext.Provider value={{
            ...this.state, 
            actions: { 
              deleteQuote: this.deleteQuote,
              addQuote: this.addQuote,
              filterQuotes: this.filterQuotes,
              randomQuote: this.randomQuote,
            }
          }}
        >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default DataProvider;