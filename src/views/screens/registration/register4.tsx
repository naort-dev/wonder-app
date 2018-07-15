import _ from 'lodash';
import React from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, PrimaryButton, TextArea, TextInput, WonderPicker } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';
import Screen from '../../components/screen';
import Theme from '../../../assets/styles/theme';
import Topic from '../../../types/topic';

interface Props {
  navigation: any;
  topics: Topic[];
}

interface State {
  search: string;
  selected: Topic[];
}

const testTopics: Topic[] = [
  { name: 'Hiking', keywords: ['mountain', 'active'] },
  { name: 'Biking', keywords: ['bike', 'active'] },
  { name: 'Running', keywords: ['active', 'run'] },
  { name: 'Drinks', keywords: ['active', 'alcohol', 'beer', 'wine', 'booze'] },
  { name: 'Tennis', keywords: ['active'] },
  { name: 'Beach', keywords: ['active'] },
  { name: 'Dog', keywords: [] },
  { name: 'Cat', keywords: [] },
  { name: 'Bird', keywords: [] },
  { name: 'Sleeping', keywords: [] },
  { name: 'Talking', keywords: [] },
  { name: 'Dancing', keywords: [] },
]
export default class Register4 extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'PICK WONDERS',
    ...Theme.NavBar.transparent
  }

  static defaultProps = {
    topics: testTopics
  }

  state = {
    search: '',
    selected: []
  }

  onSearchTextChange = (text: string) => {
    this.setState({ search: text.toLowerCase() });
  }

  onChangeSelected = (selected: Topic[]) => {
    this.setState({ selected });
  }

  filterTopics = () => {
    const { search } = this.state;
    const { topics } = this.props;
    if (search) {
      return topics.filter((topic: Topic) => {
        const isInName = topic.name.toLowerCase().indexOf(search) >= 0;
        const isInKeywords = topic.keywords.indexOf(search) >= 0;

        return isInName || isInKeywords;
      });

    }
    return topics;
  }

  renderPicker = () => {
    const filteredTopics = this.filterTopics();
    if (filteredTopics.length) {
      return (
        <WonderPicker
          contentContainerStyle={{ paddingBottom: 60 }}
          topics={_.sortBy(filteredTopics, ['name'])}
          limit={3}
          onChangeSelected={this.onChangeSelected}
        />
      )
    }
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>Sorry! Looks like we do not have a wonder that matches what you are looking for.</Text>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { selected } = this.state;
    return (
      <Screen horizontalPadding={20}>
        <View style={{ paddingVertical: 15 }}>
          <Text style={{ textAlign: 'center' }}> Please select 3 Wonders for us to find people and activities in your area.</Text>
        </View>
        <View style={{ paddingVertical: 15 }}>
          <TextInput
            autoComplete={false}
            autoCapitalize="none"
            icon="search"
            placeholder="Search"
            onChangeText={this.onSearchTextChange}
          />
        </View>
        <View flex={1}>
          {this.renderPicker()}
          <View style={{ position: 'absolute', bottom: 10, width: '100%', zIndex: 10 }}>
            <PrimaryButton
              disabled={selected.length !== 3}
              title="Finish"
              onPress={() => navigation.navigate('Main')}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});