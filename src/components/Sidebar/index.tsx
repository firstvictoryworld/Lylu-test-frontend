import React from 'react';
import LogoImg from '../../assets/logo.svg';
import AvatarImg from '../../assets/image-avatar.jpg';
import Icon from 'components/Icon';
import { useAppState } from '../../providers/AppProvider';

const Sidebar = () => {
  const { darkMode, setDarkMode } = useAppState();

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark')
      setDarkMode(true);
    }
  };

  return (
    <div className="w-[100px] bg-indigo-1250 h-screen rounded-tr-3xl rounded-br-3xl flex flex-col justify-between z-100">
      <div>
        <div className="bg-indigo-450 rounded-tr-3xl rounded-br-3xl flex items-center justify-center relative h-[100px]">
          <img className="h-[50px] z-10 hover:cursor-pointer" src={LogoImg} alt="" />
          <div className="absolute bottom-0 left-0 w-[100px] h-[50px] bg-indigo-350 rounded-tl-3xl rounded-br-3xl"></div>
        </div>
      </div>

      <div>
        <div
          className="h-[100px] border-b border-gray-150 flex items-center justify-center"
        >
          <Icon
            className="hover:cursor-pointer hover:opacity-80"
            name={darkMode ? 'sun' : 'moon'}
            onClick={toggleDarkMode}
          />
        </div>

        <div className="h-[100px] border-b border-gray-150 flex items-center justify-center">
          <img className="rounded-full w-[30px]" src={AvatarImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar