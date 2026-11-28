/**
 * @file roles.js
 * @description Espelho JS executável em navegador de src/config/roles.ts — Matriz RBAC e nomenclatura fixa das 10 telas do AcolherDigital (CACS).
 */

export const ROLES = {
  GERAL: 'GERAL',
  ADMIN_TI: 'ADMIN_TI',
  PSICOLOGO_VOLUNTARIO: 'PSICOLOGO_VOLUNTARIO',
  COORDENACAO_TECNICA: 'COORDENACAO_TECNICA',
  COORDENACAO_ADMINISTRATIVA: 'COORDENACAO_ADMINISTRATIVA'
};

export const FIXED_SCREENS = [
  { id: 'painel', label: 'Início', route: '/inicio', icon: 'home', section: 'Atendimento' },
  { id: 'fila', label: 'Fila de Triagem', route: '/fila-triagem', icon: 'list-ordered', section: 'Atendimento' },
  { id: 'pacientes', label: 'Pacientes', route: '/pacientes', icon: 'users', section: 'Atendimento' },
  { id: 'agenda', label: 'Agenda', route: '/agenda', icon: 'calendar', section: 'Atendimento' },
  { id: 'voluntarios', label: 'Psicólogos Voluntários', route: '/psicologos-voluntarios', icon: 'user-check', section: 'Equipe' },
  { id: 'perfis', label: 'Perfis', route: '/perfis', icon: 'users-round', section: 'Equipe' },
  { id: 'acessos', label: 'Gestão de Acessos', route: '/gestao-acessos', icon: 'key-round', section: 'Equipe' },
  { id: 'documentos', label: 'Documentos', route: '/documentos', icon: 'file-text', section: 'Sistema' },
  { id: 'automacao', label: 'Configurações', route: '/configuracoes', icon: 'settings', section: 'Sistema' },
  { id: 'meuPerfil', label: 'Meu Perfil', route: '/meu-perfil', icon: 'user-circle', section: 'Conta' }
];

export const LOGOUT_NAV_ACTION = {
  id: 'sair',
  label: 'Sair',
  route: '/login',
  icon: 'log-out',
  section: 'Conta'
};

function buildNavSectionsForAllowedTabs(allowedTabs) {
  const sectionOrder = ['Atendimento', 'Equipe', 'Sistema', 'Conta'];
  return sectionOrder
    .map(header => ({
      header,
      items: FIXED_SCREENS
        .filter(s => s.section === header && allowedTabs.includes(s.id))
        .map(s => ({ tab: s.id, label: s.label, route: s.route, icon: s.icon }))
    }))
    .filter(sec => sec.items.length > 0);
}

const GERAL_ALLOWED = ['painel', 'fila', 'pacientes', 'agenda', 'voluntarios', 'perfis', 'acessos', 'documentos', 'automacao', 'meuPerfil'];
const ADMIN_TI_ALLOWED = ['painel', 'perfis', 'acessos', 'automacao', 'meuPerfil'];
const PSICOLOGO_ALLOWED = ['painel', 'pacientes', 'agenda', 'documentos', 'meuPerfil'];
const COORD_TECNICA_ALLOWED = ['painel', 'fila', 'pacientes', 'agenda', 'voluntarios', 'perfis', 'documentos', 'automacao', 'meuPerfil'];
const COORD_ADMIN_ALLOWED = ['painel', 'fila', 'pacientes', 'agenda', 'voluntarios', 'perfis', 'documentos', 'automacao', 'meuPerfil'];

