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
import IntroPage from 'containers/IntroPage/Loadable';
import SignInPage from 'containers/SignInPage/Loadable';
import SignUpPage from 'containers/SignUpPage/Loadable';
import RepublicListing from 'containers/RepublicListing/Loadable';
import RepublicDetail from 'containers/RepublicDetail/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import MessagesAdminPage from 'containers/MessagesAdminPage/Loadable';
import MessagesPage from 'containers/NotificationPage/Loadable';
import EditOffersPage from 'containers/EditOffersPage/Loadable';
import CandidatesListing from 'containers/CandidatesListing/Loadable';
import OfferListing from 'containers/OfferListing/Loadable';
import RepublicListingAdmin from 'containers/RepublicListingAdmin/Loadable';
import RepublicOffersPage from 'containers/RepublicOffersPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route path="/republic-map" component={HomePage} />
        <Route path="/signIn" component={SignInPage} />
        <Route path="/signUp" component={SignUpPage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/republic-list" component={RepublicListing} />
        <Route path="/republic-detail/:id" component={RepublicDetail} />
        <Route path="/messages" component={MessagesPage} />
				<Route path="/messagesAdmin/:id" component={MessagesAdminPage} />
				<Route path="/edit-offer/:id" component={EditOffersPage} />
				<Route path="/offer/:id/candidates" component={CandidatesListing} />
				<Route path="/my-offers" component={OfferListing} />
				<Route path="/republic-list-admin" component={RepublicListingAdmin} />
				<Route path="/republic-offers/:id" component={RepublicOffersPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}
