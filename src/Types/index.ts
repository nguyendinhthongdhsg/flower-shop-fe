export interface TypeAddress {
    suburb: string;
    city_district: string;
    city: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
}

export interface TypeUser {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export interface TypeDirectory {
    name?: string | null | undefined;
    _id?: string | null | undefined;
    id?: string | null | undefined;
}

export interface TypeFlower {
    name?: string | null | undefined;
    price?: number | null | undefined;
    id?: string | null | undefined;
    _id?: string | null | undefined;
}
