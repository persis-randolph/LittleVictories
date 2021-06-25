import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Button,
  Alert,
  Platform
} from 'react-native';
import axios from 'axios';
import { FAB } from 'react-native-paper';
// import Slider from './Slider';
import { Switch } from 'react-native-switch';
import { useUserContext } from '../../Contexts/userContext';
import Slider from '@react-native-community/slider';
import TaskSummary from './TaskSummary';
import DateTimePicker from '@react-native-community/datetimepicker';


const Task = () => {
  const bgImage = require('../../../assets/blue-gradient.png');
  const [showForm, setShowForm] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  //for tasks, to create tasks
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  // const [date, setDate] = useState('');
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [isImportant, setIsImportant] = useState(false);
  const { user, setUser } = useUserContext();

  //for date selector
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const toggleSwitch = () => setIsImportant((previousState) => !previousState);

  const handleSubmit = async () => {
    const { data: task } = await axios.post(
      'http://localhost:3000/api/tasks/',
      {
        user_id: user.id,
        description,
        due_date: new Date(),
        minutes_to_complete: timeToComplete,
        is_important: isImportant,
      }
    );
    setUser({ ...user, tasks: [...user.tasks, task] });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <ImageBackground style={styles.backgroundImage} source={bgImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Tasks</Text>
        <View>
          <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={() => setShowForm(true)}
          />
        </View>
        {showForm ? (
          <View style={styles.view}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.taskPrompt}>Add Task</Text>
              <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter Task Description"
                autoCapitalize="none"
              />
               <View>
      <View>
        <Button onPress={showDatepicker} title="Due Date" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
            </View>
            <View>
              <Text style={styles.taskPrompt}>
                How much time to complete this task?
              </Text>
              <Slider
                step={5}
                minimumValue={0}
                maximumValue={60}
                value={timeToComplete}
                onValueChange={(value) => setTimeToComplete(value)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
              />
              <Text style={styles.taskPrompt}>Min: {timeToComplete}min</Text>
            </View>
            <Text style={styles.taskPrompt}>Is Important?</Text>
            <Switch
              style={styles.switch}
              circleActiveColor={'#9ee7ff'}
              circleInActiveColor={'#f4f3f4'}
              backgroundActive={'rgb(7, 40, 82)'}
              backgroundInactive={'rgb(7, 40, 82)'}
              switchLeftPx={5}
              switchRightPx={5}
              onValueChange={toggleSwitch}
              value={isImportant}
            />
            <Button title="submit" onPress={() => handleSubmit()} />
            <Button title="exit" onPress={() => setShowForm(false)} />
          </View>
        ) : null}
        <TaskSummary />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
  },
  fab: {
    backgroundColor: '#1D426D',
    height: 40,
    marginRight: 20,
  },
  header: {
    color: '#1D426D',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textArea: {
    height: 200,
    width: 100,
    justifyContent: 'flex-start',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textAreaContainer: {
    backgroundColor: '#8ebac6',
    borderRadius: 10,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  prompt: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 10,
  },
  taskPrompt: {
    alignSelf: 'flex-start',
    color: '#1D426D',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#9ec5cf',
    color: '#1D426D',
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 10,
  },
  view: {
    backgroundColor: '#8ebac6',
    borderRadius: 20,
    padding: 5,
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  switch: {
    marginBottom: '30%',
  },
});
export default Task;
