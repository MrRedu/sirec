export const NAVIGATION_HEADER = [
  {
    name: 'Panel principal',
    href: '/dashboard',
  },
  {
    name: 'Radios',
    submenu: [
      {
        name: 'Ver todos',
        href: '/radios',
      },
      {
        name: 'Marcas y modelos',
        href: '/marcas-y-modelos',
      },
    ],
  },
  {
    name: 'Asignaciones',
    href: '/assignments',
  },
  {
    name: 'Funcionarios',
    submenu: [
      {
        name: 'Ver todos',
        href: '/funcionarios',
      },
      {
        name: 'Organismos y grupos',
        href: '/organismos-y-grupos',
      },
      {
        name: 'Rangos',
        href: '/rangos',
      },
    ],
  },
  {
    name: 'Más',
    submenu: [
      {
        name: 'Usuarios',
        href: '/users',
      },
      {
        name: 'Bitácora',
        href: '/log',
      },
      {
        name: 'Reportes',
        href: '/reports',
      },
    ],
  },
]
