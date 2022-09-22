import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { InvoiceItem } from '../../../api/invoiceApis'
import CustomTextField from '../../../components/input-components/CustomTextField'
import { useInvoiceItemStore } from '../../../stores/useInvoiceItemsStore'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    px: 4,
    py: 3,
    textAlign: 'center',
    borderRadius: '7px',
}

const zodSchema = z.object({
    price: z
        .number()
        .or(
            z
                .string()
                .min(1, { message: 'Price should be Positive' })
                .regex(/\d+/, { message: 'Price should be Positive' })
                .transform(Number),
        )
        .refine((n) => n > 0, { message: 'Price should be Positive' }),
    description: z
        .string()
        .min(1, { message: 'Item Description is required' })
        .min(3, {
            message: `Item Description should be at least 3 characters long`,
        }),
})
type schemaType = z.infer<typeof zodSchema>

export default function InvoiceItemEditor() {
    const {
        mode,
        closeModal,
        isModalOpen,
        getSelectedItemOrDefault,
        addNewItem,
        updateSelectedItem,
    } = useInvoiceItemStore()

    // component values
    const defaultValue = getSelectedItemOrDefault()
    const methods = useForm<schemaType>({
        resolver: zodResolver(zodSchema),
        defaultValues: defaultValue,
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onItemSubmit = (item: InvoiceItem) => {
        mode === 'create' ? addNewItem(item) : updateSelectedItem(item)
        closeModal()
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <FormProvider {...methods}>
                <Box
                    component="form"
                    onSubmit={(e: any) => {
                        e.stopPropagation()
                        return handleSubmit(onItemSubmit)(e)
                    }}
                    sx={style}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ mb: 1 }}
                    >
                        {mode === 'create' ? 'Add new Item' : 'Update'}
                    </Typography>

                    {/* <TextField
                        fullWidth
                        multiline
                        margin="normal"
                        label="Description"
                        {...register('description')}
                        error={!!errors.description?.message}
                        inputProps={{ 'data-test': 'invoice-item-description' }}
                        helperText={
                            <FormErrorText
                                dataTest="invoice-item-description-error"
                                error={errors.description?.message}
                            />
                        }
                    /> */}

                    <CustomTextField
                        label="Description"
                        name="description"
                        dataTestAttr="invoice-item-description"
                        dataTestErrorAttr="invoice-item-description-error"
                        isRequired
                    />

                    <CustomTextField
                        type="number"
                        label="Price"
                        name="price"
                        dataTestAttr="invoice-item-price"
                        dataTestErrorAttr="invoice-item-price-error"
                        isRequired
                    />

                    {/* <TextField
                        type="number"
                        fullWidth
                        margin="normal"
                        label="Price"
                        {...register('price')}
                        error={!!errors.price?.message}
                        inputProps={{ 'data-test': 'invoice-item-price' }}
                        helperText={
                            <FormErrorText
                                dataTest="invoice-item-price-error"
                                error={errors.price?.message}
                            />
                        }
                    /> */}
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        data-test="submit-client"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                    >
                        {mode === 'edit' ? 'Update' : 'Add'}
                    </LoadingButton>
                </Box>
            </FormProvider>
        </Modal>
    )
}
