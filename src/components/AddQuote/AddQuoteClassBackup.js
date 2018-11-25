import React from 'react';
import { Input, Select, Button, Rate } from 'antd'
import styled from 'styled-components';

import { addQuote } from '../../fileAccess/remoteFileAccess';
import AddQuoteController from './AddQuoteController';
import TagPicker from '../AddQuote/TagPicker';
import SearchInput from '../Common/SearchInput';

const Option = Select.Option

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

class AddQuote extends React.Component {  
  constructor(props) {
    super(props);
    this.quoteRef = React.createRef();
  }
  state = {
    quote: '',
    author: '',
    authorBio: '',
    rating: 0,
    currentTags: undefined
  }
  
  handleTagChange = (tagArray) => this.setState({ currentTags: tagArray })
  handleQuoteChange = (e) => {this.setState({quote: e.target.value})}
  handleAuthorChange = (e) => {this.setState({author: e.target.value})}
  handleAuthorBioChange = (e) => {this.setState({authorBio: e.target.value})}

  handleAuthorTagChange = (e) => {this.setState({author: e[0]})}

  onAddQuote = (fnUpdateContext) => {
    let { quote, author, authorBio, currentTags, rating } = this.state;
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
    this.setState({ author: '', quote: '', authorBio: '', currentTags: undefined, rating: 0 });
    addQuote(quoteObj)
        .then(quotes => {
          fnUpdateContext(quotes);
        });
    this.quoteRef.current.focus();
  }
  
  clearInputs = () => {
    this.setState({ author: '', authorBio: '', quote: '', currentTags: undefined, rating: 0 })
  }
  render() {
    return(
      <AddQuoteController>
      {(quoteData, authors, tags, updateQuoteData, pickAuthorBio) => {
        pickAuthorBio(quoteData, 'Albert')
        return (
          <CenterWrapper>
            <Wrapper>  
              <Label>
                Quote:
              </Label>
                <Input.TextArea
                  placeholder="Enter Quote" 
                  onChange={this.handleQuoteChange}
                  autoFocus
                  value={this.state.quote}
                  ref={this.quoteRef}
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
              updateAuthor={(e) => this.setState({author: e, authorBio: pickAuthorBio(quoteData, e)})}
            >
              {(props) => {
                  return (
                    <input 
                      {...props} 
                      value={this.state.author}
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
                onChange={this.handleAuthorBioChange}
                value={this.state.authorBio}
              />
              <RowWrapper>
                <FieldWrapper>
                  <Label>
                    Tags:
                  </Label>
                  <TagPicker 
                    mode="tags"
                    setSelectedTags={this.handleTagChange} 
                    selectedTags={this.state.currentTags}  
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <Label>Rating</Label>
                  <RateWrapper>
                    <Rate 
                      value={this.state.rating} 
                      onChange={(value) => this.setState({ rating: value })}  
                    />
                  </RateWrapper>
                </FieldWrapper>
              </RowWrapper>
              <ButtonWrapper>
                <Button onClick={() => this.onAddQuote(updateQuoteData)}> Add Quote</Button>
                <Button onClick={this.clearInputs}> Clear </Button>
              </ButtonWrapper>
            </Wrapper>
          </CenterWrapper>
          )
        }
      }
        
      </AddQuoteController>
      
    )
  }
}

export default AddQuote;