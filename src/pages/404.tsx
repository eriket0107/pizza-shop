import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h1>Página não encontrada</h1>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          {' '}
          Dashboard
        </Link>
      </p>
    </div>
  )
}
