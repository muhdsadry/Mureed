import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input } from 'native-base';
import * as firebase from 'firebase';

export default class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null
    };
  }

  setEmail = (value) =>{
      this.setState({ email: value });
  }

  setPassword = (value) =>{
      this.setState({ password: value});
  }
 
  signUp = () =>{
    try {
       if(this.state.email && this.state.password){
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => { 
                   console.log(user);
                   Alert.alert('Status','Sign Up Successful');
                   Actions.LoginScreen();
             })
            .catch(error => {
              Alert.alert('Status',error.toString(error));
            });
       } else {
          Alert.alert('Status','Invalid Email or Password!');
         }
        } catch (error) {
          Alert.alert({ errorMessage: error.message });
        }
   };

  render() {
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Sign Up</Text>
        <Form>
        <Item floatingLabel last>
              <Label>Email</Label>
              <Input
               autoCapitalize="none"
               autoCorrect={false} 
               onChangeText={this.setEmail} 
              />
        </Item>
        <Item floatingLabel last>
              <Label>Password</Label>
              <Input
               secureTextEntry={true}
               autoCapitalize="none"
               autoCorrect={false} 
               onChangeText={this.setPassword} 
              />
        </Item>
        </Form>

          <Button block last style={{marginTop: 50}} onPress={this.signUp}>
            <Text style={{fontWeight: "bold"}}>Save</Text>
          </Button>

        </Content>

        <Footer>
          <FooterTab>
          <Button vertical onPress={() => {Actions.LoginScreen();}}>
              <Icon name="log-in" />
              <Text>Sign In</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}