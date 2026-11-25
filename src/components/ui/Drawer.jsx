import React, { useEffect, useRef, useCallback } from 'react';
import { X } from '@phosphor-icons/react';

/**
 * Mapeamento de tamanhos responsivos para a Gaveta Lateral Direita (Drawer).
 * Segue estritamente as diretrizes de hierarquia e viewport do CACS Design System.
 */
const DRAWER_SIZES = {
  sm: 'w-full sm:w-[400px] md:w-[440px]',
  md: 'w-full sm:w-[480px] md:w-[540px]',
  lg: 'w-full sm:w-[580px] md:w-[680px] lg:w-[760px]',
  xl: 'w-full sm:w-[680px] md:w-[820px] lg:w-[940px]',
  full: 'w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw]'
};

/**
 * Componente Base: Gaveta Lateral Direita (Drawer)
 * 
 * Substitui modais flutuantes centralizados por painéis laterais direitos ancorados,
 * permitindo ao operador manter o contexto visual da grade de fundo (Agenda, Pacientes, Fila).
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controla a visibilidade da gaveta
 * @param {function} props.onClose - Callback chamado para solicitar fechamento
 * @param {string|React.ReactNode} props.title - Título exibido no cabeçalho fixo
 * @param {string|React.ReactNode} [props.subtitle] - Subtítulo / metadados
 * @param {string|React.ReactNode} [props.badge] - Badge contextual (status, código, prontuário)
 * @param {React.ReactNode} [props.icon] - Ícone Lucide ou elemento SVG no topo
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [props.size='md'] - Largura responsiva da gaveta
 * @param {React.ReactNode} props.children - Conteúdo rolável do corpo
 * @param {React.ReactNode} [props.footer] - Rodapé fixo para ações primárias/secundárias
 * @param {boolean} [props.closeOnBackdropClick=true] - Se clique fora fecha a gaveta
 * @param {boolean} [props.closeOnEsc=true] - Se tecla ESC fecha a gaveta
 * @param {boolean} [props.hasUnsavedChanges=false] - Se há alterações pendentes (exige confirmação)
 * @param {string} [props.confirmCloseMessage] - Mensagem de confirmação de descarte de dados
 * @param {string} [props.className] - Classes utilitárias adicionais no container da gaveta
 * @param {string} [props.bodyClassName] - Classes adicionais no corpo rolável
 * @param {string} [props.ariaLabel] - Rótulo acessível da gaveta (WCAG AAA)
 * @param {string} [props.id] - Identificador único no DOM
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  icon,
  size = 'md',
  children,
  footer,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  hasUnsavedChanges = false,
  confirmCloseMessage = 'Existem alterações não salvas neste formulário. Deseja realmente fechar sem salvar?',
  className = '',
  bodyClassName = '',
  ariaLabel,
  id
}) {
  const drawerRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Solicitação controlada de fechamento com guarda de dados não salvos
  const handleRequestClose = useCallback(() => {
    if (hasUnsavedChanges) {
      const confirmDiscard = window.confirm(confirmCloseMessage);
      if (!confirmDiscard) return;
    }
    if (onClose) onClose();
  }, [hasUnsavedChanges, confirmCloseMessage, onClose]);

  // Fechamento via teclado (ESC) e gerenciamento de foco (Acessibilidade WCAG)
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (closeOnEsc && (e.key === 'Escape' || e.key === 'Esc')) {
        e.stopPropagation();
        handleRequestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Trava de rolagem suave do body da página de fundo
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Foco automático no primeiro elemento focalizável ou no container
    const focusable = drawerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    } else {
      drawerRef.current?.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, closeOnEsc, handleRequestClose]);

  if (!isOpen) return null;

  const widthClass = DRAWER_SIZES[size] || DRAWER_SIZES.md;

  return (
    <div
      id={id}
      className="fixed inset-0 z-40 flex justify-end overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || (typeof title === 'string' ? title : 'Painel Lateral')}
    >
      {/* 1. Backdrop / Overlay com blur sutil para preservar o contexto visual da tela de fundo */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out"
        aria-hidden="true"
        onClick={() => {
          if (closeOnBackdropClick) handleRequestClose();
        }}
      />

      {/* 2. Painel Lateral (Drawer) animado da direita para a esquerda */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`relative z-50 h-full max-h-screen ${widthClass} flex flex-col bg-white border-l border-slate-300 shadow-2xl transition-transform duration-300 ease-out transform translate-x-0 ${className}`}
      >
        {/* Cabeçalho Fixo (Header — Azul Institucional #1976B2) */}
        <div className="px-6 py-4 bg-[#1976B2] text-white border-b border-[#156599] flex items-center justify-between gap-3 shrink-0 select-none">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 text-[#F2B705] flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {badge && (
                  <span className="shrink-0">{badge}</span>
                )}
                <h3 className="text-base font-bold text-white truncate leading-tight">
                  {title}
                </h3>
              </div>
              {subtitle && (
                <div className="text-xs text-sky-100 mt-1 truncate">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          {/* Botão de Fechar no topo direito */}
          <button
            type="button"
            onClick={handleRequestClose}
            aria-label="Fechar painel lateral"
            className="p-2 rounded-xl text-white/85 hover:text-white hover:bg-[#156599] active:bg-white/20 transition-all shrink-0 inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#F2B705]"
          >
            <X size={20} weight="regular" className="align-middle" />
          </button>
        </div>

        {/* Corpo Rolável (Body) */}
        <div className={`p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5 text-xs text-slate-800 ${bodyClassName}`}>
          {children}
        </div>

        {/* Rodapé Fixo (Footer) */}
        {footer && (
          <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-300 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Subcomponentes utilitários para composição
 */
export function DrawerHeader({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 bg-[#1976B2] text-white border-b border-[#156599] flex items-center justify-between gap-3 shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export function DrawerBody({ children, className = '' }) {
  return (
    <div className={`p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5 text-xs text-slate-800 ${className}`}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-3.5 bg-slate-100 border-t border-slate-300 flex flex-wrap items-center justify-between gap-3 shrink-0 ${className}`}>
      {children}
    </div>
  );
}

export default Drawer;
