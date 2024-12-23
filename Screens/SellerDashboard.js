import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { supabase } from '../Supabase';

const SellerDashboard = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        navigation.replace('Auth'); // Redirect to Auth screen if no session
      } else {
        setUser(data.session.user);
        // Assume user role check, e.g., fetching from profile table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('isSeller')
          .eq('id', data.session.user.id)
          .single();

        if (error || !profile?.isSeller) {
          Alert.alert('Access Denied', 'This page is only for sellers.');
          navigation.replace('Home'); // Redirect non-sellers to Home
        }
      }
    };

    checkSession();
  }, [navigation]);

  const addItem = () => {
    if (newItem.trim() === '') return;
    setItems([...items, { id: items.length + 1, name: newItem }]);
    setNewItem('');
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      Alert.alert('Logout Successful');
      navigation.replace('Auth');
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Seller Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={addItem} color="#6200EE" />

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
      />

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
        color="#6200EE"
      />
      <Button
        title="Logout"
        onPress={handleLogout}
        color="#6200EE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SellerDashboard;
