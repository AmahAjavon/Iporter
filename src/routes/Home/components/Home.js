import React from 'react';

import { Container } from 'native-base';
import MapContainer from './MapContainer';

class Home extends React.Component{

    componentDidMount() {
        this.props.getCurrentLocation();
    }

    render(){
        const region = {
            latitude: 32.7157,
            longitude: -117.1611,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        return (
            <Container>
                {this.props.region.latitude && <MapContainer region={this.props.region}/>}
            </Container>);
    }
}
export default Home;