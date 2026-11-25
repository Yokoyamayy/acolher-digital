import React from 'react';
import { Tray } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export interface FilaTriagemSkeletonRowsProps {
  rows?: number;
}

export const FilaTriagemSkeletonRows: React.FC<FilaTriagemSkeletonRowsProps> = ({
  rows = 5,
}) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <tr key={`skeleton-row-${index}`} aria-hidden="true">
        <td className="px-4 py-3.5">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </td>
        <td className="px-4 py-3.5">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </td>
        <td className="px-4 py-3.5">
          <Skeleton className="h-4 w-20" />
        </td>
        <td className="px-4 py-3.5">
          <Skeleton className="h-4 w-20" />
        </td>
        <td className="px-4 py-3.5">
          <Skeleton className="h-4 w-36" />
        </td>
        <td className="px-4 py-3.5">
          <div className="mx-auto flex w-24 flex-col gap-1.5">
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-7 w-24 rounded-md" />
          </div>
        </td>
      </tr>
    ))}
  </>
);

export interface FilaTriagemEmptyStateProps {
  isDismissedView: boolean;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  onOpenNewPatient: () => void;
}

export const FilaTriagemEmptyState: React.FC<FilaTriagemEmptyStateProps> = ({
  isDismissedView,
  hasActiveFilters,
  onResetFilters,
  onOpenNewPatient,
}) => (
  <tr>
    <td colSpan={6} className="px-6 py-14 text-center">
      <div className="mx-auto flex max-w-sm flex-col items-center space-y-3">
        <div className="rounded-full bg-muted/50 p-3 text-muted-foreground inline-flex items-center justify-center">
          <Tray size={20} weight="duotone" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {isDismissedView
              ? 'Nenhum desfecho registrado'
              : 'Nenhum paciente encontrado na fila'}
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {hasActiveFilters
              ? 'Nenhum registro corresponde aos filtros aplicados. Limpe a busca para visualizar toda a fila.'
              : 'Cadastre um novo paciente na fila para iniciar a triagem e a priorização.'}
          </p>
        </div>
        <Button
          type="button"
          variant={hasActiveFilters ? 'outline' : 'default'}
          size="sm"
          onClick={hasActiveFilters ? onResetFilters : onOpenNewPatient}
          className="mt-1 h-8 rounded-lg text-xs transition-colors duration-150"
        >
          {hasActiveFilters ? 'Limpar filtros' : 'Cadastrar Paciente na Fila'}
        </Button>
      </div>
    </td>
  </tr>
);
