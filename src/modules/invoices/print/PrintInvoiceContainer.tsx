import { Box, Button, Container } from '@mui/material'
import { AxiosError } from 'axios'
import { useEffect, useLayoutEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { getInvoice, InvoiceData } from '../../../api/invoiceApis'
import PdfDownloader from '../../../components/PdfDownloder'
import { useAsync } from '../../../hooks/useAsync'
import useNavigate from '../../../hooks/useNavigate'
import { useClientNamesStore } from '../../../stores/useClientNamesStore'
import { useInvoiceItemStore } from '../../../stores/useInvoiceItemsStore'
import {
    DynamicNotFoundComponent,
    DynamicServerErrorComponent,
} from '../../../utils/commonDynamicComponentUtils'
import { convertToDate } from '../../../utils/convertUtils'
import InvoiceItemsContainer from '../items/InvoiceItemsContainer'
import DisplayInvoice from './DisplayInvoice'

interface ClientsFormContainerProps {
    id: string
}

const PrintInvoiceFormContainer = ({ id }: ClientsFormContainerProps) => {
    const { routerQuery, navigateTo } = useNavigate()
    const {
        data: invoiceData,
        execute: executeGetInvoice,
        error: invoiceError,
    } = useAsync(getInvoice)

    const {
        clientNamesApiResponse,
        loadClientNames,
        getCompanyName,
        reset: resetClientNamesStore,
    } = useClientNamesStore()

    const {
        setItems,
        setInvoiceItemsViewMode,
        reset: resetInvoiceItemsStore,
    } = useInvoiceItemStore()

    // reset all required stores initially, before mounting UI
    useLayoutEffect(() => {
        resetClientNamesStore()
        resetInvoiceItemsStore()
    }, [resetClientNamesStore, resetInvoiceItemsStore])

    useEffect(() => {
        executeGetInvoice({ id }).then((data) => {
            setItems(data?.meta?.items ?? [])
        })

        loadClientNames()
        setInvoiceItemsViewMode(true)
    }, [
        executeGetInvoice,
        id,
        loadClientNames,
        setInvoiceItemsViewMode,
        setItems,
    ])

    if (invoiceError) {
        const error = invoiceError
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return <DynamicNotFoundComponent />
            }
        }
        return <DynamicServerErrorComponent />
    }

    const printId = id.toString().replaceAll(/\s/g, '')

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<FaArrowLeft />}
                    onClick={() => navigateTo('/')}
                >
                    Go Back
                </Button>
            </Box>
            <PdfDownloader
                fileName={`${printId}.pdf`}
                docId={printId}
                autoStartDownload={routerQuery?.print === 'true'}
                isDataReady={!!invoiceData && !!clientNamesApiResponse.data}
            />

            <Box
                id={printId}
                sx={{ display: 'flex', justifyContent: 'center', py: 3 }}
            >
                <Container maxWidth="sm">
                    <DisplayInvoice
                        values={util.convertForDisplayInvoice(
                            invoiceData,
                            getCompanyName(invoiceData?.client_id),
                        )}
                        ItemsContainer={<InvoiceItemsContainer />}
                    />
                </Container>
            </Box>
        </>
    )
}

export default PrintInvoiceFormContainer

const util = {
    convertForDisplayInvoice: (data: InvoiceData | null, company?: string) => {
        if (!data) return null
        return {
            date: convertToDate(data.date),
            dueDate: convertToDate(data.dueDate),
            invoice_number: data.invoice_number,
            project_code: data.projectCode,
            company: company ?? '',
        }
    },
}

PrintInvoiceFormContainer.displayName = 'PrintInvoiceFormContainer'
