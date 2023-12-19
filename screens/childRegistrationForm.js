import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('ChildDB.db');

const ChildRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [immunizations, setImmunizations] = useState({
    BCG: false,
    MMR: false,
    RV: false,
    DTaP: false,
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Child (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(30), last_name VARCHAR(30), age INTEGER, gender VARCHAR(10), bcg INTEGER DEFAULT 0, mmr INTEGER DEFAULT 0, rv INTEGER, dtap INTEGER DEFAULT 0);'
      );
    });
  }, []);

  const handleSave = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Child (first_name, last_name, age, gender, bcg, mmr, rv, dtap) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          firstName,
          lastName,
          age,
          gender,
          immunizations.BCG ? 1 : 0,
          immunizations.MMR ? 1 : 0,
          immunizations.RV ? 1 : 0,
          immunizations.DTaP ? 1 : 0,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Data saved successfully');
            // Reset form fields after saving
            setFirstName('');
            setLastName('');
            setAge('');
            setGender('Male');
            setImmunizations({
              BCG: false,
              MMR: false,
              RV: false,
              DTaP: false,
            });
          } else {
            console.log('Failed to save data');
          }
        },
        (tx, error) => {
          console.log('Error:', error);
        }
      );
    });
  };

  const toggleImmunization = (type) => {
    setImmunizations((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const renderCheckbox = (label, type) => {
    return (
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleImmunization(type)}
      >
        <Text>{label}</Text>
        {immunizations[type] && <Text>✔</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Text>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
      />
      <Text>Gender:</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <Text>Immunizations:</Text>
      {renderCheckbox('BCG', 'BCG')}
      {renderCheckbox('MMR', 'MMR')}
      {renderCheckbox('RV', 'RV')}
      {renderCheckbox('DTaP', 'DTaP')}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default ChildRegistrationForm;
