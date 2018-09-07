/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import SignInPage from 'containers/SignInPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import RepublicListing from 'containers/RepublicListing/Loadable';
import RepublicDetail from 'containers/RepublicDetail/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signIn" component={SignInPage} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/RepublicListing" component={RepublicListing} />
        <Route path="/RepublicDetail" component={RepublicDetail} />
          <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
