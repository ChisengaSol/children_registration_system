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

  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

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
        style={[styles.checkbox, immunizations[type] && styles.checkedBox]}
        onPress={() => toggleImmunization(type)}
      >
        <Text style={styles.checkboxLabel}>{label}</Text>
        {immunizations[type] && <Text style={styles.checkmark}>✔</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <Text>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Text>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
      />
      <Text>Gender</Text>
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <Text>Immunizations(click to select)</Text>
      {renderCheckbox('BCG', 'BCG')}
      {renderCheckbox('MMR', 'MMR')}
      {renderCheckbox('RV', 'RV')}
      {renderCheckbox('DTaP', 'DTaP')}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add</Text>
    </TouchableOpacity>
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
    marginBottom: 15,
    marginTop: 5,
    borderColor: '#ccc',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  checkedBox: {
    backgroundColor: '#b2cbde',
    borderRadius: 3,
    padding: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChildRegistrationForm;
