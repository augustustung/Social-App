import React, { useState, useContext } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native'
import FormInput from '../../Components/FormInput'
import SocialButton from '../../Components/SocialButton'
import FormButton from '../../Components/FormButton'
import { AuthContext } from '../../Navigation/AuthProvider'

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const {login} = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <View style={styles.logo}/>

            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <FormInput
                    labelVal={email}
                    onChangeText={userEmail => setEmail(userEmail)}
                    placeholder='Email'
                    iconName='user'
                    keyBoardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormInput 
                    labelVal={pass}
                    onChangeText={userPass => setPass(userPass)}
                    placeholder='Password'
                    iconName='lock'
                    secureTextEntry={true}
                />
            </KeyboardAvoidingView>
            
            <FormButton 
                buttonTitle="Sign In"
                onPress={() => {
                    if(email == '' || pass == '') return null
                    login(email, pass)
                }}
            />

            <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.navButtonText}>Forgot Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>Don't have an account? Create One!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafd',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover'
    },
    text: {
        // fontFamily
        fontSize: 28,
        fontWeight: '500',
        color: '#2e64e5'
    },
    navButton: {
        marginTop: 15
    },
    forgotButton: {
        marginVertical: 35
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        // fontFamily
    },

})