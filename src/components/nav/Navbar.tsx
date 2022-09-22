import { Avatar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { getCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import { FaBuilding, FaFileInvoiceDollar, FaSignOutAlt } from 'react-icons/fa'
import useNavigate from '../../hooks/useNavigate'
import { COOKIE_USER_AVATAR, useAuthStore } from '../../stores/useAuthStore'
import {
    HttpStatus,
    MessageType,
    useNotificationStore,
} from '../../stores/useNotificationStore'
import CustomMenu, { MenuActionData } from '../CustomMenu'

const DisplayAvatarOptions = () => {
    const { navigateTo } = useNavigate()
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)
    const setNotificationData = useNotificationStore((state) => state.setData)
    const avatarSrc = getCookie(COOKIE_USER_AVATAR) as string

    const menuActions: MenuActionData[] = [
        {
            Icon: <FaBuilding />,
            text: 'Company Details',
            onClick: () => {
                navigateTo('/company-details')
            },
        },
        {
            Icon: <FaSignOutAlt />,
            text: 'Logout',
            onClick: () => {
                logout()

                setNotificationData(
                    MessageType.SUCCESS,
                    'Logout Success',
                    HttpStatus.IGNORE,
                )

                navigateTo('/login')
            },
        },
    ]

    return (
        <CustomMenu
            header={
                <Avatar
                    sx={{
                        bgcolor: (theme) => theme.palette.secondary.main,
                    }}
                    alt={user?.name}
                    src={avatarSrc}
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                />
            }
            actions={menuActions}
        />
    )
}
// normally drawer is hidden. so we can dynamically load it to reduce bundle size
const DynamicLinkDrawer = dynamic(() => import('./LinkDrawer'), {
    ssr: false,
})

const Navbar = () => {
    const { navigateTo } = useNavigate()
    return (
        <Box>
            <AppBar position="static" sx={{ px: { sm: 2, xs: 1 } }}>
                <Toolbar disableGutters>
                    <DynamicLinkDrawer />

                    {/* <Link href="/"> */}
                    <IconButton
                        sx={{
                            display: 'flex',
                            ml: { sm: 2, xs: 1 },
                            color: (theme) => theme.palette.secondary.main,
                        }}
                        onClick={() => navigateTo('/')}
                        // href="/"
                    >
                        <FaFileInvoiceDollar />
                    </IconButton>
                    {/* </Link> */}

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: 'flex',
                            // flexGrow: 1,
                            // fontFamily: 'monospace',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        TopInvoice
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <DisplayAvatarOptions />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Navbar
