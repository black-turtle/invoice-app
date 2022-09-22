import type { NextPage } from 'next'
import { DynamicNotFoundComponent } from '../src/utils/commonDynamicComponentUtils'

const NotFoundPage: NextPage = () => {
    return <DynamicNotFoundComponent />
}

export default NotFoundPage
