import React, { useEffect } from 'react';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import PinDropIcon from '@material-ui/icons/PinDrop';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
    fetchRidesList
} from '../../redux/RidesList';

import {
    Grid,
    Typography,
    Card,
    CardHeader,
    Divider,
    Box,
    CardMedia,
    Button,
    CardContent
} from '@material-ui/core'

import {
    History
} from '../../components/FromToCard';
import BackButton from '../../components/BackButton';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

const HistoryList = (props) => {
    useEffect(() => {
        props.fetchRideHistory();
    },[]);
    const rideList = (props.rideHistory && props.rideHistory.data) || [];
    let history = useHistory();
    return (
        <Grid style={{marginTop: '40px'}}>
            <BackButton onClickEventHandler={()=>{ history.goBack(); }}/>
            <Grid container direction="column" alignItems="center">
                {
                    rideList.map((data) => (
                        <Grid style={{width: "calc(100% - 20px)", marginBottom: '20px', margin: 'inherit auto'}}>
                            <History 
                                date = {data.riding_date}
                                time = {data.riding_time}
                                fromLabel={data.pickup_location}
                                toLabel={data.drop_location}
                                footer= {
                                    <Grid item>
                                        RM <b> {data.total_fair} </b>
                                    </Grid>
                                }
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}


const mapStateToProps = (state,ownProps) => {
    return {
        ...state,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchRideHistory: () => {
            dispatch(fetchRidesList())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HistoryList);

