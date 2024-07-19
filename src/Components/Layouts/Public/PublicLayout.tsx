import ICONS from '../../../assets';
import { AppLayoutProps } from '../AppLayout.d';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  // document.body.classList.remove('dark');
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-cover bg-center bg-neutral-100 dark:bg-[#505052] lg:flex justify-center items-center z-0 hidden">
        {/* Outer div content */}
      </div>
      <div className="place-self-center max-h-fit fixed inset-0 flex items-center justify-center bg-white dark:bg-[#353434] shadow-2xl rounded-none lg:rounded-2xl p-4 lg:p-8 max-w-full lg:max-w-4xl mx-0 lg:mx-4 w-full z-10 h-full lg:h-auto">
        <div className="w-full lg:w-1/2 p-4 lg:h-auto h-full place-content-center">{children}</div>
        <div className="hidden md:flex items-center justify-center w-1/2">
          <img src={ICONS.AUTH_IMAGE} alt="" className="rounded-r-2xl h-72" />
        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
