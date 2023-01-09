import { helpers } from '@vuelidate/validators'

const hasError = (param: boolean) => {
    return helpers.withParams(
        { type: 'sameAs', value: param },
        () => {
            return !param
        }
    )
}

export default hasError