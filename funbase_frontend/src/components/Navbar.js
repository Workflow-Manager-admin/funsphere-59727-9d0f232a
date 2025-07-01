import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";

// Navigation configuration
const navLinks = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/games", label: "Games", emoji: "🎮" },
  { to: "/memes", label: "Memes", emoji: "😂" },
  { to: "/movies", label: "Movies", emoji: "🎬" },
  { to: "/quotes", label: "Quotes", emoji: "💬" },
];

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// PUBLIC_INTERFACE
function Navbar() {
  /** FunBase top navigation bar, vibrant/gradient/sticky & mobile responsive */

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  useOnClickOutside(profileRef, () => setProfileOpen(false));

  // Profile menu options stub
  const profileMenu = [
    { label: "My Profile", to: "/profile", emoji: "👤" },
    { label: "Favorites", to: "/favorites", emoji: "⭐" },
    { label: "Log Out", to: "/logout", emoji: "🚪" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoEmoji} role="img" aria-label="FunBase">🎉</span>
        <span className={styles.logoText}>FunBase</span>
      </div>
      <button
        className={styles.hamburger}
        aria-label="Open navigation menu"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <ul className={`${styles.navLinks} ${mobileOpen ? styles.open : ""}`}>
        {navLinks.map(({ to, label, emoji }) => (
          <li key={to}>
            <a href={to} className={styles.navLink}>
              <span className={styles.emoji} role="img" aria-label={label}>{emoji}</span>
              <span className={styles.linkText}>{label}</span>
            </a>
          </li>
        ))}
        <li ref={profileRef} className={styles.profileWrapper}>
          <button
            className={`${styles.navLink} ${styles.profileBtn}`}
            aria-label="Profile"
            aria-haspopup="true"
            aria-expanded={profileOpen}
            onClick={() => setProfileOpen((v) => !v)}
          >
            <span className={styles.emoji} role="img" aria-label="Profile">🙍‍♂️</span>
            <span className={styles.linkText}>Profile</span>
            <span className={styles.dropdownIcon}>▾</span>
          </button>
          <ul className={`${styles.profileDropdown} ${profileOpen ? styles.show : ""}`}>
            {profileMenu.map((item) => (
              <li key={item.to}>
                <a href={item.to} className={styles.dropdownItem}>
                  <span role="img" aria-label={item.label}>{item.emoji}</span>{" "}
                  {item.label}
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
