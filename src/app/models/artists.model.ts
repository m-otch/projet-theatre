import { Spectacles } from "./spectacles.model";

export class Artists {
    id!: string;
    type!: string;
    firstname!: string;
    lastname!: string;
    biography!: string;
    email!: string;
    phone!: string;
}

export interface ArtistWithSpectacle extends Artists {
    spectacle: Spectacles[];
}