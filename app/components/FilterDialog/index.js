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
    };
  }

  componentWillMount() {
    getAllTags().then((tags) => {
      this.setState({ availableFilters: tags });
    });
    debugger;
  }

  componentDidMount() {

  }

  getFilters = (availableFilters) => {
    return availableFilters.map(({name, id}) => (
      <Fragment>
        <ListItem>
          <ListItemText primary={name}/>
          <ListItemSecondaryAction>
            <Checkbox id={id} onChange={console.log} value={name}/>
          </ListItemSecondaryAction>
          <Divider/>
        </ListItem>
      </Fragment>
    ))
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
          <Button color="primary" onClick={console.log}>
            Aplicar
          </Button>
          <Button color="inherit" onClick={onClose}>
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

const mapStateToProps = createStructuredSelector({});

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
