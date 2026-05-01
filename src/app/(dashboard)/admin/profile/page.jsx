import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import ProfileCard from '@/components/shared/ProfileCard';

const AdminProfilePage = () => {
  return (
    <>
      <div className="mb-5 ">
        <AppBreadcrumb
          items={[
            { title: 'Dashboard', href: '/dashboard/' },
            { title: 'Profile' },
          ]}
        />
      </div>
      <ProfileCard />
    </>
  );
};

export default AdminProfilePage;
