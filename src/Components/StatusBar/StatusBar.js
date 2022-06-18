import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import "./StatusBar.css";
import statusimg from "C:/Users/petko.lyutskanov/Desktop/Traderbook/traderbook/src/images/pp1.png";
import uploadimage from "../../images/statusadd.png";
import { storage, auth } from "../firebase";
import 'firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            statusList: []
         }
    }
    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        // let data=[
        //     {
        //         "username":"test1",
        //         "imageURL":"https://darresne.com/img/female-avatar.png"
        //      },
        //      {
        //         "username":"test2",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //      },
        //      {
        //         "username":"test3",
        //         "imageURL":"https://www.w3schools.com/w3css/img_avatar3.png"
        //      },
        //      {
        //         "username":"test4",
        //         "imageURL":"https://darresne.com/img/female-avatar.png"
        //      },
        //      {
        //         "username":"test5",
        //         "imageURL":"https://www.w3schools.com/w3css/img_avatar3.png"
        //      },
        //      {
        //         "username":"test6",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGonDgYzVXUcaKSWbvyH_ICVD23aI4zlRMJQ&usqp=CAU"
        //      },
        //      {
        //         "username":"test7",
        //         "imageURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJYxr247w5ckIok4oLED58Lm7koT7pj4225A&usqp=CAU"
        //      },
        //      {
        //         "username":"test8",
        //         "imageURL":"../../images/pp1.png"
        //      }
        // ]

        fetch('http://localhost:8080/status')
            .then(response => response.json())
            .then(data => {
                this.setState({statusList: data});
        });
    }   

    uploadStatus =(event)=>{
        // let image=event.target.files[0];
        // const thisContext=this;
        // if(image == null || image == undefined)
        //     return;

        // var uploadTask = storage.ref("status").child(image.name).put(image);
        // uploadTask.on(
        //   "state_changed",
        //   function (snapshot) {
        //   },
        //   function (error) {
        //   },
        //   function () {
        //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        //         console.log(downloadURL);

        //         let payload = {
        //             "statusId": Math.floor(Math.random()*100000).toString(),
        //             "userId": JSON.parse(localStorage.getItem("users")).uid,
        //             "path": downloadURL,
        //             "timeStamp": new Date().getTime()
        //         }
    
        //         const requestOptions ={
        //             method: "POST",
        //             headers: { 'Content-Type': 'application/json' },
        //             body : JSON.stringify(payload),
        //         }
    
        //         fetch("http://localhost:8080/status",requestOptions)
        //         .then(response => response.json())
        //         .then(data => {
        //             thisContext.getData();
        //         })
        //         .catch(error =>{
    
        //         })
                
        //     })
        //     }
        // );
        let image = event.target.files[0];

        const thisContext = this;

        if (image == null || image == undefined)
            return;

        const storage = getStorage();
        const storageRef = ref(storage, `images/${image.name}`)
        console.log(image);
        uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');

            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);

                // uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                //     console.log(downloadURL);

                    let payload = {
                        "postId": Math.floor(Math.random() * 100000).toString(),
                        "userId": JSON.parse(localStorage.getItem("users")).uid,
                        "postPath": downloadURL,
                        "timeStamp": new Date().getTime(),
                        "likeCount": 0
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }

                    fetch("http://localhost:8080/status", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            thisContext.getPost();
                        })
                        .catch(error => {

                        })
                })

            });
    }

    render() { 
        return ( 
        <div>
            <div className="statusbar_container">
            <div className="fileupload">
                <label htmlFor="file-upload-status" >
                    <img className="statusbar_upload" src={uploadimage} width="55px" height="55px" />
                </label>
                    <input id="file-upload-status" onChange={this.uploadStatus} type="file"/>
            </div>
                {
                    this.state.statusList.map((item,index)=>(
                        <div className="status">
                            <Avatar className="statusbar_status" src={item.path} />
                            <div className="statusbar_text">{item.userName}</div>
                        </div>
                    ))
                }
            </div>
        </div>
         );
    }
}
 
export default StatusBar;