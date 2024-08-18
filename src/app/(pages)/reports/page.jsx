import { Section } from '@/components/atoms/ui/Section'
import { Button, Card, CardFooter, Image } from '@nextui-org/react'
import { Title } from '@/components/atoms/ui/Title'

export default function ReportsPage() {
  return (
    <Section>
      <div className="flex items-center mb-4">
        <Title>{`Reportes`}</Title>
      </div>

      <Card
        isFooterBlurred
        radius="lg"
        className="border-none max-w-[200px] max-h-[200px] bg-slate-500"
      >
        <Image width={200} height={200} src="/users.svg" alt="Users image" />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">{`Usuarios`}</p>
          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            {`Generar reporte`}
          </Button>
        </CardFooter>
      </Card>
    </Section>
  )
}
