import { Skeleton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'

interface IProps {
    cnt?: number
    isTable?: boolean
}

function getSkeletons(cnt: number, isTable?: boolean) {
    const nodes: ReactNode[] = []
    for (let i = 1; i <= cnt; i++) {
        nodes.push(
            <Typography key={i} variant={isTable ? 'h4' : 'h2'}>
                <Skeleton animation="wave" />
            </Typography>,
        )
    }
    return nodes
}
export const LOADING_SKELETON_TEST_ID = 'loading-skelton'
export default function CustomSkeleton({ cnt, isTable }: IProps) {
    return (
        <Box
            data-test={LOADING_SKELETON_TEST_ID}
            data-testid={LOADING_SKELETON_TEST_ID}
            sx={{ width: '100%', ...(!isTable && { my: '3rem' }) }}
        >
            {getSkeletons(cnt ?? 5, isTable)}
        </Box>
    )
}
