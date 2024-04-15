import mainRouter from './mainRouter';
import studentRouter from './studentRouter';
import adminRouter from './adminRouter';
import teacherRouter from './teacherRouter';

const publicRouter = [
  mainRouter,
];
const privateRouter = [studentRouter,adminRouter, teacherRouter];
export { publicRouter, privateRouter };
