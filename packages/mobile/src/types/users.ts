export interface Location {
	id: string;
	recovererId: string;
	latitude: number;
	longitude: number;
	altitude: number;
	altitude_accuracy: number;
}

export interface Recoverer {
	id: string;
	userId: string;
	sponsorId: string;
	firstName: string;
	lastName: string;
	foregroundLocationPermission: boolean;
	backgroundLocationPermission: boolean;
	alertsEnabled: boolean;
}

export interface Sponsor {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	phone: string;
	notificationsEnabled: boolean;
}
