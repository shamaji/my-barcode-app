import './App.css';
import Barcode from 'react-barcode';
import { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

function App() {
  const [barcodeName, setBarcodeName] = useState('');
  const [barcodePrice, setBarcodePrice] = useState('');
  const [isShowBarcode, setIsShowBarcode] = useState(false);

  const saveBarcode = () => {
    if (barcodeName && barcodePrice) {
      setIsShowBarcode(true);
    }
  }

  const addNewBarcode = () => {
    setBarcodeName('');
    setBarcodePrice('');
    setIsShowBarcode(false);
  }

  const printBarcode = () => {
    let printContents = document.getElementById('printBarcodediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  const downloadBarcode = async () => {
    const pricingTableElmt = document.getElementById('printBarcodediv');
    if (!pricingTableElmt) return;

    const canvas = await html2canvas(pricingTableElmt);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'barcode.png', 'image/png');
  }

  return (
    <Container>
      <Row>
      {isShowBarcode ?
        <Col>
          <h1>Barcode Display</h1>
          <div className='d-flex' style={{justifyContent:'space-around'}}>
            <Button variant="primary" type="button" onClick={addNewBarcode}>
              Add New Barcode
            </Button>
            <Button variant="primary" type="button" onClick={printBarcode}>
              Print Barcode
            </Button>
            <Button variant="primary" type="button" onClick={downloadBarcode}>
              Download Barcode
            </Button>
          </div>
          <div id="printBarcodediv">
            <Barcode value={barcodeName + '-' + barcodePrice} />
          </div>
        </Col>
        :
        <Col>
          <h1>Add Barcode</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" value={barcodeName} onChange={(e) => setBarcodeName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price" value={barcodePrice} onChange={(e) => setBarcodePrice(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={saveBarcode}>
              Submit
            </Button>
          </Form>
        </Col>
      }
      </Row>
    </Container>
  );
}

export default App;
