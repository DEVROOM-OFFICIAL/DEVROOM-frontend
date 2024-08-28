import React, { useState } from "react";
import styles from "./Container.module.css";
import VSCodeIcon from "/public/icons/VSCode.svg";
import SSHIcon from "/public/icons/SSH.svg";
import WebSSHIcon from "/public/icons/WEB_SSH.svg";
import PlayIcon from "/public/icons/Play.svg";
import SSHModal from "./SSHModal";
import { type IContainer } from "@/type/interfaces";

export default function Container({ serviceData }: IContainer) {
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    labels: { connection, class_id, professor_id, student_id },
    port,
    clusterIP,
    creationTimestamp,
  } = serviceData;

  const type = connection;
  const port_number = port;
  const course_name = class_id.startsWith("id-") ? class_id.substring(3) : class_id;
  const student_filtered_id = student_id.startsWith("id-") ? student_id.substring(3) : student_id;
  const professor_name = professor_id.startsWith("id-") ? professor_id.substring(3) : professor_id;
  const ssh_commands =
    connection === "ssh" ? [`ssh ${student_filtered_id}-${course_name}@${process.env.NEXT_PUBLIC_SSH_URL} -p ${port}`] : null;
  
  const semester = new Date(creationTimestamp).toLocaleDateString('default', { year: 'numeric', month: '2-digit' });
  const language = port;
  const icon 
  = type === "vscode" 
  ? <VSCodeIcon /> 
  : type === "web_ssh" 
  ? <WebSSHIcon /> 
  : <SSHIcon />;


  const handlePlayClick = () => {
    if (type === "vscode") {
      const url = `${process.env.NEXT_PUBLIC_CONTAINER_URL}:${port_number}`;
      window.open(url, "_blank");
    } 
    else if (type === "web_ssh") {
      const url = `${process.env.NEXT_PUBLIC_CONTAINER_URL}:${port_number}`;
      window.open(url, "_blank");
    }
    else if (type === "ssh") {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className={styles.container} onClick={handlePlayClick}>
        <div className={styles.topContainer}>{icon}</div>
        <div className={styles.bottomContainer}>
          <div className={styles.topDescription}>
            <div className={styles.courseName}>{course_name}</div>
            {/* <div className={styles.professorName}> ({professor_name})</div> */}
          </div>
          <div className={styles.semester}>{semester}</div>
          <div className={styles.bottomDescription}>
            <div className={styles.language}>접속 포트: {language}</div>
            {/* <PlayIcon
              className={`${styles.icon} ${
                type === "vscode" ? styles.disabledIcon : ""
              }`}
              onClick={handlePlayClick}
            /> */}
          </div>
        </div>
      </div>
      {ssh_commands && (
        <SSHModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          content={ssh_commands}
        />
      )}
    </>
  );
}
