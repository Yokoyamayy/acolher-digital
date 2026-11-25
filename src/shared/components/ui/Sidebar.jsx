/**
 * @file Sidebar.jsx
 * @description Barra lateral fixa e compacta (h-screen, overflow-hidden, sem rolagem vertical)
 * do AcolherDigital (CACS), padronizada com @phosphor-icons/react (weight="duotone" e #1976B2 no item ativo).
 */

import React from 'react';
import {
  CalendarBlank,
  FileText,
  GearSix,
  House,
  Key,
  ListNumbers,
  SignOut,
  UserCheck,
  UserCircle,
  Users,
  UsersThree
} from '@phosphor-icons/react';
import { useAuthRole } from '../../contexts/AuthRoleContext.jsx';

const SIDEBAR_ICON_MAP = {
  home: House,
  'list-ordered': ListNumbers,
  users: Users,
  calendar: CalendarBlank,
  'user-check': UserCheck,
  'users-round': UsersThree,
  'key-round': Key,
  'file-text': FileText,
  settings: GearSix,
  'user-circle': UserCircle
};

export function Sidebar({
  activeTab = 'painel',
  onSelectTab = () => {},
  onLogout = () => {},
  userName = 'Administrador',
  userInitials = 'AD'
}) {
  const { roleConfig } = useAuthRole();
  const sections = roleConfig?.navSections || [];

  return (
    <aside className="w-full lg:w-56 bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-300 flex flex-col justify-between shrink-0 lg:h-screen lg:sticky lg:top-0 lg:overflow-hidden z-20 shadow-sm">
      <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
        <div className="px-3 py-2.5 bg-slate-100 border-b border-slate-300 flex items-center gap-2.5 shrink-0 text-[#1E293B]">
          <img
            src="/logo-cacs-symbol.png"
            alt="Centro de Atendimento Cairbar Schutel - CACS"
            className="h-9 w-9 object-contain shrink-0"
          />
          <div className="min-w-0 flex flex-col justify-center">
            <span className="text-sm font-bold text-[#1E293B] tracking-tight leading-none truncate">
              Acolher<span className="text-[#1976B2]">Digital</span>
            </span>
            <span className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase mt-1 truncate">
              CACS • Cairbar Schutel
            </span>
          </div>
        </div>

        <nav
          aria-label="Navegação principal"
          className="flex flex-col p-2 space-y-0.5 overflow-hidden flex-1 min-h-0"
        >
          {sections.map((section, secIdx) => (
            <React.Fragment key={section.header}>
              <div
                className={`px-2.5 ${secIdx === 0 ? 'pt-1 pb-0.5' : 'pt-2 pb-0.5'} text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate`}
              >
                {section.header}
              </div>
              {section.items.map(item => {
                const isActive = activeTab === item.tab;
                const IconComp = SIDEBAR_ICON_MAP[item.icon] || House;
                const btnClass = isActive
                  ? 'w-full flex items-center justify-start gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#1976B2]/10 text-[#1976B2] border-l-4 border-[#1976B2] shadow-2xs'
                  : 'w-full flex items-center justify-start gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-200/80 transition-all border border-transparent';
                return (
                  <React.Fragment key={item.tab}>
                    <button
                      type="button"
                      id={`nav-${item.tab}`}
                      onClick={() => onSelectTab(item.tab)}
                      className={btnClass}
                    >
                      <IconComp
                        size={20}
                        weight={isActive ? 'duotone' : 'regular'}
                        color={isActive ? '#1976B2' : 'currentColor'}
                        className="shrink-0 align-middle"
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                    {item.tab === 'meuPerfil' && (
                      <button
                        type="button"
                        id="nav-sair"
                        onClick={onLogout}
                        className="w-full flex items-center justify-start gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-50 hover:border-rose-200 transition-all border border-transparent"
                      >
                        <SignOut size={20} weight="regular" className="shrink-0 align-middle text-rose-600" />
                        <span className="truncate">Sair</span>
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Identificação estática do usuário conectado (não interativa) */}
      <div className="p-2.5 border-t border-slate-300 bg-slate-100 shrink-0">
        <div className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white border border-slate-300 select-none cursor-default">
          <div className="w-8 h-8 rounded-full bg-sky-100 border border-[#1976B2]/30 text-[#156599] font-bold text-xs flex items-center justify-center shrink-0">
            {userInitials}
          </div>
          <div className="leading-tight min-w-0">
            <div className="text-xs font-bold text-[#1E293B] truncate">{userName}</div>
            <div className="text-[10px] text-slate-500 truncate">{roleConfig?.name}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
