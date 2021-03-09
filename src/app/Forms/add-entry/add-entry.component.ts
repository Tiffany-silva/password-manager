import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth/auth.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../Services/category/category.service';
import {cryptoKey} from '../../Config/config.cryptoKey';
import {CryptoService} from '../../Services/cryto/crypto.service';
import {PasswordEntryService} from '../../Services/password-entry/password-entry.service';
import {TokenStorageService} from '../../Services/token-storage/token-storage.service';

@Component({
	selector: 'app-add-entry',
	templateUrl: './add-entry.component.html',
	styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

	hide: boolean = true;
	hideConfirm: boolean = true;
	newEntryForm: FormGroup;
	categories: any = [];
	readonly id: any;
	selected = new FormControl('', Validators.required);

	constructor(private formBuilder: FormBuilder, private cryptoService: CryptoService,
				private entry: PasswordEntryService, private authService: AuthService, private router: Router,
				private categoryService: CategoryService, private tokenService: TokenStorageService) {
		this.id = JSON.parse(this.tokenService.getUser()).id;
	}

	ngOnInit(): void {
		this.createForm();
	}

	ngAfterViewInit(): void {
		this.getCategories();
	}

	createForm() {
		this.newEntryForm = this.formBuilder.group({
			'username':[null, [Validators.required]],
			'site': [null, [Validators.required]],
			'password': [null, [Validators.required]],
			'confirmPassword': [null, [Validators.required]],
		}, {validator: this.repeatPasswordValidator});
	}

	//confirm password validator
	repeatPasswordValidator(c: AbstractControl) {
		const password = (c.get('password')) ? c.get('password').value : null;
		console.log(password)
		const passwordConfirm = (c.get('confirmPassword')) ? c.get('confirmPassword').value : null;
		return password === passwordConfirm ? null : {passwordsNotEqual: true};
	}

	encrypted(password: any) {
		let encrypted = this.cryptoService.set(cryptoKey, password);
		return encrypted;
	}

	onSubmit(values: any) {
		let encrypt = this.encrypted(values.password);
		let entry = {
			username: values.username,
			password: encrypt,
			site: values.site,
			categoryId: this.selected.value.id,
			userId: this.id
		};


		this.entry.createEntry(entry).subscribe(data => {
			this.router.navigate(['/home']).then(() => {
				window.location.reload();
			});
		});
	}



	getCategories() {
		this.categoryService.getAllCategory().subscribe(data => {
			this.categories = data;
		});
	}
}
