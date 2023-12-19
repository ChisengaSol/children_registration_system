import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('ChildDB.db');

const ChildrenListView = ({ navigation }) => {
  const [children, setChildren] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      <TouchableOpacity
        style={styles.childItem}
        onPress={() => navigation.navigate('ChildDetails', { child: item })}
      >
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

  const searchChildren = (text) => {
    setSearchQuery(text);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Child WHERE first_name LIKE ?',
        [`%${text}%`],
        (_, { rows }) => {
          setChildren(rows._array);
        },
        (tx, error) => {
          console.log('Error:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        placeholder="Search by Name"
        onChangeText={searchChildren}
      />
      <TouchableOpacity style={styles.sortButton} onPress={sortChildrenByName}>
        <Text style={{ color: '#fff' }}>Sort</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Names</Text>
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
  searchInput: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  childItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sortButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ChildrenListView;
