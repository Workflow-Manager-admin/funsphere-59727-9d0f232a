import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";

// Design-driven navigation structure with emoji + label
const navLinks = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/games", label: "Games", emoji: "🎮" },
  { to: "/memes", label: "Memes", emoji: "😂" },
  { to: "/movies", label: "Movies", emoji: "🎬" },
  { to: "/quotes", label: "Quotes", emoji: "💬" }
];

// Dropdown under profile with required entries (with emojis)
const profileDropdown = [
  { label: "My Stats", emoji: "📊", to: "/profile/stats" },
  { label: "Settings", emoji: "⚙️", to: "/settings" },
  { label: "Logout", emoji: "🚪", to: "/logout" }
];

// Utility: close a menu when clicking outside
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * PUBLIC_INTERFACE
   * FunBase Navigation Bar: Playful gradient, sticky, responsive,
   * gradient/glow logo with emoji left, emoji+label nav right,
   * scale/glow on hover, active shadow/border, hamburger/collapse mobile,
   * profile dropdown under 👤 (Profile) with My Stats/Settings/Logout.
   */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileBtnRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Collapse profile menu if clicked outside on mobile/desktop
  useOnClickOutside(profileDropdownRef, () => setProfileOpen(false));

  // If route navigation were present, would close menus on navigation

  // Close mobile menu on desktop resize up
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 701 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  // Keyboard: close profile menu on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    if (profileOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [profileOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} tabIndex={0} aria-label="FunBase Home">
        <span className={styles.logoEmoji} role="img" aria-label="FunBase">🎉</span>
        <span className={styles.logoText}>FunBase</span>
      </div>

      {/* Hamburger for mobile only */}
      <button
        className={styles.hamburger}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
        aria-controls="main-menu"
        onClick={() => setMobileOpen((v) => !v)}
        type="button"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <ul
        id="main-menu"
        className={`${styles.navLinks} ${mobileOpen ? styles.open : ""}`}
        role="menubar"
      >
        {navLinks.map(({ to, label, emoji }) => (
          <li key={to} role="none">
            <a
              href={to}
              className={styles.navLink}
              role="menuitem"
              tabIndex={0}
              // If integrating with router, would mark active link accordingly
            >
              <span className={styles.emoji} role="img" aria-label={label}>{emoji}</span>
              <span className={styles.linkText}>{label}</span>
            </a>
          </li>
        ))}
        {/* Profile menu with dropdown */}
        <li
          className={styles.profileWrapper}
          ref={profileDropdownRef}
          role="none"
        >
          <button
            className={`${styles.navLink} ${styles.profileBtn}`}
            onClick={() => setProfileOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={profileOpen}
            aria-label="Profile options"
            ref={profileBtnRef}
            type="button"
            tabIndex={0}
          >
            <span className={styles.emoji} role="img" aria-label="Profile">👤</span>
            <span className={styles.linkText}>Profile</span>
            <span className={styles.dropdownIcon} aria-hidden="true">▾</span>
          </button>
          <ul
            className={`${styles.profileDropdown} ${profileOpen ? styles.show : ""}`}
            role="menu"
            aria-label="Profile dropdown"
          >
            {profileDropdown.map(({ label, emoji, to }) => (
              <li key={to} role="none">
                <a
                  href={to}
                  className={styles.dropdownItem}
                  role="menuitem"
                  tabIndex={profileOpen ? 0 : -1}
                >
                  <span role="img" aria-label={label} style={{ marginRight: 6 }}>{emoji}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
