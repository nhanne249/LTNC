import mainRouter from './mainRouter';
import adminRouter from './adminRouter';

const publicRouter = [
  mainRouter,

];
const privateRouter = [adminRouter,];
export { publicRouter, privateRouter };
