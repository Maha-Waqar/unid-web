import React from 'react';
import { Grid, Button, Typography, Avatar } from '@material-ui/core';
import Rating from './common/RatingComponent';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {
    addFavourite,
    deleteFavourite
} from '../redux/favourites';

import {
    FavoriteBorder,
    Favorite
} from '@material-ui/icons';

const RatingCard  = ({data={}, ...props}) => {
    const history = useHistory();
    const [rating, setRating] = useState(0);
    const [addFav, setAddFav] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    return (
        <Grid style={{position: "relative"}} container justify="center" direction="column">
            <Grid item style={{position: 'absolute' , top: '-42px', left: '43%' }}>
                <Avatar
                    alt={data.driver_name}
                    src={ data.driver_photo} 
                />
            </Grid>
                    
            <Grid item>
                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid style={{marginRight: '20px', marginLeft: '20px'}}>
                        {data.driver_name}
                    </Grid>
                    {
                        !isSubmit &&
                        (
                            addFav
                            ?
                                <Favorite style={{color: '#efef0a'}} onClick={() => { setAddFav(!addFav); }} /> 
                            :
                                <FavoriteBorder style={{color: '#efef0a'}} onClick={() => { setAddFav(!addFav); }}/>
                        )
                    }
                </Grid>
            </Grid>
            {
                isSubmit ?
                    <Grid container direction="column">
                        <Grid>
                            <Typography variant="h6" style={{ textAlign : 'center'}}>
                                Thanks for the Rating
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" style={{ textAlign:'center'}}>
                                Wish you have a nice day!
                            </Typography>

                            <Typography variant="body1" style={{ textAlign:'center'}}>
                                We are happy to serve you again.
                            </Typography>
                            
                        </Grid>
                    </Grid> 
                :
                    <>
                        <Grid style={{textAlign: 'center'}}>
                            <Rating 
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </Grid>
                        <Grid>
                            <Button 
                                fullWidth
                                onClick={
                                    (e) => {
                                        if (addFav) {
                                            props.addFavourites(data.rider_id,data.driver_id);
                                        }
                                        setIsSubmit(true);                                       
                                    }
                                } 
                                variant="contained"
                                style={{ backgroundColor: "rgb(31, 199, 31)"}}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </>
            }
        </Grid>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addFavourites: (userId,driverId) => {
            dispatch(addFavourite({userId,driverId}));
        },
        deleteFavourite: (userId, driverId) => {
            dispatch(deleteFavourite({userId, driverId}))
        },
    }
}

const mapState = () => {
    return {}
};

export default connect(mapState,mapDispatchToProps)(RatingCard);
