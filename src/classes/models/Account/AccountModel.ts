import ModelBase from '@/classes/models/ModelBase'
import CharacterInterface from '../Characters/CharacterInterface'
import CharacterModel from '../Characters/CharacterModel'
import WeaponInterface from '../Weapon/WeaponInterface'
import WeaponModel from '../Weapon/WeaponModel'
import AccountInterface from './AccountInterface'

class AccountModel extends ModelBase implements AccountInterface {
    declare user_id: number
    declare title: string
    declare game_server: string
    declare is_active: boolean
    declare account_characters: Array<CharacterInterface>
    declare account_weapons: Array<WeaponInterface>

    constructor(data: AccountInterface) {
        super(data)
        this.user_id = data.user_id
        this.title = data.title
        this.game_server = data.game_server
        this.is_active = data.is_active
        this.account_characters = []
        if (data.account_characters) {
            data.account_characters.forEach(account_character => {
                this.account_characters.push(new CharacterModel(account_character))
            })
        }
        this.account_weapons = []
        if (data.account_weapons) {
            data.account_weapons.forEach(account_weapon => {
                this.account_weapons.push(new WeaponModel(account_weapon))
            })
        }
    }

    static blank() {
        return new AccountModel({
            title: '',
            game_server: 'NA',
            is_active: false,
            user_id: 0
        })
    }
}

export default AccountModel