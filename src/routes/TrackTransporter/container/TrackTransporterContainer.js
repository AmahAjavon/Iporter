import { connect } from "react-redux";
import TrackTransporter from "../components/TrackTransporter";
import {
	getCurrentLocation,
	getTransporterInfo,
	getTransporterLocation,
	getDistanceFromTransporter
} from "../module/trackTransporter";

const mapStateToProps = (state) => ({
	region: state.trackTransporter.region,
	selectedAddress:state.home.selectedAddress || {},
	transporterInfo:state.trackTransporter.transporterInfo || {},
	transporterLocation:state.trackTransporter.transporterLocation,
	showTransporterFound:state.trackTransporter.showTransporterFound,
	showCarMaker:state.trackTransporter.showCarMaker,
	distanceFromTransporter:state.trackTransporter.distanceFromTransporter || {}

});

const mapActionCreators = {
	getCurrentLocation,
	getTransporterInfo,
	getTransporterLocation,
	getDistanceFromTransporter
};
export default connect(mapStateToProps, mapActionCreators)(TrackTransporter);