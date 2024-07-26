import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export default function TableWithStripedColumns({data}) {


  const header = Object.keys(data[0]).slice(0,12);
  console.warn(header)
  
  return (
    <Card className="h-[90%] w-full">
           <Table striped bordered hover >
        <thead>
          <tr>
            {
                header.map(x=><th>{x}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map(x=>{
                return(
                    <tr>
                       {Object.values(x).slice(0,12).map(y=><td>{y}</td>)}
                    </tr>
                )
            })
          }
        </tbody>
      </Table>  
    </Card>
  );
}