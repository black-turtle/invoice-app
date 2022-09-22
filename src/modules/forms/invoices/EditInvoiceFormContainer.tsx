import { AxiosError } from 'axios'
import { useCallback, useEffect, useLayoutEffect } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import {
    getInvoice,
    InvoiceData,
    InvoiceItem,
    updateInvoice,
} from '../../../api/invoiceApis'
import FormLayout from '../../../components/layouts/FormLayout'
import { useAsync } from '../../../hooks/useAsync'
import { useClientNamesStore } from '../../../stores/useClientNamesStore'
import { useInvoiceItemStore } from '../../../stores/useInvoiceItemsStore'
import { executeApi } from '../../../utils/ApiExecutor'
import {
    DynamicNotFoundComponent,
    DynamicServerErrorComponent,
} from '../../../utils/commonDynamicComponentUtils'
import MemorizedInvoiceForm from './InvoiceForm'

interface ClientsFormContainerProps {
    id: string
}

const EditInvoiceFormContainer = ({ id }: ClientsFormContainerProps) => {
    const {
        data: invoiceData,
        execute: executeGetInvoice,
        error: invoiceError,
    } = useAsync(getInvoice)

    const {
        clientNamesApiResponse,
        loadClientNames,
        getCompanyNamesList,
        getCompanyName,
        getClientId,
        reset: resetClientNamesStore,
    } = useClientNamesStore()

    const {
        items,
        setItems,
        setInvoiceItemsViewMode,
        getTotalPrice,
        reset: resetInvoiceItemsStore,
    } = useInvoiceItemStore()

    // reset all required stores initially, before mounting UI
    useLayoutEffect(() => {
        resetClientNamesStore()
        resetInvoiceItemsStore()
    }, [resetClientNamesStore, resetInvoiceItemsStore])

    // initial side effects
    useEffect(() => {
        executeGetInvoice({ id }).then((data) => {
            setItems(data?.meta?.items ?? [])
        })

        loadClientNames()
        setInvoiceItemsViewMode(false)
    }, [
        executeGetInvoice,
        id,
        loadClientNames,
        setInvoiceItemsViewMode,
        setItems,
    ])

    const onFormSubmitHandler = useCallback(
        async (params: InvoiceData) => {
            // convert form inputs to InvoiceData
            const newParams = convertFormInputsToInvoiceData(
                params,
                getClientId(params?.client_id),
                items,
                getTotalPrice(),
            )

            // call update api
            await executeApi(() => updateInvoice(newParams), true)
        },
        [getClientId, getTotalPrice, items],
    )

    if (invoiceError) {
        const error = invoiceError
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return <DynamicNotFoundComponent />
            }
        }
        return <DynamicServerErrorComponent />
    }

    return (
        <FormLayout
            title={'Update Invoice'}
            logo={<FaFileInvoiceDollar />}
            isLoading={!invoiceData}
        >
            {invoiceData && clientNamesApiResponse.data && (
                <MemorizedInvoiceForm
                    formAction={onFormSubmitHandler}
                    defaultValues={invoiceData}
                    companyNames={getCompanyNamesList()}
                    defaultCompany={getCompanyName(invoiceData?.client_id)}
                    items={items}
                />
            )}
        </FormLayout>
    )
}

export default EditInvoiceFormContainer

function convertFormInputsToInvoiceData(
    params: InvoiceData,
    clientId: string,
    items: InvoiceItem[],
    totalPrice: number,
) {
    const newParams = { ...params }

    newParams.date = new Date(params.date).getTime()
    newParams.dueDate = new Date(params.dueDate).getTime()
    newParams.client_id = clientId
    newParams.meta = { items }
    newParams.value = totalPrice

    return newParams
}
