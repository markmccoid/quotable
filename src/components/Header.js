import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { AppContext } from '../DataProvider';

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
    </Wrapper>
  )
}

export default Header;