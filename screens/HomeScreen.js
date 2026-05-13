import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const BASE_URL = 'http://localhost:8080';

export default function HomeScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);

  const fetchData = () => {
    fetch(`${BASE_URL}/api/buildings`)
      .then(res => res.json())
      .then(data => setBuildings(data))
      .catch(err => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Apart')}>
          <Text style={styles.tabText}>RENT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>In The House Apps</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Detail', {})}>
          <Text style={styles.addBtnText}>+ Add Data</Text>
        </TouchableOpacity>

        <FlatList
          data={buildings}
          keyExtractor={(item) => item.idBuilding.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { building: item })}>
              <View style={styles.item}>
                <Text style={styles.number}>{index + 1}</Text>
                <View>
                  <Text style={styles.itemName}>{item.buildingName}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', marginTop: 40 },
  sidebar: { width: 70, backgroundColor: '#fff', paddingTop: 10 },
  activeTab: { backgroundColor: '#1a73e8', padding: 12, marginBottom: 5 },
  activeTabText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  tab: { padding: 12 },
  tabText: { color: '#000', fontSize: 12 },
  content: { flex: 1, padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  addBtn: { backgroundColor: '#ddd', padding: 8, alignItems: 'center', marginBottom: 10, borderRadius: 5 },
  addBtnText: { fontSize: 13 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
  number: { marginRight: 10, fontWeight: 'bold' },
  itemName: { fontWeight: 'bold', textDecorationLine: 'underline' },
  itemPrice: { fontSize: 12, color: '#555' },
});