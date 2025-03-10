export type Bill = {
    id: string;
    // title: string;
    votes: BillVote[];
    link: string;
};

export type BillVote = {
    string: 'YES' | 'NO';
};