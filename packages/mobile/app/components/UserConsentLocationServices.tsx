import { useState, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useLocationTracker from "../hooks/useLocationTracker";

const UserConsentLocationServices = () => {
	const {
		isTracking,
		isLoading,
		error,
		currentCoords,
		startTracking,
		stopTracking,
	} = useLocationTracker();
};

export default UserConsentLocationServices;
