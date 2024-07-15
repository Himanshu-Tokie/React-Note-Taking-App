import ICONS from '../../../assets';
import { AppLayoutProps } from '../AppLayout.d';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  // document.body.classList.add('dark');
  return (
    <div className="w-screen h-screen bg-cover flex bg-center bg-neutral-100 justify-center items-center dark:bg-[#505052]">
      <div className="flex h-9/12 rounded-2xl bg-white shadow-2xl py-10 px-8 dark:bg-[#353434]">
        <div className="content-center">{children}</div>
        <div className="place-content-center">
          <img
            src={ICONS.AUTH_IMAGE}
            alt=""
            className="rounded-r-2xl hidden lg:block h-72"
          />
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
