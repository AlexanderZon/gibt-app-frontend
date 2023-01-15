import ModelBase from '@/classes/models/ModelBase'
import AccountInterface from './AccountInterface'

class AccountModel extends ModelBase implements AccountInterface {
    declare user_id: number
    declare title: string
    declare game_server: string

    constructor(data: AccountInterface) {
        super(data)
        this.user_id = data.user_id;
        this.title = data.title;
        this.game_server = data.game_server;
    }
}

export default AccountModel