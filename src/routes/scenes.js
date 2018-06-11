import React from "react";
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from "./Home/containers/HomeContainer";
import TrackTransporterContainer from "./TrackTransporter/container/TrackTransporterContainer";

const scenes = Actions.create(
    <Scene key="root" hideNavBar>
        <Scene key="home" component={HomeContainer} title="home" initial />
        <Scene key="trackTransporter" component={TrackTransporterContainer} title="trackTransporter"/>
    </Scene>

);

export default scenes;