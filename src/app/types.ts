export type Bill = {
    id: string;
    title: string;
    votes: BillVote[];
};

export type BillVote = {
    string: 'YES' | 'NO';
};