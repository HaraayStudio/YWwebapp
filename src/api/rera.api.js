import api from "./axiosInstance";

/* ================================
   RERA PROJECT
================================ */

export const createReraProject = (projectId, data) => {
  console.log("📤 RERA POST payload:", JSON.stringify(data, null, 2));
  return api.post(`/rera/project/${projectId}`, data);
};

export const getReraByProjectId = (projectId) => {
  return api.get(`/rera/project/${projectId}`);
};
export const getReraById = (reraId) => {
  return api.get(`/rera/${reraId}`);
};

export const updateReraProject = (reraId, data) => {
  return api.put(`/rera/${reraId}`, data);
};

export const deleteReraProject = (reraId) => {
  return api.delete(`/rera/${reraId}`);
};

/* ================================
   CERTIFICATES
================================ */

export const addCertificate = (reraId, certificate, file) => {
  const formData = new FormData();

  formData.append(
    "certificate",
    new Blob([JSON.stringify(certificate)], { type: "application/json" })
  );

  if (file) formData.append("file", file);

  return api.post(`/rera/${reraId}/certificates`, formData);
};

export const getCertificates = (reraId) => {
  return api.get(`/rera/${reraId}/certificates`);
};

export const updateCertificate = (certificateId, certificate, file) => {
  const formData = new FormData();

  formData.append(
    "certificate",
    new Blob([JSON.stringify(certificate)], { type: "application/json" })
  );

  if (file) formData.append("file", file);

  return api.put(`/rera/certificates/${certificateId}`, formData);
};

export const deleteCertificate = (certificateId) => {
  return api.delete(`/rera/certificates/${certificateId}`);
};

/* ================================
   QUARTER UPDATES
================================ */

export const addQuarterUpdate = (reraId, data) => {
  return api.post(`/rera/${reraId}/quarter-updates`, data);
};

export const updateQuarterUpdate = (updateId, data) => {
  return api.put(`/rera/quarter-updates/${updateId}`, data);
};

export const deleteQuarterUpdate = (updateId) => {
  return api.delete(`/rera/quarter-updates/${updateId}`);
};

/* ================================
   SAVE FULL PROJECT
================================ */

export const saveFullReraProject = (reraData, certificateFiles) => {
  const formData = new FormData();

  formData.append(
    "reraData",
    new Blob([JSON.stringify(reraData)], { type: "application/json" })
  );

  certificateFiles?.forEach((file) => {
    formData.append("certificateFiles", file);
  });

  return api.post("/rera/save-full", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};