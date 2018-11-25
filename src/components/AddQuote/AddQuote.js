import React, { useState, useContext, useRef } from 'react';
import { Input, Select, Button, Rate } from 'antd'
import styled from 'styled-components';


import TagPicker from '../AddQuote/TagPicker';
import SearchInput from '../Common/SearchInput';
import QuickView from './QuickView';
import { AppContext } from '../../DataProvider';

// Used in conjunction with author search functionality
// looks up authro in quote data and returns the bio information.
const pickAuthorBio = (quoteData, author) => {
  let authorObj = quoteData.reduce((accum, quote) => {
    if (quote.authorBio) {
      accum[quote.author] = quote.authorBio;
    }
    return accum
  }, {});
  return authorObj[author];
}

const getAuthorQuotes = (quoteData, author) => {
  return quoteData
    .filter(quote => quote.author === author)
    .map(authorQuote => authorQuote.quote);
}

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 15px;
  background: #AECCA3;
  padding: 20px;
  border: 1px solid darkgreen;
`;


const Label = styled.label`
  font-size: 1.3rem;
  margin: 5px 0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`;
const RowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;
`;
const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 50px 0 0;
`;
const RateWrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 4px;
  vertical-align: center;
  padding: 0 0 4px 4px;
  background: white;
`;

const AddQuote = (props) => {  
  const quoteRef = useRef(null);
  const { quoteData, authors, actions } = useContext(AppContext);
  const [state, setState] = useState({
    quote: '',
    author: '',
    authorBio: '',
    rating: 0,
    currentTags: undefined
  });
  let authorQuotes = getAuthorQuotes(quoteData, state.author)
  const handleSetState = (stateName) => (value) => {
    setState({...state, [stateName]: value})
   }

  const handleTagChange = (tagArray) => handleSetState('currentTags')(tagArray)
  const handleQuoteChange = (e) => handleSetState('quote')(e.target.value)
  const handleAuthorBioChange = (e) => handleSetState('authorBio')(e.target.value)

  const onAddQuote = () => {
    let { quote, author, authorBio, currentTags, rating } = state;
    
    if (!quote || !author || !currentTags) {
      alert('Enter field Quote, Author and Tags')
      return
    }
    const today = new Date();
      let quoteObj = {
        quote: quote,
        author: author,
        authorBio: authorBio,
        tags: currentTags,
        rating: rating,
        createDate: (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
      }
      setState({ author: '', quote: '', authorBio: '', currentTags: undefined, rating: 0 });
      actions.addQuote(quoteObj);
      quoteRef.current.focus();
    }
    
    const clearInputs = () => {
      setState({ author: '', authorBio: '', quote: '', currentTags: undefined, rating: 0 })
    }

    return (
        <CenterWrapper>
          <Wrapper>  
            <Label>
              Quote:
            </Label>
              <Input.TextArea
                placeholder="Enter Quote" 
                onChange={handleQuoteChange}
                autoFocus
                value={state.quote}
                ref={quoteRef}
              />
            <Label>
              Author:
            </Label>
            {/* <Input 
              placeholder="Author" 
              onChange={this.handleAuthorChange}
              value={this.state.author}
            /> */}

          <SearchInput 
            searchArray={authors.map(author => author.author)}
            updateAuthor={(e) => setState({...state, author: e, authorBio: pickAuthorBio(quoteData, e)})}
          >
            {(props) => {
                return (
                  <input 
                    {...props} 
                    value={state.author}
                    className="ant-input"
                    placeholder="Enter an Author"  
                  />
                )
              }
            }
          </SearchInput>
            <Label>
              Author Bio:
            </Label>
            <Input 
              placeholder="Author Bio" 
              onChange={handleAuthorBioChange}
              value={state.authorBio}
            />
            <RowWrapper>
              <FieldWrapper>
                <Label>
                  Tags:
                </Label>
                <TagPicker 
                  mode="tags"
                  setSelectedTags={handleTagChange} 
                  selectedTags={state.currentTags}  
                />
              </FieldWrapper>
              <FieldWrapper>
                <Label>Rating</Label>
                <RateWrapper>
                  <Rate 
                    value={state.rating} 
                    onChange={(value) => setState({ ...state, rating: value })}  
                  />
                </RateWrapper>
              </FieldWrapper>
            </RowWrapper>
            <ButtonWrapper>
              <Button onClick={onAddQuote}> Add Quote</Button>
              <Button onClick={clearInputs}> Clear </Button>
            </ButtonWrapper>
          
            {authorQuotes.length > 0 && <QuickView author={state.author} authorQuotes={authorQuotes}/>}
          
          </Wrapper>
        </CenterWrapper>
    )
  }


export default AddQuote;