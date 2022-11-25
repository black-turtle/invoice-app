# TopInvoice Web client

<h2><a href='https://invoice-app-i33w-black-turtle.vercel.app' target='_blank'> Demo </a></h2>

TopInvoice ia an app for managing users, clients and invoices. Main functionalities of this web app is:

-   User registration and login (Jwt token based)
-   2 way Authentication protection. Unauthorized users are automatically redirected to login page if he/she tries to access protected routes(eg: Dashboard). Same thing happens for Authorized users. They are redirected to dashboard page.
-   After login a user must provide company details to access other pages (eg: dashboard, client or invoice pages)
-   Dashboard page displays latest clients and invoices using 2 separate tables. It also support create/edit/print operations on each row data. Dashboard page also contains links for accessing all invoice or clients
-   Invoice list page and Clients list page supports standard pagination, sorting and filtering on respecting data
-   All edit or create page (eg: invoice or clients) supports industry standard form validation
-   All page are responsive. Specially the dashboard page which displays different kind of layouts in mobile and desktop devices.

# Technical or architectural challenges

## 1. Global API Error handling

-   All api error is passed through `ErrorUtils.handleApiErrors` function.
-   This functions detects and handles any API errors including `Token expired or server down` errors

## 2. Global Notification

-   I thought showing notification is better in some cases. Specially if page changes automatically after a operation succeed (eg: Login or logout). I am using MUI snackbar to display notification.

> Implementation

-   A global notification store & hook (via Zustand)
-   `NotificationContainer` component displays notification. It wraps our all page components in `app.tsx`. So, any component can display notifications.

## 3. Server side rendering (SSR) in only login/signUp page

> why not using in protected page (eg: Dashboard)?

-   Protected routes required userInfo in initial load. If we used SSR here we would need to load userInfo again and again. Instead I am loading userInfo for first load.

> Why using SSR rendering in login/signUp page?

-   Because I needed to clear AuthSession for handling Google authentication properly.
    Seems client side doesn't provide support for clearing AuthSession.

## 4. Reduce bundle size

-   Some component are not displayed initially (eg: Side drawer and Animations). So I am dynamically loading those components.
-   Some big libraries are needed after some action triggered. For example `html2canvas` library is required after print action is triggered. So I am dynamically loading it to reduce bundle size.

## 5. Use Form context to pass values to input component

-   Check a form component (eg: `LoginForm.tsx`). This component is passing react-hook-form values to input component via Form Context. It just reducing codes and making components simple.

## 6. AxiosClient and GraphQLClient

-   I am using 2 separate client for making rest api calls and graphQl api calls. Please check `AxiosClient.ts` and `GraphQlClient.ts` for more details.

# Technology used

-   TypeScript
-   Next.js
-   React (Using mainly functional components, context & hooks)
-   Zustand (tiny state management library)

### UI

-   MUI
-   Framer motion (for displaying page transition animations)
-   NProgress (for displaying script loading loader)

### Form validation

-   React-hook-form
-   zod (for schema validation)

### API clients

-   Axios client
-   GraphQL client

### Authentication

-   Next Auth
-   google authentication

### Testing

-   Unit test ans snapshot testing
-   E2E test using cypress
-   StoryBook test of components

### Code quality and linting

-   Eslint
-   Prettier
-   Husky (for injecting format/lint rule in git pre-commit lifeCycle)

# How to setup or start servers locally

I am assuming you already have Node.js installed in your machine.

## - Start backend server

1. clone this repository: https://git.toptal.com/vishal-shah/invoicebackendapi
2. Build and start backend server by running below command

```
npm run build
npm start
```

## - Start frontend server

First please create a environment variable file `.env` in root project directory with these content or check `.env.example` file

> .env

```sh
NEXT_PUBLIC_API_BASE_URL=<Your api base url>             # "http://localhost:3139"
NEXT_PUBLIC_GRAPH_QL_BASE_URL=<Your graphql base url>    # "http://localhost:3139/graphql"


## These are optional fields. If you want to activate google Authentication in login and signUp page, please provide these values/credentials
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
JWT_SECRET=
```

Just Run this command to install all required dependencies

```
npm install
```

Start the server

```
npm run dev
```

Now you should be able to access [http://localhost:3000](http://localhost:3000)

# How to test

## 1. Running unit tests

Just run

```
npm run test
```

## 2. Running e2e tests

Run this command, if you want to check e2e testing with browsers

```
npm run cypress
```

Run this command, if you want to check automated e2e tests without browsers

```
npm run cypress:headless
```

## 3. Running storybook tests

Just run

```
npm run storybook
```

After that you should be test components from here [http://localhost:6006](http://localhost:6006)

# Deploy

-   Deployed backend using heroku
-   frontend using vercel