export const ROLE_CONFIG = {
  [ROLES.GERAL]: {
    id: ROLES.GERAL,
    legacyId: 'geral',
    name: 'Acesso Geral',
    shortName: 'Geral',
    badge: 'Geral',
    badgeClass: 'bg-[#FEF9C3] text-[#713F12] border-[#FDE047]',
    description: 'Acesso total a todas as 10 telas e permissões clínicas, administrativas, de acessos e auditoria.',
    defaultTab: 'painel',
    defaultUserUsername: 'geral',
    clinicalAccess: true,
    allowedTabs: GERAL_ALLOWED,
    forbiddenTabs: [],
    scopeDescription: 'Acesso irrestrito a todos os módulos do AcolherDigital: atendimento, triagem, prontuários clínicos, agenda, voluntários, perfis, gestão de acessos, documentos, configurações e logs de auditoria.',
    navSections: buildNavSectionsForAllowedTabs(GERAL_ALLOWED)
  },

  [ROLES.ADMIN_TI]: {
    id: ROLES.ADMIN_TI,
    legacyId: 'adminTi',
    name: 'Administrador de TI',
    shortName: 'Admin TI',
    badge: 'Admin TI',
    badgeClass: 'bg-sky-50 text-[#156599] border-sky-200',
    description: 'Início, Perfis, Gestão de Acessos, Configurações e Meu Perfil.',
    defaultTab: 'painel',
    defaultUserUsername: 'admin',
    clinicalAccess: false,
    allowedTabs: ADMIN_TI_ALLOWED,
    forbiddenTabs: ['fila', 'pacientes', 'agenda', 'voluntarios', 'documentos'],
    scopeDescription: 'Governança técnica, perfis, gestão de acessos RBAC, infraestrutura e configurações. Bloqueado de dados clínicos e operacionais de Pacientes, Fila de Triagem, Agenda, Psicólogos Voluntários e Documentos.',
    navSections: buildNavSectionsForAllowedTabs(ADMIN_TI_ALLOWED)
  },

  [ROLES.PSICOLOGO_VOLUNTARIO]: {
    id: ROLES.PSICOLOGO_VOLUNTARIO,
    legacyId: 'psicologo',
    name: 'Psicólogo Voluntário',
    shortName: 'Psicólogo Voluntário',
    badge: 'Psicólogo Voluntário',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Início, Pacientes (vinculados e prontuários), Agenda (própria), Documentos e Meu Perfil.',
    defaultTab: 'painel',
    defaultUserUsername: 'patrick.psi',
    clinicalAccess: true,
    allowedTabs: PSICOLOGO_ALLOWED,
    forbiddenTabs: ['fila', 'voluntarios', 'perfis', 'acessos', 'automacao'],
    scopeDescription: 'Atendimento clínico direto, evolução de prontuários próprios, agenda individual, documentos clínicos e perfil profissional.',
    navSections: buildNavSectionsForAllowedTabs(PSICOLOGO_ALLOWED)
  },

  [ROLES.COORDENACAO_TECNICA]: {
    id: ROLES.COORDENACAO_TECNICA,
    legacyId: 'coordTecnica',
    name: 'Coordenação Técnica',
    shortName: 'Coord. Técnica',
    badge: 'Coordenação Técnica',
    badgeClass: 'bg-blue-50 text-[#156599] border-blue-200',
    description: 'Início, Fila de Triagem, Pacientes, Agenda, Psicólogos Voluntários, Perfis, Documentos, Configurações (regras clínicas) e Meu Perfil.',
    defaultTab: 'painel',
    defaultUserUsername: 'marcelo.psi',
    clinicalAccess: true,
    allowedTabs: COORD_TECNICA_ALLOWED,
    forbiddenTabs: ['acessos'],
    scopeDescription: 'Supervisão clínica global, validação de triagens, homologação/alocação de psicólogos voluntários e parametrização de regras clínicas.',
    navSections: buildNavSectionsForAllowedTabs(COORD_TECNICA_ALLOWED)
  },

  [ROLES.COORDENACAO_ADMINISTRATIVA]: {
    id: ROLES.COORDENACAO_ADMINISTRATIVA,
    legacyId: 'coordAdmin',
    name: 'Coordenação Administrativa',
    shortName: 'Coord. Administrativa',
    badge: 'Coordenação Administrativa',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
    description: 'Início, Fila de Triagem, Pacientes (cadastral), Agenda (recepção/check-in), Psicólogos Voluntários, Perfis, Documentos, Configurações (notificações) e Meu Perfil.',
    defaultTab: 'painel',
    defaultUserUsername: 'mariana.admin',
    clinicalAccess: false,
    allowedTabs: COORD_ADMIN_ALLOWED,
    forbiddenTabs: ['acessos'],
    scopeDescription: 'Recepção, cadastro administrativo de pacientes (sem acesso a evoluções clínicas/PEP), check-in/remarcação na agenda e notificações.',
    navSections: buildNavSectionsForAllowedTabs(COORD_ADMIN_ALLOWED)
  }
};

export function normalizeRole(roleKey) {
  if (!roleKey) return ROLES.ADMIN_TI;
  if (ROLE_CONFIG[roleKey]) return roleKey;
  const match = Object.values(ROLE_CONFIG).find(
    c => c.legacyId === roleKey || c.id === roleKey || c.shortName.toLowerCase() === String(roleKey).toLowerCase()
  );
  return match ? match.id : ROLES.ADMIN_TI;
}

export function resolveTabFromRoute(routeOrTab) {
  if (!routeOrTab) return 'painel';
  const cleaned = String(routeOrTab).replace(/^#/, '').trim();
  const byRoute = FIXED_SCREENS.find(s => s.route === cleaned || s.route.slice(1) === cleaned);
  if (byRoute) return byRoute.id;
  return cleaned;
}

export function getRouteForTab(tabName) {
  const found = FIXED_SCREENS.find(s => s.id === tabName);
  return found ? found.route : '/inicio';
}

export function canAccessTab(roleKey, tabName) {
  const resolved = resolveTabFromRoute(tabName);
  if (resolved === 'meuPerfil' || resolved === 'restrito') return true;
  const normRole = normalizeRole(roleKey);
  const config = ROLE_CONFIG[normRole];
  if (!config) return false;
  return config.allowedTabs.includes(resolved);
}

export function getDefaultTab(roleKey) {
  const normRole = normalizeRole(roleKey);
  return ROLE_CONFIG[normRole]?.defaultTab || 'painel';
}

export function getRoleConfig(roleKey) {
  const normRole = normalizeRole(roleKey);
  return ROLE_CONFIG[normRole] || ROLE_CONFIG[ROLES.ADMIN_TI];
}

export function getRoleName(roleKey) {
  return getRoleConfig(roleKey).name;
}

if (typeof window !== 'undefined') {
  window.CACS_ROLES = {
    ROLES,
    FIXED_SCREENS,
    ROLE_CONFIG,
    normalizeRole,
    resolveTabFromRoute,
    getRouteForTab,
    canAccessTab,
    getDefaultTab,
    getRoleConfig,
    getRoleName
  };
}
