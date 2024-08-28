import apiClient from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";

const fetchService = async (studentId: string) => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.STUDENT.SERVICE(studentId)
  );
  return data;
};

const fetchPod = async (studentId: string) => {
  const { data } = await apiClient.get(API_ENDPOINTS.STUDENT.POD(studentId));
  return data;
};

const fetchDeploy = async (studentId: string) => {
  const { data } = await apiClient.get(API_ENDPOINTS.STUDENT.DEPLOY(studentId));
  return data;
};

export const useFetchService = () => {
  const { studentId } = useUserStore();
  return useQuery({
    queryKey: ["fetchService", studentId],
    queryFn: () => fetchService(studentId),
    enabled: !!studentId,
  });
};

export const useFetchPod = () => {
  const { studentId } = useUserStore();
  return useQuery({
    queryKey: ["fetchPod", studentId],
    queryFn: () => fetchPod(studentId),
    enabled: !!studentId,
  });
};

export const useFetchDeploy = () => {
  const { studentId } = useUserStore();
  return useQuery({
    queryKey: ["fetchDeploy", studentId],
    queryFn: () => fetchDeploy(studentId),
    enabled: !!studentId,
  });
};
