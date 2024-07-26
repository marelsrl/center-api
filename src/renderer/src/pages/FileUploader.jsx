
import React, { useEffect, useState } from "react"
import { Modal, Button, Form, Table } from "react-bootstrap";
import * as XLSX from 'xlsx';

function FileUploader() {

  let [open, setOpen] = useState(false);
  const [file, setFile] = React.useState({});
  const [data, setData] = React.useState({
    header: [],
    body: []
  });


  const confirm = () => {

    window.api.loadSheet(data).then(res=>{
      console.log(res)
      if(res.status == "errore") return window.api.showError(res.message);
      window.api.showMessage({
        title:"successo",
        message:res.message
      });
      setFile({});
    }).catch(err=>{
      window.api.showError(err.message);
    })
    
  }

  useEffect(() => {
    if (!file.type) return
    const reader = new FileReader()
    switch (file.type) {
      case "text/csv":
        reader.readAsText(file);
        reader.addEventListener("load", (event) => {
          const target = event.target.result.split("\n");
          async function fillData() {
            return new Promise((resolve, _) => {
              let temp = { header: [...target[0].split(","), "id"], body: [] };
              for (let i = 1; i < target.length; i++) {
                temp.body.push([...target[i].split(","), i])
              }
              resolve(temp)
            })
          }
          fillData().then(res => {
            setData(res);
            setOpen(true)
          })
        })
        break
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        reader.readAsArrayBuffer(file)
        reader.addEventListener("load", async (event) => {
          let dataToUint = new Uint8Array(event.target.result);
          let xlsData = XLSX.read(dataToUint, { type: "array" });
          const firstSheet = xlsData.SheetNames[0];
          const parsed = XLSX.utils.sheet_to_json(xlsData.Sheets[firstSheet], { header: 1 });
          async function fillData() {
            let i = 1;
            let temp = { header: [...parsed[0], "id"], body: [] };
            return new Promise((resolve, reject) => {
              while (i < parsed.length) {
                temp.body.push([...parsed[i], i])
                i++;
              }
              resolve(temp);
            })
          }
          fillData().then(res => {
            setData(res);
            setOpen(true)

          }).then(_ => {
            console.log(data);
          })
        })
        break
      default:
        window.api.warning("file type not supported");
    }
  }, [file])

  const ALLOWED_FORMATS = "text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

  return (
    <main id='fileUploader'>
      {/* <Link to="/" className="absolute left-5 top-5">indietro</Link> */}
      <Form.Group style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Form.Label>seleziona un prezziario</Form.Label>
        <Form.Control
          style={{ textAlign: "center", display: "inline" }}
          placeholder="carica file 📁"
          type="file"
          accept={ALLOWED_FORMATS}
          name="data"
          onChange={(e) => {

            const file = e.target.files[0];
            if (file) {
              setFile(file);
            }
          }}

        />

      </Form.Group>
      <Modal show={open} fullscreen>

        <Modal.Body>
          {
            data.header.length > 0 &&
            <Table striped bordered hover >
              <thead >
                <tr >
                  {data.header.map(head => <th key={head}>{head}</th>)}
                </tr>
              </thead>
              <tbody >
                {
                  data.body.map(data => data[1] && <tr key={data}>{data.map(x => <td >{x}</td>)}</tr>)
                }
              </tbody>
            </Table>
          }
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button
              className='bg-red-500 border-red-500 mr-2'
              variant="danger" onClick={() => setOpen(false)}>
              Esci
            </Button>

            <Button
              className='bg-green-500 border-green-500'
              variant='success'
              onClick={confirm}>Carica</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default FileUploader;
