import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ChildDetails = ({ route, navigation }) => {
  const { child } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Details</Text>
      <Text style={styles.detail}>First Name: {child.first_name}</Text>
      <Text style={styles.detail}>Last Name: {child.last_name}</Text>
      <Text style={styles.detail}>Age: {child.age}</Text>
      <Text style={styles.detail}>Gender: {child.gender}</Text>
      <Text style={styles.detail}>Immunizations:</Text>
      <View style={styles.immunizations}>
        {child.bcg === 1 && <Text>BCG</Text>}
        {child.mmr === 1 && <Text>MMR</Text>}
        {child.rv === 1 && <Text>RV</Text>}
        {child.dtap === 1 && <Text>DTaP</Text>}
      </View>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default ChildDetails;
