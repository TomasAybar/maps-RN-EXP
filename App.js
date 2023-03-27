import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'
import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from '@env'
import carImage from './assets/car.png'

export default function App() {
	useEffect(() => {
		getLocationPermission()
	}, [])

	const [origin, setOrigin] = useState({
		latitude: -34.85161993160135,
		longitude: -58.37984961256777,
	})

	const [destination, setDestination] = useState({
		latitude: -34.8014368557401,
		longitude: -58.38758510301186,
	})

	const getLocationPermission = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync()

		if (status !== 'granted') {
			alert('Permission to access location was denied')
			return
		}

		let location = await Location.getCurrentPositionAsync()

		setOrigin({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		})
	}

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: origin.latitude,
					longitude: origin.longitude,
					latitudeDelta: 0.09,
					longitudeDelta: 0.04,
				}}
			>
				<Marker
					draggable
					coordinate={origin}
					onDragEnd={(dir) => setOrigin(dir.nativeEvent.coordinate)}
					image={carImage}
				/>
				<Marker
					coordinate={destination}
					draggable
					onDragEnd={(dir) => setDestination(dir.nativeEvent.coordinate)}
				/>

				<MapViewDirections
					origin={origin}
					destination={destination}
					apikey={GOOGLE_MAPS_KEY}
					strokeColor='black'
					strokeWidth={5}
				/>
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
	},
})
