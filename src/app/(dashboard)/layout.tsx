import '@/app/globals.css';
import Layout from '@/components/layout/layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <Layout>{children}</Layout>
    </div>
  );
}
