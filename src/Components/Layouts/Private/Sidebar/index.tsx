import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTES, STRINGS, THEME } from '../../../../Shared/Constants';
import { useUpdateLabel } from '../../../../Shared/CustomHooks';
import { fetchLabels } from '../../../../Shared/Firebase Utils';
import { stateType } from '../../../../Views/Dashboard/types';
import ICONS from '../../../../assets';
import { setDefaultLabelId } from '../../../../Store/Label';
import { RootState } from '../../../../Store';

export default function Sidebar() {
  const [data, setData] = useState<{ id: string; labelId: string }[]>();
  const uid = useSelector((state: stateType) => state.common.uid);
  const theme = useSelector((state: stateType) => state.common.theme);
  const defalutLabel = useSelector(
    (state: RootState) => state.label.defaultLabelId
  );
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState<
    {
      labelId: string | undefined;
      id: string;
    }[]
  >();
  useEffect(() => {
    fetchLabels(uid).then((label) => {
      setData(label);
      const defaultLabel = label.filter((item) => item.id === 'Others');
      dispatch(setDefaultLabelId(defaultLabel[0].labelId));
    });
  }, [dispatch, uid]);
  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => defalutLabel !== item.labelId);
      setFilteredData(filtered);
    }
  }, [data, defalutLabel]);
  useUpdateLabel(uid, setData);
  return (
    <div
      className="flex-1 pb-24 z-20 bg-white dark:bg-[#252526] overflow-hidden md:w-[250px] pt-4 w-2/4 transition-all duration-300 ease-in-out fixed hover:overflow-y-scroll h-dvh"
      id="sidebar"
    >
      <div className="rounded-r-full cursor-pointer hover:bg-gray-100 hover:dark:bg-opacity-20">
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
                    className="pl-2  sm:pl-6 p-2"
                  />
                  <p className="pl-6 text-base dark:text-gray-300">
                    {STRINGS.NOTES}
                  </p>
                </>
              );
            return (
              <>
                <img
                  src={ICONS.LIGHTBULB_DARK}
                  alt="label"
                  className="pl-2 sm:pl-6 p-2"
                />
                <p className="pl-6 text-base dark:text-gray-300">
                  {STRINGS.NOTES}
                </p>
              </>
            );
          }}
        </NavLink>
      </div>
      {/* <div
        className="rounded-r-full cursor-pointer hover:bg-gray-100 hover:dark:bg-opacity-20" 
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

      {filteredData?.map((item) => {
        let labelName;
        if (item.id.length > 15) labelName = `${item.id.slice(0, 15)}...`;
        else labelName = item.id;
        return (
          <NavLink
            key={item.id}
            to={`/label/${item.labelId}`}
            state={{ label: item.id }}
            className={({ isActive }) =>
              isActive
                ? 'bg-[#7F56D9] flex items-center py-3 rounded-r-full text-white'
                : 'flex items-center py-3 hover:bg-gray-100 hover:dark:bg-opacity-20  rounded-r-full'
            }
          >
            {({ isActive }) => {
              if (isActive || theme === THEME.DARK)
                return (
                  <>
                    <img
                      src={ICONS.LABEL}
                      alt="label"
                      className="pl-2 sm:pl-6 p-2"
                    />
                    <p className="pl-6 text-base dark:text-gray-300">
                      {labelName}
                    </p>
                  </>
                );
              return (
                <>
                  <img
                    src={ICONS.LABEL_DARK}
                    alt="label"
                    className="pl-2 sm:pl-6 p-2"
                  />
                  <p className="pl-6 text-base dark:text-gray-300">
                    {labelName}
                  </p>
                </>
              );
            }}
          </NavLink>
        );
      })}

      <div
        className="flex items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100 hover:dark:bg-opacity-20"
        id={STRINGS.EDIT_LABELS}
      >
        {theme === THEME.DARK ? (
          <img src={ICONS.EDIT} alt="edit" className="pl-4 sm:pl-6 p-2" />
        ) : (
          <img src={ICONS.EDIT_DARK} alt="edit" className="pl-4 sm:pl-6 p-2" />
        )}
        <p className="pl-6 text-base dark:text-gray-300">
          {STRINGS.EDIT_LABELS}
        </p>
      </div>
    </div>
  );
}
