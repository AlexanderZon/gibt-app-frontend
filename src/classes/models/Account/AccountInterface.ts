import ModelInterface from "@/classes/models/ModelInterface"
import CharacterInterface from "../Characters/CharacterInterface"
import WeaponInterface from "../Weapon/WeaponInterface"

interface AccountInterface extends ModelInterface {
    user_id: number
    title: string
    game_server: string
    is_active: boolean
    account_characters?: Array<CharacterInterface>
    account_weapons?: Array<WeaponInterface>
}

export default AccountInterface