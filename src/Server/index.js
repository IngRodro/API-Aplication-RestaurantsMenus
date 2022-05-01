import express from 'express';
import { initializeDB } from './db';

export const app = express();

// creating Server
export const initializeServer = async (routes) => {
  // initialize DB
  await initializeDB();

  // json parse
  app.use(express.json());

  // set urls
  app.use(routes);
};
