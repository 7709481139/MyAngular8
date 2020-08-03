export interface ComplienceHeader {
    clgcode: number;
    activity: string;
    type: number;
    subject: number;
    assignesto: number;
    cntctcode: number;
    cardcode: string;
    cardname: string;
    details: string;
    notes: string;
    status: string;
    priority: string;
    startdate: Date;
    enddate: Date;
    atc: Attachments[];

}

export interface Attachments {
    absEntry: number;
    line: number;
    fileName: string;
}

export interface ContactPerson {
    code: number;
    name: string;
}

export interface CompSubject {
    code: number;
    name: string;
}


export interface CompType {
    code: number;
    name: string;
}

export interface SAPUsers {
    code: number;
    name: string;
}

export interface Priority {
    prcode: string;
    name: string;
}

export interface StatusList {
    code: number;
    name: string;
}

