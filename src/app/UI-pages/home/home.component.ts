import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {CryptoService} from '../../Services/cryto/crypto.service';
import {cryptoKey} from '../../Config/config.cryptoKey';
import {PasswordEntryService} from '../../Services/password-entry/password-entry.service';
import {TokenStorageService} from '../../Services/token-storage/token-storage.service';
import {AuthService} from '../../Services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  id:any;
  socialEntries:any=[];
  bankAccountEntries:any=[];
  emailEntries:any=[];

  constructor(private cryptoService:CryptoService, private router:Router,
              private entryService:PasswordEntryService, private tokenService:TokenStorageService, private authService:AuthService) {
    this.id= JSON.parse(this.tokenService.getUser()).id;

  }
  // socialEntries = [{site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //    {site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.yahoo.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.it.com', username: 'tiff@gmail.com', password: 'Qwerty123'}];
  //
  // bankAccountEntries = [{site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.yahoo.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.it.com', username: 'tiff@gmail.com', password: 'Qwerty123'}];
  //
  // emailEntries = [{site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.google.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.yahoo.com', username: 'tiff@gmail.com', password: 'Qwerty123'},
  //   {site: 'www.it.com', username: 'tiff@gmail.com', password: 'Qwerty123'}];


  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.getEntriesOfUser();
  }

  showPassword = async (selectedItem:any) => {
    console.log("clicked")
    console.log(selectedItem);

    const { value: password } = await Swal.fire({
      title: 'Master Password Required',
      input: 'password',
      inputPlaceholder: 'Master Password',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        return '';
      },
      inputAttributes: {
        maxlength: '32',
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })

    if (password) {
      this.authService.validateMasterPassword(this.id, password).subscribe(data=>{
        console.log(data);
        if(data.message==='success'){
          console.log('im hereeeeeeee')
          this.decryptValue(selectedItem);
        }
      })
    }
  };

  decryptValue(entry:any){
    console.log(entry)
    let decrypt=this.cryptoService.get(cryptoKey, entry.password);
    Swal.fire(`Site: ${entry.site} \n Username:  ${entry.username} \n Password: ${decrypt} `)
  }


  getEntriesOfUser(){
    this.entryService.getAllEntriesOfUser(this.id).subscribe(data=>{
      if(data){
        console.log(data);
        data.forEach(entry=>{
          if(entry.category.categoryName==='Social Media'){
            this.socialEntries.push(entry);
          }else if(entry.category.categoryName==='Emails'){
            this.emailEntries.push(entry);
          }else if(entry.category.categoryName==='Bank Accounts'){
            this.bankAccountEntries.push(entry);
          }
        })
      }
      console.log(this.emailEntries);
    })
  }

  logout(){
    this.authService.logout(this.id).subscribe(data=>{
      this.tokenService.signOut();
      this.router.navigate(['/login'])
    })
  }
}
