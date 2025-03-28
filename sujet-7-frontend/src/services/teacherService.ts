import api from './api';
import type { Teacher } from '@/types/teacher';

export const teacherService = {
  async getAll(): Promise<Teacher[]> {
    const response = await api.get<Teacher[]>('/teachers');
    return response.data;
  },

  async create(teacher: Teacher): Promise<Teacher> {
    const response = await api.post<Teacher>('/teachers', teacher);
    return response.data;
  },

  async update(id: number, teacher: Partial<Teacher>): Promise<Teacher> {
    const response = await api.patch<Teacher>(`/teachers/${id}`, teacher);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/teachers/${id}`);
  }
};
