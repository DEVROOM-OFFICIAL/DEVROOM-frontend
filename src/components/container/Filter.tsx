"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FilterIcon from "/public/icons/Filter.svg";
import DownIcon from "/public/icons/Down.svg";
import UpIcon from "/public/icons/Up.svg";
import styles from "./Filter.module.css";

interface FilterProps {
  onSelect: (option: string) => void;
}

export default function Filter({ onSelect }: FilterProps) {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const toggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setFilterOpen(false);
    switch (option) {
      case "전체 학기":
        router.push("/container/all");
        break;
      case "최근 실행":
        router.push("/container/recent");
        break;
      case "이번 학기":
        router.push("/container/semester");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterButton}>
        <FilterIcon />
        <div className={styles.icon}>
          {isFilterOpen ? (
            <UpIcon onClick={toggleFilter} />
          ) : (
            <DownIcon onClick={toggleFilter} />
          )}
        </div>
      </div>
      <div
        className={`${styles.filterOptions} ${isFilterOpen ? styles.open : ""}`}
      >
        <div onClick={() => handleSelect("전체 학기")}>전체 학기</div>
        {/* <div onClick={() => handleSelect("최근 실행")}>최근 실행</div> */}
        <div onClick={() => handleSelect("이번 학기")}>이번 학기</div>
      </div>
    </div>
  );
}
