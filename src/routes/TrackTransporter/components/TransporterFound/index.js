import React from "react";
import {Text, Image} from "react-native";
import { View, Button } from "native-base";

import styles from "./TransporterFoundStyles";

export const TransporterFound = ({ transporterInfo, getTransporterLocation})=>{
	const { profilePic } = transporterInfo || "";
	const { vehicle } = transporterInfo || {};
	return (
		<View style={styles.findTransporterContainer}>
			<View style={styles.content}>
				<Text>YAY Transporter Found!</Text>
				<Image resizemode="contain" style={styles.transporterPic} source={{uri:profilePic}} />
				<View style={styles.transporterInfo}>
					<Text style={styles.quotationMarkLeft}>""</Text>
					<View style={styles.transporterBio}>
						<Text style={styles.bioText}>
							Hi my name is
						</Text>
						<Text style={styles.nameText}>
							{transporterInfo.firstName} {transporterInfo.lastName}
						</Text>
						<Text style={styles.bioText}>
							and I am 0.2km away.
						</Text>
					</View>
					<Text style={styles.quotationMarkRight}>""</Text>
				</View>
				<View style={styles.vehicleDetails}>
					<Text style={styles.vehicleText}>Vehicle Plate number:</Text>
					<Text style={styles.vehicleNumber}> {vehicle && vehicle.plateNumber}</Text>
					<Button  style={styles.nextBtn} onPress={()=>getTransporterLocation()}>
						<Text style={styles.nextBtnText}>Next</Text>
					</Button>
				</View>
			</View>
			
		</View>

	);
}

export default  TransporterFound;