import WeaponModel from '../../Weapon/WeaponModel'
import AccountModel from '../AccountModel'
import AccountWeaponInterface from './WeaponInterface'

class AccountWeaponModel implements AccountWeaponInterface {
    declare id: string | number | null
    declare account_id: number
    declare account: AccountModel | null
    declare weapon_id: number
    declare weapon: WeaponModel | null
    declare level: string
    declare refinement_rank: number

    constructor(data: AccountWeaponInterface = {}) {
        this.fill(data)
    }

    fill(data: AccountWeaponInterface) {
        if (data.id) {
            this.id = data.id
        }
        if (data.account_id) {
            this.account_id = data.account_id
        }
        if (data.account) {
            this.account = new AccountModel(data.account)
        } else {
            this.account = null
        }
        if (data.weapon_id) {
            this.weapon_id = data.weapon_id
        }
        if (data.weapon) {
            this.weapon = new WeaponModel(data.weapon)
        } else {
            this.weapon = null
        }
        if (data.level) {
            this.level = data.level
        }
        if (data.refinement_rank) {
            this.refinement_rank = data.refinement_rank
        } else {
            this.refinement_rank = 1
        }
    }
}

export default AccountWeaponModel