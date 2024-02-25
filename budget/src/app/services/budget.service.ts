import { Injectable } from '@angular/core';
import { Ibudget } from '../interfaces/i-budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  public budgets: Ibudget[] = [{
    name: '',
    telephone: 0,
    email: '',
    services: [],
    pagesWeb: 0,
    lenguagesWeb: 0,
    totalWeb: 0,
    total: 0
  }];

  constructor() {
    this.budgets.forEach(budget => {
      budget.totalWeb = this.calculateTotalWeb(budget);
      budget.total = this.calculateTotal(budget);
    });
  }

  calculateTotalWeb(budget: Ibudget): number {
    return budget.pagesWeb * budget.lenguagesWeb * 30;
  }

  calculateTotal(budget: Ibudget): number {
    let total = 0;
    budget.services.forEach(service => {
      switch(service) {
        case 'seo':
          total += 300;
          break;
        case 'ads':
          total += 400;
          break;
        case 'web':
          total += 500;
          break;
      }
    });
    total += this.calculateTotalWeb(budget);
    return total;
  }

  getBudget(): Ibudget[]{
    return this.budgets;
  }
}
