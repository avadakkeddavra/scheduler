import {Cafedra} from './cafedra';

export interface Group {
  id?: number;
  name: string;
  cafedra_id: number;
  cafedra?: Cafedra;
}
