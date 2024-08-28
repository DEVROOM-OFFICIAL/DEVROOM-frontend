"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Logo2Icon from "/public/icons/Logo2.svg";
import { useUserStore } from "@/store/userStore";
import { useCreateClass } from "@/api/hooks/useProfessor";
import { type ClassCreationSchema } from "@/type/schemas";

const CreateContainerPage = () => {
  const { studentId } = useUserStore();
  const [classId, setClassId] = useState<string>("");
  const [studentIds, setStudentIds] = useState<string[]>([""]);
  const [type, setType] = useState<string>("vscode");
  const [scripts, setScripts] = useState<string[]>([]);

  const { mutate: createClass, status } = useCreateClass();


  const containerData: ClassCreationSchema = {
    className: classId,
    studentIds,
    options
    : type === "vscode" 
    ? { vscode: "yes" } 
    : type === "web_ssh" 
    ? { web_ssh: "yes" } 
    : { ssh: "yes" }
    ,
    command: [],
    customScript: scripts,
  };

  const handleStudentIdChange = (index: number, value: string) => {
    const newStudentIds = [...studentIds];
    newStudentIds[index] = value;
    setStudentIds(newStudentIds);
  };

  const handleAddStudentId = () => {
    setStudentIds([...studentIds, ""]);
  };

  const handleRemoveStudentId = (index: number) => {
    const newStudentIds = [...studentIds];
    newStudentIds.splice(index, 1);
    setStudentIds(newStudentIds);
  };

  const handleScriptChange = (value: string) => {
    if (scripts.includes(value)) {
      setScripts(scripts.filter((script) => script !== value));
    } else {
      setScripts([...scripts, value]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("data:", containerData);
    createClass({ professorId: studentId, classData: containerData });
  };

  // 로딩 및 에러 처리
  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: Failed to create container</div>;

  return (
    <>
      <h1 className={styles.title}>컨테이너 생성</h1>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Logo2Icon />
          <div className={styles.logoText}>Create Container</div>
          <div className={styles.grayText}>
            Create a container for your class
          </div>
        </div>
        <div className={styles.rightContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="classId">Class ID</label>
              <input
                type="text"
                id="classId"
                value={classId}
                placeholder="ex) java2024"
                onChange={(e) => setClassId(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Student List</label>

              {studentIds.map((studentId, index) => (
                <div key={index} className={styles.studentIdRow}>
                  <input
                    type="text"
                    value={studentId}
                    placeholder="학생 ID"
                    onChange={(e) =>
                      handleStudentIdChange(index, e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveStudentId(index)}
                    className={styles.removeButton}
                  >
                    -
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddStudentId}
                className={styles.addButton}
              >
                +
              </button>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="vscode">VSCode</option>
                <option value="ssh">SSH (Terminal)</option>
                <option value="web_ssh">SSH (Web)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Custom Script</label>
              <div className={styles.checkboxGroup}>
                <div className={styles.firstLine}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="python"
                      name="customScript"
                      value="python"
                      checked={scripts.includes("python")}
                      onChange={(e) => handleScriptChange(e.target.value)}
                    />
                    <label htmlFor="python">python</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="nodejs"
                      name="customScript"
                      value="nodejs"
                      checked={scripts.includes("nodejs")}
                      onChange={(e) => handleScriptChange(e.target.value)}
                    />
                    <label htmlFor="nodejs">nodejs</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="ruby"
                      name="customScript"
                      value="ruby"
                      checked={scripts.includes("ruby")}
                      onChange={(e) => handleScriptChange(e.target.value)}
                    />
                    <label htmlFor="ruby">ruby</label>
                  </div>
                </div>
                <div className={styles.firstLine}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="vim"
                      name="customScript"
                      value="vim"
                      checked={scripts.includes("vim")}
                      onChange={(e) => handleScriptChange(e.target.value)}
                    />
                    <label htmlFor="vim">vim</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="nginx"
                      name="customScript"
                      value="nginx"
                      checked={scripts.includes("nginx")}
                      onChange={(e) => handleScriptChange(e.target.value)}
                    />
                    <label htmlFor="nginx">nginx</label>
                  </div>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      id="golang"
                      name="customScript"
                      value="golang"
                      checked={scripts.includes("golang")}
                      onChange={(e) => handleScriptChange(e.target.value)}
                    />
                    <label htmlFor="golang">golang</label>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              생성
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateContainerPage;
