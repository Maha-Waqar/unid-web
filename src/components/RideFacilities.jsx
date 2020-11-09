import React,{ useState } from 'react';
import {
    Grid
} from '@material-ui/core';
import {
    AirlineSeatReclineNormal,
    Payment,
    Today,
    Comment,
    ClosedCaption,
    LocalTaxi
} from '@material-ui/icons';

const IconMap = {
    rideType: LocalTaxi,
    paymentMethods: Payment,
    rideDate: Today,
    favouriteDriver: AirlineSeatReclineNormal,
    promoCode: ClosedCaption,
    notes: Comment
}

const detailsList =  {
    fields: [
        {
            name:'rideType',
            label: 'Ride Type',
        },
        // {
        //     name:'paymentMethods',
        //     label: 'Payment Methods',
        // },
        {
            name:'rideDate',
            label: 'Ride Date',
        },
        {
            name:'favouriteDriver',
            label: 'Favourite Driver',
            value: ''
        },
        {
            name:'promoCode',
            label: 'Promocode',
        },
        {
            name:'notes',
            label: 'Notes',
        },
    ]
}
const renderIcon = (name) => {
    const Icon = IconMap[name]
    return <Icon />
}
function RideFacilities (props) {
    return (
        <Grid container style={{flexWrap: "wrap", marginTop: '15px' }}>
            {
               detailsList.fields.map(({name, label}) => (
                    <Grid item style={{marginBottom: '5px', marginRight: '3px', display: 'inline-flex', width: '47%'}}
                        onClick={()=>{props.setActiveRideFacility(name)}}
                    >
                        <Grid style={{marginRight: '4px' }}>{renderIcon(name)}</Grid>
                        <Grid style={{fontSize: 'small'}}>{label}</Grid>
                    </Grid>
               ))
           }
        </Grid>
    )
}

export default RideFacilities;

