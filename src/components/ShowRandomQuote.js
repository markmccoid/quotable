import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AppContext } from '../DataProvider';

const QuoteWrapper = styled.div`
  display: flex;
  background-image: ${props => props.randomImage ? `url(${props.randomImage})` : 'white'};
  background-size: cover;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 75px);
  padding-top: 150px;
`;

const Container = styled.div`
  background: rgba(251, 250, 249, 0.75);
  border-radius: 15px;
  margin: 0 50px;
  padding: 40px
`;

const QuoteDiv = styled.div`
  font-family: 'KoHo', sans-serif;
  font-size: 1.5rem;
`;
const AuthorDiv = styled.div`
  font-family: 'Pacifico', sans-serif;
  font-size: 1.2rem;
  margin: 10px 0;
`;

const ShowRandomQuote = (props) => {
  let { actions } = useContext(AppContext);
  let randomQuote = actions.randomQuote();
  let [randomImage, setRandomImage] = useState(undefined)
  useEffect(() => {
    fetch('http://www.splashbase.co/api/v1/images/random?images_only=true')
      .then(response => response.json())
      .then(imageObj => safeSetRandomImage(imageObj.url))
  }, [props.path]);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false)
  }, []);
  const safeSetRandomImage = (...args) => mountedRef.current && setRandomImage(...args)
  console.log(props)
  return (
    <React.Fragment>
      {randomImage ?
        <QuoteWrapper randomImage={randomImage}>
          <Container>
              <QuoteDiv>
                {randomQuote.quote}
              </QuoteDiv>
              <AuthorDiv>
                - {randomQuote.author}
              </AuthorDiv>
          </Container>
        </QuoteWrapper>
        : null
      }
    </React.Fragment>
  )
};

export default ShowRandomQuote;