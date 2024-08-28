import apiClient from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { type ICreateClassArgs, IDeleteClassArgs } from "@/type/interfaces";

const fetchCheck = async (professorId: string) => {
  const { data } = await apiClient.get(
    API_ENDPOINTS.PROFESSOR.CHECK(professorId)
  );
  return data;
};

export const useFetchCheck = () => {
  const { studentId } = useUserStore();
  return useQuery({
    queryKey: ["fetchDeploy", studentId],
    queryFn: () => fetchCheck(studentId),
    enabled: !!studentId,
  });
};

const createClass = async ({ professorId, classData }: ICreateClassArgs) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.PROFESSOR.CREATE(professorId),
    classData
  );
  return data;
};

export const useCreateClass = () => {
  return useMutation({
    mutationFn: createClass,
    onSuccess: (response) => {
      alert("Container가 성공적으로 생성되었습니다.");
      console.log("response", response);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
      console.log("error", error);
    },
  });
};

const deleteClass = async ({ professorId, deleteData }: IDeleteClassArgs) => {
  const { data } = await apiClient.post(
    API_ENDPOINTS.PROFESSOR.DELETE(professorId),
    deleteData
  );
  return data;
};

export const useDeleteClass = () => {
  return useMutation({
    mutationFn: deleteClass,
    onSuccess: (response) => {
      alert("Container가 성공적으로 삭제되었습니다.");
      console.log("response", response);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });
};
