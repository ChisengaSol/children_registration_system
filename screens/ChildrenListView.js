import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('ChildDB.db');

const ChildrenListView = () => {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Child ORDER BY first_name',
        [],
        (_, { rows }) => {
          setChildren(rows._array);
        },
        (tx, error) => {
          console.log('Error:', error);
        }
      );
    });
  }, []);

  const renderChild = ({ item }) => {
    const fullName = `${item.first_name} ${item.last_name}`;
    return (
      <TouchableOpacity style={styles.childItem}>
        <Text>{fullName}</Text>
      </TouchableOpacity>
    );
  };

  const sortChildrenByName = () => {
    const sortedChildren = [...children].sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
    setChildren(sortedChildren);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={sortChildrenByName}>
        <Text>Sort by Name</Text>
      </TouchableOpacity>
      <FlatList
        data={children}
        renderItem={renderChild}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  childItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sortButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChildrenListView;