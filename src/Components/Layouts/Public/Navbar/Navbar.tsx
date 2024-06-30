import './navbar.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';

export function Navbar() {
  return (
    <header className="flex justify-between px-28 py-5">
      <div>
        <p className="font-bold text-2xl">Note Taker</p>
      </div>
      <div>
        <Link
          to={ROUTES.LOGIN}
          className="text-[#475467] place-content-center mx-8"
        >
          Log in
        </Link>
        <Link
          to={ROUTES.SIGN_UP}
          className="my-2 px-3 py-2 text-center bg-[#7F56D9] text-white rounded-md"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
