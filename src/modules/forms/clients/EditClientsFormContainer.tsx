import { AxiosError } from 'axios'
import { useCallback, useEffect } from 'react'
import { FaUserTie } from 'react-icons/fa'
import { ClientData, getClient, updateClient } from '../../../api/clientApis'
import FormLayout from '../../../components/layouts/FormLayout'
import { useAsync } from '../../../hooks/useAsync'
import { executeApi } from '../../../utils/ApiExecutor'
import {
    DynamicNotFoundComponent,
    DynamicServerErrorComponent,
} from '../../../utils/commonDynamicComponentUtils'
import MemorizedClientForm from './ClientsForm'

interface ClientsFormContainerProps {
    id?: string
}

const EditClientsFormContainer = ({ id }: ClientsFormContainerProps) => {
    const {
        data: clientData,
        execute: executeGetClient,
        error: clientError,
    } = useAsync(getClient)

    // load clients after component is mounted
    useEffect(() => {
        id && executeGetClient({ id })
    }, [executeGetClient, id])

    const onSubmitHandler = useCallback(async (params: ClientData) => {
        const { data, error } = await executeApi(
            () => updateClient(params),
            true,
        )
        return data?.success
    }, [])

    if (clientError) {
        if (clientError instanceof AxiosError) {
            if (clientError.response?.status === 404) {
                return <DynamicNotFoundComponent />
            }
        }
        return <DynamicServerErrorComponent />
    }

    return (
        <FormLayout
            title={'Update Client'}
            logo={<FaUserTie />}
            isLoading={!clientData}
        >
            {clientData && (
                <MemorizedClientForm
                    formAction={onSubmitHandler}
                    defaultValues={clientData?.client}
                />
            )}
        </FormLayout>
    )
}

export default EditClientsFormContainer
