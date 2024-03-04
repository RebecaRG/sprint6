export interface Ibudget{
    name: string;
    telephone: number;
    email: string;
    services: ('seo' | 'ads' | 'web')[];
    pagesWeb: number;
    languagesWeb: number;
    totalWeb: number;
    total: number; 
    date: Date;
}