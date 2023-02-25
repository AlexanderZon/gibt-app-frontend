import { AscensionMaterialGroupModel } from './AscensionMaterialGroup'
import { TalentAscensionMaterialModel } from './TalentAscensionMaterial'
import { WeapAscensionMaterialModel } from './WeapAscensionMaterial'

export interface DayFarmingInterface {
    date: string
    talent_books?: Array<TalentAscensionMaterialModel>
    weap_primary_materials?: Array<WeapAscensionMaterialModel>
}

export class DayFarmingModel implements DayFarmingInterface {
    declare date: string
    declare talent_books: Array<TalentAscensionMaterialModel>
    declare weap_primary_materials: Array<WeapAscensionMaterialModel>

    constructor(data: DayFarmingInterface) {
        this.date = data.date
        this.talent_books = []
        if (data.talent_books) {
            data.talent_books.forEach(talent_book => {
                this.talent_books.push(new TalentAscensionMaterialModel(talent_book))
            })
        }
        this.weap_primary_materials = []
        if (data.weap_primary_materials) {
            data.weap_primary_materials.forEach(weap_primary_material => {
                this.weap_primary_materials.push(new WeapAscensionMaterialModel(weap_primary_material))
            })
        }
    }
}

export interface DayFarmingGroupInterface {
    date: string
    talent_book_groups?: Array<AscensionMaterialGroupModel>
    weap_primary_material_groups?: Array<AscensionMaterialGroupModel>
}

export class DayFarmingGroupModel implements DayFarmingGroupInterface {
    declare date: string
    declare talent_book_groups: Array<AscensionMaterialGroupModel>
    declare weap_primary_material_groups: Array<AscensionMaterialGroupModel>

    constructor(data: DayFarmingGroupInterface) {
        this.date = data.date
        this.talent_book_groups = []
        if (data.talent_book_groups) {
            data.talent_book_groups.forEach(talent_book_group => {
                this.talent_book_groups.push(talent_book_group)
            })
        }
        this.weap_primary_material_groups = []
        if (data.weap_primary_material_groups) {
            data.weap_primary_material_groups.forEach(weap_primary_material_group => {
                this.weap_primary_material_groups.push(weap_primary_material_group)
            })
        }
    }
}