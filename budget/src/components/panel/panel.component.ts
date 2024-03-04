import { Component, Input, SimpleChanges, inject, TemplateRef} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BudgetService } from '../../app/services/budget.service';
import { Ibudget } from '../../app/interfaces/i-budget';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgbDatepickerModule, WelcomeComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Input() formGroup!: FormGroup;
  @Input() budgets : Ibudget[] = [];
  @Input() enabled: boolean = false
  public form: FormGroup;

  constructor(private iBudgetService: BudgetService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      pages: [''],
      language: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['budgets'] && changes['budgets'].currentValue && changes['budgets'].currentValue.length > 0) {
      this.pages.valueChanges.subscribe(value => {
        if (value !== null) {
          this.budgets[0].pagesWeb = value;
          this.budgets[0].totalWeb = this.iBudgetService.calculateTotalWeb(this.budgets[0]); 
          this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]); 
        }
      });
  
      this.language.valueChanges.subscribe(value => {
        if (value !== null) {
          this.budgets[0].languagesWeb = value;
          this.budgets[0].totalWeb = this.iBudgetService.calculateTotalWeb(this.budgets[0]); 
          this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]); 
        }
      });
    }
  }

  pages = new FormControl(0);
  language = new FormControl(0);

  get pagesValue() {
    return this.pages.value;
  }

  get languageValue() {
    return this.language.value;
  }

  down(letter:string) {
    if(letter === 'l'){
      if(this.languageValue){
        this.language.setValue(+this.languageValue - 1);
      }
    } else if (letter === 'p'){
      if(this.pagesValue){
        this.pages.setValue(+this.pagesValue - 1);
      }
    }
  }

  up(letter:string)  {
    if(letter === 'l'){
      if(this.languageValue || this.languageValue == 0){
        this.language.setValue(+this.languageValue + 1);
      
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
// end modal 


resetPriceWeb(){
  this.pages.setValue(0);
  this.language.setValue(0);
}

resetCheck3(){
  this.resetPriceWeb();
}

}

