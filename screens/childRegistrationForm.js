import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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

  const [selectedGender, setSelectedGender] = useState('Male');

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

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


  // State to manage the visibility of the success message
  const [showMessage, setShowMessage] = useState(false);

  // Function to show the success message for 10 seconds
  const showSuccessMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000); // 10 seconds
  };

  // State variables for error messages
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    immunizations: '',
  });


  // Function to validate the form data
  const validateFormData = () => {
    let hasError = false;
    const newErrors = {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      immunizations: '',
    };

    // First Name validation
    if (!firstName.trim() || /\d/.test(firstName) || /\s/.test(firstName)) {
      newErrors.firstName = 'Enter a valid First Name';
      hasError = true;
    }

    // Last Name validation
    if (!lastName.trim() || /\d/.test(lastName) || /\s/.test(lastName)) {
      newErrors.lastName = 'Enter a valid Last Name';
      hasError = true;
    }

    // Age validation
    if (!age.trim() || isNaN(age) || +age <= 0) {
      newErrors.age = 'Enter a valid Age (> 0)';
      hasError = true;
    }

    // Gender validation
    if (!selectedGender) {
      newErrors.gender = 'Select Gender';
      hasError = true;
    }

    // Immunizations validation
    const selectedImmunizations = Object.values(immunizations);
    if (!selectedImmunizations.includes(true)) {
      newErrors.immunizations = 'Select at least one Immunization';
      hasError = true;
    }

    setErrors(newErrors);
    return hasError;
  };

  const handleSave = () => {
    const hasError = validateFormData();

    if (!hasError) {
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
              console.log('Child saved successfully');
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
              // Show success message
              showSuccessMessage();
            } else {
              console.log('Failed to save data');
            }
          },
          (tx, error) => {
            console.log('Error:', error);
          }
        );
      });
      showSuccessMessage();
    }
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fieldContainer}>
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="e.g Christine"
        />
        <Text style={styles.errorText}>{errors.firstName}</Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder="e.g Banda"
        />
        <Text style={styles.errorText}>{errors.lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          keyboardType="numeric"
          onChangeText={(text) => setAge(text)}
          placeholder="e.g 10"
        />
        <Text style={styles.errorText}>{errors.age}</Text>
      </View>
      <Text>Gender</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radio,
            { backgroundColor: selectedGender === 'Male' ? '#b3cde0' : '#fff' }, // Adjust styles based on selected gender
          ]}
          onPress={() => handleGenderChange('Male')}
        >
          <Text style={{ color: selectedGender === 'Male' ? '#fff' : '#000' }}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radio,
            { backgroundColor: selectedGender === 'Female' ? '#b3cde0' : '#fff' }, // Adjust styles based on selected gender
          ]}
          onPress={() => handleGenderChange('Female')}
        >
          <Text style={{ color: selectedGender === 'Female' ? '#fff' : '#000' }}>Female</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errors.gender}</Text>
      </View>
      <View>
        <Text>Immunizations(click to select)</Text>
        {renderCheckbox('BCG', 'BCG')}
        {renderCheckbox('MMR', 'MMR')}
        {renderCheckbox('RV', 'RV')}
        {renderCheckbox('DTaP', 'DTaP')}
        <Text style={styles.errorText}>{errors.immunizations}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {/* Success message */}
      {showMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Data saved successfully!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 5,
    paddingVertical: 10,
  },
  successMessage: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  successText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default ChildRegistrationForm;
