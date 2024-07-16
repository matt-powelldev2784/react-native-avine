import React from 'react'
import { UserT } from '../../../../types/UserT'
import { ClientWithIdT } from '../../../../types/ClientT'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'
import theme from '../../../../utils/theme/theme'

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

export const WebInvoiceHtml = ({
  user,
  client,
  invoiceData,
}: CreateInvoiceProps) => {
  const styles = {
    page: {
      fontFamily: 'helvetica, sans-serif',
      color: '#555',
      width: convertMilimetersToPoints(210),
      height: convertMilimetersToPoints(297),
      margin: 'auto',
      padding: '3px',
      paddingTop: user.logoUrl === 'null' ? '10px' : '25px',
      fontSize: '4px',
      maxWidth: '202px',
      maxHeight: '260px',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '5px',
      marginHorizontal: 'auto',
    },
    companyName: {
      width: '100%',
      textAlign: 'center' as const,
      maxWidth: '150px',
      color: '#555',
      margin: 'auto',
    },
    logo: {
      width: '28.5px',
      height: '15px',
      objectFit: 'contain' as const,
    },
    details: {
      margin: 'auto',
      maxWidth: 185,
      color: '#555',
      marginTop: '10px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    tableHead: {
      backgroundColor: theme.colors.primary,
      textAlign: 'left' as const,
      height: '4.5px',
      overflow: 'hidden',
    },
    th: {
      textAlign: 'left' as const,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      color: 'white',
      fontWeight: 'normal' as const,
      transform: 'translateY(-1.5px)',
    },
    descriptionHeader: {
      textAlign: 'left' as const,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      color: 'white',
      fontWeight: 'normal' as const,
      transform: 'translateY(-1.5px)',
      paddingLeft: '2px',
    },
    td: {
      paddingLeft: '2px',
      color: '#555',
      textDecoration: 'none',
      transform: 'translateY(-1.5px)',
    },
    footer: {
      textAlign: 'center' as const,
      marginTop: '10px',
      width: '100%',
      color: '#656768',
      textDecoration: 'none',
    },
  }

  return (
    <div style={styles.page}>
      {user.logoUrl === 'null' ? (
        <h1 style={styles.companyName}>{user.companyName}</h1>
      ) : null}

      {user.logoUrl ? (
        <div style={styles.header}>
          <div style={styles.logo}></div>
        </div>
      ) : null}

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
          <h3>Invoice Details</h3>
          <table style={styles.table}>
            <tbody>
              <tr style={styles.tableHead}>
                <th style={styles.descriptionHeader}>Description</th>
                <th style={styles.th}>Price</th>
              </tr>
              <tr>
                <td style={styles.td}>{invoiceData.description}</td>
                <td style={styles.td}>{`£${invoiceData.price.toString()}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.footer}>
        {user.companyName}, {user.address}, {user.town}, {user.county},{' '}
        {user.postcode}
        <br />
        {`Telephone : ${user.contactTel?.toString()}`}
      </div>
    </div>
  )
}
