// import moment from 'moment';
import moment from 'moment-timezone' 
export function isActiveRide(ride) {
    if(moment.tz.guess() === "Asia/Calcutta")
        return moment().diff(moment(ride.created_at).subtract(150, 'minutes'), 'minutes') < 5

    return moment().diff(moment(ride.created_at), 'minutes') < 5
}

