import { Card, CardContent, Typography } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { Member } from "../types";

const API_KEY = process.env.API_KEY;
const SHEET_ID = "1eyxPg-LHmn4EdWwKyR1hTNzMZoB7YOkBA2YJkPZ8IRs";
// const SHEET_ID = "1aJXXfGEBPjTtnf5UBin_x9IBf13kcGybSdkfe05aMoE";
const RANGE = "all_members!A1:C101";  // Adjust based on sheet structure

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

export default async function Members() {
  const memberData = await fetchData();
  return (
    <div className={styles.page}>
      <div className={styles.main}>
      <h1>2025 MT Legislature Members</h1>

      {/* Filters */}

      {/* Data */}
      { memberData?.map((memberInfo: string[], index: number) => {
        if (index === 0) {
          // skip the header row
          return;
        }
        return (
          <Link key={`member_${index}`} href={`/members:${memberInfo[0]}`}>
            <Card className="card" sx={{ minWidth: 275 }}>
              <CardContent className={styles.cardContent}>
                <Typography className={styles.member}>
                  <span>{memberInfo[1]}</span>
                  <span>{memberInfo[2]}</span>
                </Typography>
              </CardContent>
            </Card>
          </Link>
        )})}
        </div>
    </div>
  );
}
