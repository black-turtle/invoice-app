import { useCallback } from 'react'
import { FaBuilding } from 'react-icons/fa'
import { CompanyDetails } from '../../../api/clientApis'
import { updateCompanyDetails } from '../../../api/userApi'
import FormLayout from '../../../components/layouts/FormLayout'
import Loader from '../../../components/loader/Loader'
import useNavigate from '../../../hooks/useNavigate'
import { useAuthStore } from '../../../stores/useAuthStore'
import { executeApi } from '../../../utils/ApiExecutor'
import MemorizedCompanyDetailForm from './CompanyDetailForm'

function getTitle(userHasCompanyDetails: boolean) {
    return userHasCompanyDetails
        ? 'Update company details'
        : 'Welcome, Please provide company details to continue'
}

const CompanyDetailFormContainer = () => {
    const { navigateTo } = useNavigate()
    const user = useAuthStore((state) => state.user)
    const updateUser = useAuthStore((state) => state.updateUser)
    let userHasCompanyDetails: boolean = !!user?.companyDetails

    const onSubmitHandler = useCallback(
        async (params: CompanyDetails) => {
            const { data, error } = await executeApi(
                () => updateCompanyDetails(params),
                true,
            )

            if (data?.success) {
                updateUser(data.user)
                if (!userHasCompanyDetails) {
                    navigateTo('/')
                }
            }
        },
        [navigateTo, updateUser, userHasCompanyDetails],
    )

    if (user) {
        return (
            <FormLayout
                title={getTitle(userHasCompanyDetails)}
                logo={<FaBuilding />}
            >
                <MemorizedCompanyDetailForm
                    formAction={onSubmitHandler}
                    defaultValues={user.companyDetails}
                />
            </FormLayout>
        )
    }
    return <Loader />
}

export default CompanyDetailFormContainer
