"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import SearchIcon from "/public/icons/Search.svg";
import styles from "./page.module.css";
import Filter from "@/components/container/Filter";
import Container from "@/components/container/Container";
import { useFetchService } from "@/api/hooks/useStudent";
import { type ServiceSchema } from "@/type/schemas";

export default function Home() {
  const { id: container } = useParams();
  const { data: serviceData, isLoading, error } = useFetchService();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const titles = {
    recent: "최근 실행 컨테이너",
    semester: "이번 학기 컨테이너",
    all: "전체 학기 컨테이너",
  };

  const title =
    titles[container as keyof typeof titles] || "전체 학기 컨테이너";

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterSelect = (option: string) => {
    setFilterOption(option);
  };

  // 로딩과 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.searchContainer}>
        <div className={styles.header}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="컨테이너 검색"
              className={styles.searchInput}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
          <div className={styles.filter}>
            <Filter onSelect={handleFilterSelect} />
          </div>
        </div>
      </div>
      <div className={styles.results}>
        {serviceData.map((container: ServiceSchema, index: number) => (
          <Container key={index} serviceData={container} />
        ))}
      </div>
    </div>
  );
}
