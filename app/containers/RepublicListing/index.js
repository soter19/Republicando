/**
 *
 * RepublicListing
 *
 */

import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RepublicaCard from '../../components/RepublicaCard';
import List from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';

const ListItem = styled(MUIListItem)`
  width: 33%;
`;

/* eslint-disable react/prefer-stateless-function */
export class RepublicListing extends React.PureComponent {
  render() {
    return (
      <List>
        <ListItem button>
          <RepublicaCard />
        </ListItem>
        <ListItem button>
          <RepublicaCard />
        </ListItem>
        <ListItem button>
          <RepublicaCard />
        </ListItem>
        <ListItem button>
          <RepublicaCard />
        </ListItem>
      </List>
    );
  }
}

RepublicListing.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(RepublicListing);
