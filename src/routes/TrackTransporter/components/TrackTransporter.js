import React from "react";
import {View, Text} from "react-native";

import { Container }  from "native-base";
import HeaderComponent from "../../../components/HeaderComponent";
import MapTrack from "./MapTrack";
import TransporterFound from "./TransporterFound";
import TransporterFooterProfile from "./TransporterFooterProfile";
import TransporterOnTheWayFooter from "./TransporterOnTheWayFooter";
const carMarker = require("../../../assets/img/transporter.png");
class TrackTransporter extends React.Component{

	componentDidMount() {
		this.props.getCurrentLocation();
		this.props.getTransporterInfo();
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.transporterLocation && nextProps.transporterLocation !== this.props.transporterLocation){
			this.props.getDistanceFromTransporter();
		}
	}

	render(){
		const region = {
            latitude: 32.7157,
            longitude: -117.1611,
			latitudeDelta:0.0922,
			longitudeDelta:0.0421
		}
		return(
			<Container>
				<View style={{flex:1}}>
					<HeaderComponent />
					{
						this.props.region &&
						<MapTrack
							region={this.props.region}
							selectedAddress={this.props.selectedAddress}
							transporterLocation={this.props.transporterLocation}
							showCarMaker={this.props.showCarMaker}
							carMarker={carMarker}

						/>

					}

					{
						this.props.distanceFromTransporter.rows &&
					
						<TransporterOnTheWayFooter
							transporterInfo={this.props.transporterInfo}
							distanceFromTransporter={this.props.distanceFromTransporter}

						/>
					}
					<TransporterFooterProfile
						transporterInfo={this.props.transporterInfo}
					/>

					{
						this.props.showTransporterFound &&
						<TransporterFound
							transporterInfo={this.props.transporterInfo}
							getTransporterLocation={this.props.getTransporterLocation}
						/>
					}
				
				</View>
			</Container>

		);

	}
}

export default TrackTransporter;