import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const BASE_URL = 'http://localhost:8080';

export default function ApartScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);

  const fetchData = () => {
    fetch(`${BASE_URL}/api/buildings/type/Apart`)
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
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabText}>HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>RENT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>In The House Apps</Text>

        <FlatList
          data={buildings}
          keyExtractor={(item) => item.idBuilding.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.number}>{index + 1}</Text>
              <View>
                <Text style={styles.itemName}>{item.buildingName}</Text>
                <Text style={styles.itemSub}>{item.location}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.bottomTab}>
          <TouchableOpacity style={styles.activeBottom}>
            <Text style={styles.activeBottomText}>Apart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveBottom} onPress={() => navigation.navigate('House')}>
            <Text style={styles.inactiveBottomText}>House</Text>
          </TouchableOpacity>
        </View>
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
  item: { flexDirection: 'row', alignItems: 'center', padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
  number: { marginRight: 10, fontWeight: 'bold' },
  itemName: { fontWeight: 'bold', textDecorationLine: 'underline' },
  itemSub: { fontSize: 12, color: '#555' },
  bottomTab: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  activeBottom: { backgroundColor: '#555', padding: 8, marginRight: 5, borderRadius: 5 },
  activeBottomText: { color: '#fff' },
  inactiveBottom: { backgroundColor: '#ddd', padding: 8, borderRadius: 5 },
  inactiveBottomText: { color: '#000' },
});