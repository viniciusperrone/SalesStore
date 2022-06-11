import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { OrderController } from '../controllers/OrderController';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get(
  '/:uuid',
  celebrate({
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);

orderRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  orderController.create,
);

export default orderRouter;
