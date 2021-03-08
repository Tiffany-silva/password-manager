import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    // this.setPaginationData(this.socialEntries);
  }
  socialEntries = [{site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
     {site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.yahoo.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.it.com', username: 'tiff@gmail.com', password: 'Qwerty123'}];

  bankAccountEntries = [{site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.yahoo.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.it.com', username: 'tiff@gmail.com', password: 'Qwerty123'}];

  emailEntries = [{site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.yahoo.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
    {site: 'www.it.com', username: 'tiff@gmail.com', password: 'Qwerty123'}];


  ngOnInit(): void {
  }

  showPassword = async (selectedItem:any) => {
    console.log("clicked")
    console.log(selectedItem);
    const { value: password } = await Swal.fire({
      title: 'Master Password Required',
      input: 'password',
      inputPlaceholder: 'Master Password',
      inputAttributes: {
        maxlength: '32',
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })

    if (password) {
      Swal.fire(`Entered password: ${password}`)
    }

  };

  setPaginationData(entries:any){
    this.dataSource= new MatTableDataSource<any>(entries);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

}
