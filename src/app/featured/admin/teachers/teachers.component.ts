import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CreateTeacherDialogComponent} from '../../../shared/create-teacher-dialog/create-teacher-dialog.component';
import {CafedrasService} from '../../../core/services/cafedras.service';
import {Cafedra} from '../../../core/models/cafedra';
import {Teacher} from '../../../core/models/teacher';
import {TeacherService} from '../../../core/services/teacher.service';
import {Group} from '../../../core/models/group';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  pagination = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'id', 'name', 'position', 'cafedra', 'token', 'actions'];
  selection = new SelectionModel<any>(true, []);
  constructor(
    public dialog: MatDialog,
    private CaferaService: CafedrasService,
    private teacher: TeacherService,
    private snackBar: MatSnackBar
  ) { }
  Cafedras: Cafedra[] = [];
  ngOnInit() {
    this.CaferaService.getAll().subscribe((data: Cafedra[]) => {
      this.Cafedras = data;
    });
    this.getTeachers();
  }

  getTeachers() {
    this.teacher.getAllWithPagination(this.pagination).subscribe((data: any) => {
      this.pagination.length = data.count;
      this.rebuildWithNewData(data.rows);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateTeacherDialogComponent, {
        width: '100vw',
        data: {
          cafedras: this.Cafedras
        }
      }
    );

    dialogRef.afterClosed().subscribe((res: Teacher) => {
      this.create(res);
    });
  }

  openEditDialog(teacher: Teacher) {
    const dialogRef = this.dialog.open(CreateTeacherDialogComponent, {
        width: '100vw',
        data: {
          type: 'edit',
          cafedras: this.Cafedras,
          teacher
        }
      }
    );

    dialogRef.afterClosed().subscribe((res: Teacher) => {
      this.update(res.id, res);
    });
  }

  create(data: Teacher) {
    this.teacher.create(data).subscribe((res: TeacherService) => {
      this.dataSource.data.push(res);
      this.rebuildWithNewData(this.dataSource.data);
    });
  }

  update(id: number, data: Teacher) {
    this.teacher.update(id, data).subscribe((res: TeacherService) => {
      this.snackBar.open('Successfully updated', 'close', {
        duration: 4000,
      });
    });
  }
  delete(id: number) {
    const conf = confirm('Are you sure');
    if (!conf) return;
    this.teacher.delete(id).subscribe((res: Group) => {
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
    this.teacher.bulkDelete(ids).subscribe((res) => {
      const data = this.dataSource.data.filter((item) => !ids.includes(item.id));
      this.rebuildWithNewData(data);
      this.snackBar.open('Successfully deleted', 'close', {
        duration: 4000
      });
    });
  }
  copy(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.snackBar.open('Copied', '', {
      duration: 4000
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

  rebuildWithNewData(data: Teacher[]) {
    this.dataSource = new MatTableDataSource<Teacher>(data);
  }

  onChangePage(page) {
    this.pagination = page;
    this.getTeachers();
  }

  refreshToken( data: Teacher) {
    this.teacher.refreshToken(data.id).subscribe(token => {
      data.token = token;
    });
  }
}
