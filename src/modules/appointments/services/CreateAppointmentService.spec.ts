import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentServices';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12345',
      user_id: '54321',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12345',
      user_id: '54321',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12345',
        user_id: '54321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
