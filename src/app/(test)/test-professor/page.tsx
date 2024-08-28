"use client";

import React, { useState } from "react";
import {
  useFetchCheck,
  useCreateClass,
  useDeleteClass,
} from "@/api/hooks/useProfessor";
import { useUserStore } from "@/store/userStore";

const TestPage = () => {
  const { studentId } = useUserStore();
  const {
    data: checkData,
    status: checkStatus,
    error: checkError,
  } = useFetchCheck();

  const [className, setClassName] = useState("");
  const [studentIds, setStudentIds] = useState("");
  const [vscode, setVscode] = useState("");
  const [command, setCommand] = useState("");
  const [customScript, setCustomScript] = useState("");

  const [deleteClassName, setDeleteClassName] = useState("");
  const [deleteStudentId, setDeleteStudentId] = useState("");

  const {
    mutate: createClass,
    status: createStatus,
    error: createError,
  } = useCreateClass();
  const {
    mutate: deleteClass,
    status: deleteStatus,
    error: deleteError,
  } = useDeleteClass();

  const handleCreateClass = () => {
    const classData = {
      className,
      studentIds: studentIds.split(","),
      options: { vscode },
      command: command.split(","),
      customScript: customScript.split(","),
    };
    createClass({ professorId: studentId, classData });
  };

  const handleDeleteClass = () => {
    const deleteData = {
      className: deleteClassName,
      studentId: deleteStudentId,
    };
    deleteClass({ professorId: studentId, deleteData });
  };

  return (
    <div>
      <h1>Test Page</h1>
      <div>
        <h2>Fetch Check</h2>
        {checkStatus === "pending" ? (
          <p>Loading...</p>
        ) : checkStatus === "error" ? (
          <p>Error: {checkError.message}</p>
        ) : (
          <pre>{JSON.stringify(checkData, null, 2)}</pre>
        )}
      </div>
      <div>
        <h2>Create Class</h2>
        <input
          type="text"
          placeholder="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student IDs (comma separated)"
          value={studentIds}
          onChange={(e) => setStudentIds(e.target.value)}
        />
        <input
          type="text"
          placeholder='Options ("yes" or "no" for vscode)'
          value={vscode}
          onChange={(e) => setVscode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Command (comma separated)"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Custom Script (comma separated)"
          value={customScript}
          onChange={(e) => setCustomScript(e.target.value)}
        />
        <button
          onClick={handleCreateClass}
          disabled={createStatus === "pending"}
        >
          {createStatus === "pending" ? "Creating..." : "Create Class"}
        </button>
        {createStatus === "error" && <p>Error: {createError.message}</p>}
      </div>
      <div>
        <h2>Delete Class</h2>
        <input
          type="text"
          placeholder="Class Name"
          value={deleteClassName}
          onChange={(e) => setDeleteClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={deleteStudentId}
          onChange={(e) => setDeleteStudentId(e.target.value)}
        />
        <button
          onClick={handleDeleteClass}
          disabled={deleteStatus === "pending"}
        >
          {deleteStatus === "pending" ? "Deleting..." : "Delete Class"}
        </button>
        {deleteStatus === "error" && <p>Error: {deleteError.message}</p>}
      </div>
    </div>
  );
};

export default TestPage;
