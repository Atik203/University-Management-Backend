import express from 'express';

import { parseRequestBodyData } from '../../middleware/parseRequestBodyData';
import { validateRequest } from '../../middleware/validateRequest';
import { upload } from '../../utils/sendImageToCloudnary';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.zod.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  upload.single('file'),
  parseRequestBodyData,
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
