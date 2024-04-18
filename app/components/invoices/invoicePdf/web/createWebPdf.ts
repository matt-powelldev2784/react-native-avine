import jsPDF from 'jspdf'
import { UserT } from '../../../../types/UserT'
import { ClientWithIdT } from '../../../../types/ClientT'
import { InvoiceWithIdT } from '../../../../types/InvoiceT'

interface CreateWebPdfProps {
  user: UserT
  client: ClientWithIdT
  invoiceData: InvoiceWithIdT
  invoiceTemplateRef: React.RefObject<HTMLDivElement>
}

export const createWebPdf = async ({
  user,
  client,
  invoiceData,
  invoiceTemplateRef,
}: CreateWebPdfProps) => {
  console.log('client', client)
  console.log('invoiceData', invoiceData)
  if (!user.logoUrl) return

  const doc = new jsPDF({
    format: 'a4',
    unit: 'mm',
  })

  doc.setFont('Inter-Regular', 'normal')

  // Fetch the image, convert it to a Blob and then to a base64 data URL
  const response = await fetch(user.logoUrl)
  const blob = await response.blob()
  const reader = new FileReader()
  reader.readAsDataURL(blob)

  reader.onloadend = () => {
    const base64data = reader.result as string

    // Create a new image element using the native JavaScript API
    const img = new window.Image()
    img.src = base64data

    img.onload = () => {
      // calculate the aspect ratio of the image
      const aspectRatio = img.width / img.height
      const desiredHeight = 38
      const desiredWidth = desiredHeight * aspectRatio

      // Add the image to the PDF with the desired width and calculated height
      doc.addImage(base64data, 'JPEG', 0, 0, desiredWidth, desiredHeight)

      if (invoiceTemplateRef.current !== null) {
        doc.html(invoiceTemplateRef.current.innerHTML, {
          callback: function () {
            // Save the PDF
            doc.save('document.pdf')
          },
        })
      }
    }
  }
}
