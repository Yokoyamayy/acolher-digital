import React from 'react';
import {
  ArrowCounterClockwise,
  CircleNotch,
  FileText,
  UserCheck,
  UserMinus,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/shared/lib/utils';
import {
  DOC_STATUS_CLASS,
  PRIORITY_META,
  resolveQueueDocStatus,
  type QueuePatientItem,
} from './types';

export interface FilaTriagemRowProps {
  item: QueuePatientItem;
  isDismissedView: boolean;
  pendingType?: 'match' | 'triage' | 'dismiss' | 'reactivate' | null;
  onOpenMatch: (itemId: string) => void;
  onOpenTriage: (itemId: string) => void;
  onOpenDismiss: (itemId: string) => void;
  onReactivateItem: (itemId: string) => void | Promise<void>;
}

export const FilaTriagemRow: React.FC<FilaTriagemRowProps> = ({
  item,
  isDismissedView,
  pendingType = null,
  onOpenMatch,
  onOpenTriage,
  onOpenDismiss,
  onReactivateItem,
}) => {
  const prio = PRIORITY_META[item.prioridade];
  const docStatus = resolveQueueDocStatus(item);
  const waitLabel =
    item.diasEspera === 0
      ? 'Inscrito hoje'
      : item.diasEspera === 1
        ? 'Há 1 dia'
        : `Há ${item.diasEspera} dias`;
  const isRowPending = pendingType !== null;

  return (
    <tr
      data-testid={`queue-row-${item.id}`}
      className="transition-colors duration-150 hover:bg-muted/30"
    >
      <td className="px-4 py-3.5 align-middle">
        <div className="font-semibold leading-snug text-foreground">
          {item.nome}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground/80 tabular-nums">
          {item.idade} anos • {item.telefone}
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-3.5 align-middle tabular-nums">
        <div className="text-sm font-medium text-foreground">
          {item.dataInscricao}
        </div>
        <div
          className={cn(
            'mt-0.5 text-xs',
            isDismissedView
              ? 'text-muted-foreground/80'
              : item.diasEspera >= 5
                ? 'font-medium text-amber-600 dark:text-amber-400'
                : 'text-muted-foreground/80'
          )}
        >
          {isDismissedView
            ? `Encerrado: ${item.desfechoData ?? 'Registrado'}`
            : waitLabel}
        </div>
      </td>

      <td className="whitespace-nowrap px-4 py-3.5 align-middle">
        <span className={cn('text-xs font-semibold', prio.textClass)}>
          {prio.label}
        </span>
      </td>

      <td className="px-4 py-3.5 align-middle">
        <span
          className={cn(
            'whitespace-nowrap text-xs font-semibold',
            DOC_STATUS_CLASS[docStatus]
          )}
        >
          {docStatus}
        </span>
        {isDismissedView && item.desfechoMotivo && (
          <div className="mt-0.5 max-w-[200px] truncate text-xs text-rose-600 dark:text-rose-400">
            {item.desfechoMotivo}
          </div>
        )}
      </td>

      <td className="px-4 py-3.5 align-middle text-xs text-muted-foreground">
        {item.origem || 'Não informada'}
      </td>

      <td className="px-4 py-3.5 align-middle text-center">
        <div className="mx-auto flex w-24 flex-col items-center gap-1.5">
          {isDismissedView ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isRowPending}
                onClick={() => onOpenTriage(item.id)}
                className="h-7 w-24 gap-1 rounded-md border-border/60 text-xs transition-colors duration-150"
              >
                <FileText size={18} className="text-muted-foreground align-middle" />
                <span>Triagem</span>
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                disabled={isRowPending}
                onClick={() => onReactivateItem(item.id)}
                className="h-7 w-24 gap-1 rounded-md text-xs transition-colors duration-150"
              >
                {pendingType === 'reactivate' ? (
                  <CircleNotch size={18} className="animate-spin align-middle" />
                ) : (
                  <ArrowCounterClockwise size={18} className="align-middle" />
                )}
                <span>Reativar</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="default"
                size="sm"
                disabled={isRowPending}
                onClick={() => onOpenMatch(item.id)}
                data-testid={`queue-match-btn-${item.id}`}
                className="h-7 w-24 gap-1 rounded-md text-xs transition-colors duration-150"
              >
                {pendingType === 'match' ? (
                  <CircleNotch size={18} className="animate-spin align-middle" />
                ) : (
                  <UserCheck size={18} className="align-middle" />
                )}
                <span>Vincular</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isRowPending}
                onClick={() => onOpenTriage(item.id)}
                data-testid={`queue-triage-btn-${item.id}`}
                className="h-7 w-24 gap-1 rounded-md border-border/60 text-xs transition-colors duration-150"
              >
                <FileText size={18} className="text-muted-foreground align-middle" />
                <span>Triagem</span>
              </Button>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={isRowPending}
                    onClick={() => onOpenDismiss(item.id)}
                    data-testid={`queue-dismiss-btn-${item.id}`}
                    className="h-7 w-24 gap-1 rounded-md border border-border/60 text-xs text-muted-foreground transition-colors duration-150 hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <UserMinus size={18} className="align-middle" />
                    <span>Desfecho</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="text-xs">
                  Registrar saída ou arquivamento na fila
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
