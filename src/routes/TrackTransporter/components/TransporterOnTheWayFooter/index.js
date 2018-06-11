import React from "react";
import {Text, Image} from "react-native";
import { View, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./TransporterOnTheWayStyles";

export const TransporterOnTheWayFooter = ({ transporterInfo, distanceFromTransporter})=>{
	const { vehicle } = transporterInfo || {};
	const { duration } = distanceFromTransporter.rows[0].elements[0] || "";
	return (
		<View style={styles.footerContainer}>
			<View style={styles.iconContainer}>
				<Icon name="window-minimize" style={styles.icon}/>
				<Text style={styles.distanceText}>{(duration.value < 100) ? "Your transporter has arrived" : duration.text}</Text>
				<Text style={styles.onWayText}>Your transporter is on the way</Text>
				<Text style={styles.vehicleText}>{vehicle && vehicle.plateNumber} {vehicle && vehicle.model}</Text>

			</View>

		</View>

	);
}

export default TransporterOnTheWayFooter;