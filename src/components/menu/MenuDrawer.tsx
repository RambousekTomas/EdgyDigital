import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Drawer } from 'react-native-drawer-layout'
import Menu from './Menu'

type MenuDrawerControlContextType = {
  openDrawer: () => void
  closeDrawer: () => void
}

export const MenuDrawerContext = createContext<
  MenuDrawerControlContextType | undefined
>(undefined)

export const useMenuDrawerContext = () => {
  const contextIsDefined = useContext(MenuDrawerContext)
  if (!contextIsDefined) {
    throw new Error('MenuDrawerContext must be used within a Provider')
  }
  return contextIsDefined
}

const MenuDrawer = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const renderMenu = useCallback(() => <Menu />, [])

  const openDrawer = useCallback(() => {
    setOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Drawer
      open={open}
      onOpen={openDrawer}
      onClose={closeDrawer}
      renderDrawerContent={renderMenu}
      drawerType="front"
    >
      <MenuDrawerContext.Provider value={{ openDrawer, closeDrawer }}>
        {children}
      </MenuDrawerContext.Provider>
    </Drawer>
  )
}

export default MenuDrawer
