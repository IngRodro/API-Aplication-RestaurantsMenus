import 'dotenv/config';
import getConfig from 'config';
import routes from './Routes';
import { initializeServer, app } from './Server/index';

const { port } = getConfig();

initializeServer(routes);

export const App = app;
// create express app
export const server = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
