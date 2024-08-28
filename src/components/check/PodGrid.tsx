import React from "react";
import styles from "./PodGrid.module.css";

import { type IPodTable } from "@/type/interfaces";
import { type ContainerCheckSchema } from "@/type/schemas";

const GridComponent = ({ filteredData }: IPodTable) => {
  return (
    <div className={styles.gridContainer}>
      {filteredData.map((pod: ContainerCheckSchema) => (
        <div key={pod.name} className={styles.gridItem}>
          <div>
            <strong>Class ID:</strong> {pod.labels.class_id}
          </div>
          <div>
            <strong>Student ID:</strong> {pod.labels.student_id}
          </div>
          <div>
            <strong>Type:</strong>{" "}
            { pod.labels.connection === "vscode" 
            ? "VSCode" 
            : pod.labels.connection === "web_ssh" 
            ? "WebSHH" 
            : "SSH"}
          </div>
          <div>
            <strong>Timestamp:</strong>{" "}
            {new Date(pod.creationTimestamp).toLocaleString()}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span
              className={
                pod.status === "Running"
                  ? styles.statusRunning
                  : styles.statusNotRunning
              }
            ></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
