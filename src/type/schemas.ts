export interface ServiceSchema {
  name: string;
  clusterIP: string;
  labels: {
    class_id: string;
    connection: string;
    professor_id: string;
    student_id: string;
  };
  creationTimestamp: string;
  port: number;
  type: string;
  selector: {
    app: string;
  };
  sessionAffinity: string;
  externalIPs: string[];
  loadBalancerIngress: string[];
  endpointAddresses: string[];
}

export interface ClassCreationSchema {
  className: string;
  studentIds: string[];
  options: { [key: string]: string };
  command: string[];
  customScript: string[];
}

export interface ContainerCheckSchema {
  name: string;
  ip: string;
  labels: {
    app: string;
    class_id: string;
    connection: string;
    "pod-template-hash": string;
    professor_id: string;
    student_id: string;
  };
  creationTimestamp: string;
  status: string;
}

export interface ContainerDeleteSchema {
  className: string;
  studentId: string;
}
