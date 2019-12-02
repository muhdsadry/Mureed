import React, { Component } from 'react';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class StudentList extends Component {

  static propTypes = {
      students: PropTypes.array.isRequired
  };

   onPress = (matricno) => {
    this.props.onPress(matricno);
  }

  onLongPress = (matricno) => {
    this.props.onLongPress(matricno);
  }

  render() {
    return(
      this.props.students.map((data, index) => {
        return(
          <ListItem key={index} onPress={() => this.onPress(data.matricno)} onLongPress={() => this.onLongPress(data.matricno)}>
          <Left>
          <Text>{data.name}</Text>
          </Left>
          <Right>
          <Icon name="arrow-forward" />
          </Right>
          </ListItem>
        )
      })
    )
  }
}