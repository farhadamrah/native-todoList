import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Button,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    setTaskItems((prevState) => [...prevState, task]);
    setTask(null);
    Keyboard.dismiss();
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's tasks</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'android'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => {
            setTask(text);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            if (!task) {
              return;
            }
            handleAddTask();
          }}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.border} />

      <ScrollView style={styles.tasksWrapper}>
        {taskItems.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <View style={styles.items} key={Math.random()}>
                <View style={styles.circle}></View>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity onPress={() => setTaskItems([])}>
          <View style={styles.clearBtn}>
            <Text style={styles.btnText}>Clear All</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4419EB',
    overflow: 'hidden',
    display: 'flex',
  },
  tasksWrapper: {
    marginVertical: 10,
    paddingHorizontal: 20,
    height: '65%',
  },
  sectionTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginVertical: 40,
    // marginBottom: 0,
  },
  items: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '600',
  },
  circle: {
    width: 14,
    height: 14,
    borderColor: '#4419EB',
    borderRadius: 50,
    borderWidth: 3.5,
    marginRight: 8,
  },

  writeTaskWrapper: {
    // position: 'absolute',
    // top: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: 270,
    padding: 12,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    fontSize: 20,
  },
  addWrapper: {
    height: 55,
    width: 55,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  addText: {
    fontSize: 25,
  },
  border: {
    width: '90%',
    height: 1,
    backgroundColor: '#C1C1C1',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 30,
  },
  clearBtn: {
    backgroundColor: 'white',
    width: 180,
    padding: 15,
    color: 'white',
    borderRadius: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});
