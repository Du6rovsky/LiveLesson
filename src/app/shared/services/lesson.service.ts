import http from "../../core/http";
import LessonEntity from "../../core/entities/Lesson.entity";

class LessonService {
  public getLesson(id: string) {
    return http.get(`/lesson/${id}`);
  }

  public createLesson(data: LessonEntity) {
    return http.post(`/lesson`, data);
  }

  public updateLesson(id: string, data: LessonEntity) {
    return http.put(`/lesson/${id}`, data);
  }
}

export const lessonService = new LessonService();
