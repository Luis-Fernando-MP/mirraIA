import { IGetAllImage } from '@/db/actions/image.action'
import { type StateCreator, create } from 'zustand'

interface IPublicationsStore {
  publications: IGetAllImage[]
  setPubs: (pubs: IGetAllImage[]) => void
}

const store: StateCreator<IPublicationsStore> = set => ({
  publications: [],
  setPubs(pubs) {
    set({ publications: [...pubs] })
  }
})

const publicationsStore = create<IPublicationsStore>(store)

export default publicationsStore
