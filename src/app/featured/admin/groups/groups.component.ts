import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CreateGroupDialogComponent} from '../../../shared/create-group-dialog/create-group-dialog.component';
import {GroupsService} from '../../../core/services/groups.service';
import {Group} from '../../../core/models/group';
import {Cafedra} from '../../../core/models/cafedra';
import {CafedrasService} from '../../../core/services/cafedras.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  pagination = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  displayedColumns: string[] = ['select', 'id', 'name', 'cafedra', 'actions'];
  selection = new SelectionModel<any>(true, []);
  Cafedras: Cafedra[] = [];

  dataSource = new MatTableDataSource<Group>([]);

  constructor(
    public dialog: MatDialog,
    private GroupService: GroupsService,
    private CaferaService: CafedrasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getGroups();
    this.CaferaService.getAll().subscribe((data: Cafedra[]) => {
      this.Cafedras = data;
    });
  }

  getGroups() {
    this.GroupService.getAll(this.pagination).subscribe((data: any) => {
      this.pagination.length = data.count;
      this.dataSource = new MatTableDataSource<Group>(data.rows);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '100vw',
      data: {
        cafedras: this.Cafedras
      }
    });

    dialogRef.afterClosed().subscribe((data: Group) => {
      this.createGroup(data);
    });
  }

  openEditDialog(group: Group) {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '100vw',
      data: {
        type: 'edit',
        cafedras: this.Cafedras,
        group
      }
    });

    dialogRef.afterClosed().subscribe((data: Group) => {
      this.updateGroup(data.id, data);
    });
  }

  updateGroup(id: number, data: Group) {
    this.GroupService.update(id, data).subscribe((res: Group) => {
      this.snackBar.open('Successfully updated', 'close', {
        duration: 4000,
      });
    });
  }
  createGroup(data: Group) {
    this.GroupService.create(data).subscribe((res: Group) => {
      this.dataSource.data.push(res);
      this.rebuildWithNewData(this.dataSource.data);
    });
  }

  delete(id: number) {
    const conf = confirm('Are you sure');
    if (!conf) return;
    this.GroupService.delete(id).subscribe((res: Group) => {
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
    this.GroupService.bulkDelete(ids).subscribe((res) => {
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
    this.getGroups();
  }
}
