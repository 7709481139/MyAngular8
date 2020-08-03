export interface Ocrd {
    cardCode: string;
    cardName: string;
}

export interface Country {
    code: string;
    name: string;
}

export interface Currency {
    currcode: string;
    currname: string;
}

export interface ClientSAP {
    cardcode: string;
    cardname: string;
    email: string;
    telephone: string;
    sector: string;
    currency: string;

}

export interface VotingElement {
    cardcode: string;
    cardname: string;
    pre_avg: number;
    status: string;
    stage: string;
    post_avg: number;
    voteLines: Array<Lines>;
}

export interface Lines {
    user: string;
    stage: string;
    status: string;
    pre_rate: number;
    post_rate: number;
    pre_note: string;
    post_note: string;
}
