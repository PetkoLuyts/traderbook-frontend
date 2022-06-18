import React, { Component } from 'react';
import "./MainPage.css";
import Post from '../Post/Post';
import uploadImage from "../../images/upload.png";
import { storage, auth } from "../firebase";
import 'firebase/storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postArray: [],
            progressBar: "",
        }
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => { //API
        const thisContext = this;
        // let data=[
        //     {
        //         "postId":"123456",
        //         "userName":"petko",
        //         "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp":"12345",
        //         "likes":"1234"
        //     },
        //     {
        //         "postId":"123456",
        //         "userName":"petko1",
        //         "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp":"12345",
        //         "likes":"1234"
        //     },
        //     {
        //         "postId":"123456",
        //         "userName":"petko2",
        //         "postImageURL":"https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp":"12345",
        //         "likes":"1234"
        //     }
        // ];

        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
                thisContext.setState({ postArray: data });
            });
    }

    upload = (event) => {
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

                    fetch("http://localhost:8080/post", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            thisContext.getPost();
                        })
                        .catch(error => {

                        })
                })

            });
          };    

        // uploadTask.on('state_changed',
        //     (snapshot) => {
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         switch (snapshot.state) {  
        //             case 'paused':
        //                 console.log('Upload is paused');
        //                 break;
        //             case 'running':
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },
        //     (error) => {

        //     },
        //     () => {
                
        //     }
        // );
        // let image=event.target.files[0];

        // const thisContext=this;

        // if(image == null || image == undefined)
        //     return;

        // var uploadTask = storage.ref("images").child(image.name).put(image);

        // uploadTask.on(
        //   "state_changed",
        //   function (snapshot) {
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     thisContext.setState({progressBar: progress});
        //   },
        //   function (error) {
        //   },
        //   function () {
        //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        //         console.log(downloadURL);

        //         let payload = {
        //             "postId": Math.floor(Math.random()*100000).toString(),
        //             "userId": JSON.parse(localStorage.getItem("users")).uid,
        //             "postPath": downloadURL,
        //             "timeStamp": new Date().getTime(),
        //             "likeCount": 0
        //         }

        //         const requestOptions ={
        //             method: "POST",
        //             headers: { 'Content-Type': 'application/json' },
        //             body : JSON.stringify(payload),
        //         }

        //         fetch("http://localhost:8080/post",requestOptions)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             thisContext.getPost();
        //         })
        //         .catch(error =>{

        //         })

        //     })
        //     }
        // );
     

    render() {
        return (
            <div>
                <div className="mainpage_container">
                    <div className="mainpage_divider"></div>
                    <div className="fileupload">
                        <label htmlFor="file-upload" >
                            <img className="mainpage_uploadicon" src={uploadImage} />
                        </label>
                        <input onChange={this.upload} id="file-upload" type="file" />
                    </div>
                    <div className="mainpage_divider"></div>
                </div>
                <div className="upload_text">{this.state.progressBar}</div>
                {
                    this.state.postArray.map((item, index) => (
                        <Post id={item.postId} userName={item.userName} postImage={item.postPath} likes={item.likeCount} />
                    ))
                }
            </div>
        );
    }
}

export default MainPage;