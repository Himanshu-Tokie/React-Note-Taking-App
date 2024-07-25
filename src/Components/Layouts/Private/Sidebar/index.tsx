import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTES, THEME } from '../../../../Shared/Constants';
import { useUpdateLabel } from '../../../../Shared/CustomHooks';
import { fetchLabels } from '../../../../Shared/Firebase Utils';
import { stateType } from '../../../../Views/Dashboard/types';
import ICONS from '../../../../assets';

export default function Sidebar() {
  const [data, setData] = useState<{ id: string; labelId: string }[]>();
  const uid = useSelector((state: stateType) => state.common.uid);
  const theme = useSelector((state: stateType) => state.common.theme);
  useEffect(() => {
    fetchLabels(uid).then((label) => setData(label));
  }, [uid]);
  useUpdateLabel(uid, setData);
  return (
    <div
      className="flex-1 pb-24 z-20 bg-white dark:bg-[#252526] overflow-hidden md:w-[250px] mt-3 w-2/4 transition-all duration-300 ease-in-out fixed hover:overflow-y-scroll h-dvh"
      id="sidebar"
    >
      <div className="rounded-r-full cursor-pointer hover:bg-gray-100">
        <NavLink
          to={ROUTES.HOMEPAGE}
          className={({ isActive }) =>
            isActive
              ? 'bg-[#7F56D9] flex items-center py-3 rounded-r-full text-white'
              : 'flex items-center py-3'
          }
        >
          {({ isActive }) => {
            if (isActive || theme === THEME.DARK)
              return (
                <>
                  <img
                    src={ICONS.LIGHTBULB}
                    alt="label"
                    className="pl-4 sm:pl-6 p-2"
                  />
                  <p className="pl-6 text-base dark:text-gray-300">Notes</p>
                </>
              );
            return (
              <>
                <img
                  src={ICONS.LIGHTBULB_DARK}
                  alt="label"
                  className="pl-4 sm:pl-6 p-2"
                />
                <p className="pl-6 text-base dark:text-gray-300">Notes</p>
              </>
            );
          }}
        </NavLink>
      </div>
      {/* <div
        className="rounded-r-full cursor-pointer hover:bg-gray-100"
        id="Reminders"
      >
        <NavLink
          to={ROUTES.Reminder}
          className={({ isActive }) =>
            isActive
              ? 'bg-[#7F56D9] flex items-center py-3 rounded-r-full text-white'
              : 'flex items-center py-3'
          }
        >
          <img src={ICONS.NOTIFICATIONS} alt="Reminders" className="pl-6 p-2" />
          <p className="pl-6 text-base dark:text-gray-300">Reminders</p>
        </NavLink>
      </div> */}

      {data?.map((item) => (
        <NavLink
          key={item.id}
          to={`/label/${item.labelId}`}
          state={{ label: item.id }}
          className={({ isActive }) =>
            isActive
              ? 'bg-[#7F56D9] flex items-center py-3 rounded-r-full text-white'
              : 'flex items-center py-3 hover:bg-gray-100 rounded-r-full'
          }
        >
          {({ isActive }) => {
            if (isActive || theme === THEME.DARK)
              return (
                <>
                  <img
                    src={ICONS.LABEL}
                    alt="label"
                    className="pl-4 sm:pl-6 p-2"
                  />
                  <p className="pl-6 text-base dark:text-gray-300">{item.id}</p>
                </>
              );
            return (
              <>
                <img
                  src={ICONS.LABEL_DARK}
                  alt="label"
                  className="pl-4 sm:pl-6 p-2"
                />
                <p className="pl-6 text-base dark:text-gray-300">{item.id}</p>
              </>
            );
          }}
        </NavLink>
      ))}

      <div
        className="flex items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100"
        id="Edit Labels"
      >
        {theme === THEME.DARK ? (
          <img src={ICONS.EDIT} alt="edit" className="pl-4 sm:pl-6 p-2" />
        ) : (
          <img src={ICONS.EDIT_DARK} alt="edit" className="pl-4 sm:pl-6 p-2" />
        )}
        <p className="pl-6 text-base dark:text-gray-300">Edit Labels</p>
      </div>
    </div>
  );
}
