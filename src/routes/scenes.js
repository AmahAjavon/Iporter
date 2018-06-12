import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from "./Home/container/HomeContainer";
import TrackTransporterContainer from "./TrackTransporter/container/TrackTransporterContainer";
import LoginScreen from "./Login/components/LoginUtils/LoginScreen";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="loginScreen" component={LoginScreen} animation='fade' hideNavBar={true} initial={true}/>
        <Scene key="home" component={HomeContainer} title="home" />
        <Scene key="trackTransporter" component={TrackTransporterContainer} title="trackTransporter"/>
    </Scene>

);

export default scenes;