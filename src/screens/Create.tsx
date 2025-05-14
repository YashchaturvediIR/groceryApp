import { StyleSheet, Text, TextInput, View, Pressable, Alert, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'

const units = ['kg', 'litre', 'packets']

const Create = ({ addItem }: { addItem: (item: { name: string; stock: number; unit: string }) => void }) => {
  const [itemName, setItemName] = useState('')
  const [stock, setStock] = useState('')
  const [unit, setUnit] = useState('kg')
  const [modalVisible, setModalVisible] = useState(false)

  const handleAddItem = () => {
    if (!itemName.trim() || !stock.trim() || !unit.trim()) {
      Alert.alert('Error', 'Please fill all fields')
      return
    }
    const stockNumber = Number(stock)
    if (isNaN(stockNumber) || stockNumber <= 0) {
      Alert.alert('Error', 'Stock must be a positive number')
      return
    }
    addItem({ name: itemName.trim(), stock: stockNumber, unit: unit.trim() })
    setItemName('')
    setStock('')
    setUnit('kg')
  }

  const selectUnit = (selectedUnit: string) => {
    setUnit(selectedUnit)
    setModalVisible(false)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.heading}>Add New Item</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your item name...'
          value={itemName}
          onChangeText={setItemName}
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder='Enter stock amount...'
          value={stock}
          onChangeText={setStock}
          keyboardType='numeric'
          placeholderTextColor="#666"
        />
        <Pressable style={styles.pickerButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.pickerButtonText}>Unit: {unit}</Text>
        </Pressable>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <FlatList
                data={units}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable style={styles.modalItem} onPress={() => selectUnit(item)}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </Pressable>
        </Modal>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleAddItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </Pressable>
      </View>
     </View>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginHorizontal: 24,
  },
  watermark: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  heading: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 24,
    color: '#111',
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 18,
    color: '#111',
    fontWeight: '700',
  },
  pickerButton: {
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
  },
  pickerButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 200,
    maxHeight: 200,
  },
  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#004d00',
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 20,
  }
  
})
