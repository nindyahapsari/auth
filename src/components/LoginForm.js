import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, LoadingBox } from './common';
import firebase from '@firebase/app';
import '@firebase/auth'


class LoginForm extends Component {

    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {

        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
                console.log("Error", error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this))
        });
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <LoadingBox size="small" />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </Button>
        );
    }

    render () {
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="user@youremail.com"
                        label="Email:"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        />
                </CardSection>
                    
                <CardSection>
                <Input 
                        secureTextEntry
                        placeholder="Password"
                        label="Password:"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        />
                </CardSection>

                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorText : {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'

    }
};

export default LoginForm;