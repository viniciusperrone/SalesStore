import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customersRouter from '@modules/customers/routes/customers.routes';

const router = Router();

router.use('/products', productsRouter);
router.use('/user', usersRouter);
router.use('/sessions', sessionRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/customer', customersRouter);

export default router;
