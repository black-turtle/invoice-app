import { Button, Typography } from '@mui/material'
// import { jsPDF } from 'jspdf'
import { ReactNode, useCallback, useEffect, useState } from 'react'

// Download the given image URL as a PDF file.
function saveAsPDF(imageDataURL: string, fileName: string) {
    // Get the dimensions of the image.
    var image = new Image()

    image.onload = async function () {
        let pageWidth = image.naturalWidth
        let pageHeight = image.naturalHeight
        const jsPDF = (await import('jspdf')).default
        // Create a new PDF with the same dimensions as the image.
        const pdf = new jsPDF({
            orientation: pageHeight > pageWidth ? 'portrait' : 'landscape',
            unit: 'px',
            format: [pageHeight, pageWidth],
        })

        // Add the image to the PDF with dimensions equal to the internal dimensions of the page.
        pdf.addImage(
            imageDataURL,
            0,
            0,
            pdf.internal.pageSize.getWidth(),
            pdf.internal.pageSize.getHeight(),
        )

        // Save the PDF with the filename Provided
        pdf.save(fileName)
    }

    image.src = imageDataURL
}

interface IProps {
    docId: string
    fileName: string
    autoStartDownload?: boolean
    isDataReady: boolean
}

function generateHelperText(downloadStarted: boolean, Button: ReactNode) {
    if (downloadStarted) {
        return (
            <>
                {`If your download isn't started yet. please`} {Button}
            </>
        )
    } else {
        return (
            <>
                {Button} {`to start downloading`}
            </>
        )
    }
}

const PdfDownloader = ({
    docId,
    fileName,
    autoStartDownload,
    isDataReady,
}: IProps) => {
    const [downloadStarted, setDownloadStarted] = useState<boolean>(false)
    const downloadPdfDocument = useCallback(async () => {
        const input = document.getElementById(docId)
        if (input) {
            const html2canvas = (await import('html2canvas')).default
            // convert html to canvas
            html2canvas(input).then((canvas) => {
                // convert canvas to base64 image
                const imgData = canvas.toDataURL('application/pdf')
                saveAsPDF(imgData, fileName)
                setDownloadStarted(true)
            })
        } else {
            throw new Error(`No element found with docId: ${docId}`)
        }
    }, [fileName, docId])

    useEffect(() => {
        if (autoStartDownload && isDataReady) {
            downloadPdfDocument()
        }
    }, [autoStartDownload, downloadPdfDocument, isDataReady])

    return (
        <>
            <Typography
                variant="h6"
                sx={{ width: '100%', textAlign: 'center', py: '2rem' }}
            >
                {generateHelperText(
                    downloadStarted,
                    <Button
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                        onClick={downloadPdfDocument}
                    >
                        click here
                    </Button>,
                )}
            </Typography>
        </>
    )
}

export default PdfDownloader
