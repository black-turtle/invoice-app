const ApiEndPoints = {
    auth: {
        login: '/login',
        register: '/register'
    },
    invoices: {
        getInvoices: '/invoices',
        getInvoice: '/invoices/:id',
        createInvoice: '/invoices',
        updateInvoice: '/invoices'
    },
    clients: {
        getClients: '/clients',
        getClientNames: '/clients/names',
        getClient: '/clients/:id',
        createClient: '/clients',
        updateClient: '/clients'
    },
    user: {
        getCurrentUser: '/me',
        updateCurrentUserAvatar: '/me/avatar',
        updateCompanyDetails: '/me/company'
    },
    reset: '/reset'
}

export default ApiEndPoints
