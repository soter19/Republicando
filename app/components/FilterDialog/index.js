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
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'recompose';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { getAllTags } from '../../api';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import { makeSelectFilters } from '../../containers/App/selectors';
import { setFilter } from './actions';
import { getRepublicsByTag } from '../../containers/App/actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FilterDialogWrapper = styled.div`
  margin: 0 20px;
`;


class FilterDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      availableFilters: [],
      tempFilters: [],
    };
  }

  componentWillMount() {
    getAllTags().then((tags) => {
      this.setState({ availableFilters: tags });
    });
  }

  componentDidMount() {

  }

  handleFilterSelection = (e) => {
    const { value, id } = e.target;
    // TODO IMPROVE THIS SHITTY LOGIC
    this.setState({
      tempFilters:
        [...this.state.tempFilters, id]
    });
  };

  getFilters = (availableFilters) => {
    const { filters } = this.props;
    return availableFilters.map(({name, id}) => (
      <Fragment>
        <ListItem>
          <ListItemText primary={name}/>
          <ListItemSecondaryAction>
            <Checkbox
              id={id}
              defaultChecked={filters.includes(id)}
              onChange={this.handleFilterSelection}
              value={name}
            />
          </ListItemSecondaryAction>
          <Divider/>
        </ListItem>
      </Fragment>
    ))
  };

  applyFilters = () => {
    const { setFilters, onClose } = this.props;
    const { tempFilters } = this.state;
    setFilters(tempFilters);
    this.setState({
      tempFilters: [],
    }, onClose);
  };

  render() {
    const { availableFilters } = this.state;
    const { isOpen, onClose } = this.props;
    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <FilterDialogWrapper>
          <Typography variant={'subheading'} style={{ margin: '10px 0' }}>Escolha aqui os filtros desejados:</Typography>
          <List>
            {
              this.getFilters(availableFilters)
            }
          </List>
          <Button fullWidth color="primary" onClick={this.applyFilters}>
            Aplicar
          </Button>
          <Button fullWidth color="inherit" onClick={onClose}>
            Fechar
          </Button>
        </FilterDialogWrapper>
      </Dialog>
    );
  }

}

FilterDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  goToDetail: republicId => dispatch(push(`/republic-detail/${republicId}`)),
  setFilters: filters => {
    dispatch(setFilter(filters));
    getRepublicsByTag(dispatch)(filters);
  }
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(FilterDialog);
