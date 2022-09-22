import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { createInvoice, InvoiceData } from '../../../api/invoiceApis'
import FormLayout from '../../../components/layouts/FormLayout'
import { useClientNamesStore } from '../../../stores/useClientNamesStore'
import { useInvoiceItemStore } from '../../../stores/useInvoiceItemsStore'
import { executeApi } from '../../../utils/ApiExecutor'
import MemorizedInvoiceForm from './InvoiceForm'

interface IProps {
    clientId?: string
}

const NewInvoiceFormContainer = ({ clientId }: IProps) => {
    const {
        clientNamesApiResponse,
        loadClientNames,
        getCompanyNamesList,
        getClientId,
        getCompanyName,
        reset: resetClientNamesStore,
    } = useClientNamesStore()

    const {
        items,
        getTotalPrice,
        reset: resetInvoiceItemsStore,
    } = useInvoiceItemStore()

    const [renderKey, setRenderKey] = useState<number>(1)

    // reset all required stores initially, before mounting UI
    useLayoutEffect(() => {
        resetClientNamesStore()
        resetInvoiceItemsStore()
    }, [resetClientNamesStore, resetInvoiceItemsStore])

    // initial side effects
    useEffect(() => {
        loadClientNames()
    }, [loadClientNames])

    // form submit handler
    const onSubmitHandler = useCallback(
        async (params: InvoiceData) => {
            // convert form inputs to API params
            params.date = new Date(params.date).getTime()
            params.dueDate = new Date(params.dueDate).getTime()
            params.client_id = getClientId(params?.client_id)
            params.meta = { items }
            params.value = getTotalPrice()

            // call update api
            const { data, error } = await executeApi(
                () => createInvoice(params),
                true,
            )
            if (data?.success) {
                setRenderKey((prev) => prev + 1)
                resetInvoiceItemsStore()
            }
        },
        [getClientId, getTotalPrice, items, resetInvoiceItemsStore],
    )

    const loadFinished = !clientId || clientNamesApiResponse.data

    return (
        <FormLayout title="Create New Invoice" logo={<FaFileInvoiceDollar />}>
            {loadFinished && (
                <MemorizedInvoiceForm
                    key={renderKey}
                    formAction={onSubmitHandler}
                    companyNames={getCompanyNamesList()}
                    defaultCompany={getCompanyName(clientId)}
                    items={items}
                />
            )}
        </FormLayout>
    )
}

export default NewInvoiceFormContainer
