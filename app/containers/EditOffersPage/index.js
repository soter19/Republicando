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
import { createOffer, getOfferById, updateOffer } from '../../api';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { createStructuredSelector } from "reselect";
import { makeSelectUserData, makeSelectUserType } from '../App/selectors';

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
	constructor(props){
		super(props);
		this.state = {
			id: null,
			name: '',
			description: '',
			rentValue: '',
      onFeedback: false,
		}
	}

	componentDidMount(){
		const { id } = this.props.match.params;
		if(id){
      getOfferById(id).then(({id, name, rentValue, description }) => {
      	this.setState({
					id,
					name,
					rentValue,
					description,
				})
			})
		}
	}


	handleSubmit = () => {
		const { republicId } = this.props.user;
		const offer = {
			name: this.state.name,
			description: this.state.description,
			rentValue: this.state.rentValue,
			candidates: [],
			republicId,
		};
		if(!this.state.id) {
      createOffer(offer).then(() => {
        this.setState({ onFeedback: true })
      })
		} else {
      updateOffer(offer).then(() => {
        this.setState({ onFeedback: true })
      })
		}
	};

	handleChange = ({ target }) => this.setState({ [target.id]: target.value });

  render() {
  	const { onFeeback, rentValue, name, description, } = this.state;
		return (
			<Fragment>
				<Title variant='title'>Criar vaga </Title>
				<Subtitle variant='subheadings'>Insira os dados: </Subtitle>
				<TextFieldCreate
					required
					id="name"
					label="Nome"
					type="text"
					onChange={this.handleChange}
					value={name}
        />
				<TextFieldCreate
					required
					id="description"
					label="Descrição"
					type="text"
					onChange={this.handleChange}
					value={description}
				/>
				<TextFieldCreate
					required
					id="rentValue"
					label="Valor R$"
					type="number"
					onChange={this.handleChange}
					value={rentValue}
				/>
				<ButtonCreate
					variant="contained"
					color="primary"
					type="submit"
          onClick={this.handleSubmit}
				>
					Criar vaga
				</ButtonCreate>
				<Snackbar
					open={this.onFeedback}
					onClose={() => this.setState({ onFeedback: false })}
					autoHideDuration={2000}
				>
					Vaga criada com sucesso!
				</Snackbar>
			</Fragment>
		);  }
}

EditOffersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserData(),
  userType: makeSelectUserType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditOffersPage);
