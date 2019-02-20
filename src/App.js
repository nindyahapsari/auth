import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth'
import { Header, Button, LoadingBox, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class Apps extends Component {

    state={ loggedIn : null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDZ8PytEa8VdagnTOwTPTgw8qMo0U8Er4A",
            authDomain: "react-native-auth-18120.firebaseapp.com",
            databaseURL: "https://react-native-auth-18120.firebaseio.com",
            projectId: "react-native-auth-18120",
            storageBucket: "react-native-auth-18120.appspot.com",
            messagingSenderId: "271439147657"
          });

          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState({ loggedIn: true });
              } else {
                  this.setState({ loggedIn: false });
              }

          });
    }

    renderContent() {

        switch (this.state.loggedIn) {
            case true:
                return (<Card> 
                    <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                    </Button>
                    </CardSection>
                    </Card>
                    );
            case false:
                return <LoginForm/>
            default:
                return <LoadingBox size="large" /> 
        }


    
    }

    render () {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>

        );
    }
}

export default Apps;