/**
 * @file App.jsx
 * @description Bridge JS para src/app/App.tsx com IconContext.Provider global do @phosphor-icons/react.
 */

import React from 'react';
import { IconContext } from '@phosphor-icons/react';
import { AuthRoleProvider } from '../shared/contexts/AuthRoleContext.jsx';
import { APP_ROUTES } from './routes.js';
import { RoleGuard, Sidebar } from '../shared/components/ui/index.js';

export function App({
  children,
  activeTab = 'painel',
  onSelectTab,
  onLogout,
  userName,
  userInitials
}) {
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
            <RoleGuard tab={activeTab}>
              {children}
            </RoleGuard>
          </main>
        </div>
      </AuthRoleProvider>
    </IconContext.Provider>
  );
}

export { APP_ROUTES };
export default App;
