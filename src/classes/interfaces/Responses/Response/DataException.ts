interface DataException {
    exception: string
    file: string
    line: number
    message: string
    trace: Array<Trace>
}

export default DataException