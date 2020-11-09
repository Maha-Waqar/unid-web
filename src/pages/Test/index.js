import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Map from '../../components/Map';
import './home.css';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../../components/Sidebar';


const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

class Home extends Component {
  constructor( props ){
		super( props );
		this.state = {
      left: false,
		}
  }

  toggleDrawer = (side, open) => event => {
    console.log("b4",this.state.left);
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, 'left': open });
    console.log("after",this.state.left);
  };


	render() {
    let left_from_Map=this.state.left;

		return(
      <div>
        <Map
          toggleDrawer = {this.toggleDrawer.bind(this)}
          google={this.props.google}
          center={{lat: 3.042247, lng: 101.799476}}
          height='100vh'
          width='100vw'
          zoom={15}
        />

        
        <div className="suggested-rides">
          <div className="title"><strong>Suggested Rides</strong></div>
          <div className="view-all"><p>View All  ˄</p></div>
          <div className="selected-car-types row">
            <div className="col-3">
              <img src="../../../profile_pic.png" alt="Avatar"/>
            </div>
            <div className="col-5 selected-car-name">
              <p><strong>Go Unid</strong></p>
            </div>
            <div className="col-4 selected-car-price">
              <div><p className="discounted-price">RM 18.00</p>
              <p className="original-price">RM 30.00</p></div>
            </div>
          </div>
          <div className="rides_options">
            <div className="row">
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Ride Type</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>  
                <p>Payment Methods</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>  
                <p>Ride Date</p>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Favourite Driver</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Promo Code</p>
              </div>
              <div className="col-4">
                <img src="../../../profile_pic.png" alt="Avatar"/>
                <p>Note</p>
              </div>
            </div>
          </div>
          <div className="book_button_space">
            <Button className='book_button' type="submit" size="lg" block>
              <div>Book Now</div>
            </Button>
          </div>
        </div> 
      
      </div>  
		);
	}
}

export default Home;
