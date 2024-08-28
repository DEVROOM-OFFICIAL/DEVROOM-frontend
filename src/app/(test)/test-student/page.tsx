"use client";

import React from "react";
import {
  useFetchService,
  useFetchPod,
  useFetchDeploy,
} from "@/api/hooks/useStudent";

const TestPage = () => {
  const {
    data: serviceData,
    status: serviceStatus,
    error: serviceError,
  } = useFetchService();
  const { data: podData, status: podStatus, error: podError } = useFetchPod();
  const {
    data: deployData,
    status: deployStatus,
    error: deployError,
  } = useFetchDeploy();

  return (
    <div>
      <h1>Test Page</h1>

      <section>
        <h2>Service Data</h2>
        {serviceStatus === "pending" ? (
          <p>Loading...</p>
        ) : serviceStatus === "error" ? (
          <p>Error: {serviceError.message}</p>
        ) : (
          <pre>{JSON.stringify(serviceData, null, 2)}</pre>
        )}
      </section>

      <section>
        <h2>Pod Data</h2>
        {podStatus === "pending" ? (
          <p>Loading...</p>
        ) : podStatus === "error" ? (
          <p>Error: {podError.message}</p>
        ) : (
          <pre>{JSON.stringify(podData, null, 2)}</pre>
        )}
      </section>

      <section>
        <h2>Deploy Data</h2>
        {deployStatus === "pending" ? (
          <p>Loading...</p>
        ) : deployStatus === "error" ? (
          <p>Error: {deployError.message}</p>
        ) : (
          <pre>{JSON.stringify(deployData, null, 2)}</pre>
        )}
      </section>
    </div>
  );
};

export default TestPage;
