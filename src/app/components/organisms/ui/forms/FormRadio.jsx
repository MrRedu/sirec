import propTypes from 'prop-types'
import {
  MARCAS_RADIOS,
  MODELOS_RADIOS,
  STATUS_RADIOS,
  TIPOS_RADIOS,
} from '@/utils/const'
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react'

export const FormRadio = ({ radioData, handleChange, errors }) => {
  return (
    <form
      // action=""
      className="form flex flex-col gap-4"
      autoComplete="off"
    >
      <Input
        type="text"
        label="Serial"
        placeholder="890TPA0102"
        isRequired
        onChange={handleChange}
        value={radioData.serialRadio}
        name="serialRadio"
        maxLength={32}
        isInvalid={errors.serial.hasError}
        errorMessage={errors.serial.message}
      />
      <div className="grid gap-4 grid-cols-2">
        <Input
          type="text"
          label="TEI"
          placeholder="T000123456789123"
          onChange={handleChange}
          value={radioData.teiRadio}
          name="teiRadio"
          maxLength={32}
        />
        {/* TODO: VALIDACIÓN DE SOLO NÚMERO */}
        <Input
          type="text"
          label="ISSI"
          placeholder="20240101"
          onChange={handleChange}
          value={radioData.issiRadio}
          name="issiRadio"
          min={0}
          maxLength={32}
        />
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Select
          label="Selecciona una marca"
          isRequired
          onChange={handleChange}
          selectedKeys={[radioData.idMarcaRadio]}
          name="idMarcaRadio"
          isInvalid={errors.marca.hasError}
          errorMessage={errors.marca.message}
        >
          {MARCAS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Selecciona un modelo"
          isRequired
          onChange={handleChange}
          selectedKeys={[radioData.idModeloRadio]}
          name="idModeloRadio"
          isInvalid={errors.modelo.hasError}
          errorMessage={errors.modelo.message}
        >
          {MODELOS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid gap-4 grid-cols-2">
        <Select
          label="Selecciona una tipo"
          isRequired
          onChange={handleChange}
          selectedKeys={[radioData.idTipoRadio]}
          name="idTipoRadio"
          isInvalid={errors.tipo.hasError}
          errorMessage={errors.tipo.message}
        >
          {TIPOS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value}>{label}</SelectItem>
          ))}
        </Select>
        <Select
          label="Selecciona un estado"
          isRequired
          onChange={handleChange}
          selectedKeys={[radioData.idStatusRadio]}
          name="idStatusRadio"
          isInvalid={errors.status.hasError}
          errorMessage={errors.status.message}
        >
          {STATUS_RADIOS.map(({ value, label }) => (
            <SelectItem key={value} d>
              {label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Textarea
        maxRows={4}
        label="Observación"
        onChange={handleChange}
        value={radioData.observacionRadio}
        name="observacionRadio"
        maxLength={255}
      />
      {/* TODO: VALIDACIÓN DE SOLO NÚMERO */}
      <Input
        type="text"
        label="N.° de Bien"
        placeholder="00356"
        onChange={handleChange}
        value={radioData.numBienRadio}
        name="numBienRadio"
        min={0}
        maxLength={32}
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small mr-2">{`No.`}</span>
          </div>
        }
      />
    </form>
  )
}

FormRadio.propTypes = {
  radioData: propTypes.object,
  handleChange: propTypes.func,
  errors: propTypes.object,
}
