import React from 'react';
import {FlatList, ScrollView, View, Text, TextInput, Alert} from 'react-native';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  state = {
    data: [],
    text: '',
    name: '',
  }

  componentDidMount = () => {
    fetch('http://localhost:5000/').then(data => {
      this.setState({data: JSON.parse(data._bodyInit).reverse()})
    });
  }

  _keyExtractor = (item) => item._id;

  search = (text) => {
    fetch(`http://localhost:5000/?search=${this.state.text.toLowerCase()}`).then(data => {
      this.setState({data: JSON.parse(data._bodyInit).reverse()})
    });
  }

  render() {
    const paddingBottom= 0;
    return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.tintColor }}>
        <TabBarIcon
        name={'md-search'}
      />
      <View style={{flex: 4, marginLeft: 10}}>
        <TextInput
              style={{height: 26 + paddingBottom, borderBottomWidth: 1, borderColor: '#fff', paddingBottom, flex: 5, color: '#fff'}}
              placeholder={"content search..."}
              placeholderTextColor={'rgba(255,255,255,0.8)'}
              onChangeText={(text) => {
                if(text.length < 100) {
                  this.setState({text})}
                }
              }
              value={this.state.text}
              onSubmitEditing={(text) => this.search(text)}
            />
      </View>
    </View>
    <View style={{flex: 9}}>
      <ScrollView style={{flex: 8, borderTopColor: "rgba(100,100,100,0.1)", borderTopWidth: 5}}>
        <FlatList 
          ItemSeparatorComponent={() => (
           <View style={{flex: 1, borderRadius: 10, borderBottomColor: "rgba(100,100,100,0.1)", borderBottomWidth: 5}}/> 
          )}
          getItemLayout={(data, index) => (
            {length: 100, offset: 100 * index, index}
          )}
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          renderItem={({item}) => (
              <View style={{height: 100, flex: 1, borderRadius: 10, padding: 10, backgroundColor: item.truth==='TRUE' ? `rgba(0, 255, 0, ${(item.confidence - 0.50 ) * 2})` : `rgba(255, 0, 0, ${(item.confidence - 0.50 ) * 2})`}}>
                <View style={{height: 100, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}> 
                  <View style={{height: 70, width: Layout.window.width - 25}}>
                    <Text style={{fontStyle: 'italic', color: Colors.tintColor}}>{`${item.text.replace(/\n/g, '')}`}</Text>
                    <Text style={{color: Colors.tintColor}}>{`- ${item.name}`}</Text>
                  </View>
                  
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{flex: 2, color: Colors.tintColor}}>{`${item.truth}`} </Text>
                    <Text style={{flex: 1, color: Colors.tintColor }}>Confidence: {`${Number(item.confidence).toFixed(2) }`} </Text>
                  </View>
                </View>
              </View>
          )}
        />
      </ScrollView>
    </View>
  </View>);
  }
}
