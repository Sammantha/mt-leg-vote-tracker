import * as React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function BasicMenu() {
  return (
    <div className='flex menu'>
        <Link href={`/bills`}><Button>View Bills</Button></Link>
        <Link href={`/members`}><Button>View Legislature Members</Button></Link>
    </div>
  );
}
