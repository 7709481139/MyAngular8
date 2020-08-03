import { Attachments } from './complienceHeader';

export interface Meeting {
    clgcode: number;
    cardcode: string;
    cardname: string;
    startdate: string;
    enddate: string;
    time: string;
    details: string;
    prio: string;
    status: string;
    source: string;
    addedby: string;
    createdate: string;
    updatdate: string;
    updatedby: string;

}

export interface SingleMeeting {
    clgcode: number;
    cardcode: string;
    cntctcode: number;
    assignesto: number;
    startdate: Date;
    enddate: Date;
    time: string;
    details: string;
    notes: string;
    prio: string;
    status: string;
    source: string;
    atc: Attachments[];
}
