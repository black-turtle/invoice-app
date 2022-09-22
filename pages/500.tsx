import type { NextPage } from 'next'
import { DynamicServerErrorComponent } from '../src/utils/commonDynamicComponentUtils'

const ServerErrorPage: NextPage = () => {
    return <DynamicServerErrorComponent />
}

export default ServerErrorPage
