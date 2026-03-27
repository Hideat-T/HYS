// backend/src/models/Property.ts

export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string; // z.B. "Addis Abeba, Bole"
    rooms: number;
    type: 'House' | 'Apartment';
    imageUrl: string;
}