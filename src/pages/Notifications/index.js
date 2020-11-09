import React from 'react';
import SimpleCard from '../../components/SimpleCard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
    CardContent,
    Divider,
    Grid,
    Typography
} from "@material-ui/core";

import BackButton from '../../components/BackButton';
import { useHistory } from 'react-router-dom';

const Notifications = (props) => {
    let history = useHistory();
    let arr=[];
    arr.length = 5;
    arr.fill(null);
    return (
        <>
            <BackButton onClickEventHandler={()=>{history.goBack();}} />
            <Grid container direction="column" style={{ padding: '10px' }}>
                <Grid item>
                    <Typography gutterBottom variant="h5" component="h2">
                        Notification
                    </Typography>
                </Grid>
                <Grid item>
                    {
                        arr.map(()=>(
                            <React.Fragment>
                                <Grid style={{ marginBottom: '20px'}}>
                                    <SimpleCard 
                                        avatar = {
                                            <NotificationsIcon style={{color: "#ffc107" }} />
                                        }
                                        title={"Road Title or Place Name"}
                                        subheader={"22/07/2019"}
                                        cardContent = {
                                            <CardContent>
                                                <Divider />
                                            </CardContent>
                                        }
                                    />
                                </Grid>
                            </React.Fragment>
                        ))
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Notifications;
