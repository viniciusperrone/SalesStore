import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ProductsController } from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:uuid',
  celebrate({
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.patch(
  '/:uuid',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:uuid',
  celebrate({
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
