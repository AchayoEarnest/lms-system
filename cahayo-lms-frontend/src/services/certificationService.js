import api from './api';

export const certificationService = {
  getMyCertificates: () => api.get('certificates/'),

  verifyCertificate: (certificateNumber) =>
    api.get('certificates/verify/', { params: { number: certificateNumber } }),

  getMyBadges: () => api.get('student-badges/'),

  getAllBadges: () => api.get('badges/'),
};
