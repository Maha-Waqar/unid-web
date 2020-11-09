import React from 'react';
import axios from 'axios';
import {useLocation, useHistory} from 'react-router-dom';

const PaymentFailure = () => {
    const history = useHistory();
    return (
        <>
            <div>Payment is Failure</div>
            <button onClick={() => {history.push('/')}}>cancel</button>
        </>
    )
}

export default PaymentFailure;