import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

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
    // Validate form fields before saving (add your validation logic here)

    // Convert immunizations object to an array of selected immunizations
    const selectedImmunizations = Object.keys(immunizations).filter(
      (key) => immunizations[key]
    );

    // Save the data or perform any other action
    console.log('Saving Data:', {
      firstName,
      lastName,
      age,
      gender,
      immunizations: selectedImmunizations,
    });

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
