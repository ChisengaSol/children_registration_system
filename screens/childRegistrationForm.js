import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker } from 'react-native';

const ChildRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [selectedImmunizations, setSelectedImmunizations] = useState([]);

  const handleRegistration = () => {
    // Perform form submission or data handling logic here
    console.log('Submitted Data:', {
      firstName,
      lastName,
      age,
      gender,
      selectedImmunizations,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>First Name:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text>Last Name:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text>Age:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, padding: 5 }}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <Text>Immunizations:</Text>
      <Picker
        selectedValue={selectedImmunizations}
        onValueChange={(itemValue) => setSelectedImmunizations(itemValue)}
        mode="multiple"
        style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
      >
        <Picker.Item label="BCG" value="BCG" />
        <Picker.Item label="MMR" value="MMR" />
        <Picker.Item label="RV" value="RV" />
        <Picker.Item label="DTaP" value="DTaP" />
      </Picker>

      <Button title="Submit" onPress={handleRegistration} />
    </View>
  );
};

export default ChildRegistrationForm;
