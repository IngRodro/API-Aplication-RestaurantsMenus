import supertest from 'supertest';
import { App } from '../../src/main';

import RestaurantModel from '../../src/Application/v1/restaurant/restaurant.model';

export const api = supertest(App);

export const initalRestaurants = [
  {
    name: 'Restaurant 1',
    email: 'restaurant1@gmail.com',
    status: 'active',
    department: 'Chalatenango',
    municipality: 'Santa Rita',
    direction: 'Direction 1',
    delivery: true,
    phone: '123456789',
    openingHour: '09:00',
    closingHour: '21:00',
    logo: {
      public_id: 'test/istockphoto-981368726-612x612_mgf9nx',
      secure_url: 'https://res.cloudinary.com/project-tpis/image/upload/v1651445686/test/istockphoto-981368726-612x612_mgf9nx.jpg'
    }
  },
  {
    name: 'Restaurant 2',
    email: 'restaurant2@gmail.com',
    status: 'active',
    department: 'Chalatenango',
    municipality: 'Santa Rita',
    direction: 'Direction 2',
    delivery: true,
    phone: '987654321',
    openingHour: '09:00',
    closingHour: '21:00',
    logo: {
      public_id: 'test/stock-vector-restaurant-logo-food-service-vector-logo-design-template-insignia-logotype-label-or-badge-454784548_edjrbm',
      secure_url: 'https://res.cloudinary.com/project-tpis/image/upload/v1651445650/test/stock-vector-restaurant-logo-food-service-vector-logo-design-template-insignia-logotype-label-or-badge-454784548_edjrbm.jpg'
    }
  }
];

export const getAllNamesfromRestaurant = async () => {
  const response = await api.get('/v1/restaurants');
  return {
    names: response.body.map((restaurant) => restaurant.name),
    response
  };
};

export const getRestaurant = async () => {
  const restaurants = await RestaurantModel.find({});
  return restaurants.map((restaurant) => restaurant.toJSON());
};
