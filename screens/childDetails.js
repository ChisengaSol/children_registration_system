import React from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';

const ChildDetails = ({ route, navigation }) => {
  const { child } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{child.first_name}'s Profile</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Full Name: {child.first_name} {child.last_name}</Text>
        <Text style={styles.detail}>Age: {child.age}</Text>
        <Text style={styles.detail}>Gender: {child.gender}</Text>
        <Text style={styles.detail}>Immunizations:</Text>
        <View style={styles.immunizations}>
          {child.bcg === 1 && <Text style={styles.immunization}>BCG</Text>}
          {child.mmr === 1 && <Text style={styles.immunization}>MMR</Text>}
          {child.rv === 1 && <Text style={styles.immunization}>RV</Text>}
          {child.dtap === 1 && <Text style={styles.immunization}>DTaP</Text>}
        </View>
      </View>
      {/* <Button
        title="Back"
        onPress={() => navigation.goBack()}
        color="#3498db" // Set the background color for the Back button
      /> */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#fff' }}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Set the background color for the container
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    marginBottom: 5,
  },
  immunizations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  immunization: {
    marginRight: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#f0f0f0', // Set background color for each immunization item
    borderRadius: 5,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  }
});

export default ChildDetails;
