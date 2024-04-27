import React from 'react'
import jsPDF from 'jspdf'
import { getRelatedInvoiceData } from '../../../../db/invoice/getRelatedInvoiceData'
import { renderToString } from 'react-dom/server'
import { WebInvoiceHtml } from './WebInvoiceHtml'

interface CreateWebPdfProps {
  invoiceId: string
}

export const createWebPdf = async ({ invoiceId }: CreateWebPdfProps) => {
  const { user, client, invoiceData } = await getRelatedInvoiceData(invoiceId)
  const invoiceHtml = renderToString(
    <WebInvoiceHtml user={user} client={client} invoiceData={invoiceData} />,
  )

  // if (!user.logoUrl) return

  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm',
  })

  doc.setFont('helvetica', 'normal')

  // Fetch the image, convert it to a Blob and then to a base64 data URL
  if (user.logoUrl) {
    const response = await fetch(user.logoUrl)
    const blob = await response.blob()
    const reader = new FileReader()
    reader.readAsDataURL(blob)

    reader.onloadend = async () => {
      const base64data = reader.result as string

      // Extract the format from the MIME type
      const format = blob.type.split('/')[1].toUpperCase()

      const img = new window.Image()
      img.src = base64data

      await new Promise((resolve) => {
        img.onload = resolve
      })

      // calculate the aspect ratio of the image
      const aspectRatio = img.width / img.height
      const desiredHeight = 20
      const desiredWidth = desiredHeight * aspectRatio

      // calculate the starting position of the image to center it horizontally
      const pageWidth = doc.internal.pageSize.getWidth()
      const imageStartPosition = (pageWidth - desiredWidth) / 2

      // Add the image to the PDF with the desired width and calculated height
      doc.addImage(
        base64data,
        format,
        imageStartPosition,
        10,
        desiredWidth,
        desiredHeight,
      )
    }

    doc.html(invoiceHtml, {
      callback: function () {
        doc.save(`${user.companyName}-${invoiceData.invoiceId}.pdf`)
      },
    })
  }
}
