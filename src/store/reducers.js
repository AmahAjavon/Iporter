import { combineReducers } from 'redux';
import { HomeReducer as home } from '../routes/Home/module/home';
import { TrackTransporterReducer as trackTransporter } from "../routes/TrackTransporter/module/trackTransporter";


export const makeRootReducer = () => {
    return combineReducers({
        home,
        trackTransporter
    })
}

export default makeRootReducer;