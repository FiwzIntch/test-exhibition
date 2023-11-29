export interface ExhibitionModel {
  id: number
  name: string
  type: ExhibitionType
  startDate: string
  endDate: string
  active: boolean
  detail: string
  copyright: Copyright
  images: string[]
}

export interface ExhibitionModelView extends ExhibitionModel {
  checked?: boolean
}

export interface Copyright {
  name: string
  phone: string
  email: string
}

export type ExhibitionType = 'media' | 'literature' | 'art'
