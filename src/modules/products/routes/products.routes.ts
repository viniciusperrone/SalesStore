import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ProductController } from '../controllers/ProductController';

const productsRouter = Router();
const productController = new ProductController();

productsRouter.get('/', productController.index);

productsRouter.get(
  '/:uuid',
  celebrate({
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  productController.show,
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
  productController.create,
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
  productController.update,
);

productsRouter.delete(
  '/:uuid',
  celebrate({
    [Segments.PARAMS]: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  productController.delete,
);

export default productsRouter;
