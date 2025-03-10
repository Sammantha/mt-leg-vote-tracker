import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from "./page.module.css";
import { BillVote } from "../types";

const API_KEY = process.env.API_KEY;
// const SHEET_ID = "1eyxPg-LHmn4EdWwKyR1hTNzMZoB7YOkBA2YJkPZ8IRs/s";
const SHEET_ID = "1aJXXfGEBPjTtnf5UBin_x9IBf13kcGybSdkfe05aMoE";
const RANGE = "all_bills!A:E";  // Adjust based on sheet structure

async function fetchData(): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data.values;
  } catch (error) {
      console.error("Error fetching data: ", error);
  }
}

export default async function Home() {
  const billData = await fetchData();
  return (
    <div className={styles.page}>
      <div className={styles.main}>
      <h1>2025 MT Legislature Bills</h1>

      {/* Filters */}

      {/* Data */}
      { billData.map((bill: string, i: number) => {
        if (i === 0) {
          // skip the header row
          return;
        }
        const voteData: BillVote = JSON.parse(bill[1].replace(/\'/g,"\""));
        const voters: string[] = Object.keys(voteData);
        const voteValues: string[] = Object.values(voteData);

        return (
          <Accordion key={"panel_" + i}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel-content"
              key={"panel-header_" + i}
            >
              {/* <Typography component="span">{bill[0]}: {bill[1]}</Typography> */}
              <Typography component="span">{bill[0]}</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordion} key={"panel-details_" + i}>
                {voters?.map((voterId: string, index: number) => {
                  const data: string = voteValues[index];
                  const isYes: boolean = data.includes('YES');
                  const isNo: boolean = data.includes('NO');
                  return (
                    <div className={styles.flex} key={'vote_' + index}>
                      <Typography>{voterId}</Typography>
                      <button className={isYes ? styles.greenYes : isNo ? styles.redNo : styles.grayAbsent}>{data}</button>
                    </div>
                  )
                })}
            </AccordionDetails>
          </Accordion>
        )})}
        </div>
    </div>
  );
}
