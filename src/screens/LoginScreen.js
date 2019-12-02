import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input } from 'native-base';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {
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

  getLogin = () => {
    try {
     if(this.state.email && this.state.password){
      firebase
         .auth()
         .signInWithEmailAndPassword(this.state.email, this.state.password)
         .then(() => {
             Actions.ListScreen();
          })
         .catch(error => {
           Alert.alert('Status', error.toString(error));
          });
     } else {
       Alert.alert('Status','Invalid Email & Password!');
     }
      } catch (error) {
        console.log(error.toString(error));
    }
  };

  render() {
    return (
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Sign In</Text>
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

          <Button block last style={{marginTop: 50}} onPress={this.getLogin}>
            <Text style={{fontWeight: "bold"}}>Sign In</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
          <Button vertical onPress={() => {Actions.SignupScreen();}}>
              <Icon name="person-add" />
              <Text>Sign Up</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}