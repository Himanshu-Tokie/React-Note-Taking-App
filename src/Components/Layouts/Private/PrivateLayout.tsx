import { AppLayoutProps } from '../AppLayout.d';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PrivateLayout;
