import {
  NavLink as NavLinkBase,
  NavLinkProps,
  useLocation,
} from 'react-router-dom'

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  return (
    <NavLinkBase
      data-current={pathname === props.to}
      className={({ isActive }) =>
        `flex items-center gap-1.5 text-sm font-medium text-muted-foreground ${isActive && 'text-gray-900 underline underline-offset-4'} hover:text-foreground`
      }
      {...props}
    />
  )
}
