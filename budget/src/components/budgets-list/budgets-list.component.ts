import { Component, Input } from '@angular/core';
import { BudgetService } from '../../app/services/budget.service';
import { Ibudget } from '../../app/interfaces/i-budget';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
  @Input() budgets : Ibudget[] = [];
  @Input() savedBudgets : Ibudget[] = [];

  constructor(private iBudgetService: BudgetService) {}
  budgetsArray = this.iBudgetService.getSavedBudgets()
  

  enter(value: string) {
    this.budgetsArray = this.budgetsArray.filter(budget => budget.name.toLowerCase() === value.toLocaleLowerCase());
  }

  searchDate(){
    this.budgetsArray = this.iBudgetService.getSavedBudgets()
    this.budgetsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  searchTotal(){
    this.budgetsArray = this.iBudgetService.getSavedBudgets()
    this.budgetsArray.sort((a, b) => a.total - b.total);
  }

searchName(){
  this.budgetsArray = this.iBudgetService.getSavedBudgets()
  this.budgetsArray.sort((a, b) => a.name.localeCompare(b.name));
}
}
