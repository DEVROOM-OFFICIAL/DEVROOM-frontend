"use client";
import { useState } from "react";
import styles from "./page.module.css";
import PodTable from "@/components/check/PodTable";
import GridComponent from "@/components/check/PodGrid";
import { useFetchCheck } from "@/api/hooks/useProfessor";
import { type ContainerCheckSchema } from "@/type/schemas";

const CheckPage = () => {
  const [filterClassId, setFilterClassId] = useState<string>("");
  const {
    data: containerCheckData,
    isLoading,
    isError,
    error,
  } = useFetchCheck();

  // 로딩 및 에러 처리

  if (!containerCheckData) return;

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("Error: ", error.message);
    return <div>Error: {error.message}</div>;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterClassId(e.target.value);
  };

  const filteredData = containerCheckData.filter(
    (pod: ContainerCheckSchema) => {
      return filterClassId === "" || pod.labels.class_id === filterClassId;
    }
  );

  const classIds: string[] = Array.from(
    new Set(
      containerCheckData.map((pod: ContainerCheckSchema) => pod.labels.class_id)
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Pod 조회 페이지</div>
        <div className={styles.filter}>
          <label htmlFor="class-id">Class ID:</label>
          <select
            id="class-id"
            value={filterClassId}
            onChange={handleFilterChange}
          >
            <option value="">전체</option>
            {classIds.map((classId: string, index: number) => (
              <option key={index} value={classId}>
                {classId.startsWith("id-") ? classId.substring(3) : classId}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <PodTable filteredData={filteredData} />
      </div>
      <GridComponent filteredData={filteredData} />
    </div>
  );
};

export default CheckPage;
