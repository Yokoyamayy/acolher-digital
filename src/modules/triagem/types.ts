export type QueuePriority = 'Muito Alta' | 'Alta' | 'Média' | 'Baixa';

export type QueueDocStatus = 'Completa' | 'Em Análise' | 'Pendente';

export type QueueFilterValue =
  | 'todas'
  | QueuePriority
  | 'Docs_Aprovados'
  | 'TCLE_Assinado'
  | 'TCLE_Pendente'
  | 'CRAS'
  | 'Assistente_Social'
  | 'Espontanea'
  | 'Desfecho';

export type QueueSortField =
  | 'nome'
  | 'dataInscricao'
  | 'prioridade'
  | 'tcle'
  | 'origem';

export type SortDirection = 'asc' | 'desc';

export interface QueueSortState {
  field: QueueSortField;
  direction: SortDirection;
}

export interface QueueDocumentRecord {
  id: string;
  nome: string;
  status: 'Aprovado' | 'Anexado' | 'Assinado' | 'Pendente';
  arquivo?: string;
}

export interface QueuePatientItem {
  id: string;
  prontuario: string;
  nome: string;
  idade: number;
  telefone: string;
  cpf?: string;
  email?: string;
  dataInscricao: string;
  diasEspera: number;
  prioridade: QueuePriority;
  origem: string;
  queixaResumo?: string;
  tcleAssinado: boolean;
  documentosAprovados?: boolean;
  documentos?: QueueDocumentRecord[];
  desfechoMotivo?: string;
  desfechoParecer?: string;
  desfechoData?: string;
  desfechoRegistradoPor?: string;
}

export type QueuePageSize = 5 | 10 | 15 | 25 | 'all';

export interface FilaTriagemProps {
  waitingQueue: QueuePatientItem[];
  dismissedQueue?: QueuePatientItem[];
  isLoading?: boolean;
  isExporting?: boolean;
  pendingAction?: {
    itemId: string;
    type: 'match' | 'triage' | 'dismiss' | 'reactivate';
  } | null;
  onExportQueue: () => void | Promise<void>;
  onOpenNewPatient: () => void;
  onOpenMatch: (itemId: string) => void;
  onOpenTriage: (itemId: string) => void;
  onOpenDismiss: (itemId: string) => void;
  onReactivateItem: (itemId: string) => void | Promise<void>;
  'data-testid'?: string;
}

export function resolveQueueDocStatus(item: QueuePatientItem): QueueDocStatus {
  const allApproved =
    Boolean(item.documentosAprovados) ||
    (Array.isArray(item.documentos) &&
      item.documentos.length > 0 &&
      item.documentos.every(doc => doc.status === 'Aprovado'));

  if (allApproved) return 'Completa';
  if (item.tcleAssinado) return 'Em Análise';
  return 'Pendente';
}

export const PRIORITY_META: Record<
  QueuePriority,
  { label: string; weight: number; textClass: string }
> = {
  'Muito Alta': {
    label: 'Muito Alto',
    weight: 4,
    textClass: 'text-rose-600 dark:text-rose-400',
  },
  Alta: {
    label: 'Alto',
    weight: 3,
    textClass: 'text-orange-600 dark:text-orange-400',
  },
  Média: {
    label: 'Médio',
    weight: 2,
    textClass: 'text-amber-600 dark:text-amber-400',
  },
  Baixa: {
    label: 'Baixo',
    weight: 1,
    textClass: 'text-emerald-600 dark:text-emerald-400',
  },
};

export const DOC_STATUS_CLASS: Record<QueueDocStatus, string> = {
  Completa: 'text-emerald-600 dark:text-emerald-400',
  'Em Análise': 'text-primary',
  Pendente: 'text-amber-600 dark:text-amber-400',
};
