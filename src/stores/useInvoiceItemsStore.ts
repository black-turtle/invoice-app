import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { InvoiceItem } from '../api/invoiceApis'

interface StoreValues {
    items: InvoiceItem[]
    isModalOpen: boolean
    selectedItemIdx: number
    mode: 'create' | 'edit'
    viewMode: boolean
}

interface StoreActions {
    reset: () => void
    getSelectedItemOrDefault: () => InvoiceItem
    openModal: (mode: 'create' | 'edit', selectedItemIdx: number) => void
    closeModal: () => void
    setItems: (items: InvoiceItem[]) => void
    updateSelectedItem: (item: InvoiceItem) => void
    deleteItem: (idx: number) => void
    addNewItem: (item: InvoiceItem) => void
    setInvoiceItemsViewMode: (viewMode: boolean) => void
    getTotalPrice: () => number
}

interface Store extends StoreValues, StoreActions {}

const defaultValues: StoreValues = {
    items: [],
    isModalOpen: false,
    selectedItemIdx: -1,
    mode: 'create',
    viewMode: false,
}

export const useInvoiceItemStore = create<Store>()(
    devtools(
        immer((set, get) => ({
            ...defaultValues,

            reset: () => set(defaultValues),

            openModal: (mode: 'create' | 'edit', selectedItemIdx?: number) =>
                set((state) => {
                    state.mode = mode
                    state.selectedItemIdx = selectedItemIdx ?? -1
                    state.isModalOpen = true
                }),

            closeModal: () =>
                set((state) => {
                    state.selectedItemIdx = -1
                    state.isModalOpen = false
                }),

            getSelectedItemOrDefault: () => {
                const { items, selectedItemIdx } = get()
                return selectedItemIdx >= 0
                    ? items[selectedItemIdx]
                    : { description: '', price: 0 }
            },

            setItems: (items: InvoiceItem[]) =>
                set((state) => {
                    state.items = items
                }),

            updateSelectedItem: (item: InvoiceItem) =>
                set((state) => {
                    const { selectedItemIdx } = get()
                    state.items[selectedItemIdx] = item
                }),

            deleteItem: (idx: number) =>
                set((state) => {
                    const { items } = get()
                    state.items = [...items].splice(idx, 1)
                }),

            addNewItem: (item: InvoiceItem) =>
                set((state) => {
                    state.items.push(item)
                }),

            setInvoiceItemsViewMode: (viewMode: boolean) =>
                set((state) => {
                    state.viewMode = viewMode
                }),

            getTotalPrice: () => {
                const { items } = get()
                if (!items) return 100
                return items
                    .map((item) => item.price)
                    .reduce((sum, x) => sum + x, 0)
            },
        })),
        { name: 'InvoiceItemStore' },
    ),
)
