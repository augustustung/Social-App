import React, { useState, useEffect, useContext } from 'react'
import { Platform, 
  Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from "react-native";
import {
  AddImage,
  CustomInput
} from "../styled/styledHome"
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { storage, db, auth } from '../../Constant/firebase'
import { AuthContext } from '../../Navigation/AuthProvider'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

export default PostScreen = ({ navigation }) => {
    const [userStt, setUserStt] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUpLoading] = useState(false)

    const { user, userData } = useContext(AuthContext)
  
    let styles = {
      fontSize: 20,
      height: 22,
      color: 'white',
    }

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
    
    const takePhoto = async () => {
      await Permissions.askAsync(Permissions.CAMERA)
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect:[3,4],
        quality: 1,
      })
  
      if(!result.cancelled) {
        setImage(result.uri)
      }
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
      })
  
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
  
      // console.log(result)
    }

    const upload = async () => {
      const imageUrl = await uploadImg()
      if(!userStt && !imageUrl)  return

      setUpLoading(true)

      db.collection('posts').add({
        fname: userData.fname,
        lastName: userData.lname,
        userImg: userData.userImg,
        userId: user.uid,
        post: userStt,
        postImg: imageUrl,
        postTime: Date.now(),
        likes: 0,
        comments: 0
      }).then(() => {
        Alert.alert("Successful!", "Your post has been uploaded!")
        setImage(null)
        setUserStt('')
        setUpLoading(false)
      }).catch(err => Alert.alert("Something went wrong!"))
    }

    const uploadImg = async () => {
      if(!image) return null

      let fileName = image.substring(image.lastIndexOf("/") + 1);
      const extension = fileName.split(".").pop(); //duoi file
      const name = fileName.split(".").slice(0,-1).join(".");
      fileName = name + Date.now() + "." + extension;
  
      let newImageUri
      try {
        const response = await fetch(image)
        const blob = await response.blob()
        await storage.ref().child(`${auth.currentUser.uid}/posts/${fileName}`).put(blob)

        var ref = storage.ref().child(`${auth.currentUser.uid}/posts/${fileName}`).put(blob)
        newImageUri = await ref.snapshot.ref.getDownloadURL()
        return newImageUri
      } catch(err) {
        console.log(err)
        return null
      }
    }
  
    return (
      <>
      <ScrollView style={{ flex: 1}} centerContent={true}>
        <KeyboardAvoidingView behavior={Platform.OS=="ios" ? 'padding': "height"} style={{justifyContent: 'center', alignItems: 'center'}}>
          <CustomInput 
            placeholder= "What's on your mind ?"
            value={userStt} 
            onChangeText={(text) => setUserStt(text)}
            autoCorrect={false}
            numberOfLines={3}
            
          />
          {image != null  && <AddImage source={{ uri: image }}/>}
        </KeyboardAvoidingView>
        {uploading && <ActivityIndicator style={{position: 'absolute', zIndex: 2, bottom: 10, alignSelf: 'center'}} size={100} color="#3485e4"/>}
      </ScrollView>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#3498db' title="Add Image" onPress={pickImage}>
            <Icon name="md-image" style={styles} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3415db' title="Take a photo" onPress={takePhoto}>
            <Icon name="md-camera" style={styles} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Upload" onPress={upload}>
            <Icon name="md-create" style={styles} />
          </ActionButton.Item>
        </ActionButton> 
      </>
    )
  }