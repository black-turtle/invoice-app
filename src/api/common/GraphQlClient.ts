import { GraphQLClient } from 'graphql-request'

class GraphQlClient {
    private getNewInstance = (token: string | null) => {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(token && { 'x-access-token': token }),
        }

        return new GraphQLClient(
            process.env.NEXT_PUBLIC_GRAPH_QL_BASE_URL ?? '',
            {
                headers,
            },
        )
    }

    injectToken = (token: string | null) => {
        this.instance = this.getNewInstance(token)
    }

    executeQuery = async (query: string, variables: unknown) => {
        try {
            return await this.instance.request(query, variables)
        } catch (error) {
            const errorObj = JSON.parse(JSON.stringify(error))
            throw new Error(errorObj.response.errors[0].message)
        }
    }

    public instance: GraphQLClient = this.getNewInstance(null)
}

const graphQlClient = new GraphQlClient()
export default graphQlClient
