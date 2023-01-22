import ModelBase from '@/classes/models/ModelBase'
import CharacterModel from '../../Characters/CharacterModel'
import AccountCharacterInterface from './CharacterInterface'

class AccountCharacterModel implements AccountCharacterInterface {
    declare id: string | number | null
    declare account_id: number
    // declare account: object
    declare character_id: number
    declare character: CharacterModel
    declare account_weapon_id: number
    // declare account_weapon: object
    declare level: string
    declare constellation_level: number
    declare basic_talent_level: number
    declare elemental_talent_level: number
    declare burst_talent_level: number
    declare friendship_level: number
    declare artf_flower_id: number
    declare artf_flower_level: number
    declare artf_plume_id: number
    declare artf_plume_level: number
    declare artf_sands_id: number
    declare artf_sands_level: number
    declare artf_goblet_id: number
    declare artf_goblet_level: number
    declare artf_circlet_id: number
    declare artf_circlet_level: number

    constructor(data: AccountCharacterInterface = {}) {
        this.fill(data)
    }

    fill(data: AccountCharacterInterface) {
        if (data.id) {
            this.id = data.id
        }
        if (data.account_id) {
            this.account_id = data.account_id
        }
        if (data.character_id) {
            this.character_id = data.character_id
        }
        if (data.character) {
            this.character = new CharacterModel(data.character)
        }
        if (data.account_weapon_id) {
            this.account_weapon_id = data.account_weapon_id
        }
        if (data.level) {
            this.level = data.level
        }
        if (data.constellation_level) {
            this.constellation_level = data.constellation_level
        } else {
            this.constellation_level = 0
        }
        if (data.basic_talent_level) {
            this.basic_talent_level = data.basic_talent_level
        }
        if (data.elemental_talent_level) {
            this.elemental_talent_level = data.elemental_talent_level
        }
        if (data.burst_talent_level) {
            this.burst_talent_level = data.burst_talent_level
        }
        if (data.friendship_level) {
            this.friendship_level = data.friendship_level
        }
        if (data.artf_flower_id) {
            this.artf_flower_id = data.artf_flower_id
        }
        if (data.artf_flower_level) {
            this.artf_flower_level = data.artf_flower_level
        }
        if (data.artf_plume_id) {
            this.artf_plume_id = data.artf_plume_id
        }
        if (data.artf_plume_level) {
            this.artf_plume_level = data.artf_plume_level
        }
        if (data.artf_sands_id) {
            this.artf_sands_id = data.artf_sands_id
        }
        if (data.artf_sands_level) {
            this.artf_sands_level = data.artf_sands_level
        }
        if (data.artf_goblet_id) {
            this.artf_goblet_id = data.artf_goblet_id
        }
        if (data.artf_goblet_level) {
            this.artf_goblet_level = data.artf_goblet_level
        }
        if (data.artf_circlet_id) {
            this.artf_circlet_id = data.artf_circlet_id
        }
        if (data.artf_circlet_level) {
            this.artf_circlet_level = data.artf_circlet_level
        }
    }
}

export default AccountCharacterModel