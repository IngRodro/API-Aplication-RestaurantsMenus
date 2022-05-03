import restaurantModel from '../src/Application/v1/restaurant/restaurant.model';
import { server } from '../src/main';
import {
  initalRestaurants,
  api,
  getAllNamesfromRestaurant,
} from './helper/restaurant.helper';

beforeEach(async () => {
  await restaurantModel.deleteMany({});

  await restaurantModel.create(initalRestaurants);
});

describe('Get Restaurants', () => {
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
      .set('Content-Type', 'multipart/form-data')
      .expect(400);

    const response = await api.get('/v1/restaurants');

    expect(response.body).toHaveLength(initalRestaurants.length);
  });

  test('Is not possible with a invalid restaurant', async () => {
    await api
      .post('/v1/restaurants')
      .expect(400)
      .set('Content-Type', 'multipart/form-data');

    const response = await api.get('/v1/restaurants');

    expect(response.body).toHaveLength(initalRestaurants.length);
  });
});

describe('Update a restaurant', () => {
  test('Is possible with a valid restaurant', async () => {
    const restaurants = await restaurantModel.find();
    const updateRestaurant = {
      name: 'Restaurant Updated',
      email: 'restauranteUpdated@gmail.com',
      department: 'Chalatenango',
      municipality: 'Santa Rita',
      direction: 'Direction Updated',
      delivery: false,
      phone: '345678912',
      openingHour: '10:00',
      closingHour: '22:00',
      dir: 'test/img/logo.jpg',
    };

    await api
      .put(`/v1/restaurants/${restaurants[0]._id}`)
      .field('name', updateRestaurant.name)
      .field('email', updateRestaurant.email)
      .field('department', updateRestaurant.department)
      .field('municipality', updateRestaurant.municipality)
      .field('direction', updateRestaurant.direction)
      .field('delivery', updateRestaurant.delivery)
      .field('phone', updateRestaurant.phone)
      .field('openingHour', updateRestaurant.openingHour)
      .field('closingHour', updateRestaurant.closingHour)
      .attach('logo', updateRestaurant.dir)
      .set('Content-Type', 'multipart/form-data')
      .expect(200);

    const restaurantUpdated = await restaurantModel.findById(restaurants[0]._id);
    expect(restaurantUpdated).toHaveProperty('name', updateRestaurant.name);
    expect(restaurantUpdated).toHaveProperty('email', updateRestaurant.email);
    expect(restaurantUpdated).toHaveProperty('department', updateRestaurant.department);
    expect(restaurantUpdated).toHaveProperty('municipality', updateRestaurant.municipality);
    expect(restaurantUpdated).toHaveProperty('direction', updateRestaurant.direction);
    expect(restaurantUpdated).toHaveProperty('phone', updateRestaurant.phone);
    expect(restaurantUpdated).toHaveProperty('openingHour', updateRestaurant.openingHour);
    expect(restaurantUpdated).toHaveProperty('closingHour', updateRestaurant.closingHour);
  });

  test("Is not possible with a restaurant's empty propierties", async () => {
    const restaurants = await restaurantModel.find();
    const updateRestaurant = {
      name: '',
      email: '',
      department: '',
      municipality: '',
      direction: '',
      delivery: '',
      phone: '',
      openingHour: '',
      closingHour: '',
    };

    await api
      .put(`/v1/restaurants/${restaurants[0]._id}`)
      .field('name', updateRestaurant.name)
      .field('email', updateRestaurant.email)
      .field('department', updateRestaurant.department)
      .field('municipality', updateRestaurant.municipality)
      .field('direction', updateRestaurant.direction)
      .field('delivery', updateRestaurant.delivery)
      .field('phone', updateRestaurant.phone)
      .field('openingHour', updateRestaurant.openingHour)
      .field('closingHour', updateRestaurant.closingHour)
      .set('Content-Type', 'multipart/form-data')
      .expect(400);

    const restaurantUpdated = await restaurantModel.findById(restaurants[0]._id);
    expect(restaurantUpdated).toHaveProperty('name', restaurants[0].name);
    expect(restaurantUpdated).toHaveProperty('email', restaurants[0].email);
    expect(restaurantUpdated).toHaveProperty('department', restaurants[0].department);
    expect(restaurantUpdated).toHaveProperty('municipality', restaurants[0].municipality);
    expect(restaurantUpdated).toHaveProperty('direction', restaurants[0].direction);
    expect(restaurantUpdated).toHaveProperty('phone', restaurants[0].phone);
    expect(restaurantUpdated).toHaveProperty('openingHour', restaurants[0].openingHour);
    expect(restaurantUpdated).toHaveProperty('closingHour', restaurants[0].closingHour);
  });

  test('Is not possible with a  invalid restaurant', async () => {
    const restaurants = await restaurantModel.find();

    await api
      .put(`/v1/restaurants/${restaurants[0]._id}`)
      .set('Content-Type', 'multipart/form-data')
      .expect(400);

    const restaurantUpdated = await restaurantModel.findById(restaurants[0]._id);
    expect(restaurantUpdated).toHaveProperty('name', restaurants[0].name);
    expect(restaurantUpdated).toHaveProperty('email', restaurants[0].email);
    expect(restaurantUpdated).toHaveProperty('department', restaurants[0].department);
    expect(restaurantUpdated).toHaveProperty('municipality', restaurants[0].municipality);
    expect(restaurantUpdated).toHaveProperty('direction', restaurants[0].direction);
    expect(restaurantUpdated).toHaveProperty('phone', restaurants[0].phone);
    expect(restaurantUpdated).toHaveProperty('openingHour', restaurants[0].openingHour);
    expect(restaurantUpdated).toHaveProperty('closingHour', restaurants[0].closingHour);
  });
});
afterAll(() => {
  server.close();
});
