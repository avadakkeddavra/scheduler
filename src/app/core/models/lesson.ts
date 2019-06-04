import {Teacher} from './teacher';
import {Cafedra} from './cafedra';

export interface Lesson {
  id?: number;
  name: string;
  cafedra_id: number;
  teacher_id: number;
  teacher?: Teacher;
  cafedra?: Cafedra;
}
