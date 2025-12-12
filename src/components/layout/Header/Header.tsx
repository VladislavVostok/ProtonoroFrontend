import { Calendar, Target, Search, Plus, Moon, Sun, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  darkMode: boolean;
  onThemeToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewTask: () => void;
  onProfileAction: (action: string) => void;
  profileData?: {
    name: string;
    email: string;
    role: string;
  };
}

const Header = ({ 
  darkMode, 
  onThemeToggle, 
  searchQuery, 
  onSearchChange,
  onNewTask 
}: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`);
    setShowProfileMenu(false);
    
    switch (action) {
      case 'profile':
        // Открыть настройки профиля
        break;
      case 'settings':
        // Открыть настройки приложения
        break;
      case 'help':
        // Открыть справку
        break;
      case 'logout':
        // Выход из системы
        if (window.confirm('Are you sure you want to logout?')) {
          console.log('User logged out');
          // Здесь будет логика выхода
        }
        break;
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <Target className={styles.logoIcon} size={28} />
          <h1>Protonoro</h1>
        </div>
        <div className={styles.dateDisplay}>
          <Calendar size={18} />
          <span>September 2026</span>
        </div>
      </div>
      
      <div className={styles.headerRight}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <button 
          className={styles.themeToggle}
          onClick={onThemeToggle}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button className={styles.btnPrimary} onClick={onNewTask}>
          <Plus size={18} />
          New Task
        </button>
        
        <div className={styles.profileContainer} ref={profileMenuRef}>
          <button 
            className={styles.userAvatar}
            onClick={handleProfileClick}
            aria-label="Profile menu"
          >
            <span>AD</span>
          </button>
          
          {showProfileMenu && (
            <div className={styles.profileMenu}>
              <div className={styles.profileInfo}>
                <div className={styles.profileAvatarLarge}>
                  <span>AD</span>
                </div>
                <div className={styles.profileDetails}>
                  <h3>Alex Doe</h3>
                  <p className={styles.profileEmail}>alex.doe@protonoro.com</p>
                  <p className={styles.profileRole}>Product Manager</p>
                </div>
              </div>
              
              <div className={styles.menuDivider} />
              
              <button 
                className={styles.menuItem}
                onClick={() => handleProfileAction('profile')}
              >
                <User size={16} />
                <span>My Profile</span>
              </button>
              
              <button 
                className={styles.menuItem}
                onClick={() => handleProfileAction('settings')}
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>
              
              <button 
                className={styles.menuItem}
                onClick={() => handleProfileAction('help')}
              >
                <HelpCircle size={16} />
                <span>Help & Support</span>
              </button>
              
              <div className={styles.menuDivider} />
              
              <button 
                className={`${styles.menuItem} ${styles.menuItemLogout}`}
                onClick={() => handleProfileAction('logout')}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;