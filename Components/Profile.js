import React from 'react'
import { View } from 'react-native'
import { auth } from '../Constant/firebase'
import {
    UserImg,
    UserName,
    UserHistory,
    UserButtonWrapper,
    ProfileButton,
    ButtonText,
    UserInfoItem,
    Number,
    Content,
    UserInfoWrapper
} from '../screen/styled/styledProfile'
const Profile = ({ 
    photoURL, 
    fname, 
    lname,
    uid, 
    editProfile, 
    enterChat, 
    ViewProfile, 
    logOut,
    length,
    history
}) => {

    return (
        <>
        <UserImg source={{uri: photoURL}}/>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <UserName>{fname}  </UserName>
                <UserName>{lname}</UserName>

        </View>
                <UserHistory>{history ? history : "..."}</UserHistory>

                <UserButtonWrapper>
                    <ProfileButton onPress={uid == auth.currentUser.uid ? editProfile : ViewProfile}>
                        <ButtonText>{uid == auth.currentUser.uid ? "Edit Profile" : "View Detail"}</ButtonText>
                    </ProfileButton>
                    <ProfileButton onPress={ uid == auth.currentUser.uid ? logOut : enterChat}>
                        <ButtonText>{uid == auth.currentUser.uid ? "Log Out" : "Message"}</ButtonText>
                    </ProfileButton>
                </UserButtonWrapper>

                <UserInfoWrapper>
                    <UserInfoItem>
                        <Number>{!length ? "0" : `${length}`}</Number>
                        <Content>Post</Content>
                    </UserInfoItem>
                    <UserInfoItem>
                        <Number>10,000</Number>
                        <Content>Followers</Content>
                    </UserInfoItem>
                    <UserInfoItem>
                        <Number>100</Number>
                        <Content>Following</Content>
                    </UserInfoItem>
                </UserInfoWrapper>
                </>
    )
}

export default Profile
