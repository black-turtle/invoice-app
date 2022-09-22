import { useCallback, useState } from 'react'
import { FaUserTie } from 'react-icons/fa'
import { ClientData, createClientGraphQl } from '../../../api/clientApis'
import FormLayout from '../../../components/layouts/FormLayout'
import { executeApi } from '../../../utils/ApiExecutor'
import MemorizedClientForm from './ClientsForm'

const NewClientsFormContainer = () => {
    const [formKey, setFormKey] = useState<number>(1)

    const onSubmitHandler = useCallback(async (params: ClientData) => {
        const { data, error } = await executeApi(
            () => createClientGraphQl(params),
            true,
        )
        if (data?.success) {
            setFormKey((prev) => prev + 1)
        }
    }, [])

    return (
        <FormLayout title="Create New client" logo={<FaUserTie />}>
            <MemorizedClientForm
                key={formKey}
                formAction={onSubmitHandler}
                clearFormOnSubmitSuccess
            />
        </FormLayout>
    )
}

export default NewClientsFormContainer
