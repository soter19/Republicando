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
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";

const TextFieldCreate = styled(TextField)`
  margin: 10px;
`;

const ButtonCreate = styled(Button)`
  margin: 10px;
`;

const Title = styled(Typography)`
  margin: 10px;
`;

const Subtitle = styled(Typography)`
  margin: 10px;
`;

export class EditOffersPage extends React.PureComponent {
  render() {
		return (
			<Fragment>
				<Title variant='title'>Criar vaga </Title>
				<Subtitle variant='subheadings'>Insira os dados: </Subtitle>
				<TextFieldCreate
					required
					id="name"
					label="Nome"
					type="text"
        />
				<TextFieldCreate
					required
					id="description"
					label="Descrição"
					type="text"
				/>
				<TextFieldCreate
					required
					id="price"
					label="Valor R$"
					type="number"
				/>
				<ButtonCreate
					variant="contained"
					color="primary"
					type="submit"
				>
					Criar vaga
				</ButtonCreate>
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
