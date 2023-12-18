import React from 'react'
import { FlatList } from 'react-native'
import CityRow from './CityRow'

const CityPicker = ({ cities, navigation, setSearchQuery }) => {
  const _renderItem = ({ item }) =>
    cities.indexOf(item) < 5 && (
      <CityRow
        navigation={navigation}
        item={item}
        setSearchQuery={setSearchQuery}
      ></CityRow>
    )

  return <FlatList data={cities} renderItem={_renderItem} />
}

export default CityPicker
