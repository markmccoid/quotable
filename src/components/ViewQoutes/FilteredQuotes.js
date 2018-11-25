import React, { useState } from 'react';
import { Button, Rate } from 'antd';
import styled from 'styled-components';
import _ from 'lodash';

import EditQuote from './EditQuote';
import { alertOnDelete } from '../Alerts/alerts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  background: #deeada;
`;
export const QuoteContainer = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 10px;
  width: 32%;
  background: whitesmoke;
  @media (max-width: 1550px) {
    width: 48%;
  }
  @media (max-width: 1000px) {
    width: 96%;
  }
  
`;
export const Quote = styled.div`
  font-family: 'KoHo', sans-serif;
  font-size: 1.2rem;
  padding: 10px;
`;
export const DetailWrapper = styled.div`
  font-family: 'KoHo', sans-serif;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px dashed lightgray;
`;
export const Author = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px 0 0 0;
  border-right: 1px dashed lightgray;
  background: aliceblue;
  width: 50%;
`;
const Tags = styled.div`
  font-size: 1rem;
  padding: 10px;
  border-radius: 0 5px 0 0;
  background: ghostwhite;
  width: 50%;
`;

const ButtonGroup = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
`;


const FilteredQuotes = (props) => {
  let { quotes } =  props;
  const [editingId, setEditingId] = useState(false);
  return (
    <Wrapper>
      {quotes.map(quote => {        
        if (quote.id === editingId) {
          return (
            <EditQuote 
              key={quote.id}
              setEditingId={setEditingId}
              updateQuote={props.updateQuote}
              quote={quote}   
            />
          )
        }
        return (
          <QuoteContainer key={quote.id}>
            <DetailWrapper>
              <Author>{quote.author}</Author>
              <Tags>{quote.tags.map((tag, idx) => idx > 0 ? `, ${tag}`:tag)}</Tags>
              <ButtonGroup>
                <Button 
                  onClick={() => setEditingId(quote.id)}
                  icon="edit"
                  title="Edit Quote"
                />
                <Button 
                  icon="delete" 
                  title="Delete Quote"
                  onClick={() => {
                    alertOnDelete()
                      .then(deleteFlag => {
                        if(deleteFlag){
                          props.deleteQuote(quote.id)
                        }
                      })
                    }
                  } 
                />
              </ButtonGroup>
            </DetailWrapper>
            <Quote>{quote.quote}</Quote>
            <Rate style={{padding: "0 0 10px 10px"}} disabled value={quote.rating} />
          </QuoteContainer>
        );
        })
      }
    </Wrapper>
  )
}

export default FilteredQuotes;

