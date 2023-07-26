import React, { useEffect } from 'react';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
import { data } from 'autoprefixer';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

function VideoCall() {

    const { roomId } = useParams();
    // useEffect(()=>{
    //   const getroom = () =>{
    //     axios.post('http://localhost:8000/api/booking/room')
    //   }
    //   getroom();
    // },[])

    console.log(roomId);

    const Mymeeting = async (element) =>{
        const appId = 1564392226
        const secretserver = '3787d01e3afbc3d6ed1ae661fb992e14'
        const userID = Math.floor(Math.random() * 10000) + "";
        const userName = "userName" + userID;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId,secretserver,roomId,userID,userName)

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            scenario: {
                mode:  ZegoUIKitPrebuilt.OneONoneCall
            },
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 2,
            layout: "Auto",
            showLayoutButton: false,
            
        });
    }

  return <div id="root">
    <div ref={Mymeeting}></div>
  </div>;
}

export default VideoCall;
