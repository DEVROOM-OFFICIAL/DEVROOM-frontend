export const API_ENDPOINTS = {
  STUDENT: {
    SERVICE: (studentId: string) => `/service/${studentId}`,
    POD: (studentId: string) => `/pod/${studentId}`,
    DEPLOY: (studentId: string) => `/deploy/${studentId}`,
  },
  PROFESSOR: {
    CHECK: (professorId: string) => `/class/${professorId}/pod`,
    CREATE: (professorId: string) => `/class/${professorId}/create`,
    DELETE: (professorId: string) => `/class/${professorId}/delete`,
  },
};
