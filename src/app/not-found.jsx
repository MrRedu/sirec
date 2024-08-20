import { Section } from '@/components/atoms/ui/Section'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Section className="w-full h-screen grid content-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            {`#404`}
          </h2>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{`Esta página no existe`}</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{`No pudimos encontrar la página solicitada.`}</p>
          <Button color="primary" className="relative">
            <Link href="/" className="absolute inset-0" />
            {`Volver a la página principal`}
          </Button>
        </div>
      </div>
    </Section>
  )
}
