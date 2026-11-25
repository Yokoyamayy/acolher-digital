import React from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { QueuePageSize } from './types';

export interface FilaTriagemPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  pageSize: QueuePageSize;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: QueuePageSize) => void;
}

export const FilaTriagemPagination: React.FC<FilaTriagemPaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const handleSizeChange = (value: string) => {
    if (value === 'all') {
      onPageSizeChange('all');
      return;
    }
    const parsed = Number(value);
    if (parsed === 5 || parsed === 10 || parsed === 15 || parsed === 25) {
      onPageSizeChange(parsed);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground sm:flex-row">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium tabular-nums" data-testid="queue-pagination-info">
          {totalItems === 0
            ? 'Exibindo 0 pacientes'
            : `Exibindo ${startIndex + 1}–${endIndex} de ${totalItems} ${totalItems === 1 ? 'paciente' : 'pacientes'}`}
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="queuePageSizeSelect" className="text-muted-foreground">
            Itens por página:
          </label>
          <Select value={String(pageSize)} onValueChange={handleSizeChange}>
            <SelectTrigger
              id="queuePageSizeSelect"
              aria-label="Selecionar quantidade de itens por página"
              className="h-8 w-[84px] rounded-lg border-border/60 bg-background text-xs font-medium text-foreground tabular-nums"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/60 shadow-sm">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="all">Todos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Página anterior"
          className="size-8 rounded-lg border-border/60 transition-colors duration-150"
        >
          <CaretLeft size={18} className="align-middle" />
        </Button>

        <span className="px-2 text-xs font-medium text-foreground tabular-nums">
          {currentPage} / {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Próxima página"
          className="size-8 rounded-lg border-border/60 transition-colors duration-150"
        >
          <CaretRight size={18} className="align-middle" />
        </Button>
      </div>
    </div>
  );
};
