'use client'
import {
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Image,
} from '@nextui-org/react'
import { NAVIGATION_HEADER } from '@/utils/const'
import { AvatarComponent } from './AvatarComponent'
import { ChevronDownIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-center">
      <div className="w-full flex items-center justify-between py-4 px-8">
        <Image
          width={82}
          height={82}
          alt="Logo del Servicio Desconcentrado de Telecomunicaciones Aragua"
          src="/logo-sdta.svg"
        />
        <nav>
          <ul className={'flex gap-4'}>
            {NAVIGATION_HEADER.map(({ name, href, submenu }, index) => (
              <li key={index}>
                {href ? (
                  <Button href={href} as={Link} color="primary" variant="solid">
                    {name}
                  </Button>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <AvatarComponent />
        </div>
      </div>
    </header>
  )
}
