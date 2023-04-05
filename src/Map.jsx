import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker, Callout } from "react-native-maps";
import LocationData from "../data/LocationData";

// map styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    width: 150,
    textAlign: "center",
    overflow: "auto",
  },
});
function Map() {
  // Current location code adapted from https://docs.expo.dev/versions/latest/sdk/location/

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={false}
        initialRegion={{
          latitude: 55.861,
          longitude: -4.2518,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {LocationData.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            description={location.description}
            title={location.place}
            pinColor="#4338ca"
          />
        ))}
      </MapView>
    </View>
  );
}

export default Map;
