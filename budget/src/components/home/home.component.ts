import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../../app/services/budget.service';
import { Ibudget } from '../../app/interfaces/i-budget';
import { WelcomeComponent } from '../welcome/welcome.component'; 
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent, WelcomeComponent, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  public iBudgetService: BudgetService = inject(BudgetService)
  budgets: Ibudget[] = this.iBudgetService.getBudget();
  formParent: FormGroup;
  @ViewChild(PanelComponent) panelComponent!: PanelComponent;

  constructor(private formBuilder: FormBuilder) {
    this.formParent = this.formBuilder.group({
      price0: new FormControl(),
      price1: new FormControl(),
      price2: new FormControl(),
      webService: this.formBuilder.group({
        numPages: new FormControl(),
        numLanguages: new FormControl()  
      })
    });
  }

  get isFlexCheck2Selected(): boolean {
    return this.formParent.get('price2')?.value;
  }
  
  select(service: string) {
    let search = this.budgets[0].services.indexOf(service as "seo" | "ads" | "web");
  
    if (search === -1) {
      this.budgets[0].services.push(service as "seo" | "ads" | "web");
      if (service === 'web') {
        this.formParent.get('price2')?.setValue(true);
      }
      this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]);
    } else {
      const index = this.budgets[0].services.indexOf(service as "seo" | "ads" | "web");
      if (index > -1) {
        this.budgets[0].services.splice(index, 1);
      }
      if (service === 'web') {
        this.formParent.get('price2')?.setValue(false);
        this.panelComponent.resetPriceWeb();
      }
    }
    this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]);
  }

onSendClicked() {
  this.formParent.reset();
  this.budgets[0].total = 0;
  this.budgets[0].totalWeb = 0;
  this.resetPanelCheck3();
}

resetPanelCheck3() {
  this.panelComponent.resetCheck3();
}

};
