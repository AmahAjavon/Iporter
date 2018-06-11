import React from 'react';
import {View, Text} from "react-native";
import { Actions } from "react-native-router-flux";

import { Container } from 'native-base';
import MapContainer from './MapContainer';
import HeaderComponent from "../../../components/HeaderComponent";
import FooterComponent from "../../../components/FooterComponent";
import Fare from "./Fare";
import Fab from "./Fab";
import FindTransporter from "./FindTransporter";
const iporterLogo = require("../../../assets/img/iporter.png");
const carMarker = require("../../../assets/img/transporter.png");

class Home extends React.Component{

    componentDidMount() {
        var rx = this;
        this.props.getCurrentLocation();
        setTimeout(function(){
            rx.props.getNearByTransporters();

        }, 1000);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.booking.status === "confirmed" ){
            Actions.trackTransporter({type: "reset"});
        }
        this.props.getCurrentLocation();
    }

    render(){
        const region = {
            latitude: 32.7157,
            longitude: -117.1611,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        const { status } = this.props.booking;
        return (
            <Container>
                { (status !== "pending") &&
                <View style={{flex:1}}>
                    <HeaderComponent logo={iporterLogo}/>
                    {this.props.region.latitude &&
                    <MapContainer region={this.props.region}
                                  getInputData={this.props.getInputData}
                                  toggleSearchResultModal={this.props.toggleSearchResultModal}
                                  getAddressPredictions={this.props.getAddressPredictions}
                                  resultTypes={this.props.resultTypes}
                                  predictions={this.props.predictions}
                                  getSelectedAddress={this.props.getSelectedAddress}
                                  selectedAddress={this.props.selectedAddress}
                                  carMarker={carMarker}
                                  nearByTransporters={this.props.nearByTransporters}
                    />
                    }

                    <Fab onPressAction={()=>this.props.bookCar()}/>
                    {
                        this.props.fare &&
                        <Fare fare={this.props.fare} />
                    }
                    <FooterComponent/>

                </View>
                ||
                <FindTransporter selectedAddress={this.props.selectedAddress}/>
                }

            </Container>
        );
    }
}
export default Home;