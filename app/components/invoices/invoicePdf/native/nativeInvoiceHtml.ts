import { getRelatedInvoiceData } from '../../../../db/invoice/getRelatedInvoiceData'
import theme from '../../../../utils/theme/theme'

export const nativeInvoiceHtml = async (invoiceId: string) => {
  const { user, client, invoiceData } = await getRelatedInvoiceData(invoiceId)

  const logoImage = `<img src="${user.logoUrl || ''}" class="invoice-logo" />`
  const companyTitle = `<h1>${user.companyName}</h1>`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { print-color-adjust:exact !important; }
        body {
          font-family: Arial, sans-serif;
          color: #555;
          line-height: 1.2;  
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
        .address {
          line-height: 1.3;
        }
        .section-header {
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .details {
          margin-bottom: 20px;
          margin-top: 40px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        .table-head {
          background-color: ${theme.colors.primary};
          text-align : left;
          color: ${theme.colors.white};
        }
        .decriptionHeader {
        font-size: 12px;
        padding-left: 6px;
        }
        .items {
        padding-top: 5px;
        }
        .decription {
        padding-left: 6px;
        paddingRight: 10px;
        line-height: 1.3;
        font-size: 16px;
        }
        .paddingLeft8px {
        padding-left: 8px;
        }
        .amountHeader {
        font-size: 12px;
        width: 70px;
        text-align: right;
        padding-right: 6px;
        }
        .amount {
        width: 70px;
        text-align: right;
        padding-right: 8px;
        vertical-align: top;
        color: #888;
        }
        .totalAmount {
        width: 70px;
        text-align: right;
        padding-right: 8px;
        vertical-align: top;
        font-weight: bold;
        }
        .footer {
        text-align: center;
        margin-top: 50px;
        color: #656768;
        width: 100%; 
        line-height: 1.2;         
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
        
        <div class="address">
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
            <tr class="table-head">
              <th class="decriptionHeader">Description</th>
              <th class="amountHeader">Tax Rate %</th>
               <th class="amountHeader">NET Price</>
               <th class="amountHeader">Total Price</th>
            </tr>
            <tr class="items">
              <td class="decription items">${invoiceData.description}</td>
              <td class="amount items">${invoiceData.taxRate}</td>
              <td class="amount items">£${invoiceData.price}</td>
              <td class="totalAmount items">£${invoiceData.totalPrice}</td>
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
          Telephone : ${user.contactTel}
          </p>   
        </div>
    </body>
    </html>
  `

  return html
}
