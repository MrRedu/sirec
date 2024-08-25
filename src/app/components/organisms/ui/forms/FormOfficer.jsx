import propTypes from 'prop-types'
import { Input, Select, SelectItem } from '@nextui-org/react'

const STATUS_OFFICER = [
  { value: 1, label: 'Activo' },
  { value: 2, label: 'Inactivo' },
  { value: 3, label: 'Permiso' },
  { value: 4, label: 'Reposo' },
  { value: 5, label: 'Vacaciones' },
]
const RANGOS_OFFICER = [
  { value: 1, label: 'Técnico' },
  { value: 2, label: 'Coordinador' },
  { value: 3, label: 'Director' },
  { value: 4, label: 'Gerente' },
]
const GRUPOS_OFFICER = [
  { value: 1, label: 'Dpto. de Sistemas' },
  { value: 2, label: 'Dpto. de Telecomunicaciones' },
]
const ORGANISMOS_OFFICER = [
  { value: 1, label: 'Servicio Desconcentrado de Telecomunicaciones Aragua' },
  { value: 2, label: 'Policía Bolivariana de Aragua' },
  { value: 3, label: 'Policía Bolivariana Nacional' },
]

export const FormOfficer = ({ officerData, handleChange, errors }) => {
  return (
    <form className="form flex flex-col gap-4" autoComplete="off">
      <div className="flex gap-4">
        <Input
          type="text"
          label="Nombres"
          // placeholder="890TPA0102"
          isRequired
          onChange={handleChange}
          value={officerData.nombresOfficer}
          name="nombresOfficer"
          maxLength={32}
          // isInvalid={errors.serial.hasError}
          // errorMessage={errors.serial.message}
        />
        <Input
          type="text"
          label="Apellidos"
          // placeholder="890TPA0102"
          isRequired
          onChange={handleChange}
          value={officerData.apellidosOfficer}
          name="apellidosOfficer"
          maxLength={32}
          // isInvalid={errors.serial.hasError}
          // errorMessage={errors.serial.message}
        />
      </div>
      <div className="flex gap-4">
        {/* TODO: Validación para cédula */}
        <Input
          type="text"
          label="Cédula"
          placeholder="V 12.345.678"
          isRequired
          onChange={handleChange}
          value={officerData.cedulaOfficer}
          name="cedulaOfficer"
          maxLength={12}
        />
        {/* TODO: Validación para número de celular y que use el patrón del placeholder */}
        <Input
          type="text"
          label="Número de teléfono"
          placeholder="(414) 123 45 67"
          isRequired
          onChange={handleChange}
          value={officerData.telefonoOfficer}
          name="telefonoOfficer"
          //   min={0}
          //   maxLength={32}
        />
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Select
          label="Organismo del funcionario"
          isRequired
          onChange={handleChange}
          selectedKeys={[officerData.idOrganismoOfficer]}
          name="idOrganismoOfficer"
          //   isInvalid={errors.marca.hasError}
          //   errorMessage={errors.marca.message}
        >
          {ORGANISMOS_OFFICER.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Grupo del funcionario"
          isRequired
          onChange={handleChange}
          selectedKeys={[officerData.idGrupoOfficer]}
          name="idGrupoOfficer"
          //   isInvalid={errors.marca.hasError}
          //   errorMessage={errors.marca.message}
        >
          {GRUPOS_OFFICER.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Select
          label="Rango del funcionario"
          isRequired
          onChange={handleChange}
          selectedKeys={[officerData.idRangoOfficer]}
          name="idRangoOfficer"
          //   isInvalid={errors.marca.hasError}
          //   errorMessage={errors.marca.message}
        >
          {RANGOS_OFFICER.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Status del funcionario"
          isRequired
          onChange={handleChange}
          selectedKeys={[officerData.idStatusOfficer]}
          name="idStatusOfficer"
          //   isInvalid={errors.marca.hasError}
          //   errorMessage={errors.marca.message}
        >
          {STATUS_OFFICER.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
      </div>
    </form>
  )
}

FormOfficer.propTypes = {
  officerData: propTypes.object,
  handleChange: propTypes.func,
  errors: propTypes.object,
}
