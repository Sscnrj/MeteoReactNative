// Importation des dépendances nécessaires depuis React et React Native
import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Api from '../models/Api';
import { Feather } from '@expo/vector-icons'; // Ajout de l'import pour Feather
import weatherCode from '../services/weatherCode';

// Fonction pour formater la date
const dateFormat = (dateISO) => {
  const date = new Date(dateISO);
  const formattedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  return formattedDate;
};

// Composant fonctionnel MeteoCity
const MeteoCity = ({ navigation, route }) => {
  // Instanciation de la classe Api pour les requêtes météo
  const meteoAPI = new Api();

  // États pour stocker les données météo et gérer le chargement
  const [meteoCityFor5Days, setMeteoCityFor5Days] = React.useState({});
  const [meteoCity, setMeteoCity] = React.useState({
    city: { name: '' },
    forecast: [
      [],
      [],
      [],
      [
        {
          // Données factices pour éviter les erreurs dans le code
          cp: 93170,
          datetime: '2022-03-01T19:00:00+0100',
          day: 0,
          dirwind10m: 113,
          gust10m: 22,
          gustx: 22,
          // ... autres propriétés ...
        },
      ],
    ],
  });
  const [loading, setLoading] = React.useState(true);
  const [temperatureUnit, setTemperatureUnit] = React.useState('Celsius'); // État pour suivre l'unité de température

  // Effet useEffect pour charger les données météo au montage du composant
  useEffect(() => {
    getMeteoForCity(route.params.insee);
    getMeteoForCity5days(route.params.insee);
  }, []);

  // Fonction asynchrone pour récupérer les données météo pour une ville
  const getMeteoForCity = async (insee) => {
    const result = await meteoAPI.getMeteoForCityForNextHour(insee);
    setMeteoCity(result);
    setLoading(false);
  };

  // Fonction asynchrone pour récupérer les données météo sur 5 jours pour une ville
  const getMeteoForCity5days = async (insee) => {
    const result = await meteoAPI.getMeteoForCityFor5Days(insee);
    setMeteoCityFor5Days(result);
  };

  // Fonction pour le rendu de chaque élément de la FlatList
  const renderItem = ({ item }) => {
    const weatherIcon = weatherCode[item.weather];
    const convertedMaxTemperature = convertTemperature(item.tmax, temperatureUnit);
    const convertedMinTemperature = convertTemperature(item.tmin, temperatureUnit);

    return (
      <View style={styles.previsionView} key={item.datetime}>
        <Text style={styles.previsionTitle}>{dateFormat(item.datetime)}</Text>
        <Feather name={weatherIcon} size={24} color="white" />
        <Text>
          T°Max : {convertedMaxTemperature} T°Min : {convertedMinTemperature}
        </Text>
        <Text>
          Rafale de vent à 10 mètres : {item.wind10m}
          {' km/h '}
        </Text>
      </View>
    );
  };

  // Fonction pour basculer entre Celsius et Fahrenheit
  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  // Fonction pour convertir la température entre Celsius et Fahrenheit
  const convertTemperature = (temperature, unit) => {
    if (unit === 'Celsius') {
      return temperature;
    } else {
      // Conversion de Celsius à Fahrenheit
      return (temperature * 9) / 5 + 32;
    }
  };

  // Rendu du composant MeteoCity
  return (
    <>
      {!loading && (
        <>
          <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.tempText}>
                {meteoCity.city.name}{' '}
                {convertTemperature(meteoCity.forecast[0][3].temp2m, temperatureUnit)}˚
              </Text>
              <TouchableOpacity onPress={toggleTemperatureUnit}>
                <Text style={styles.toggleButton}>
                  {temperatureUnit === 'Celsius' ? 'Convertir en Fahrenheit' : 'Convertir en Celsius'}
                </Text>
              </TouchableOpacity>
              <Feather
                name={weatherCode[meteoCity.forecast[0][3].weather]}
                size={48}
                color="white"
              />
            </View>
            <View style={styles.weatherContainer}>
              <FlatList
                data={meteoCityFor5Days}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
};

// Styles pour le composant MeteoCity
const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempText: {
    fontSize: 48,
    color: '#fff',
  },
  previsionView: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  previsionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 8,
  },
});

// Exportation du composant MeteoCity pour être utilisé ailleurs dans l'application
export default MeteoCity;
