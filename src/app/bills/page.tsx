import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from "./page.module.css";
import { BillVoteInput, BillVoteOutput } from "../types";

// const API_KEY = process.env.API_KEY;
// // const SHEET_ID = "1eyxPg-LHmn4EdWwKyR1hTNzMZoB7YOkBA2YJkPZ8IRs/s";
// const SHEET_ID = "1aJXXfGEBPjTtnf5UBin_x9IBf13kcGybSdkfe05aMoE";
// const RANGE = "all_bills!A1:E101";  // Adjust based on sheet structure

// // @ts-ignore typescript-eslint/no-explicit-any
// async function fetchData(): Promise<any> {
//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
//   try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data.values;
//   } catch (error) {
//       console.error("Error fetching data: ", error);
//   }
// }

// transform the names from first last to last, first
// and alphabetize by last name ASC
const transformNames = (votes: BillVoteInput[]): BillVoteOutput[] => {
  const votesWithFormattedNames: BillVoteOutput[] = [];
  const names: string[] = Object.keys(votes);

  names.forEach((name: string) => {
    // @ts-ignore
    const billVote: string = votes[name];

    const nameParts = name.split(' ');
    const nameFormatted = nameParts[1].concat(', ').concat(nameParts[0]);
    votesWithFormattedNames.push({
      name: nameFormatted,
      vote: billVote
    });
  });

  return votesWithFormattedNames.sort((a: BillVoteOutput, b: BillVoteOutput) => {
    const textA = a.name.toUpperCase();
    const textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
};

export default async function Home(context: any) {
  console.log('context', context);
  const billData = context;
  return (
    <div className={styles.page}>
      <div className={styles.main}>
      <h1>2025 MT Legislature Bills</h1>

      {/* Filters */}

      {/* Data */}
      {/* { billData?.map((bill: string, i: number) => {
        if (i === 0) {
          // skip the header row
          return;
        }
        const billName = bill[0];
        const billTitle = bill[1];
        const voteData: BillVoteInput[] = JSON.parse(bill[2].replace(/\'/g,"\""));
        const transformedVoteData: BillVoteOutput[] = transformNames(voteData);

        return (
          <Accordion key={"panel_" + i} className={styles.accordion}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel-content"
              key={"panel-header_" + i}
            >
              <Typography component="span">{billName}: {billTitle} {transformedVoteData.length === 0 ? " - - No votes yet - - ": ""}</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails} key={"panel-details_" + i}>
              {transformedVoteData?.map((voteData: BillVoteOutput, index: number) => {
                const isYes: boolean = voteData.vote.includes('YES');
                const isNo: boolean = voteData.vote.includes('NO');
                return <div className={styles.votesContainer} key={"vote_" + index}>
                  <div
                    aria-label={voteData.name.concat(isYes ? ' voted yes.' : isNo ? ' voted no.' : ' did not vote.')} 
                    className={isYes ? styles.greenYes : isNo ? styles.redNo : styles.grayAbsent}
                    ></div>
                  <Typography className={styles.voterName}>{voteData.name}</Typography>
                </div>
              })}
            </AccordionDetails>
          </Accordion>
        )})} */}
        </div>
    </div>
  );
}
