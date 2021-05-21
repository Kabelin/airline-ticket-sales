import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import AirportController from './app/controllers/AirportController';
import FlightController from './app/controllers/FlightController';
import PurchaseController from './app/controllers/PurchaseController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Login with email and password fields
routes.post('/sessions', SessionController.store);

// From now on, each req needs authentication
routes.use(authMiddleware);

// Get airports
routes.get('/airports', AirportController.index);

// Get airports by origin (use query params).
// Example: 'http://localhost:5000/airports/origin?city=Rio%20de%20Janeiro&federal_unity=RJ'
routes.get('/airports/origin', AirportController.indexByOrigin);

// Get flights
routes.get('/flights', FlightController.index);

// Search flights by quantity available (use body for params).
// Example:
// {
// 	"origin": {
// 		"city": "Água Boa",
// 		"federal_unity": "MT"
// 	},
// 	"destination": {
// 		"city": "Januária",
// 		"federal_unity": "MG"
// 	},
// 	"quantity": 2
// }
routes.put('/flights/search', FlightController.search);

// Get purchases
routes.get('/purchases', PurchaseController.index);

// Post purchase
routes.post('/purchases', PurchaseController.create);

export default routes;
