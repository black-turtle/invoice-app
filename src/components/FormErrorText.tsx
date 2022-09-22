const style = {
    color: '#ef233c',
    fontWeight: '400',
}

const FormErrorText = (props: { dataTest: string; error?: string }) => {
    if (!props.error) {
        return null
    }
    return (
        <span data-test={props.dataTest} style={style}>
            {props.error}
        </span>
    )
}

export default FormErrorText
