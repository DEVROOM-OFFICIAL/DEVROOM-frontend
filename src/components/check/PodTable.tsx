import React from "react";
import styles from "./PodTable.module.css";
import { type IPodTable } from "@/type/interfaces";

const PodTable = ({ filteredData }: IPodTable) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Student ID</th>
            <th>Type</th>
            <th>Timestamp</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((pod) => {

            const course_name = pod.labels.class_id.startsWith("id-")
              ? pod.labels.class_id.substring(3)
              : pod.labels.class_id;
            const student_filtered_id = pod.labels.student_id.startsWith("id-")
              ? pod.labels.student_id.substring(3)
              : pod.labels.student_id;

            return (
              <tr key={pod.name}>
                <td>{course_name}</td>
                <td>{student_filtered_id}</td>
                <td>
                  {pod.labels.connection === "vscode"
                    ? "VS Code"
                    : pod.labels.connection === "web_ssh"
                    ? "SSH (Web)"
                    : "SSH (Terminal)"}
                </td>
                <td>{new Date(pod.creationTimestamp).toLocaleString()}</td>
                <td>
                  <span
                    className={
                      pod.status === "Running"
                        ? styles.statusRunning
                        : styles.statusNotRunning
                    }
                  ></span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PodTable;