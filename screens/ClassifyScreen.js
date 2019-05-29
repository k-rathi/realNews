import React from 'react';
import { KeyboardAvoidingView, ScrollView, Button, StyleSheet, TextInput, Text, View } from 'react-native';
import Colors from '../constants/Colors';

export default class ClassifyScreen extends React.Component {
  static navigationOptions = {
    title: 'Classify a Statement',
  };
  constructor(props) {
    super(props);
    this.state = { text: '', height: 26, name: '', result: undefined };
  }

  classifyText = ( ) => {
    let form = new FormData();
    form.append("text", this.state.text);
    form.append("name", this.state.name);
    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: form
    }).then(data => {
      this.setState({result: JSON.parse(data._bodyInit), text: '', name: ''})
    });
  }

  contentChange = ({nativeEvent: {contentSize: {width, height}}}) => {
    this.setState({height});
  }
  render() {
    const paddingBottom = 5;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
        <View style={{flex: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
          <Text style={{flex: 2, color: Colors.tintColor, marginBottom: 20}}>
              { `${this.state.text.length > 0 ? `"${this.state.text}"`: ''} ${this.state.name.length > 0 ? `- ${this.state.name}` : ''}`}
          </Text>
        </View>
        <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', alignItems: 'center',  justifyContent: 'space-between', backgroundColor: Colors.tintColor, padding: 20, borderRadius: 10}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 1, color: Colors.errorText}}>Text: </Text> 
            <TextInput
              style={{height: this.state.height + paddingBottom, borderBottomWidth: 1, borderColor: '#fff', flex: 5, paddingBottom, color: '#fff'}}
              placeholder={"250 characters or less..."}
              placeholderTextColor={'rgba(255,255,255,0.8)'}
              onContentSizeChange={this.contentChange}
              onChangeText={(text) => {
                if(text.length < 250) {
                  this.setState({text})}
                }
              }
              value={this.state.text}
              multiline
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10, }}>

            <Text style={{flex: 2, color: Colors.errorText}}>Speaker: </Text> 
            <TextInput
              style={{height: this.state.height + paddingBottom, borderBottomWidth: 1, borderColor: '#fff', flex: 5, paddingBottom, color: '#fff'}}
              placeholder={"Anonymous"}
              placeholderTextColor={'rgba(255,255,255,0.8)'}
              onContentSizeChange={this.contentChange}
              onChangeText={(name) => {
                if(name.length < 100) {
                  this.setState({name})}
                }
              }
              value={this.state.name}
            />
          </View>
          <View style={{flex: 1, marginTop: 20, backgroundColor: '#fff'}}>
            <Button color={Colors.tintColor} title={"Submit"} onPress={this.classifyText} />
          </View>
        </KeyboardAvoidingView>
        <View style={{marginTop: 20}}>
          <Text style={{ flex: 1, color: Colors.tintColor, fontStyle: 'italic'}}> { this.state.result !== undefined ? `${this.state.result.text} - ${this.state.result.name}` : ''} </Text>
          <Text style={{ flex: 1, color: Colors.tintColor}}> { this.state.result !== undefined ? `Classified as: ${this.state.result.truth} with a confidence of ${Number(this.state.result.confidence).toFixed(2)}` : ''} </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    marginHorizontal: 20, 
    backgroundColor: Colors.errorText,
  },
});
