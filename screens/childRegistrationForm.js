import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, CheckBox } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

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

  const handleSave = () => {
    // Handle saving form data here
    console.log('Saved data:', { firstName, lastName, age, gender, immunizations });
  };

  const handleCheckboxChange = (immunization) => {
    setImmunizations({ ...immunizations, [immunization]: !immunizations[immunization] });
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
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={immunizations.BCG}
          onValueChange={() => handleCheckboxChange('BCG')}
        />
        <Text style={styles.checkboxLabel}>BCG</Text>
        <CheckBox
          value={immunizations.MMR}
          onValueChange={() => handleCheckboxChange('MMR')}
        />
        <Text style={styles.checkboxLabel}>MMR</Text>
        <CheckBox
          value={immunizations.RV}
          onValueChange={() => handleCheckboxChange('RV')}
        />
        <Text style={styles.checkboxLabel}>RV</Text>
        <CheckBox
          value={immunizations.DTaP}
          onValueChange={() => handleCheckboxChange('DTaP')}
        />
        <Text style={styles.checkboxLabel}>DTaP</Text>
      </View>
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    margin: 8,
  },
});

export default ChildRegistrationForm;
