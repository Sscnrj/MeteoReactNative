import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchBar from './components/SearchBar'
import Api from '../models/Api'
import { useEffect } from 'react'
import CityPicker from './components/CityPicker'

export default function App({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [valueResearch, setvalueResearch] = React.useState()

  const meteoAPI = new Api()
  useEffect(() => {
    fetchMeteo(searchQuery)
  }, [searchQuery])

  const fetchMeteo = async (searchQuery) => {
    if (searchQuery.length >= 2) {
      const result = await meteoAPI.search(searchQuery)
      setvalueResearch(result.cities)
    } else {
      // @ts-ignore
      setvalueResearch([])
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>
          Bienvenue sur votre application météo favorite
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setvalueResearch={setvalueResearch}
        />
        <CityPicker
          navigation={navigation}
          cities={valueResearch}
          setSearchQuery={setSearchQuery}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `#add8e6`,
  },
  text: {
    margin: 20,
    marginBottom: 100,
    fontSize: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  bodyContainer: {
    flex: 1,
    marginBottom: 40,
    minWidth: 100,
  },
  searchBar: {},
})
