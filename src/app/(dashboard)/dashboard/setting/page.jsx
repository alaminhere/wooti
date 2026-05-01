import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import ChangePassword from '@/components/shared/ChangePassword';
import Notification from '@/components/shared/Notification';

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-5 max-w-xl ">
      <AppBreadcrumb
        items={[
          { title: 'Dashboard', href: '/dashboard/' },
          { title: 'Setting' },
        ]}
      />

      <Notification />
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
