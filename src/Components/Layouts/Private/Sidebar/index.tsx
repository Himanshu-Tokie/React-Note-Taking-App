import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../../Shared/Constants';
import { stateType } from '../../../../Views/Dashboard/types';
import { fetchLabels } from '../../../../Shared/Firebase Utils';
import { useUpdateLabel } from '../../../../Shared/CustomHooks';
import ICONS from '../../../../assets';

export default function Sidebar() {
  const [data, setData] = useState<{ id: string }[]>();
  const uid = useSelector((state: stateType) => state.common.uid);
  useEffect(() => {
    fetchLabels(uid).then((label) => setData(label));
  }, [uid]);
  useUpdateLabel(uid, setData);
  return (
    <div
      className="flex-1 dark:bg-gray-700 overflow-hidden md:w-60 mt-3 w-2/4 transition-all duration-300 ease-in-out fixed hover:overflow-y-scroll h-dvh"
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
          <img src={ICONS.LIGHTBULB} alt="lightbulb" className="pl-6 p-2" />
          <p className="pl-6 text-base">Notes</p>
        </NavLink>
      </div>
      <div
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
          <p className="pl-6 text-base">Reminders</p>
        </NavLink>
      </div>

      {data?.map((item) => (
        <NavLink
          key={item.id}
          to={`/label/${item.id}`}
          state={{ label: item.id }}
          className={({ isActive }) =>
            isActive
              ? 'bg-[#7F56D9] flex items-center py-3 rounded-r-full text-white'
              : 'flex items-center py-3 hover:bg-gray-100 rounded-r-full'
          }
        >
          <img src={ICONS.LABEL} alt="label" className="pl-6 p-2" />
          <p className="pl-6 text-base">{item.id}</p>
        </NavLink>
      ))}

      <div
        className="flex items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100"
        id="Edit Labels"
      >
        <img src={ICONS.EDIT} alt="edit" className="pl-6 p-2" />
        <p className="pl-6 text-base">Edit Labels</p>
      </div>
    </div>
  );
}
