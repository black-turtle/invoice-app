import { Autocomplete, Box, Chip, Grid, TextField } from '@mui/material'

interface IProps {
    onChange: (companyName: string) => void
    companyNameList: string[]
    defaultCompany: string
}
const InvoiceCompanyNameFilter = (props: IProps) => {
    return (
        <Box
            sx={{
                // display: 'flex',
                // justifyContent: 'center',
                // alignSelf: 'baseline',
                w: '100%',
                my: '2rem',
            }}
            data-test="company-name-filter"
        >
            <Chip label="Filters" />

            <Grid
                container
                spacing={2}
                // maxWidth="sm"
                // justifyContent="center"
                // alignItems="center"
                sx={{
                    p: 2,
                    m: 0,
                    borderRadius: 2,
                    overflow: 'hidden',
                    // background: grey[200],
                }}
            >
                <Grid item xs={10} sm={4}>
                    <Autocomplete
                        disablePortal
                        options={props.companyNameList}
                        defaultValue={
                            props.defaultCompany === ''
                                ? undefined
                                : props.defaultCompany
                        }
                        onChange={(event, newValue) => {
                            props.onChange(newValue ?? '')
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Company Name"
                                // InputProps={{
                                //     startAdornment: (
                                //         <InputAdornment position="start">
                                //             <Chip label="=" />
                                //         </InputAdornment>
                                //     ),
                                // }}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default InvoiceCompanyNameFilter
