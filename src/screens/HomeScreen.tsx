import { Alert, Pressable, StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'
import AllItems from './AllItems'
import Create from './Create'

type Item = {
  id: number
  name: string
  stock: number
  unit: string
}

const initialData: Item[] = [
  {id:1, name: "biscuit", stock:5, unit:"packets"},
  {id:2, name: "chips", stock:10, unit:"packets"},
  {id:3, name: "chocolate", stock:15, unit:"packets"},
  {id:4, name: "cold drinks", stock:20, unit:"ltr"},
  {id:5, name: "wheat", stock:25, unit:"kg"}
]

const HomeScreen = () => {
  const [view, setView] = useState(0)
  const [data, setData] = useState<Item[]>(initialData)
  const [nextId, setNextId] = useState(initialData.length + 1)
  const [darkMode, setDarkMode] = useState(false)

  const addItem = (item: Omit<Item, 'id'>) => {
    const newItem: Item = { id: nextId, ...item }
    setData([...data, newItem])
    setNextId(nextId + 1)
    setView(0) // switch back to AllItems view after adding
  }

  const deleteItem = (id: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          setData(data.filter(item => item.id !== id))
        }},
      ]
    )
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <View style={[styles.container, darkMode ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.title, darkMode ? styles.titleDark : styles.titleLight]}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            view === 0 && styles.buttonActive,
            pressed && styles.buttonPressed,
            darkMode && styles.buttonDark,
            view === 0 && darkMode && styles.buttonActiveDark,
          ]}
          onPress={() => setView(0)}
        >
          <Text style={[styles.btnText, view === 0 && styles.btnTextActive, darkMode && styles.btnTextDark, view === 0 && darkMode && styles.btnTextActiveDark]}>All items</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            view === 1 && styles.buttonActive,
            pressed && styles.buttonPressed,
            darkMode && styles.buttonDark,
            view === 1 && darkMode && styles.buttonActiveDark,
          ]}
          onPress={() => setView(1)}
        >
          <Text style={[styles.btnText, view === 1 && styles.btnTextActive, darkMode && styles.btnTextDark, view === 1 && darkMode && styles.btnTextActiveDark]}>Low Stock</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            view === 2 && styles.buttonActive,
            pressed && styles.buttonPressed,
            darkMode && styles.buttonDark,
            view === 2 && darkMode && styles.buttonActiveDark,
          ]}
          onPress={() => setView(2)}
        >
          <Text style={[styles.btnText, view === 2 && styles.btnTextActive, darkMode && styles.btnTextDark, view === 2 && darkMode && styles.btnTextActiveDark]}>Create</Text>
        </Pressable>
      </View>
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleLabel, darkMode ? styles.titleDark : styles.titleLight]}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      {view == 0 && <AllItems data={data} onDelete={deleteItem} />}
      {view == 1 && <AllItems data={data.filter(item => item.stock < 20)} onDelete={deleteItem} />}
      {view == 2 && <Create addItem={addItem} />}
      <Text style={[styles.watermark, darkMode ? styles.watermarkDark : styles.watermarkLight]}>© 2025 Yash Chaturvedi. All rights reserved</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerLight: {
    backgroundColor: '#f0f4f8',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  titleLight: {
    color: '#333',
  },
  titleDark: {
    color: '#eee',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDark: {
    backgroundColor: '#333',
    borderColor: '#bbb',
  },
  buttonActive: {
    backgroundColor: 'green',
  },
  buttonActiveDark: {
    backgroundColor: '#0f0',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'green',
  },
  btnTextDark: {
    color: '#ccc',
  },
  btnTextActive: {
    color: 'white',
  },
  btnTextActiveDark: {
    color: '#000',
  },
  watermark: {
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom:20,
    position:"relative"
  },
  watermarkLight: {
    color: '#333',
  },
  watermarkDark: {
    color: '#eee',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
})
