import { getRelatedInvoiceData } from '../../../../db/invoice/getRelatedInvoiceData'

export const nativeInvoiceHtml = async (invoiceId: string) => {
  const { user, client, invoiceData } = await getRelatedInvoiceData(invoiceId)

  const logoImage = `<img src="${user.logoUrl || ''}" class="invoice-logo" />`
  const companyTitle = `<h1>${user.companyName}</h1>`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
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
          margin-top: 10px;
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
        .invoice-logo {
          width: 285px;
          height: 150px;
          object-fit: contain;
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
        ${user.logoUrl !== 'null' ? logoImage : companyTitle}
        </div>

        <div class="details">
        <h3>Invoice Number: ${
          invoiceData.invoiceId || 'ADD INVOICE NUMBER'
        }</h3>
        
        <div>
          <p>
          ${client.name}<br>
          ${client.address}<br>
          ${client.town}<br>
          ${client.postcode} <br>
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
              <td>${invoiceData.description}</td>
              <td>£${invoiceData.price}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="footer">
          <p>
          ${user.companyName}, ${user.address}, ${user.town}, ${user.county}, ${
            user.postcode
          }
          <br>
          ${user.contactTel}
          </p>   
        </div>
    </body>
    </html>
  `

  return html
}
