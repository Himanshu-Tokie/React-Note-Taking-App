import { AppLayoutProps } from '../AppLayout.d';
import NoteNavbar from './Navbar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      <NoteNavbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
