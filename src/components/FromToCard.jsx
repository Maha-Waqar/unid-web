import React from 'react';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import PinDropIcon from '@material-ui/icons/PinDrop';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {
  Clear
} from "@material-ui/icons";
import {
  Grid,
  Avatar,
  Typography,
  Card,
  CardHeader,
  Divider,
  Box,
  Button,
  CardContent
} from '@material-ui/core'
import truncate from 'lodash/truncate';

export const History = ({
    date,
    time,
    cancelEventHandler,
    fromLocationName,
    toLocationName,
    cardHeader,
    editLocation,
    fromLabel,
    toLabel,
    footer,
    isCancel
}) => (
    <Card style={{ position: "relative", overflow: 'visible' }}>
        {
            cardHeader ?
                <CardHeader
                    avatar={
                        <Typography style={{color: "rgba(33, 37, 41, 0.61)" }} variant="subtitle2">
                            22 Jul,2019 2h 19m
                        </Typography>
                    }
                    action={
                        <Box >
                            <Button aria-label="settings" variant="contained" size="small" style={{borderRadius:"14px", backgroundColor: "red", color: "white"}}>
                                Cancel
                            </Button>
                        </Box>
                    }
                />
            :
                null
        }
        
        <CardContent style={{paddingBottom:0}}>
   
            <Grid container direction="row" justify="space-between" style={{height: '100%', marginLeft: '5px', marginBottom: '10px'}}>
                <Typography variant="subtitle1" style={{color: 'darkgrey'}}>
                        {date}  {time}
                </Typography>
            </Grid>
              
            <Grid direction="row" container justify="stretch"  style={{flexWrap: "inherit" }}>
              
                <Grid item>
                    <Grid direction="column" container>
                        <GpsFixedIcon style={{color:"#fb5516ed"}} />
                        <Grid direction="column" container>
                            <FiberManualRecordIcon style={{fontSize: "1.2rem", width:'24px', paddingBottom: '5px',paddingTop: '5px'}}/>
                            <FiberManualRecordIcon style={{fontSize: "1rem", opacity: 0.8, width:'24px', paddingBottom: '5px'}}/>
                            <FiberManualRecordIcon style={{fontSize: "0.8rem", opacity:0.6, width:'24px', paddingBottom: '5px'}}/>
                            <FiberManualRecordIcon style={{fontSize: "0.6rem", opacity: 0.4, width:'24px', paddingBottom: '5px'}}/>
                        </Grid>
                        <PinDropIcon style={{color:"#1fc71f"}} />
                    </Grid>
                </Grid>

                <Grid item style={{marginLeft: '10px'}}>
                    <Grid container direction="column" justify="space-between" style={{height: '100%', marginLeft: '5px'}}>
                        <Grid item onClick={editLocation && editLocation.bind(this,'pickup')} style={{ cursor: 'pointer' }}>
                            <Typography variant="subtitle2" style={{color: '#2125299c'}}>
                                From
                            </Typography>
                            <Typography color="subtitle2">
                                {
                                    (
                                        (fromLocationName || fromLabel) && 
                                        truncate((fromLocationName || fromLabel), {
                                            'length': 30,
                                            'separator': ',',
                                            'omission': ''
                                        })
                                    )
                                }
                            </Typography>
                        </Grid>

                        <Grid item onClick={editLocation && editLocation.bind(this,'dropoff')} style={{ cursor: 'pointer' }}>
                            <Typography variant="subtitle2" style={{color: '#2125299c'}}>
                                To
                            </Typography>
                            <Typography color="subtitle2">
                                {
                                     (
                                        (toLocationName || toLabel) && 
                                        truncate((toLocationName || toLabel), {
                                            'length': 30,
                                            'separator': ',',
                                            'omission': ''
                                        })
                                    )
                                }
                            </Typography>
                        </Grid>
                    </Grid>                
                </Grid>
            </Grid>

            {/* <Divider style={{marginTop: '5px' }}/> */}

            {
                <Grid container  style={{padding:'12px 0'}} justify="flex-end">
                    {
                        footer ?
                            footer
                        :
                            <Grid item >
                                RM<b>18.00</b>
                            </Grid>
                    }

                </Grid>
            }

            {
                isCancel && 
                <Avatar
                    style={{
                        position: "absolute",
                        top: "-13px",
                        right: "-1px",
                        backgroundColor: 'rgb(255,0,0,0.6)',
                        width: '25px',
                        height: '25px'
                    }}
                    onClick={cancelEventHandler}
                >
                    <Clear style={{ color: "white" }} />
                </Avatar> 
            }
        </CardContent>
    </Card>
)

export default History;