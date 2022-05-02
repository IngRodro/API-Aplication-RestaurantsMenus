import restaurantModel from '../src/Application/v1/restaurant/restaurant.model';
import { server } from '../src/main';
import {
  initalRestaurants,
  api,
  getAllNamesfromRestaurant
} from './helper/restaurant.helper';

beforeEach(async () => {
  await restaurantModel.deleteMany({});

  await restaurantModel.create(initalRestaurants);
});

describe('GET Restaurants', () => {
  test('Return all Restaurant', () => api
    .get('/v1/restaurants')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  );

  test('Return initial restaurants', async () => {
    const response = await api.get('/v1/restaurants');
    expect(response.body).toHaveLength(initalRestaurants.length);
  });

  test('The Restaurants contents Restaurant 1', async () => {
    const {
      names
    } = await getAllNamesfromRestaurant();

    expect(names).toContain('Restaurant 1');
  });
});

describe('Create a restaurant', () => {
  test('Is possible with a valid restaurant', async () => {
    const newRestaurant = {
      name: 'Restaurant 3',
      email: 'restaurant3@gmail.com',
      status: 'active',
      department: 'Chalatenango',
      municipality: 'Santa Rita',
      direction: 'Direction 3',
      delivery: true,
      phone: '567891234',
      openingHour: '09:00',
      closingHour: '21:00',
      dir: 'test/img/logo.jpg',
    };

    await api
      .post('/v1/restaurants')
      .field('name', newRestaurant.name)
      .field('email', newRestaurant.email)
      .field('status', newRestaurant.status)
      .field('department', newRestaurant.department)
      .field('municipality', newRestaurant.municipality)
      .field('direction', newRestaurant.direction)
      .field('delivery', newRestaurant.delivery)
      .field('phone', newRestaurant.phone)
      .field('openingHour', newRestaurant.openingHour)
      .field('closingHour', newRestaurant.closingHour)
      .attach('logo', newRestaurant.dir)
      .set('Content-Type', 'multipart/form-data')
      .expect(201);

    const { names, response } = await getAllNamesfromRestaurant();

    expect(response.body).toHaveLength(initalRestaurants.length + 1);
    expect(names).toContain(newRestaurant.name);
  });

  test("Is not possible with a restaurant's empty propierties", async () => {
    const newRestaurant = {
      name: '',
      email: '',
      status: '',
      department: '',
      municipality: '',
      direction: '',
      delivery: '',
      phone: '',
      openingHour: '',
      closingHour: '',
      dir: '',
    };

    await api
      .post('/v1/restaurants')
      .field('name', newRestaurant.name)
      .field('email', newRestaurant.email)
      .field('status', newRestaurant.status)
      .field('department', newRestaurant.department)
      .field('municipality', newRestaurant.municipality)
      .field('direction', newRestaurant.direction)
      .field('delivery', newRestaurant.delivery)
      .field('phone', newRestaurant.phone)
      .field('openingHour', newRestaurant.openingHour)
      .field('closingHour', newRestaurant.closingHour)
      .expect(400)
      .set('Content-Type', 'multipart/form-data');

    const response = await api.get('/v1/restaurants');

    expect(response.body).toHaveLength(initalRestaurants.length);
  });

  test('Is not possible with a restaurant empty', async () => {
    await api
      .post('/v1/restaurants')
      .expect(400)
      .set('Content-Type', 'multipart/form-data');

    const response = await api.get('/v1/restaurants');

    expect(response.body).toHaveLength(initalRestaurants.length);
  });
});

afterAll(() => {
  server.close();
});
