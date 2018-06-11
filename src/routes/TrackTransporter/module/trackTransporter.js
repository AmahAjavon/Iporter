import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native"
import RNGooglePlaces from "react-native-google-places";

import request from "../../../util/request";

import calculateFare from "../../../util/fareCalculator.js";

//--------------------
//Constants
//--------------------
const { 
	GET_CURRENT_LOCATION,
	GET_TRANSPORTER_INFORMATION,
	GET_TRANSPORTER_LOCATION,
	GET_DISTANCE_FROM_TRANSPORTER
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA



//--------------------
//Actions
//--------------------
export function getCurrentLocation(){
	return(dispatch)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:GET_CURRENT_LOCATION,
					payload:position
				});
			},
			(error)=> console.log(error.message),
			{enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
		);
	}
}

//Get transporter's info

export function getTransporterInfo(){
	return (dispatch, store)=>{
		let id = store().home.booking.transporterId;
		request.get("http://localhost:3000/api/transporter/" + id)
		.finish((error, res)=>{
			dispatch({
				type:GET_TRANSPORTER_INFORMATION,
				payload:res.body
			});
		});
	}
}


//Get initial transporter location
export function getTransporterLocation(){
	return (dispatch, store)=>{
		let id = store().home.booking.transporterId;
		request.get("http://localhost:3000/api/transporterLocation/" + id)
		.finish((erroe, res)=>{
			dispatch({
				type:GET_TRANSPORTER_LOCATION,
				payload:res.body
			});
		});
	}
}

//get distance from transporter
export function getDistanceFromTransporter(){
	return (dispatch, store)=>{
		if(store().trackTransporter.transporterLocation){
			request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
			.query({
				origins:store().home.selectedAddress.selectedPickUp.latitude + 
				"," + store().home.selectedAddress.selectedPickUp.longitude,
				destinations:store().trackTransporter.transporterLocation.coordinate.coordinates[1] +
				"," + store().trackTransporter.transporterLocation.coordinate.coordinates[0],
				mode:"transporting",
				key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
			})
			.finish((error, res)=>{
				dispatch({
					type:GET_DISTANCE_FROM_TRANSPORTER,
					payload:res.body
				})
			});

		}					
	}
}

//--------------------
//Action Handlers
//--------------------
function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set:action.payload.coords.latitude
			},
			longitude:{
				$set:action.payload.coords.longitude
			},
			latitudeDelta:{
				$set:LATITUDE_DELTA
			},
			longitudeDelta:{
				$set:LONGITUDE_DELTA
			}
		}
	})
}

function handleGetTransporterInfo(state, action){
	return update(state, {
		transporterInfo:{
			$set:action.payload
		}
	});
}

function handleUpdateTransporterLocation(state, action){
	return update(state, {
        transporterLocation:{
			$set:action.payload
		}
	});
}

function handleGetTransporterLocation(state, action){
	return update(state, {
		transporterLocation:{
			$set:action.payload
		},
		showTransporterFound:{
			$set:false
		},
		showCarMaker:{
			$set:true
		}

	});
}

function handleGetDistanceFromTransporter(state, action){
		return update(state, {
			distanceFromTransporter:{
				$set:action.payload
			}
		});
}
const ACTION_HANDLERS = {
	GET_CURRENT_LOCATION:handleGetCurrentLocation,
	GET_TRANSPORTER_INFORMATION:handleGetTransporterInfo,
	UPDATE_TRANSPORTER_LOCATION:handleUpdateTransporterLocation,
	GET_TRANSPORTER_LOCATION:handleGetTransporterLocation,
	GET_DISTANCE_FROM_TRANSPORTER:handleGetDistanceFromTransporter


}
const initialState = {
	region:{},
	showTransporterFound:true
};

export function TrackTransporterReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}