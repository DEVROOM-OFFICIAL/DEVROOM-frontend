import {
  type ClassCreationSchema,
  ContainerCheckSchema,
  ContainerDeleteSchema,
} from "@/type/schemas";

export interface ICreateClassArgs {
  professorId: string;
  classData: ClassCreationSchema;
}

export interface IDeleteClassArgs {
  professorId: string;
  deleteData: ContainerDeleteSchema;
}

export interface IPodTable {
  filteredData: ContainerCheckSchema[];
}

export interface IDelete {
  className: string;
  type: string;
  status: string;
  command: string;
}
