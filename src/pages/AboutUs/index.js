import React from 'react';
import BackButton from '../../components/BackButton';
import { Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CompanyLogo from '../../public/companyicon.png';

const AboutUs = () => {
    let history = useHistory();
    return(
        <>
            <BackButton onClickEventHandler={()=>{ history.goBack();}}/>
            <Grid container direction="column" style={{ padding: '10px'}}>
            <Grid item>
                <Typography variant="h4">
                    About Unid
                </Typography>
            </Grid>

            <Grid item style={{marginTop: '31px', marginBottom: '31px'}}>
                <img src={CompanyLogo} />
            </Grid>

            <Grid item>
                <Typography variant="body1">
                    This app is protected by copyright law and international treaties.Unauthorized reproduction or distribution of this app, or any portion of it , may result in severe criminal and 
                    civil penalties and will be prosecuted to the maximum extent possible under the law.
                </Typography>
            </Grid>

            <Grid item style={{textDecoration: 'underline', marginTop: '14px', marginBottom: '14px'}}>
                    <b>Terms And Condition </b>
            </Grid>

            <Grid item>
                If you have any questions please contact us<br/>
                email: <b>customerservice@unid.com.my</b> <br/>
                contact: <b>1300 800 222</b>
            </Grid>   
        </Grid>
        </>
    )
}

export default AboutUs;
