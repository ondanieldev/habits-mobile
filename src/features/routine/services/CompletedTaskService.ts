import { OffsetPaginated } from '../../../shared/interfaces/OffsetPaginated';
import { habitsApi } from '../../../shared/services/habitsApi';
import { CompletedTask } from '../interfaces/CompletedTask';
import { CreateCompletedTask } from '../interfaces/CreateCompletedTask';
import { ReadCompletedTaskList } from '../interfaces/RadCompletedTaskList';

export class CompletedTaskService {
  static async create(input: CreateCompletedTask): Promise<CompletedTask> {
    const response = await habitsApi.post<CompletedTask>(
      '/tasks/completed',
      input,
    );
    return response.data;
  }

  static async readList(
    input: ReadCompletedTaskList,
  ): Promise<OffsetPaginated<CompletedTask>> {
    const response = await habitsApi.get<OffsetPaginated<CompletedTask>>(
      '/tasks/completed',
      {
        params: input,
      },
    );
    return response.data;
  }

  static async delete(taskId: string): Promise<string> {
    await habitsApi.delete<CompletedTask>(`/tasks/completed/${taskId}`);
    return taskId;
  }
}
