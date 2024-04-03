import mainRouter from './mainRouter';
import studentRouter from './studentRouter';

const publicRouter = [
  mainRouter,
];
const privateRouter = [studentRouter,];
export { publicRouter, privateRouter };
