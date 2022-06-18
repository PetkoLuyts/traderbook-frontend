import React, {Component} from "react";
import './LoginPage.css';
import Grid from '@mui/material/Grid';
import trading212_image from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/Trading212App.png';
import traderbook_logo from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/Traderbooklogo.png';
import fb from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/fb.png';
import appstore from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/app.png';
import playstore from 'C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/play.png';
import SignIN from "../SignIn/SignIN";
import SignUP from "../SignUp/SignUP";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iSLogin: true
        }
    }

    changeLogin = () => {
        if(this.state.iSLogin)
            this.setState({iSLogin: false});
        else 
            this.setState({iSLogin: true});
    }

    render() { 
        return ( 
            <div>
                <Grid container>
                    <Grid item xs = {3}>                
                    </Grid>
                    <Grid item xs = {6}>
                        <div className = "loginpage_main">
                            <div>
                                <img className = " trading212_image" src = {trading212_image} width = "454px" />
                            </div>
                            <div>
                                <div className = "loginpage_rightcomponent">
                                    <img className = "loginpage_logo" src = {traderbook_logo} />
                                    <div className = "loginPage_signing">

                                        {
                                            this.state.iSLogin ? <SignIN/> : <SignUP/>
                                        }

                                        <div className = "login_ordiv">
                                            <div className = "login_dividor"></div>
                                            <div className = "login_or">OR</div>
                                            <div className = "login_dividor"></div>
                                        </div>

                                        <div className = "login_fb">
                                            <img src = {fb} width = "15px" /> Log in with Facebook
                                        </div>
                                        <div className = "login_forgotten">Forgot password?</div>
                                    </div>
                                </div>

                                <div className = "loginpage_signupoption">
                                    {
                                        this.state.iSLogin ?
                                        <div className = "loginpage_signin">
                                            Don't have an account? <span onClick = {this.changeLogin} style = {{"fontWeight":"bold", "color":"#0395F6"}}>Sign up</span>
                                        </div> :
                                        <div className = "loginPage_signup">
                                            Have an account? <span onClick = {this.changeLogin} style = {{"fontWeight":"bold", "color":"#0395F6"}}>Sign in</span>
                                        </div>
                                    }          
                                </div>

                                <div className = "loginpage_downloadsection">
                                    <div>
                                        Get the app.
                                    </div>
                                    <div className = "loginpage_option">
                                        <a href = "https://apps.apple.com/bg/app/trading-212/id566325832"> <img className = "loginPage_dwimg" src = {appstore} width = "136px"/></a>
                                        <a href = "https://play.google.com/store/apps/details?id=com.avuscapital.trading212&hl=en&gl=US"><img className = "loginPage_dwimg" src = {playstore} width = "136px"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs = {3}>        
                    </Grid>
                </Grid>
            </div>
         );
    }
}

export default LoginPage;