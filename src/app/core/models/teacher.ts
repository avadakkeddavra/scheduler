import {Cafedra} from './cafedra';

export interface Teacher {
  id?: number;
  name: string;
  position: string;
  cafedra_id: number;
  token: string;
  cafedra?: Cafedra;
}
