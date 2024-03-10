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
    this.budgetsArray = this.iBudgetService.getSavedBudgets();
    if(value.length > 0) {
      this.budgetsArray = this.budgetsArray.filter(budget => 
        budget.name.toLowerCase().includes(value.toLowerCase()));
    }
  }

  ascendingDate = false;
  searchDate(){
    this.budgetsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if(this.ascendingDate) {
      this.budgetsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      this.budgetsArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    this.ascendingDate = !this.ascendingDate;
  }
  
  ascendingTotal = false;
  searchTotal(){
    // this.budgetsArray = this.iBudgetService.getSavedBudgets()
    if(this.ascendingTotal) {
      this.budgetsArray.sort((a, b) => b.total - a.total);
    } else {
      this.budgetsArray.sort((a, b) => a.total - b.total);
    }
    this.ascendingTotal = !this.ascendingTotal;
  }

ascendingName = false;
searchName(){
  this.budgetsArray = this.iBudgetService.getSavedBudgets()
  if(this.ascendingName) {
    this.budgetsArray.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    this.budgetsArray.sort((a, b) => a.name.localeCompare(b.name));
  }
  this.ascendingName = !this.ascendingName;
}
}
