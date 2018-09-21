import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import { Fragment } from 'react';
import Slide from '@material-ui/core/Slide/Slide';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Divider from '@material-ui/core/Divider/Divider';
import { createStructuredSelector } from "reselect";
import { makeSelectFirestoreClients } from '../../containers/App/selectors';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'recompose';
import { HomePage } from '../../containers/HomePage';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const exampleFilters = [
  {
    id: 'isFumante',
    title: 'Fumante',
    type: 'boolean',
  },
  {
    id: 'aceitaPet',
    title: 'Animais de Estimação',
    type: 'boolean',
  },
];

const FilterDialogWrapper = styled.div`
  margin: 0 20px;
`;

const Filter = ({ title, options, type }) => (
  <Fragment>
    <Typography variant={'subheading'}>{title}</Typography>
    { type === 'boolean' && <Checkbox checked onChange={console.log} value={title} /> }
    <Divider />
  </Fragment>
);

class FilterDialog extends PureComponent {
  render() {
    const { isOpen, onClose, availableFilters } = this.props;
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <FilterDialogWrapper>
          <Button color="inherit" onClick={onClose}>
            Fechar
          </Button>
          <Typography>Escolha aqui os filtros desejados</Typography>
          {
            availableFilters && availableFilters.map(Filter)
          }
          <Button color="inherit" onClick={console.log}>
            Aplicar
          </Button>
        </FilterDialogWrapper>
      </Dialog>
    );
  }

}

FilterDialog.propTypes = {
  availableFilters: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  availableFilters: makeSelectFirestoreClients(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  goToDetail: republicId => dispatch(push(`/republic-detail/${republicId}`)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(FilterDialog);
