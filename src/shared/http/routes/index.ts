import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => response.json({ message: 'ok' }));

export default router;
