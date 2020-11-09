import React, {useEffect} from 'react';
import {
    Tab,
    Tabs,
    Paper,
    Grid,
    Typography,
    Divider
} from '@material-ui/core';
import PinDropIcon from '@material-ui/icons/PinDrop';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';

import SimpleCard from '../../components/SimpleCard';
import BackButton from '../../components/BackButton';
import './favourites.css';
import { connect } from 'react-redux';
import {
    actionsTypes,
    getFavouriteDrivers
} from '../../redux/favourites';

const PlacesList = () => {
    const data = [];
    data.length = 4;
    data.fill(null);
    return data.map(() => (
        <>
            <SimpleCard 
                avatar ={<PinDropIcon style={{color: "#2cca2c" }} />}
                title={'Road title or Place'}
                subheader={'92, Jalan 25/16, Taman Sri Muda, Selangor'}
                cardContent={<Divider/>}
            />
        </>
    ))
}

const DriversList = (props) => (
    props.favouriteDrivers.data.length ?
    <Grid container direction="column">
        {
            [1,2,3,4].map((data)=>(
                <Grid item>
                    <Grid container style={{marginBottom: '20px', alignItems: 'center' }}>
                        <Grid item style={{marginRight: '10px'}}>
                            <Avatar alt="Gal Gadot" />
                        </Grid>
                        <Grid item>
                        <Typography variant="title"  gutterBottom>
                            Driver Name
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            ))
        }
    </Grid>
    :
    <Grid>No favouriteDrivers Found</Grid>
);

const Favourties = (props) => {
  let history = useHistory();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    props.fetchFavouriteDrivers();
  },[]);

    return (
        <>
            <BackButton onClickEventHandler={()=>{ history.goBack();}}/>
            <Grid container direction="column" style={{ padding: '10px'}}>
                <Paper square >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <Tab label="Place" />
                    <Tab label="Driver" />
                    
                </Tabs>
                {
                    value === 0 ?
                    <PlacesList />
                    :
                    <DriversList {...props} />                
                }
            </Paper>
            </Grid>
            
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {
        GET_FAVOURITE_DRIVER
    } = actionsTypes(ownProps.componentId)
    return ({
        fetchFavouriteDrivers : () => {
            dispatch(getFavouriteDrivers(ownProps.componentId))
        }
    })   
}

export default connect(mapStateToProps,mapDispatchToProps)(Favourties);

