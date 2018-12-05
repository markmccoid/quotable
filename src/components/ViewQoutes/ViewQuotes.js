import React from 'react';
import styled from 'styled-components';


import { AppContext } from '../../DataProvider';
//import { getQuoteAuthors } from '../../fileAccess/remoteFileAccess';
// import { getQuoteAuthors, getQuoteData } from '../../fileAccess/remoteFileAccess';
// const electron = window.require('electron');
// const { ipcRenderer, remote } = electron;
//const nfa = window.require('./fileAccess/nativeFileAccess');

import FilterBar from './FilterBar';
import FilteredQuotes from './FilteredQuotes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterBarWrapper = styled.div`
  border-bottom: 1px solid gray;
  background: #AECCA3;
`;

class ViewQuotes extends React.Component {
  state = {
    selectedAuthors: [],
    selectedTags: [],
    searchText: '',
    rating: '',
  }
  
  _setSelectedAuthors = (selectedAuthors) => {
    this.setState({ selectedAuthors })
  }
  _setSelectedTags = (selectedTags) => {
    this.setState({ selectedTags })
  }
  _setSearchText = (searchText) => {
    this.setState({ searchText })
  }
  _setFilterRating = (rating) => {
    this.setState({ rating })
  }
  render() { 
    return(
        <AppContext.Consumer>
          {(value) => {
            return (
              <Wrapper>
                <FilterBarWrapper>
                  <FilterBar 
                    authors={value.authors} 
                    tags={value.tags}
                    rating={this.state.rating}
                    searchText={this.state.searchText}
                    selectedTags={this.state.selectedTags}
                    setSelectedAuthors={this._setSelectedAuthors}  
                    setSelectedTags={this._setSelectedTags}  
                    setSearchText={this._setSearchText}
                    setFilterRating={this._setFilterRating}
                  />  
                </FilterBarWrapper>
                
                
                  <FilteredQuotes
                    quotes={
                      value.actions.filterQuotes(value.quoteData, 
                        this.state.selectedAuthors, 
                        this.state.selectedTags,
                        this.state.searchText,
                        this.state.rating
                        )
                       || []
                    }
                    deleteQuote={(quoteId) => {
                        value.actions.deleteQuote(quoteId);
                        this.props.navigate('/view')
                      }
                    }
                    updateQuote={(quoteObj) => value.actions.updateQuote(quoteObj)}   
                  />
                
              </Wrapper>  
            )
          }}
        </AppContext.Consumer>
    )
  }
}

export default ViewQuotes;