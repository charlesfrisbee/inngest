'use server';

import { type ReactNode } from 'react';

import IncidentBanner from '@/app/(organization-active)/IncidentBanner';
import { getNavCollapsed } from '@/app/actions';
import { getProfile } from '@/queries/server-only/profile';
import type { Environment } from '@/utils/environments';
import SideBar from './SideBar';

type LayoutProps = {
  envSlug?: string;
  activeEnv?: Environment;
  children: ReactNode;
};

export default async function Layout({ activeEnv, children }: LayoutProps) {
  const collapsed = await getNavCollapsed();
  const { user, org } = await getProfile();
  const profile = {
    orgName: org?.name,
    displayName: user.displayName,
  };

  return (
    <div className="fixed z-50 flex h-screen w-full flex-row justify-start overflow-y-scroll overscroll-y-none">
      <SideBar collapsed={collapsed} activeEnv={activeEnv} profile={profile} />

      <div className="flex w-full flex-col overflow-x-scroll">
        <IncidentBanner />
        {children}
      </div>
    </div>
  );
}
