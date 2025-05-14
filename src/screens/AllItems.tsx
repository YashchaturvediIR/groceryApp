import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

type Item = {
  id: number
  name: string
  stock: number
  unit: string
}

type AllItemsProps = {
  data: Item[]
  onDelete: (id: number) => void
}

const AllItems: React.FC<AllItemsProps> = ({ data, onDelete }) => {
  const renderItem = ({ item }: { item: Item }) => {
    const backgroundColor = item.stock < 20 ? '#ffcccc' : '#ccffcc' // red for less than 20, green for 20 or more
    return (
      <View style={[styles.row, { backgroundColor }]}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>{item.stock} {item.unit}</Text>
        <View style={styles.buttonGroup}>
          <Text style={styles.deleteButton} onPress={() => onDelete(item.id)}>Delete</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No items available</Text>}
      />
    </View>
  )
}

export default AllItems

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#222',
    flex: 2,
  },
  itemQuantity: {
    fontSize: 20,
    fontWeight: '700',
    color: '#444',
    flex: 1,
    textAlign: 'right',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  deleteButton: {
    color: 'white',
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#999',
  },
})
