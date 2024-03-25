interface CreateInvoiceHtml {
  companyName: string
  companyAddress: string
  companyTown: string
  companyPostcode: string
  companyTel: string
  clientName: string
  clientAddress: string
  clientTown: string
  clientPostcode: string
  invoiceNum: string
  price: string
  description: string
}

export const cretateInvoiceHtml = ({
  companyName,
  companyAddress,
  companyTown,
  companyPostcode,
  companyTel,
  clientName,
  clientAddress,
  clientTown,
  clientPostcode,
  invoiceNum,
  price,
  description,
}: CreateInvoiceHtml) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          font-size: 16px;
          line-height: 24px;
        }
        .invoice-header {
          text-align: center;
          margin-top: 100px;
          margin-bottom: 50px;
        }
        .invoice-header h1 {
          margin: 0;
          font-size: 2em;
          font-weight: bold;
        }
        .invoice-header h2 {
          margin: 0;
          font-size: 1.5em;
        }
        .section-header {
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .details {
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }
        .footer {
          text-align: center;
          margin-top: 50px;
          color: #656768;
          width: 100%;          
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <div class="invoice-header">
          <h1>${companyName}</h1>
        </div>

        <div class="details">
        <h3>Invoice Number: ${invoiceNum}</h3>
        
        <div>
          <p>
          ${clientName}<br>
          ${clientAddress}<br>
          ${clientTown}<br>
          ${clientPostcode} <br>
          </p>   
        </div>
       
            
        <div class="details">
          <div class="section-header">Invoice Details</div>
          <table>
            <tr>
              <th>Description</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>${description}</td>
              <td>${price}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="footer">
          <p>
          ${companyName}, ${companyAddress}, ${companyTown}, ${companyPostcode}
          <br>
          ${companyTel}
          </p>   
        </div>
    </body>
    </html>
  `

  return html
}
