import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import orderRouter from '@modules/orders/infra/http/routes/order.routes';

const router = Router();

router.use('/products', productsRouter);
router.use('/user', usersRouter);
router.use('/sessions', sessionRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/customer', customersRouter);
router.use('/orders', orderRouter);

export default router;
