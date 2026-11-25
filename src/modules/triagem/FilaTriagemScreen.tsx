import React, { useMemo, useState } from 'react';
import { FilaTriagemPagination } from './FilaTriagemPagination';
import { FilaTriagemTable } from './FilaTriagemTable';
import { FilaTriagemToolbar } from './FilaTriagemToolbar';
import {
  PRIORITY_META,
  resolveQueueDocStatus,
  type FilaTriagemProps,
  type QueueFilterValue,
  type QueuePageSize,
  type QueueSortField,
  type QueueSortState,
} from './types';

export const FilaTriagemScreen: React.FC<FilaTriagemProps> = ({
  waitingQueue,
  dismissedQueue = [],
  isLoading = false,
  isExporting = false,
  pendingAction = null,
  onExportQueue,
  onOpenNewPatient,
  onOpenMatch,
  onOpenTriage,
  onOpenDismiss,
  onReactivateItem,
  'data-testid': dataTestId = 'view-fila-triagem',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<QueueFilterValue>('todas');
  const [sortState, setSortState] = useState<QueueSortState>({
    field: 'prioridade',
    direction: 'desc',
  });
  const [pageSize, setPageSize] = useState<QueuePageSize>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isDismissedView = activeFilter === 'Desfecho';
  const hasActiveFilters = activeFilter !== 'todas' || searchQuery.trim().length > 0;

  const filteredAndSorted = useMemo(() => {
    const source = isDismissedView ? dismissedQueue : waitingQueue;
    const query = searchQuery.trim().toLowerCase();

    const filtered = source.filter(item => {
      const origemLower = (item.origem || '').toLowerCase();
      const docStatus = resolveQueueDocStatus(item);

      const matchesFilter =
        isDismissedView ||
        activeFilter === 'todas' ||
        (activeFilter === 'CRAS' && origemLower.includes('cras')) ||
        (activeFilter === 'Assistente_Social' &&
          origemLower.includes('assistente social')) ||
        (activeFilter === 'Espontanea' &&
          (origemLower.includes('espontânea') ||
            origemLower.includes('espontanea') ||
            origemLower.includes('portal'))) ||
        (activeFilter === 'Docs_Aprovados' && docStatus === 'Completa') ||
        (activeFilter === 'TCLE_Assinado' && docStatus === 'Em Análise') ||
        (activeFilter === 'TCLE_Pendente' && docStatus === 'Pendente') ||
        item.prioridade === activeFilter;

      if (!matchesFilter) return false;
      if (!query) return true;

      return [
        item.nome,
        item.prontuario,
        item.cpf,
        item.email,
        item.origem,
        item.telefone,
        item.queixaResumo,
        item.desfechoMotivo,
        item.desfechoParecer,
      ].some(field => Boolean(field && field.toLowerCase().includes(query)));
    });

    return [...filtered].sort((a, b) => {
      let diff = 0;
      if (sortState.field === 'nome') {
        diff = a.nome.localeCompare(b.nome, 'pt-BR');
      } else if (sortState.field === 'dataInscricao') {
        diff = a.diasEspera - b.diasEspera;
      } else if (sortState.field === 'prioridade') {
        diff =
          PRIORITY_META[a.prioridade].weight - PRIORITY_META[b.prioridade].weight;
        if (diff === 0) diff = a.diasEspera - b.diasEspera;
      } else if (sortState.field === 'tcle') {
        diff = Number(a.tcleAssinado) - Number(b.tcleAssinado);
      } else if (sortState.field === 'origem') {
        diff = (a.origem || '').localeCompare(b.origem || '', 'pt-BR');
      }
      return sortState.direction === 'asc' ? diff : -diff;
    });
  }, [waitingQueue, dismissedQueue, isDismissedView, activeFilter, searchQuery, sortState]);

  const totalItems = filteredAndSorted.length;
  const resolvedPageSize = pageSize === 'all' ? Math.max(1, totalItems) : pageSize;
  const totalPages = Math.max(1, Math.ceil(totalItems / resolvedPageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * resolvedPageSize;
  const endIndex = Math.min(startIndex + resolvedPageSize, totalItems);
  const pageItems = filteredAndSorted.slice(startIndex, endIndex);

  const handleSort = (field: QueueSortField) => {
    setSortState(prev =>
      prev.field === field
        ? { field, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { field, direction: field === 'prioridade' ? 'desc' : 'asc' }
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('todas');
    setCurrentPage(1);
  };

  return (
    <section
      data-testid={dataTestId}
      className="mx-auto w-full max-w-7xl space-y-6 bg-background p-4 sm:p-6"
    >
      <FilaTriagemToolbar
        searchQuery={searchQuery}
        activeFilter={activeFilter}
        totalCount={totalItems}
        hasActiveFilters={hasActiveFilters}
        isExporting={isExporting}
        onSearchChange={val => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onFilterChange={val => {
          setActiveFilter(val);
          setCurrentPage(1);
        }}
        onResetFilters={handleResetFilters}
        onExportQueue={onExportQueue}
        onOpenNewPatient={onOpenNewPatient}
      />

      <FilaTriagemTable
        items={pageItems}
        isLoading={isLoading}
        isDismissedView={isDismissedView}
        hasActiveFilters={hasActiveFilters}
        sortState={sortState}
        pendingAction={pendingAction}
        onSort={handleSort}
        onOpenMatch={onOpenMatch}
        onOpenTriage={onOpenTriage}
        onOpenDismiss={onOpenDismiss}
        onReactivateItem={onReactivateItem}
        onResetFilters={handleResetFilters}
        onOpenNewPatient={onOpenNewPatient}
      />

      {!isLoading && totalItems > 0 && (
        <FilaTriagemPagination
          currentPage={safePage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={nextSize => {
            setPageSize(nextSize);
            setCurrentPage(1);
          }}
        />
      )}
    </section>
  );
};

export default FilaTriagemScreen;
