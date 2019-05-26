import {Teacher} from './teacher';
import {Group} from './group';

export interface Cafedra {
  id?: number;
  name: string;
  teachers?: Teacher[];
  groups?: Group[];
}
