import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Input, Button, Rate } from 'antd';
import styled from 'styled-components';

import { QuoteContainer, DetailWrapper } from './FilteredQuotes';
import TagPicker from '../AddQuote/TagPicker';

const TagPickerStyled = styled(TagPicker)`
  width: 50%;
`;
const AuthorInput = styled(Input)`
  font-size: 1rem !important;
  padding: 10px !important;
  border-right: 1px dashed lightgray;
  background: aliceblue !important;
  width: 50% !important;
`;
const QuoteInput = styled(Input.TextArea)`
  font-size: 1.2rem !important;
`;
const Label = styled.div`
  font-weight: bold;
  padding: 5px 0 0 10px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditQuote = (props) => {
  const [quoteText, setQuoteText] = useState(props.quote.quote)
  const [author, setAuthor] = useState(props.quote.author)
  const [authorBio, setAuthorBio] = useState(props.quote.authorBio)
  const [tags, setTags] = useState(props.quote.tags)
  const [rating, setRating] = useState(props.quote.rating)
  
  const onUpdateQuote = () => {
    let quoteObj = {
      id: props.quote.id,
      quote: quoteText,
      author: author,
      authorBio: authorBio,
      tags: tags,
      rating: rating,
      createDate: props.quote.createDate,
    };
    props.setEditingId('');
    props.updateQuote(quoteObj);
  }
  return (
    <QuoteContainer>
      <DetailWrapper>
        <AuthorInput
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <TagPickerStyled 
          setSelectedTags={setTags}
          selectedTags={tags}
        />
      </DetailWrapper>
      <QuoteInput
        rows={4}
        value={quoteText}
        onChange={e => setQuoteText(e.target.value)}
      />
      <Label>Author Bio</Label>
      <Input
        value={authorBio}
        onChange={e => setAuthorBio(e.target.value)}
      />
      <Rate style={{padding: "0 0 10px 10px"}} value={rating} onChange={setRating} />
      <ButtonGroup>
        <Button 
          onClick={onUpdateQuote}
          icon="check"
          title="Save Changes"
        />
        <Button 
          onClick={() => props.setEditingId('')}
          icon="minus"
          title="Cancel Edit"
        />
      </ButtonGroup>
    </QuoteContainer>
  )
};

EditQuote.propTypes = {
  setEditingId: PropTypes.func,
  updateQuote: PropTypes.func,
  quote: PropTypes.object,
}

export default EditQuote;