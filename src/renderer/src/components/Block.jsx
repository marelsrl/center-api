import { Table } from "react-bootstrap";

function Block({ data }) {
    const header = Object.keys(data[0]).slice(0,12);

    return (
        <Table striped bordered hover>
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
    );
}

export default Block;