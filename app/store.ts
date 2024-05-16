import { proxy } from "valtio";

export type Task = {
  id: string;
  content: string;
  isDone: boolean;
};

export const tasksState = proxy<Task[]>([]);
