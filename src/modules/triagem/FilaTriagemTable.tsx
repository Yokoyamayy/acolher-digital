import React from 'react';
import { CaretDown, CaretUp, CaretUpDown } from '@phosphor-icons/react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';
import { FilaTriagemRow } from './FilaTriagemRow';
import {
  FilaTriagemEmptyState,
  FilaTriagemSkeletonRows,
} from './FilaTriagemStates';
import type {
  QueuePatientItem,
  QueueSortField,
  QueueSortState,
} from './types';

export interface FilaTriagemTableProps {
  items: QueuePatientItem[];
  isLoading?: boolean;
  isDismissedView: boolean;
  hasActiveFilters: boolean;
  sortState: QueueSortState;
  pendingAction?: {
    itemId: string;
    type: 'match' | 'triage' | 'dismiss' | 'reactivate';
  } | null;
  onSort: (field: QueueSortField) => void;
  onOpenMatch: (itemId: string) => void;
  onOpenTriage: (itemId: string) => void;
  onOpenDismiss: (itemId: string) => void;
  onReactivateItem: (itemId: string) => void | Promise<void>;
  onResetFilters: () => void;
  onOpenNewPatient: () => void;
}

const SORTABLE_COLUMNS: ReadonlyArray<{ field: QueueSortField; label: string }> = [
  { field: 'nome', label: 'Paciente' },
  { field: 'dataInscricao', label: 'Data Inscrição' },
  { field: 'prioridade', label: 'Prioridade' },
  { field: 'tcle', label: 'Documentação' },
  { field: 'origem', label: 'Origem' },
];

export const FilaTriagemTable: React.FC<FilaTriagemTableProps> = ({
  items,
  isLoading = false,
  isDismissedView,
  hasActiveFilters,
  sortState,
  pendingAction,
  onSort,
  onOpenMatch,
  onOpenTriage,
  onOpenDismiss,
  onReactivateItem,
  onResetFilters,
  onOpenNewPatient,
}) => {
  const renderSortIcon = (field: QueueSortField) => {
    if (sortState.field !== field) {
      return (
        <CaretUpDown
          size={16}
          className="text-muted-foreground/60 transition-colors group-hover:text-foreground align-middle"
          aria-hidden="true"
        />
      );
    }
    const Icon = sortState.direction === 'asc' ? CaretUp : CaretDown;
    return <Icon size={16} weight="bold" className="text-primary align-middle" aria-hidden="true" />;
  };

  return (
    <TooltipProvider delayDuration={250}>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <ScrollArea className="w-full">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground select-none">
                {SORTABLE_COLUMNS.map(col => {
                  const isSorted = sortState.field === col.field;
                  return (
                    <th
                      key={col.field}
                      scope="col"
                      aria-sort={
                        isSorted
                          ? sortState.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                      className="px-4 py-3 text-center"
                    >
                      <button
                        type="button"
                        onClick={() => onSort(col.field)}
                        className="group inline-flex items-center justify-center gap-1.5 rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span>{col.label}</span>
                        {renderSortIcon(col.field)}
                      </button>
                    </th>
                  );
                })}
                <th scope="col" className="px-4 py-3 text-center">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-sm">
              {isLoading ? (
                <FilaTriagemSkeletonRows />
              ) : items.length === 0 ? (
                <FilaTriagemEmptyState
                  isDismissedView={isDismissedView}
                  hasActiveFilters={hasActiveFilters}
                  onResetFilters={onResetFilters}
                  onOpenNewPatient={onOpenNewPatient}
                />
              ) : (
                items.map(item => (
                  <FilaTriagemRow
                    key={item.id}
                    item={item}
                    isDismissedView={isDismissedView}
                    pendingType={
                      pendingAction?.itemId === item.id ? pendingAction.type : null
                    }
                    onOpenMatch={onOpenMatch}
                    onOpenTriage={onOpenTriage}
                    onOpenDismiss={onOpenDismiss}
                    onReactivateItem={onReactivateItem}
                  />
                ))
              )}
            </tbody>
          </table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};
