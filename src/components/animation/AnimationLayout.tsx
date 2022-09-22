import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { PropsWithChildren } from 'react'

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

interface LayoutProps extends PropsWithChildren {
    title?: string
    description?: string
}

const defaultTitle = 'TopInvoice'
const defaultDescription = 'Simple invoice management web tool'

const AnimationLayout = ({
    children,
    title = defaultTitle,
    description = defaultDescription,
}: LayoutProps) => (
    <div>
        <NextSeo
            title={'TopInvoice'}
            description={'Simple invoice management web tool'}
            openGraph={{ title, description }}
        />

        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear' }}
        >
            {children}
        </motion.main>
    </div>
)

export default AnimationLayout
