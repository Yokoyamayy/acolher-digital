/**
 * @file App.tsx
 * @description Raiz modular do AcolherDigital com IconContext.Provider global do @phosphor-icons/react
 * (size=20, weight="regular"), controle RBAC e barra lateral padronizada.
 */

import React from 'react';
import { IconContext } from '@phosphor-icons/react';
import { AuthRoleProvider } from '../shared/contexts/AuthRoleContext.jsx';
import { RoleGuard, Sidebar } from '../shared/components/ui/index.js';
import { APP_ROUTES } from './routes.js';

export interface AppProps {
  children?: React.ReactNode;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onLogout?: () => void;
  userName?: string;
  userInitials?: string;
}

export const App: React.FC<AppProps> = ({
  children,
  activeTab = 'painel',
  onSelectTab,
  onLogout,
  userName,
  userInitials,
}) => {
  return (
    <IconContext.Provider value={{ size: 20, weight: 'regular' }}>
      <AuthRoleProvider>
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC] text-[#1E293B]">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={onSelectTab}
            onLogout={onLogout}
            userName={userName}
            userInitials={userInitials}
          />
          <main className="flex-1 min-w-0">
            <RoleGuard tab={activeTab}>{children}</RoleGuard>
          </main>
        </div>
      </AuthRoleProvider>
    </IconContext.Provider>
  );
};

export { APP_ROUTES };
export default App;
