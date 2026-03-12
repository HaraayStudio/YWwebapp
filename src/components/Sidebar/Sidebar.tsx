import React, { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSidebarStore } from "../../store/sidebarStore";
import { useUserStore } from "../../store/userStore";
import { getFilteredNavigation } from "../../data/navigationData";
import { iconMap, ChevronDownIcon, ChevronRightIcon } from "../Icons/Icons";
import styles from "./Sidebar.module.scss";
import logo from "../../assets/logo.png";
import { useAuth } from "../../components/AuthContext";

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isCollapsed,
    isMobileOpen,
    expandedMenus,
    toggleCollapse,
    toggleMenu,
    closeMobile,
  } = useSidebarStore();

  const userLogout = useUserStore((s) => s.logout);
  const { logout } = useAuth();
  const user = useUserStore((s) => s.user);

  const navItems = useMemo(() => {
    if (!user?.role) return [];
    return getFilteredNavigation(user.role);
  }, [user?.role]);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    logout();
    userLogout();
    navigate("/login");
  };

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const isPathActive = (path: string) => location.pathname === path;

  const isParentActive = (children?: { path: string }[]) => {
    if (!children) return false;
    return children.some((child) => location.pathname.startsWith(child.path));
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`${styles.overlay} ${isMobileOpen ? styles.visible : ""}`}
        onClick={closeMobile}
      />

      <aside
        className={[
          styles.sidebar,
          isCollapsed ? styles.collapsed : "",
          isMobileOpen ? styles.mobileOpen : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Logo */}
        <div className={styles.logoSection}>
          <img className={styles.logoIcon} src={logo} alt="YW Architects" />
        </div>

        {/* Nav */}
        <nav className={styles.navigation}>
          {navItems.map((item) => {
            const IconComponent = iconMap[item.icon];
            const hasChildren = !!(item.children && item.children.length > 0);

            // In expanded sidebar: normal expand/collapse
            // In collapsed sidebar: toggle via click too (not hover)
            const isExpanded = isMenuExpanded(item.id);
            const isActive = item.path
              ? isPathActive(item.path)
              : isParentActive(item.children);

            // The sub-menu should show when:
            // - sidebar is expanded AND menu is toggled open
            // - sidebar is collapsed AND menu is toggled open
            const showSubMenu = isExpanded;

            const handleMenuClick = () => {
              if (isCollapsed) {
                // Don't expand sidebar — just toggle this menu's sub-icons
                toggleMenu(item.id);
              } else {
                toggleMenu(item.id);
              }
            };

            return (
              <div key={item.id} className={styles.menuItem}>
                {hasChildren ? (
                  // Wrap in a "card" so the background covers both the button + sub-icons
                  <div
                    className={[
                      styles.menuCard,
                      isCollapsed && showSubMenu ? styles.cardOpen : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <button
                      title={item.label}
                      className={[
                        styles.menuButton,
                        isActive ? styles.active : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={handleMenuClick}
                    >
                      <span className={styles.menuIcon}>
                        {IconComponent && <IconComponent />}
                      </span>
                      <span className={styles.menuLabel}>{item.label}</span>
                      <ChevronDownIcon
                        className={[
                          styles.chevron,
                          showSubMenu ? styles.expanded : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        size={16}
                      />
                    </button>

                    <div
                      className={[
                        styles.subMenu,
                        showSubMenu ? styles.expanded : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {item.children?.map((subItem) => {
                        const SubIcon = iconMap[subItem.icon ?? ""];

                        return (
                          <div key={subItem.id} className={styles.subMenuItem}>
                            <NavLink
                              to={subItem.path}
                              title={isCollapsed ? subItem.label : undefined}
                              className={({ isActive }) =>
                                [
                                  styles.subMenuLink,
                                  isActive ? styles.active : "",
                                ]
                                  .filter(Boolean)
                                  .join(" ")
                              }
                              onClick={closeMobile}
                            >
                              {SubIcon && (
                                <span className={styles.subMenuIcon}>
                                  <SubIcon />
                                </span>
                              )}
                              <span className={styles.subMenuText}>
                                {subItem.label}
                              </span>
                              {subItem.badge && (
                                <span className={styles.badge}>
                                  {subItem.badge}
                                </span>
                              )}
                            </NavLink>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.path || "/"}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      [styles.menuButton, isActive ? styles.active : ""]
                        .filter(Boolean)
                        .join(" ")
                    }
                    onClick={closeMobile}
                  >
                    <span className={styles.menuIcon}>
                      {IconComponent && <IconComponent />}
                    </span>
                    <span className={styles.menuLabel}>{item.label}</span>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={styles.bottomSection}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <span className={styles.menuIcon}>
              <LogoutIcon />
            </span>
            <span className={styles.menuLabel}>Logout</span>
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          className={[
            styles.collapseButton,
            isCollapsed ? styles.collapsed : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={toggleCollapse}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRightIcon size={20} />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
