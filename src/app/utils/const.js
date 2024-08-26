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
  { value: 1, label: 'Desincorporado' },
  { value: 2, label: 'En depósito' },
  { value: 3, label: 'En garantía' },
  { value: 4, label: 'En reparación' },
  { value: 5, label: 'Entregado' },
  { value: 6, label: 'Extraviado' },
  { value: 7, label: 'Externo' },
  { value: 8, label: 'Inoperativo' },
  { value: 9, label: 'Nuevo' },
  { value: 10, label: 'Operativo' },
  { value: 11, label: 'Vacaciones' },
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
