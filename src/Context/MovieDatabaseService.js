import { createContext } from 'react';

const {
	Provider: MovieDatabaseProvider,
	Consumer: MovieDatabaseConsumer
} = createContext();

export {
	MovieDatabaseProvider,
	MovieDatabaseConsumer
};