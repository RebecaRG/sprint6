import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../../app/services/budget.service';
import { Ibudget } from '../../app/interfaces/i-budget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public iBudgetService: BudgetService = inject(BudgetService)
  budgets: Ibudget[] = this.iBudgetService.getBudget();

  formParent: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.initFormParent();
  }

  initFormParent(): void {
    this.formParent = new FormGroup(
      {
        price0: new FormControl(),
        price1: new FormControl(),
        price2: new FormArray([],),
      }
    )
  }

  get isFlexCheck2Selected(): boolean {
    return (this.formParent.get('price2') as FormArray).length > 0;
  }

  constructor(private form: FormBuilder) {
    this.formParent = form.group({
      addItem: new FormControl("", []),
    })
  }

  select(service: string) {

    let search = this.budgets[0].services.indexOf(service as "seo" | "ads" | "web");

    if (search === -1) {
      this.budgets[0].services.push(service as "seo" | "ads" | "web");
      if (service === 'web') {
        (this.formParent.get('price2') as FormArray).push(new FormControl());
      }
      this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]);
    } else {
      const index = this.budgets[0].services.indexOf(service as "seo" | "ads" | "web");
      if (index > -1) {
        this.budgets[0].services.splice(index, 1);
      }
      if (service === 'web') {
        let formArray = this.formParent.get('price2') as FormArray;
        if (formArray.length > 0) {
          formArray.removeAt(formArray.length - 1);
        }
        this.budgets[0].pagesWeb = 0;
        this.budgets[0].lenguagesWeb = 0;
        console.log("totalWeb= " + this.budgets[0].totalWeb);
      }

    }
    this.budgets[0].total = this.iBudgetService.calculateTotal(this.budgets[0]);
  };
}
