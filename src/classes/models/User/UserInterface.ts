import AccountModel from "../Account/AccountModel"
import ModelInterface from "../ModelInterface"

interface UserInterface extends ModelInterface {
    id: number
    name: string
    email: string
    last_activity_at: string | null
    accounts?: Array<AccountModel>
}

export default UserInterface