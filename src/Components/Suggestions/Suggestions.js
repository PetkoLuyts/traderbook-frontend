import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import "./Suggestions.css";
import imageSrc1 from '../../images/pp1.png'
import imageSrc2 from '../../images/pp2.png'
import imageSrc3 from '../../images/pp3.jpeg'

class Suggestions extends Component {   
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <div className="suggestions_container">
                <div className="suggestions_header">
                    <div>Suggestions For You</div>
                </div>
                <div className="suggestions_body">
                    <div className="suggestions_friends">
                        <Avatar src={imageSrc1} className="suggestions_image"/>
                        <div className="suggestions_username">test1</div>
                    </div>
                    <div className="suggestions_friends">
                        <Avatar src={imageSrc2} className="suggestions_image"/>
                        <div className="suggestions_username">test2</div>
                    </div>
                    <div className="suggestions_friends">
                        <Avatar src={imageSrc3} className="suggestions_image"/>
                        <div className="suggestions_username">test3</div>
                    </div>
                    <div className="suggestions_friends">
                        <Avatar src={imageSrc2} className="suggestions_image"/>
                        <div className="suggestions_username">test4</div>
                    </div>
                    <div className="suggestions_friends">
                        <Avatar src={imageSrc3} className="suggestions_image"/>
                        <div className="suggestions_username">test5</div>
                    </div>
                    <div className="suggestions_friends">
                        <Avatar src={imageSrc1} className="suggestions_image"/>
                        <div className="suggestions_username">test6</div>
                    </div>
                </div>
            </div>
        </div> );
    }
}
 
export default Suggestions;