'use client'
import propTypes from 'prop-types'
import {
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react'
import { ChevronDownIcon } from 'lucide-react'
import { NAVIGATION_HEADER } from '@/utils/const'

export const Nav = ({ idRol }) => {
  return (
    <nav>
      <ul className={'flex gap-4'}>
        {NAVIGATION_HEADER.map(({ name, href, submenu }, index) => (
          <li key={index}>
            {href ? (
              <Button href={href} as={Link} color="primary" variant="solid">
                {name}
              </Button>
            ) : (
              // Si idRol es 3 (general) no mostrar el dropdown
              (name !== 'Más' || idRol !== 3) && (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      color="primary"
                      variant="solid"
                    >
                      {name}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Link Actions"
                    className="max-w-[300px]"
                  >
                    {submenu.map(({ name, href }, subIndex) => (
                      <DropdownItem
                        key={subIndex}
                        href={href}
                        color="primary"
                        variant="solid"
                        as={Link}
                      >
                        {name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              )
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

Nav.propTypes = {
  idRol: propTypes.number,
}
