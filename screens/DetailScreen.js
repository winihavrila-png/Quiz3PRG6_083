import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const BASE_URL = 'http://localhost:8080';

export default function DetailScreen({ navigation, route }) {
  const existing = route.params?.building;

  const [buildingName, setBuildingName] = useState(existing?.buildingName || '');
  const [buildingType, setBuildingType] = useState(existing?.buildingType || '');
  const [location, setLocation] = useState(existing?.location || '');
  const [buildingArea, setBuildingArea] = useState(existing?.buildingArea?.toString() || '');
  const [price, setPrice] = useState(existing?.price?.toString() || '');

    const handleCreate = () => {
  const finalPrice = parseInt(price);

  fetch(`${BASE_URL}/api/buildings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      buildingName,
      buildingType,
      location,
      buildingArea: parseInt(buildingArea),
      price: finalPrice,   
    }),
  })
    .then(res => res.json())
    .then(() => {
      Alert.alert('Sukses', 'Data berhasil ditambahkan!');
      navigation.goBack();
    })
    .catch(err => console.log(err));
};
  const handleDelete = () => {
    if (!existing?.idBuilding) {
      Alert.alert('Error', 'Pilih data dulu dari Home!');
      return;
    }
    fetch(`${BASE_URL}/api/buildings/${existing.idBuilding}`, { method: 'DELETE' })
      .then(() => {
        Alert.alert('Sukses', 'Data berhasil dihapus!');
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>In The House Apps</Text>
      </View>

      <Text style={styles.label}>Building Name</Text>
      <TextInput style={styles.input} value={buildingName} onChangeText={setBuildingName} />

      <Text style={styles.label}>Building Type</Text>
      <TextInput style={styles.input} value={buildingType} onChangeText={setBuildingType} placeholder="Apartment / House" />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} />

      <Text style={styles.label}>Building Area</Text>
      <TextInput style={styles.input} value={buildingArea} onChangeText={setBuildingArea} keyboardType="numeric" />

      <Text style={styles.label}>Price</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.addBtn} onPress={handleCreate}>
          <Text style={styles.addBtnText}>+ Add Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  back: { fontSize: 24, marginRight: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginBottom: 5 },
  btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  addBtn: { backgroundColor: '#ddd', padding: 10, borderRadius: 5, flex: 1, marginRight: 10, alignItems: 'center' },
  addBtnText: { fontWeight: 'bold' },
  deleteBtn: { backgroundColor: 'red', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  deleteBtnText: { color: '#fff', fontWeight: 'bold' },
});