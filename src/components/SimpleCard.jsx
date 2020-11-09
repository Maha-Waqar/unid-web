import React from 'react';
import {
    Card,
    CardHeader,
    Avatar
} from '@material-ui/core';

const SimpleCard = (props) => {
    return (
        <Card>
            <CardHeader
                classes={{
                    root: 'sample-card-root'
                }}
                avatar={ 
                    props.avatar 
                    ? 
                        props.avatar 
                    :
                        <Avatar aria-label="recipe">
                        R
                        </Avatar>
                }                
                title={props.title}
                subheader={props.subheader}
            />
            {
                props.cardContent
            }
        </Card>
    );
}

export default SimpleCard;

