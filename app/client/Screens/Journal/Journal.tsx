import React, { useState } from 'react';
import AwesomeButton from 'react-native-really-awesome-button';
import { View, TextInput, StyleSheet, Text, ImageBackground } from 'react-native';

const Journal = () => {
  const bgImage = require('../../../assets/blue-gradient.png');

  const [ journal, setJournal ] = useState('');

  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.header}> User's Journal </Text>
          <AwesomeButton
            backgroundColor={'#1D426D'}
            textColor={'#FAFAFA'}
            height={35}
            width={125}
            raiseLevel={0}
            borderRadius={8}
            style={styles.button}
            onPress={() => {
              setJournal('');
            }}
          >
          Clear Entry
          </AwesomeButton>
        </View>
        <View style={styles.textAreaContainer} >
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            numberOfLines={10}
            multiline={true}
            onChangeText={setJournal}
            value={journal}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  textArea: {
    height: '90%',
    width: 350,
    justifyContent: 'flex-start'
  },
  header: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20
  },
  button: {
    padding: 10,
    marginRight: 20
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
});

export default Journal;