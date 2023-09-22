import { Country } from "./country";
import { Region } from "./region.type";

export interface cacheStore{
    ByCapital: TermCountries;
    ByCountries: TermCountries;
    ByRegion: RegionCoutries;
}

export interface TermCountries{
    term: string;
    countries: Country[];
}


export interface RegionCoutries {
    region: Region;
    countries: Country[];
}
