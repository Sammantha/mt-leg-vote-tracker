export type BillInput = {
    id: string;
    // title: string;
    votes: BillVoteInput[];
    link: string;
};

export type BillVoteInput = {
    string: 'YES' | 'NO';
};

export type BillOutput = {
    id: string;
    // title: string;
    votes: BillVoteOutput[];
    link: string;
};

export type BillVoteOutput = {
    name: string;
    vote: string;
};