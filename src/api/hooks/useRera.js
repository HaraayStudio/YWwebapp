import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as reraApi from "../rera.api";

/* ================================
   GET RERA BY PROJECT
================================ */

export const useReraByProject = (projectId) => {
  return useQuery({
    queryKey: ["reraProject", projectId],
    queryFn: async () => {
      try {
        const res = await reraApi.getReraByProjectId(projectId);
        return res.data.data;
      } catch (err) {
        if (err.response?.status === 404) {
          return null; // no RERA yet
        }
        throw err;
      }
    },
    enabled: !!projectId,
  });
};

/* ================================
   CREATE RERA PROJECT
================================ */

export const useCreateReraProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, data }) =>
      reraApi.createReraProject(projectId, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["reraProject"]);
    },
  });
};

/* ================================
   UPDATE RERA PROJECT
================================ */

export const useUpdateReraProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reraId, data }) =>
      reraApi.updateReraProject(reraId, data),

    onSuccess: () => {
      queryClient.invalidateQueries(["reraProject"]);
    },
  });
};

/* ================================
   DELETE RERA PROJECT
================================ */

export const useDeleteReraProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reraId) => reraApi.deleteReraProject(reraId),

    onSuccess: () => {
      queryClient.invalidateQueries(["reraProject"]);
    },
  });
};

/* ================================
   SAVE FULL RERA PROJECT
================================ */

export const useSaveFullReraProject = () => {
  return useMutation({
    mutationFn: ({ reraData, certificateFiles }) =>
      reraApi.saveFullReraProject(reraData, certificateFiles),
  });
};