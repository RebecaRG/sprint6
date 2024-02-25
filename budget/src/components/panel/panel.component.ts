import { Component, Input, SimpleChanges, OnInit, inject, TemplateRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BudgetService } from '../../app/services/budget.service';
import { Ibudget } from '../../app/interfaces/i-budget';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgbDatepickerModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Input() formGroup!: FormGroup 
  @Input() budgets : Ibudget[] = [];

  constructor(private iBudgetService: BudgetService, private form: FormBuilder) {
    this.formGroup = this.form.group({
      pages: new FormControl(0, [Validators.required, Validators.minLength(2)]),
      lenguage: new FormControl(0, [Validators.required, Validators.minLength(2)]),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['budgets'] && changes['budgets'].currentValue && changes['budgets'].currentValue.length > 0) {
      this.pages.valueChanges.subscribe(value => {
        if (value !== null) {
          this.budgets[0].pagesWeb = value;
          this.budgets[0].totalWeb = this.iBudgetService.calculateTotalWeb(this.budgets[0]); 
          this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]); 
          console.log("totalWeb= " + this.budgets[0].totalWeb, "pagesWeb= " + this.budgets[0].pagesWeb)
        }
      });
  
      this.lenguage.valueChanges.subscribe(value => {
        if (value !== null) {
          this.budgets[0].lenguagesWeb = value;
          this.budgets[0].totalWeb = this.iBudgetService.calculateTotalWeb(this.budgets[0]); 
          this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]); 
          console.log("totalWeb= " + this.budgets[0].totalWeb, "lenguagesWeb= " + this.budgets[0].lenguagesWeb)
        }
      });
    }
  }

  pages = new FormControl(0);
  lenguage = new FormControl(0);

  get pagesValue() {
    return this.pages.value;
  }

  get lenguageValue() {
    return this.lenguage.value;
  }

  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }
  
  down(letter:string) {
    if(letter === 'l'){
      if(this.lenguageValue){
        this.lenguage.setValue(+this.lenguageValue - 1);
      }
    } else if (letter === 'p'){
      if(this.pagesValue){
        this.pages.setValue(+this.pagesValue - 1);
      }
    }
  }

  up(letter:string)  {
    if(letter === 'l'){
      if(this.lenguageValue || this.lenguageValue == 0){
        this.lenguage.setValue(+this.lenguageValue + 1);
      
      }
    } else if (letter === 'p'){
      if(this.pagesValue || this.pagesValue == 0){
        this.pages.setValue(+this.pagesValue + 1) ;
      }
    }
  }

// modal
private modalService = inject(NgbModal);
closeResult = '';

open(content: TemplateRef<any>) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  switch (reason) {
    case ModalDismissReasons.ESC:
      return 'by pressing ESC';
    case ModalDismissReasons.BACKDROP_CLICK:
      return 'by clicking on a backdrop';
    default:
      return `with: ${reason}`;
  }
}
}

