import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

export default function App() {
	const [origin, setOrigin] = useState({
		latitude: -34.8014368557401,
		longitude: -58.38758510301186,
	})

	const [destination, setDestination] = useState({
		latitude: -34.85161993160135,
		longitude: -58.37984961256777,
	})

	// destino -34.85161993160135, -58.37984961256777
	// origin -34.8014368557401, -58.38758510301186

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
				/>
				<Marker
					coordinate={destination}
					draggable
					onDragEnd={(dir) => setDestination(dir.nativeEvent.coordinate)}
				/>

				<Polyline
					coordinates={[origin, destination]}
					strokeColor='blue'
					strokeWidth={8}
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
