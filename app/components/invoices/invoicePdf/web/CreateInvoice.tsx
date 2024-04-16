import React from 'react'
import { UserT } from '../../../../types/UserT'
import { ClientWithIdT } from '../../../../types/ClientT'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'

interface CreateInvoiceProps {
  user: UserT
  client: ClientWithIdT
  invoiceData: InvoiceWithIdT
}

const convertMilimetersToPoints = (milimeters: number) => {
  const points = (milimeters / 25.4) * 72
  const pointsRounded = Number(points.toFixed())
  return pointsRounded
}

export const CreateInvoice = ({
  user,
  client,
  invoiceData,
}: CreateInvoiceProps) => {
  const styles = {
    page: {
      fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
      color: '#555',
      width: convertMilimetersToPoints(210),
      height: convertMilimetersToPoints(297),
      margin: 'auto',
      padding: '30px',
      fontSize: '16px',
      lineHeight: '24px',
      backgroundColor: 'white',
    },
    header: {
      textAlign: 'center' as const,
      marginTop: '10px',
      marginBottom: '50px',
    },
    logo: {
      width: '285px',
      height: '150px',
      objectFit: 'contain' as const,
    },
    details: {
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f2f2f2',
      textAlign: 'left' as const,
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
    },
    footer: {
      textAlign: 'center' as const,
      marginTop: '50px',
      color: '#656768',
      width: '100%',
    },
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        {user.logoUrl !== 'null' ? (
          <img src={user.logoUrl} style={styles.logo} />
        ) : (
          <h1>{user.companyName}</h1>
        )}
      </div>

      <div style={styles.details}>
        <h3>Invoice Number: {invoiceData.invoiceId || 'ADD INVOICE NUMBER'}</h3>

        <p>
          {client.name}
          <br />
          {client.address}
          <br />
          {client.town}
          <br />
          {client.postcode}
          <br />
        </p>

        <div style={styles.details}>
          <h2>Invoice Details</h2>
          <table style={styles.table}>
            <tbody>
              <tr>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Price</th>
              </tr>
              <tr>
                <td style={styles.td}>{invoiceData.description}</td>
                <td style={styles.td}>{invoiceData.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.footer}>
        <p>
          {user.companyName}, {user.address}, {user.town}, {user.county},{' '}
          {user.postcode}
          <br />
          {user.contactTel}
        </p>
      </div>
    </div>
  )
}
