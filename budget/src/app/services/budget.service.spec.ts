import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import { Ibudget } from '../interfaces/i-budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
  it('should calculate the total price of the web', () => {
    const budgetTest: Ibudget = {
      name: 'Pere',
      telephone: 672345211,
      email: 'pere.perez@gmail.com',
      services: ['web', 'seo'],
      pagesWeb: 4,
      languagesWeb: 5,
      totalWeb: 0,
      total: 0,
      date: new Date()
    };

    const service: BudgetService = TestBed.inject(BudgetService);
    const totalWebTest = service.calculateTotalWeb(budgetTest);
    expect(totalWebTest).toEqual(600);
  });

  it('should calculate the total budget price', () => {
    const budgetTest: Ibudget = {
      name: 'Maria',
      telephone: 672345211,
      email: 'maria.castell@gmail.com',
      services: ['web', 'ads'],
      pagesWeb: 3,
      languagesWeb: 2,
      totalWeb: 0,
      total: 0,
      date: new Date()
    };

    const service: BudgetService = TestBed.inject(BudgetService);
    const totalTest = service.calculateTotal(budgetTest);
    expect(totalTest).toEqual(1080);
  });

  });
  

