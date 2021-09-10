import { createContext } from 'react';

const {
	Provider: FirebaseServiceProvider,
	Consumer: FirebaseServiceConsumer
} = createContext();

export {
	FirebaseServiceProvider,
	FirebaseServiceConsumer
};