import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { removeStudent } from '../services/DataService';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, List } from 'native-base';
import { db } from '../config/db';
import StudentList from '../components/StudentList';
import * as firebase from 'firebase';

let studentsRef = db.ref('/students');

export default class ListScreen extends Component {
  constructor(){
    super();
    this.state = {
    students: []
    }
  }

  componentDidMount() {
    studentsRef.on('value', (snapshot) => {
        let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({students: firebaseData});
            console.log(this.state.students);
          }
     });
  }

  deleteConfirmation = (matricno) => {
    Alert.alert(
      'Status', 
      'Are you sure you want to delete this student?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => removeStudent(matricno)}
      ],
      { cancelable: false }
      );
  }

  goToNewScreen = () => {
    Actions.NewScreen();
  }

  goToLoginScreen = () => {
    firebase
        .auth()
        .signOut()
        .then(function() {
          Actions.LoginScreen();
         })
        .catch(function(error) {
          Alert.alert('Status', error.toString(error));
        });
  }

  render() {
    return (
      <Container>
        
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Student List</Text>
        <List vertical={true}>
        <StudentList students={this.state.students} onPress={(matricno) => {Actions.ViewScreen({matricno: matricno});}} onLongPress={(matricno) => {this.deleteConfirmation(matricno)}} />
        </List>
        <Text>{this.props.matricno}</Text>
        </Content>
  
        <Footer>
          <FooterTab>
            <Button vertical onPress={this.goToNewScreen}>
              <Icon name="contact" />
              <Text>New Student</Text>
            </Button>
            <Button vertical onPress={this.goToLoginScreen}>
              <Icon name="log-out" />
              <Text>Sign Out</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}