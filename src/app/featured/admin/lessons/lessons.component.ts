import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CreateGroupDialogComponent} from '../../../shared/create-group-dialog/create-group-dialog.component';
import {GroupsService} from '../../../core/services/groups.service';
import {Group} from '../../../core/models/group';
import {Cafedra} from '../../../core/models/cafedra';
import {CafedrasService} from '../../../core/services/cafedras.service';
import {Teacher} from '../../../core/models/teacher';
import {TeacherService} from '../../../core/services/teacher.service';
import {LessonsService} from '../../../core/services/lessons.service';
import {CreateLessonDialogComponent} from '../../../shared/create-lesson-dialog/create-lesson-dialog.component';
import {Lesson} from '../../../core/models/lesson';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  pagination = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  displayedColumns: string[] = ['select', 'id', 'name', 'cafedra', 'teacher', 'actions'];
  selection = new SelectionModel<any>(true, []);
  Cafedras: Cafedra[] = [];
  Teachers: Teacher[] = [];

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    public dialog: MatDialog,
    private GroupService: GroupsService,
    private CaferaService: CafedrasService,
    private LessonService: LessonsService,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getLessons();
    this.CaferaService.getAll().subscribe((data: Cafedra[]) => {
      this.Cafedras = data;
    });

    this.teacherService.getAll().subscribe((data: Teacher[]) => {
      this.Teachers = data;
    });
  }

  getLessons() {
    this.LessonService.getAllWithPagintaion(this.pagination).subscribe((data: any) => {
      this.pagination.length = data.count;
      this.dataSource = new MatTableDataSource<any>(data.rows);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateLessonDialogComponent, {
      width: '100vw',
      data: {
        cafedras: this.Cafedras,
        teachers: this.Teachers
      }
    });

    dialogRef.afterClosed().subscribe((data: Lesson) => {
      if (data) {
        this.createGroup(data);
      }
    });
  }

  openEditDialog(lesson: Lesson) {
    const dialogRef = this.dialog.open(CreateLessonDialogComponent, {
      width: '100vw',
      data: {
        type: 'edit',
        cafedras: this.Cafedras,
        teachers: this.Teachers,
        lesson
      }
    });

    dialogRef.afterClosed().subscribe((data: Lesson) => {
      if (data) {
        this.update(data.id, data);
      }
    });
  }

  update(id: number, data: Lesson) {
    this.LessonService.update(id, data).subscribe((res: Lesson) => {
      data.teacher = this.Teachers.find((item) => item.id === data.teacher_id);
      data.cafedra = this.Cafedras.find((item) => item.id === data.cafedra_id);
      this.snackBar.open('Successfully updated', 'close', {
        duration: 4000,
      });
    });
  }
  createGroup(data: Lesson) {
    this.LessonService.create(data).subscribe((res: Lesson) => {
      this.dataSource.data.push(res);
      this.rebuildWithNewData(this.dataSource.data);
    });
  }

  delete(id: number) {
    const conf = confirm('Are you sure');
    if (!conf) return;
    this.LessonService.delete(id).subscribe((res: Lesson) => {
      const data = this.dataSource.data.filter((item) => item.id !== id);
      this.rebuildWithNewData(data);
      this.snackBar.open('Successfully deleted', 'close', {
        duration: 4000
      });
    });
  }

  bulkDelete() {
    const conf = confirm('Are you sure');
    if (!conf) return;
    const ids = this.selection.selected.map((item) => (item.id));
    this.LessonService.bulkDelete(ids).subscribe((res) => {
      const data = this.dataSource.data.filter((item) => !ids.includes(item.id));
      this.rebuildWithNewData(data);
      this.snackBar.open('Successfully deleted', 'close', {
        duration: 4000
      });
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  rebuildWithNewData(data: Group[]) {
    this.dataSource = new MatTableDataSource<Group>(data);
  }

  onChangePage(page) {
    this.pagination = page;
    this.getLessons();
  }
}
