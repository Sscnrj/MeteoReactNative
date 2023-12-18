import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CityRow = ({ item, navigation, setSearchQuery }) => (
  <Pressable
    onPress={() => {
      navigation.navigate('MeteoCity', { insee: item.insee })
      setSearchQuery('')
    }}
  >
    <View style={styles.row}>
      <View>
        <Text style={styles.primaryText}>{item.name}</Text>
      </View>
    </View>
  </Pressable>
)

const styles = StyleSheet.create({
  row: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
  },
  secondaryText: { color: 'grey' },
})

export default CityRow
