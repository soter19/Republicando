/**
 *
 * OfferListing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import Button from "@material-ui/core/Button/Button";
import styled from "styled-components";
import Card from "@material-ui/core/Card/Card";

const ListItem = styled(MUIListItem)`
  width: 100%;
  padding: 10px;
`;

const List = styled(MUIList)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(Typography)`
  padding: 10px;
`;


const OfferCard = styled(Card)`
  min-width: 100%;
  min-height: 120px;
`;

export class OfferListing extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			offers: [],
		};
	}

	componentWillMount() {
  // TODO INTEGRAÇAO GET MY OFFERS
	}

  render() {
		const { offers } = this.state;

		return (<div>
			<Title variant="title">Minhas Vagas</Title>
				{/*<List>*/}
					{/*{offers &&*/}
            {/*offers.map(offer => (*/}
						{/*<ListItem>*/}
							{/*<OfferCard>*/}
								{/*<CardContent>*/}
									{/*<Typography variant='headline'>{offer.data.name}</Typography>*/}
									{/*<Typography variant='caption'>{offer.data.description}</Typography>*/}
				          {/*<Typography variant='button'>{String(offer.data.renderValue)}</Typography>*/}
                {/*</CardContent>*/}
								{/*<CardActions>*/}
									{/*<Button*/}
										{/*size="small"*/}
										{/*variant="flat"*/}
										{/*color="primary" >*/}
										{/*DESCANDIDATAR-SE*/}
									{/*</Button>*/}
								{/*</CardActions>*/}
							{/*</OfferCard>*/}
						{/*</ListItem>*/}
					{/*))}*/}
				{/*</List>*/}

				{/*//TODO REMOVER CÓDIGO A BAIXO QUANDO INTEGRAÇAO ESTIVER PRONTA*/}
				<List>
						<ListItem>
							<OfferCard>
								<CardContent>
									<Typography variant='headline'>Titulo da vaga</Typography>
									<Typography variant='caption'>Descricacao da vaga</Typography>
									<Typography variant='button'>Valor: R$ 700,00</Typography>
                </CardContent>
								<CardActions>
									<Button
										size="small"
										variant="flat"
										color="primary" >
										DESCANDIDATAR-SE
									</Button>
								</CardActions>
							</OfferCard>
						</ListItem>
            <ListItem>
              <OfferCard>
                <CardContent>
                  <Typography variant='headline'>Titulo da vaga</Typography>
                  <Typography variant='caption'>Descricacao da vaga</Typography>
									<Typography variant='button'>Valor: R$ 700,00</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="flat"
                    color="primary" >
                    DESCANDIDATAR-SE
                  </Button>
                </CardActions>
              </OfferCard>
            </ListItem>
            <ListItem>
              <OfferCard>
                <CardContent>
                  <Typography variant='headline'>Titulo da vaga</Typography>
                  <Typography variant='caption'>Descricacao da vaga</Typography>
									<Typography variant='button'>Valor: R$ 700,00</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="flat"
                    color="primary" >
                    DESCANDIDATAR-SE
                  </Button>
                </CardActions>
              </OfferCard>
            </ListItem>
				</List>


		</div>
    );
  }
}

OfferListing.propTypes = {
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

export default compose(withConnect)(OfferListing);
