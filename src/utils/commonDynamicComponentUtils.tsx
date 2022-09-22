import dynamic from 'next/dynamic'

// Target of dynamic loading is non visible component at first load (eg: Animation )

// animation layout
export const DynamicAnimationLayout = dynamic<any>(
    () =>
        import('../components/animation').then(
            (module) => module.AnimationLayout,
        ),
    {
        ssr: false,
    },
)

export const DynamicFormAlert = dynamic(
    () => import('../components/FormAlert'),
    {
        ssr: false,
    },
)

export const DynamicNotFoundComponent = dynamic(
    () => import('../components/error/NotFoundComponent'),
    {
        ssr: false,
    },
)

export const DynamicServerErrorComponent = dynamic(
    () => import('../components/error/ServerErrorComponent'),
    {
        ssr: false,
    },
)
