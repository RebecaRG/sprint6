export interface Ibudget{
    name: string;
    telephone: number;
    email: string;
    services: ('seo' | 'ads' | 'web')[];
    pagesWeb: number;
    lenguagesWeb: number;
    totalWeb: number;
    total: number; 
}