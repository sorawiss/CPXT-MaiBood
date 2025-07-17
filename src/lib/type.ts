export interface Fridge {
    id: string;
    name: string;
    price?: number | null;
    category: string | null;
    exp_date: Date;
    image?: string | null;
    updated_at: Date;
}

export interface Makro {
    id: string;
    name: string;
    price?: number | null;
    category: number | null;
    exp_date: Date;
    image?: string;
    updated_at: Date;
} 