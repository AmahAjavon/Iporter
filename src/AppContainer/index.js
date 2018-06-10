import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import scenes from '../routes/scenes';
import store from '../store/createStore';


export default class AppContainer extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }
    render() {
        return(
            <Provider store={this.props.store}>
                <Router scenes={scenes} />
            </Provider>)
    }
}