export const NAVIGATION_HEADER = [
  {
    name: 'Panel principal',
    href: '/dashboard',
  },
  {
    name: 'Radios',
    submenu: [
      { name: 'Ver todos', href: '/radios' },
      { name: 'Marcas y modelos', href: '/marcas-y-modelos' },
    ],
  },
  {
    name: 'Asignaciones',
    href: '/assignments',
  },
  {
    name: 'Funcionarios',
    submenu: [
      { name: 'Ver todos', href: '/officers' },
      { name: 'Organismos y grupos', href: '/organismos-y-grupos' },
      { name: 'Rangos', href: '/rangos' },
    ],
  },
  {
    name: 'Más',
    submenu: [
      { name: 'Usuarios', href: '/users' },
      { name: 'Bitácora', href: '/log' },
      { name: 'Reportes', href: '/reports' },
    ],
  },
]

export const MARCAS_RADIOS = [
  { value: 1, label: 'Motorola' },
  { value: 2, label: 'Huawei' },
]
export const MODELOS_RADIOS = [
  { value: 1, label: 'MTP850' },
  { value: 2, label: 'MTP3550' },
  { value: 3, label: 'MTM5400' },
]
export const TIPOS_RADIOS = [
  { value: 1, label: 'Portátil' },
  { value: 2, label: 'Móvil' },
  { value: 3, label: 'Fijo' },
]
export const STATUS_RADIOS = [
  { value: 1, label: 'Operativo' },
  { value: 2, label: 'Inoperativo' },
  { value: 3, label: 'Entregado' },
  { value: 4, label: 'Nuevo' },
  { value: 5, label: 'Vacaciones' },
  { value: 6, label: 'Extraviado' },
  { value: 7, label: 'Externo' },
  { value: 8, label: 'En mantenimiento' },
  { value: 9, label: 'En garantía' },
  { value: 10, label: 'Desincorporado' },
  { value: 11, label: 'En depósito' },
]

export const radioDataInitialState = {
  serialRadio: '',
  teiRadio: '',
  observacionRadio: '',
  issiRadio: '',
  numBienRadio: '',
  idStatusRadio: 0,
  idMarcaRadio: 0,
  idModeloRadio: 0,
  idTipoRadio: 0,
}


export const ONE_HOUR_IN_MILLISECONDS = 60 * 60 * 1000