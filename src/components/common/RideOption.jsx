import React from 'react';
import {
    Grid, 
    Avatar,
    Typography
} from '@material-ui/core'
import {
    LocalTaxi
} from '@material-ui/icons';
const RideOption = (props) => {
    return (
        <>
        <Grid container onClick={props.onClickEvent} alignItems="center"
            style={{marginBottom:'-20px'}}
        >

            <Grid item >
                <Avatar src={props.image}/>
            </Grid>

            <Grid item style={{ flexGrow: 8, marginLeft: '10px' }}>
                <Typography>
                    {props.carType}
                </Typography>
            </Grid>

            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Typography>
                            {props.lowCost && `RM${props.lowCost}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography under>
                            {props.totalCost && `RM${props.totalCost}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
            <Grid container alignItems="center">
                <Grid item  style={{visibility: 'hidden'}}>
                    <Avatar src={props.image}/>
                </Grid>
                <Grid item style={{marginLeft: '10px'}}>
                    Seats : {props.seatNumber}
                </Grid>

            </Grid>
        </>
    );
}

export default RideOption;

