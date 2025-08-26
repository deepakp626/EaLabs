"use client"
import HeroSectionForm from '@/app/admin/hero-section/page';

const AdminHeroSectionPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Admin: Edit Hero Section</h1>
        <HeroSectionForm />
      </div>
    </div>
  );
};

export default AdminHeroSectionPage;
