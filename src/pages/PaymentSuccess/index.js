import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const initRide = JSON.parse(localStorage.getItem('initialRide'));
    const history = useHistory();
    const location = useLocation();
    const resumeRide = location.state ? location.state.initRide : null;
    return (
        <>
            <div>Payment is Successfully Done</div>
            <button onClick={() => {
                history.push({
                    pathname: '/',
                    state: {initRide}
                })
            }}>ok</button>
        </>
    )
}

export default PaymentSuccess;