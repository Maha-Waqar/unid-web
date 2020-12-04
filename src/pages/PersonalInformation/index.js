import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Avatar, Divider } from '@material-ui/core';
import {connect} from 'react-redux';
import BackButton from '../../components/BackButton';

const fields = [
    {
        label: 'User Mobile',
        name: 'rider_phone'
    },
    {
        label: 'User Email',
        name: 'rider_email'
    },
    // {
    //     label: 'Rewards Points',
    //     name: 'reward_point'
    // },
    {
        label: 'ReferralCode',
        name:'referral_id'
    },
    // {
    //     label: 'Password',
    //     name: 'password'
    // }
]
const PersonalInformation = (props) => {
    let history = useHistory();
    let appState = props.appState || {};
    const userData = appState.userData || {};
    return (
        <>
            <BackButton onClickEventHandler={()=> { history.goBack()}}/>
            <Grid container style={{padding: '10px'}}>
                <Grid item>
                    <Typography variant="h4" style={{marginBottom: '20px'}}>
                        Personal Information
                    </Typography>
                </Grid>

                <Grid item container  style={{ marginBottom: '30px'}}>
                    <Grid item style={{ marginRight: '10px'}}>
                        <Avatar src={userData.image}/>
                    </Grid>
                    <Grid item> 
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="subtitle1"> 
                                    <b>
                                       {userData.rider_name}
                                    </b>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1"> 
                                User ID: {userData.id}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {
                    fields.map((data)=> (
                        <>
                            <Grid container justify="space-between" style={{padding: '10px'}}>
                                <Grid item>
                                    {data.label}
                                </Grid>
                                <Grid item>
                                    {userData[data.name]}
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider/>
                            </Grid>
                        </>
                    ))
                }
            </Grid>
        </>
    )
}

const mapStateToprops = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps= () => ({});

export default connect(mapStateToprops, mapDispatchToProps)(PersonalInformation);
