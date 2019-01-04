import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { AppContext } from '../DataProvider';
import MyAlert from './Common/MyAlert';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  align-items: center;
`;
const Title = styled(Link)`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 10px;
  font-family: 'Pacifico', cursive;
  text-decoration: none;
  color: black;
  &:active, &:focus {
    text-decoration: none;
  }
`;
const NavLink = styled(Link)`
  margin: 10px;
  padding: 10px;
  border: 1px solid lightgray;
  &:hover {
    background: gray;
    color: white;
  }
`;
const Summary = styled.div`
  position: absolute;
  font-size: .8rem;
  font-weight: bold;
  padding: 2px 4px;
  border: 1px solid lightgray;
  border-radius: 50%;
  top: -20px;
  background: greenyellow;
  right: 0;
`;
const LinkCountWrapper = styled.div`
  position: relative;
`;
const Header = () => {
  const { quoteData, authors } = useContext(AppContext);
  const numAuthors = authors.map(author => author.author).length
  console.log('header', quoteData)
  return (
    <Wrapper>
      <Title to="/">Quotable</Title>
      <NavLink to="/add">Add Quote</NavLink>
      <LinkCountWrapper>
        <NavLink to="/view">View Quotes</NavLink>
        <Summary>{quoteData.length}</Summary>
      </LinkCountWrapper>
      <MyAlert
        title="Close and lose changes?"
        okButtonText="Yes, Close"
        onConfirm={() => console.log('onClose')}
        onCancel={() => console.log('cancelled')}
      >
          {
            (onConfirm) => <a onClick={onConfirm}>Close</a>
          }
        </MyAlert>
    </Wrapper>
  )
}

export default Header;