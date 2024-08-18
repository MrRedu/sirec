'use client'
import propTypes from 'prop-types'
import Link from 'next/link'
import {
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
              <Button color="primary" variant="flat" className="relative">
                {name}
                <Link href={href} className="text-sm absolute inset-0" />
              </Button>
            ) : (
              // Si idRol es 3 (general) no mostrar el dropdown
              (name !== 'Más' || idRol !== 3) && (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      color="primary"
                      variant="flat"
                    >
                      {name}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Link actions"
                    className="max-w-[300px]"
                  >
                    {submenu.map(({ name, href }, subIndex) => (
                      <DropdownItem
                        key={subIndex}
                        color="primary"
                        variant="flat"
                        className="relative"
                      >
                        {name}
                        <Link
                          href={href}
                          className="text-sm absolute inset-0"
                        />
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
