/**
 *
 * EditOffersPage
 *
 */

import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";


export class EditOffersPage extends React.PureComponent {
  render() {
		return (
			<Fragment>
				<Typography variant="title">Criar vaga:</Typography>
				<TextField
					required
					id="name"
					label="Nome"
					type="text"
        />
				<TextField
					required
					id="description"
					label="Descrição"
					type="text"
				/>
				<TextField
					required
					id="price"
					label="Valor R$"
					type="number"
				/>
				<Button
					variant="contained"
					color="primary"
					type="submit"
				>
					Criar vaga
				</Button>
			</Fragment>
		);  }
}

EditOffersPage.propTypes = {
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

export default compose(withConnect)(EditOffersPage);
