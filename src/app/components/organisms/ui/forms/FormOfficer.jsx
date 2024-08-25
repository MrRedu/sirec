import propTypes from 'prop-types'
import { Input, Select, SelectItem } from '@nextui-org/react'

export const FormOfficer = ({ officerData, handleChange, errors }) => {
  return (
    <form
      // action=""
      className="form flex flex-col gap-4"
      autoComplete="off"
    >
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
          onChange={handleChange}
          value={officerData.telefonoOfficer}
          name="telefonoOfficer"
          //   min={0}
          //   maxLength={32}
        />
      </div>
      <div className="flex gap-4">
        <Select
          label="Organismo del funcionario"
          isRequired
          onChange={handleChange}
          selectedKeys={[officerData.idOrganismoOfficer]}
          name="idOrganismoOfficer"
          //   isInvalid={errors.marca.hasError}
          //   errorMessage={errors.marca.message}
        >
          {/* {MARCAS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))} */}
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
          {/* {MARCAS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))} */}
        </Select>
      </div>
      <div className="flex gap-4">
        <Select
          label="Rango del funcionario"
          isRequired
          onChange={handleChange}
          selectedKeys={[officerData.idRangoOfficer]}
          name="idRangoOfficer"
          //   isInvalid={errors.marca.hasError}
          //   errorMessage={errors.marca.message}
        >
          {/* {MARCAS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))} */}
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
          {/* {MARCAS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))} */}
        </Select>
      </div>
      {/* <Textarea
        maxRows={4}
        label="Observación"
        onChange={handleChange}
        value={officerData.observacionRadio}
        name="observacionRadio"
        maxLength={255}
      /> */}
    </form>
  )
}

FormOfficer.propTypes = {
  officerData: propTypes.object,
  handleChange: propTypes.func,
  errors: propTypes.object,
}
