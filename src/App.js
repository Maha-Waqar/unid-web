import React from "react";
//import './main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {
  Login,
  Notifications,
  CreditCard,
  // Register,
  Favourites,
  PreAuth,
  Home,
  HistoryRides,
  Register,
  AboutUs,
  PaymentFailure,
  PaymentSuccess,
} from './pages';

import Payment from './components/Payment';

import axios from 'axios';

import Test from './components/test';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import './utils/mobile';
import { connect } from 'react-redux';
import ResetPassword from './pages/ResetPassword';
import * as qs from 'query-string';
import PersonalInformation from "./pages/PersonalInformation";

function App(props) {
  return (
    <>
      <Router>
        <Switch>
          
          <Route path="/login" exact render={(routerProps) => {
            const parsed = qs.parse(routerProps.location.search);
            if(parsed.access_token) {
              return <Login id={"login"} />
            }
            if(props.appState.isUserLoggenIn) {
              return <Redirect path="/" />
            }
            return <Login id={"login"} />
          }}/>
            
         
          <Route path="/register" exact>
            {
              props.appState.isUserLoggenIn ?
                <Redirect path="/" />
              :
                <Register id={"register"} />
            }
          </Route>
          
          <Route
            path="/unid_corp/apis/wallet_verification"
            render={(routerProps) => {
              const parsed = qs.parse(routerProps.location.search);
              const usertoken = localStorage.getItem('userlogintoken');
              if (!usertoken) {
                routerProps.history.push('/login');
              }
              const initRide = JSON.parse(localStorage.getItem('initialRide'));

              if (parsed.preauth_id) {
                localStorage.setItem('initialRide',JSON.stringify({
                  ...initRide,
                  preauth_id:parsed.preauth_id, 
                }))
              }
              axios.get(`http://220.158.200.73/unid_corp/apis/save_ride_payments?preauth_id=${parsed.preauth_id}&ride_id=${initRide.id}&payment_type=WALLET`).then((saveRides) =>{
                axios.post(`http://220.158.200.73/unid_corp/apis/verify_token?token=${usertoken}`).then((response) => {
                  if(response.data.status !== "error") {
                    routerProps.history.push({
                      pathname: '/paymentsuccess',
                      state: {initRide}
                    });
                  }
                })
              })
              return (
                <div>
                  Wallet Transaction
                </div>
              )   
            }}
          />
          <Route path="/paymentsuccess" 
            exact
            render={() => {
              if(!props.appState.isUserLoggenIn) {
                return(
                  <Redirect to="/login" />
                )
              }
              return (
                <PaymentSuccess />
              )
            }} 
          />
          <Route path="/paymentFailure" 
            exact
            render={() => {
              if(!props.appState.isUserLoggenIn) {
                return(
                  <Redirect to="/login" />
                )
              }
              return (
                <PaymentFailure />
              )
            }} 
          />
          <Route path="/" render={(routerProps) => {
              if(!props.appState.isUserLoggenIn) {
                return(
                  <Redirect to="/login" />
                )
              }

              return (
                <Switch>
                  <Route exact path="/">
                    <Home id={"homepage"}/>
                  </Route>
                  <Route path="/test" exact>
                    <Test />
                  </Route>
                  <Route path="/credit-card" exact>
                    <CreditCard />
                  </Route>
                  <Route path="/payment" exact>
                    <Payment />
                  </Route>
                  
                  <Route path="/about-us" exact>
                    <AboutUs componentId={'about-us'} />
                  </Route>
                  <Route path="/history" exact>
                    <HistoryRides />
                  </Route>
                  <Route path="/notifications" exact>
                    <Notifications />
                  </Route>
                  <Route path="/favourites" exact>
                    <Favourites/>
                  </Route>
                  <Route path="/resetPassword" exact>
                    <ResetPassword />
                  </Route>
                  <Route path="/personalInformation" exact>
                    <PersonalInformation />
                  </Route>
                  
                  <Route
                    path="/unid_corp/apis/upp_verification"
                    render={(routerProps) => {
                      const parsed = qs.parse(routerProps.location.search);
                      const usertoken = localStorage.getItem('userlogintoken');
                      if(!usertoken) {
                        routerProps.history.push('/login');
                      }
                      const initRide = JSON.parse(localStorage.getItem('initialRide'));

                      if (parsed.preauth_id) {
                        localStorage.setItem('initialRide',JSON.stringify({
                          ...initRide,
                          preauth_id:parsed.preauth_id, 
                        }))
                      }
                      axios.get(`http://220.158.200.73/unid_corp/apis/save_ride_payments?preauth_id=${parsed.preauth_id}&ride_id=${initRide.id}&payment_type=UPP`).then(() => {
                        axios.post(`http://220.158.200.73/unid_corp/apis/verify_token?token=${usertoken}`).then((res) => {
                          if (res.data.status !== "error") {
                            routerProps.history.push({
                              pathname: '/',
                              state: {initRide}
                            });
                          }
                        }).catch((error) => {
                        })
                      });
                      return (
                        <div>
                          UPP Transaction
                        </div>
                      )
                    }}
                  />
                </Switch>
              )
            }}
          />
          
         
        </Switch>
    </Router>
    </>
  );
}

const mapStateToProps = (state,ownprops) => (
  {
    ...state
  }
);

const mapDispatchProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchProps)(App);
