import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration created successfully',
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
};
