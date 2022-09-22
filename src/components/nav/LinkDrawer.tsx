import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Toolbar } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import * as React from 'react'
import { FaFileInvoiceDollar, FaUserTie } from 'react-icons/fa'
import useNavigate from '../../hooks/useNavigate'

const links = [
    { text: 'Clients', href: '/clients', icon: <FaUserTie /> },
    { text: 'Invoices', href: '/invoices', icon: <FaFileInvoiceDollar /> },
]

const DrawerContent = (props: {
    onCloseDrawer: (event: any) => void
    open: boolean
}) => {
    const { router } = useNavigate()

    const handleLinkClick = (href: string) => {
        router.push(href)
        props.onCloseDrawer(null)
    }

    return (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={props.onCloseDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />

            <List>
                {links.map((link, index) => (
                    <ListItem key={link.text} disablePadding>
                        <ListItemButton
                            onClick={() => handleLinkClick(link.href)}
                        >
                            <ListItemIcon>{link.icon}</ListItemIcon>
                            <ListItemText primary={link.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default function LinkDrawer() {
    const [open, setOpen] = React.useState<boolean>(false)

    const setDrawerState = (open: boolean) => (event: any) => {
        setOpen(open)
    }

    return (
        <div>
            <Box>
                <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={setDrawerState(true)}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={setDrawerState(false)}
                onOpen={setDrawerState(true)}
            >
                <DrawerContent
                    onCloseDrawer={setDrawerState(false)}
                    open={open}
                />
            </SwipeableDrawer>
        </div>
    )
}
