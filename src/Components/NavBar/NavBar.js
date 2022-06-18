import React, { Component } from 'react';
import "./NavBar.css";
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import traderbook_logo from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/Traderbooklogo.png';
import home from "C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/home.svg"
import message from "C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/message.svg";
import find from "C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/find.svg";
import react from "C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/love.svg";
import profile_pick from "C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/pp1.png";
import { getAuth, signOut } from "firebase/auth";
import LoginPage from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/Components/LoginPage/LoginPage.js';
import SignIN from '../SignIn/SignIN';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }

    logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.removeItem("users");
            window.location.reload();
            
        // Sign-out successful.
        
        }).catch((error) => {
        // An error happened.
        });
    }

    render() { 
        return ( 
            <div>
                <div className = "navbar_barContent">
                    <Grid container>
                        <Grid item xs = {2}>              
                        </Grid>
                        <Grid item xs = {3}>
                            <img className = "navbar_logo" src = {traderbook_logo} width = "140px"/>
                        </Grid>
                        <Grid item xs = {3}>
                            <input text = "text" className = "navbar_searchBar" placeholder = 'Search' />
                        </Grid>
                        <Grid item xs = {4} style = {{"display":"flex"}}>
                            <img className = "navbar_img" src = {home} width = "25px"/>
                            <img className = "navbar_img" src = {message} width = "25px"/>
                            <img className = "navbar_img" src = {find} width = "25px"/>
                            <img className = "navbar_img" src = {react} width = "25px"/>
                            <Avatar className = "navbar_img" src = {profile_pick} style = {{"maxWidth":"25px","maxHeight":"25px"}}/>
                            <div>
                                <button className="logout_button" onClick={this.logOut} >Log Out</button>
                            </div>
                        </Grid>
                        <Grid item xs = {1}></Grid>
                    </Grid>
                </div>
            </div>
         );
    }
}
 
export default NavBar;