import React, { Component } from 'react';
import { Router, navigate, createMemorySource, createHistory, LocationProvider } from '@reach/router';
import styled from 'styled-components';
import _ from 'lodash';

// import AppContext from './AppContext';
// import { getQuoteData } from './fileAccess/remoteFileAccess';
import DataProvider from './DataProvider';
import Header from './components/Header';
import ShowRandomQuote from './components/ShowRandomQuote';
import AddQuote from './components/AddQuote/AddQuote';
import ViewQuotes from './components/ViewQoutes/ViewQuotes';

//--Ant Design css load
import '../node_modules/antd/dist/antd.min.css';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 75px auto;
`;

const Error = (props) => (<div>{props}</div>)
const Home = () => (<div></div>)
class App extends Component {

  render() {
    let memory = createMemorySource("/");
    let history = createHistory(memory);
    return (
      <DataProvider>
        <Wrapper>

          <LocationProvider history={history}>
            <Header />
            <Router>
              <ShowRandomQuote path="/" />
              <AddQuote path="/add" />
              <ViewQuotes path="/view/*" />
              <Error default />
            </Router>
          </LocationProvider>
        </Wrapper>
      </DataProvider>
      
    );
  }
}

export default App;
