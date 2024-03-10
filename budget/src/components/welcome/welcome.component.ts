import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../../app/services/budget.service';
import { Ibudget } from '../../app/interfaces/i-budget';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @Input() budgets : Ibudget[] = [];
  @Output() sendClicked = new EventEmitter<void>();
  @Output() sendResetCheck3 = new EventEmitter<void>();

  constructor(private iBudgetService: BudgetService) {}

  get name(){
    return this.formUser.get('name') as FormControl;
  }

  get telephone(){
    return this.formUser.get('telephone') as FormControl;
  }

  get email(){
    return this.formUser.get('email') as FormControl;
  }

  formUser = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]),
    'telephone' : new FormControl('', [Validators.required, Validators.pattern(/^(?:(?:\+?[0-9]{2,4})?[ ]?[6789][0-9 ]{8,13})$/)]),
    'email' : new FormControl('', [Validators.required, Validators.email])
  });

  errorTotal = false;

  triggerReset(){
    this.sendResetCheck3.emit();
  }
  
  send() {
    if (this.budgets[0].total == 0) {
      this.errorTotal = true;
    } else {
      if (this.formUser.value.name) {
        this.budgets[0].name = this.formUser.value.name;
      }
      if (this.formUser.value.telephone) {
        this.budgets[0].telephone = Number(this.formUser.value.telephone);
      }
      if (this.formUser.value.email) {
        this.budgets[0].email = this.formUser.value.email;
      }
      this.errorTotal = false;
      this.formUser.reset();

    }
    if (this.budgets[0].total > 0) {
      this.iBudgetService.addBudget(this.budgets[0]); 
      this.sendClicked.emit();
      this.triggerReset();
      this.budgets[0].date = new Date();
      this.budgets[0].total = 0;
      this.budgets[0].totalWeb = 0;
  // console.table(this.iBudgetService.getBudget());
  // console.table(this.iBudgetService.getSavedBudgets());
    }
  return this.errorTotal;
  }
}
