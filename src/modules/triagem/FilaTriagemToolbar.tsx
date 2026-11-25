import React from 'react';
import {
  ArrowCounterClockwise,
  CircleNotch,
  Funnel,
  MagnifyingGlass,
  UploadSimple,
  UserPlus,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/shared/lib/utils';
import type { QueueFilterValue } from './types';

export interface FilaTriagemToolbarProps {
  searchQuery: string;
  activeFilter: QueueFilterValue;
  totalCount: number;
  hasActiveFilters: boolean;
  isExporting?: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: QueueFilterValue) => void;
  onResetFilters: () => void;
  onExportQueue: () => void | Promise<void>;
  onOpenNewPatient: () => void;
}

export const FilaTriagemToolbar: React.FC<FilaTriagemToolbarProps> = ({
  searchQuery,
  activeFilter,
  hasActiveFilters,
  isExporting = false,
  onSearchChange,
  onFilterChange,
  onResetFilters,
  onExportQueue,
  onOpenNewPatient,
}) => {
  return (
    <header className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Fila de Triagem
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Priorização clínica e socioassistencial, conferência documental e
            vinculação aos psicólogos voluntários.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isExporting}
            onClick={onExportQueue}
            data-testid="queue-export-btn"
            className="h-9 gap-2 rounded-lg border-border/60 transition-colors duration-150"
          >
            {isExporting ? (
              <CircleNotch size={18} className="animate-spin align-middle" />
            ) : (
              <UploadSimple size={18} className="text-primary align-middle" />
            )}
            <span>{isExporting ? 'Exportando...' : 'Exportar Fila'}</span>
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onOpenNewPatient}
            data-testid="queue-new-patient-btn"
            className="h-9 gap-2 rounded-lg transition-colors duration-150"
          >
            <UserPlus size={18} className="align-middle" />
            <span>Cadastrar Paciente na Fila</span>
          </Button>
        </div>
      </div>

      <Separator className="bg-border/60" />

      <div className="flex flex-col items-stretch gap-2.5 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground align-middle"
            aria-hidden="true"
          />
          <Input
            id="queueSearchInput"
            type="search"
            value={searchQuery}
            onChange={event => onSearchChange(event.target.value)}
            placeholder="Buscar por paciente, telefone, origem ou queixa..."
            aria-label="Buscar pacientes na fila de triagem"
            data-testid="queue-search-input"
            className={cn(
              'h-9 w-full rounded-lg border-border/60 bg-muted/30 pl-9 text-sm transition-colors duration-150',
              'placeholder:text-muted-foreground/80 focus-visible:bg-background'
            )}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap shrink-0">
          <Select
            value={activeFilter}
            onValueChange={val => onFilterChange(val as QueueFilterValue)}
          >
            <SelectTrigger
              id="queueFilterSelect"
              aria-label="Filtrar fila de triagem"
              data-testid="queue-filter-select"
              className="h-9 w-full min-w-[230px] gap-2 rounded-lg border-border/60 bg-background text-xs font-medium text-foreground transition-colors duration-150 sm:w-auto"
            >
              <Funnel
                size={18}
                className="shrink-0 text-muted-foreground align-middle"
                aria-hidden="true"
              />
              <SelectValue placeholder="Todos os Pacientes" />
            </SelectTrigger>

            <SelectContent align="end" className="rounded-xl border-border/60 shadow-sm">
              <SelectItem value="todas">Todos os Pacientes</SelectItem>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Prioridade</SelectLabel>
                <SelectItem value="Muito Alta">Muito Alto</SelectItem>
                <SelectItem value="Alta">Alto</SelectItem>
                <SelectItem value="Média">Médio</SelectItem>
                <SelectItem value="Baixa">Baixo</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Documentação</SelectLabel>
                <SelectItem value="Docs_Aprovados">Completa</SelectItem>
                <SelectItem value="TCLE_Assinado">Em Análise</SelectItem>
                <SelectItem value="TCLE_Pendente">Pendente</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Origem</SelectLabel>
                <SelectItem value="CRAS">Encaminhamento CRAS</SelectItem>
                <SelectItem value="Assistente_Social">Assistente Social</SelectItem>
                <SelectItem value="Espontanea">Inscrição Espontânea</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Situação</SelectLabel>
                <SelectItem value="Desfecho">Saída da Fila (Desfecho)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              data-testid="queue-clear-filter-btn"
              className="h-9 gap-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <ArrowCounterClockwise size={18} className="align-middle" />
              <span>Limpar</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
