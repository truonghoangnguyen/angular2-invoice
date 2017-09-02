// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'app';
// }


import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class InvoiceItem {
  stt = '';
  name = '';
  unit = '';
  qty = '';
  cost = '';
  total = 0;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  customer_info = {
    name: 'Mr. John Doe',
    web_link: 'John Doe Designs Inc.',
    address1: '1 Infinite Loop',
    address2: 'Cupertino, California, US',
    postal: '90210'
  };
  company_info = {
    name: 'Metaware Labs',
    web_link: 'www.metawarelabs.com',
    address1: '123 Yonge Street',
    address2: 'Toronto, ON, Canada',
    postal: 'M5S 1B6'
  };

  public invoice = {items: [],
    customer_info: this.customer_info,
    company_info: this.company_info
  };

  logoSrc = 'http://metaware.github.io/angular-invoicing/images/metaware_logo.png';

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.addItem();
  }

  get invoiceItems(): FormArray {
    return this.form.get('invoiceItems') as FormArray;
  };

  toggleLogo() {}
  editLogo() {}

  addItem() {
    this.invoiceItems.push(this.fb.group(new InvoiceItem()));
  }

  removeItem(item) {

    let i = this.invoiceItems.controls.indexOf(item);

    if(i != -1) {
    	this.invoiceItems.controls.splice(i, 1);
      let items = this.form.get('invoiceItems') as FormArray;
    	let data = {invoiceItems: items};
    	this.updateForm(data);
    }
  }

  onSubmit(){//f: NgForm){

  }

  updateForm(data) {
    const items = data.invoiceItems;
    let sub = 0;
    for(let i of items){
      i.total = i.qty*i.cost;
      sub += i.total;
    }
    this.form.value.subTotal = sub;
    const tax = sub * (this.form.value.taxPercent / 100);
    this.form.value.tax = tax;
    this.form.value.grantTotal = sub + tax;
  }
  createForm() {
    this.form = this.fb.group({
      invoiceName: ['', Validators.required ],
      invoiceItems: this.fb.array([]),
      subTotal:[{value: 0, disabled: true}],
      taxPercent:[],
      tax: [0],

      grantTotal:[{value: 0, disabled: true}],
    });

   this.form.valueChanges.subscribe(data => this.updateForm(data));

  }

}
