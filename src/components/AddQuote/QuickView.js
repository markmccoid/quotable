import React from 'react';
import styled from 'styled-components';

const QuickViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  background: white;
  border: 1px solid lightgray;
  background: lightgoldenrodyellow;
  border-radius: 5px;
`;
const Header = styled.div`
  padding: 5px;
  font-size: 1.1rem;
  font-weight: bold;
`;

const Quote = styled.div`
  border-top: 1px solid lightgray;
  padding: 5px;
  &:nth-child(even) {
    background: white;
  }
  &:nth-child(odd) {
    background: lightgray;
  }
`;

const QuickView = (props) => {

  return (
    <QuickViewWrapper>
      <Header>Quotes for {props.author}</Header>
      
      {props.authorQuotes.map((quote,idx) => <Quote key={idx}>{quote}</Quote>)}
      
    </QuickViewWrapper>
  )
}

export default QuickView;