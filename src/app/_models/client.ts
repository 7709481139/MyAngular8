import { ContactPrimary, ContactSecondary } from './ContactPrimary';



export interface Client {
    cardname: string;
    email: string;
    website: string;
    telephone: string;
    sector: string;
    currency: string;

    pan: string;
    gst: string;

    cntPrim: ContactPrimary;
    cntSec: ContactSecondary;
}
