import { AppLayoutProps } from '../AppLayout.d';
import Navbar from './Navbar';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="w-screen h-screen bg-cover bg-center bg-[url('src/assets/BG_design.png')]">
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default PublicLayout;
