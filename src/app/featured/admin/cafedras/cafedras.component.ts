import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CafedrasService} from '../../../core/services/cafedras.service';
import {Cafedra} from '../../../core/models/cafedra';
import {Teacher} from '../../../core/models/teacher';
import {Group} from '../../../core/models/group';
import {CreateCafedraDialogComponent} from '../../../shared/create-cafedra-dialog/create-cafedra-dialog.component';

@Component({
  selector: 'app-cafedras',
  templateUrl: './cafedras.component.html',
  styleUrls: ['./cafedras.component.scss']
})
export class CafedrasComponent implements OnInit {
  pagination = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['select', 'id', 'name', 'teachers', 'groups', 'actions'];
  selection = new SelectionModel<any>(true, []);
  constructor(
    public dialog: MatDialog,
    private CaferaService: CafedrasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCafedras();
  }

  getCafedras() {
    this.CaferaService.getAllWithPagintaion(this.pagination).subscribe((data: any) => {
      this.pagination.length = data.count;
      this.rebuildWithNewData(data.rows);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCafedraDialogComponent, {
        width: '100vw'
      }
    );

    dialogRef.afterClosed().subscribe((res: Teacher) => {
      if (res) {
        this.create(res);
      }
    });
  }

  openEditDialog(cafedra: Cafedra) {
    const dialogRef = this.dialog.open(CreateCafedraDialogComponent, {
        width: '100vw',
        data: {
          type: 'edit',
          cafedra
        }
      }
    );

    dialogRef.afterClosed().subscribe((res: Teacher) => {
      this.update(res.id, res);
    });
  }

  create(data: Cafedra) {
    this.CaferaService.create(data).subscribe((res) => {
      this.dataSource.data.push(res);
      this.rebuildWithNewData(this.dataSource.data);
    });
  }

  update(id: number, data: Cafedra) {
    this.CaferaService.update(id, data).subscribe((res) => {
      this.snackBar.open('Successfully updated', 'close', {
        duration: 4000,
      });
    });
  }
  delete(id: number) {
    const conf = confirm('Are you sure');
    if (!conf) return;
    this.CaferaService.delete(id).subscribe((res: Group) => {
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
    this.CaferaService.bulkDelete(ids).subscribe((res) => {
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
    this.getCafedras();
  }
}
