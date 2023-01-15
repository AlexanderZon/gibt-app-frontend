import AccountModel from "../Account/AccountModel";
import ModelBase from "../ModelBase";
import UserInterface from "./UserInterface";

class UserModel extends ModelBase implements UserInterface {
    declare name: string
    declare email: string
    declare last_activity_at: string | null
    declare accounts: Array<AccountModel>

    constructor(data: UserInterface) {
        super(data)
        this.name = data.name;
        this.email = data.email;
        this.last_activity_at = data.last_activity_at;

        this.accounts = []
        if (data.accounts) {
            data.accounts.forEach(account => {
                this.accounts.push(new AccountModel(account))
            })
        }
    }
}

export default UserModel