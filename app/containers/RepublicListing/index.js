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
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import { getRepublics } from '../../api';

const ListItem = styled(MUIListItem)`
  width: 100%;
  padding: 10px;
`;

const List = styled(MUIList)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

/* eslint-disable react/prefer-stateless-function */
export class RepublicListing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      republics: [],
    };
  }

  componentWillMount() {
    getRepublics().then(republics => {
      this.setState({ republics });
    });
  }

  render() {
    const { republics } = this.state;
    return (
      <List>
        {republics.map(rep => (
          <ListItem button>
            <RepublicaCard republic={rep} />
          </ListItem>
        ))}
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
