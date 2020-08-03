export interface Bpupdatemodel {
    cardcode: string;
    cardname: string;
    currency: string;
    sector: string;
    telephone: string;
    website: string;
    email: string;
    pan: string;
    free_text: string;
    type: string;
    notes:string;
    addressDef: BpAddress;
    cnDef: FisrtContactPerson;
    cnSec: SecondContactPerson;

}

export interface BpAddress {

    lineNum: number;
    address: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;
    state: string;
    address2: string;
    gstRegnNo: string;

}

export interface FisrtContactPerson {
    cntctCode: number;
    cardCode: string;
    name: string;
    position: string;
    tel1: string;
    cellolar: string;
    e_MailL: string;
    firstName: string;
    lastName: string;
}
export interface SecondContactPerson {
    cntctCode: number;
    cardCode: string;
    name: string;
    position: string;
    tel1: string;
    cellolar: string;
    e_MailL: string;
    firstName: string;
    lastName: string;
}
