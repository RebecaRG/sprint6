import { Injectable } from '@angular/core';
import { Ibudget } from '../interfaces/i-budget';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private initialBudget: Ibudget = {
    name: '',
    telephone: 0,
    email: '',
    services: [],
    pagesWeb: 0,
    languagesWeb: 0,
    totalWeb: 0,
    total: 0,
    date: new Date()
  };
  public budgets: Ibudget[] = [JSON.parse(JSON.stringify(this.initialBudget))];
  public savedBudgets: Ibudget[] = [];

  constructor(private router: Router) {
    const hash = window.location.hash.substring(1);
    if (hash) {
      this.savedBudgets = JSON.parse(decodeURIComponent(hash));
    }
  }

  calculateTotalWeb(budget: Ibudget): number {
    return budget.pagesWeb * budget.languagesWeb * 30;
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
  getSavedBudgets(): Ibudget[] { 
    return this.savedBudgets;
  }

  resetBudget() {
     this.budgets[0] = JSON.parse(JSON.stringify(this.initialBudget));
  }

  addBudget(budget: Ibudget){
    let budgetCopy = JSON.parse(JSON.stringify(budget)); 
    budgetCopy.totalWeb = this.calculateTotalWeb(budgetCopy);
    budgetCopy.total = this.calculateTotal(budgetCopy);
    this.savedBudgets.push(budgetCopy); 

    let urlDirection = {
      seo: budgetCopy.services.includes('seo') ? 'true' : 'false',
      Ads: budgetCopy.services.includes('ads') ? 'true' : 'false',
      WebPage: budgetCopy.services.includes('web') ? 'true' : 'false',
      pages: budgetCopy.pagesWeb,
      lang: budgetCopy.languagesWeb
    };
  
    this.router.navigate(['/home'], { queryParams: urlDirection });

    this.resetBudget(); 
  }

}