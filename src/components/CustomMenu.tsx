import {
    Box,
    Button,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import { ReactNode, useState } from 'react'

const menuStyles = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

export interface MenuActionData {
    dataTestAttr?: string
    Icon?: ReactNode
    text: string
    onClick?: () => void
}

const CustomMenu = (props: {
    header: ReactNode | string
    actions: MenuActionData[]
    dataTestAttr?: string
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setAnchorEl(null)
    }

    const handleActionClick = (
        event: React.MouseEvent<HTMLElement>,
        onClickAction?: () => void,
    ) => {
        event.stopPropagation()
        onClickAction && onClickAction()
        handleCloseMenu(event)
    }

    return (
        <Box sx={{ flexGrow: 0, mr: { sm: 2, xs: 1 } }}>
            <Button
                onClick={handleOpenMenu}
                data-test={props.dataTestAttr}
                // sx={{ p: 0 }}
            >
                {props.header}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                keepMounted
                PaperProps={menuStyles}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                onClose={handleCloseMenu}
            >
                {props.actions.map((action) => (
                    <MenuItem
                        key={action.text}
                        onClick={(e) => handleActionClick(e, action?.onClick)}
                        data-test={action.dataTestAttr}
                    >
                        {action.Icon && (
                            <ListItemIcon>{action.Icon}</ListItemIcon>
                        )}
                        <Typography textAlign="center">
                            {action.text}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default CustomMenu
