import { useState } from "react";

type SettingsSection =
  | "profile"
  | "notifications"
  | "appearance"
  | "language"
  | "security"
  | "danger";

const settingsSections: {
  id: SettingsSection;
  label: string;
  description: string;
}[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and updates",
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme preferences",
  },
  {
    id: "language",
    label: "Language & Region",
    description: "Language and regional preferences",
  },
  {
    id: "security",
    label: "Security",
    description: "Password and account",
  },
  {
    id: "danger",
    label: "Danger Zone",
    description: "Delete your account",
  },
];

function Settings() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  // Profile
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [about, setAbout] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);

  // Appearance
  const [theme, setTheme] = useState("light");

  // Language & Region
  const [language, setLanguage] = useState("english");
  const [region, setRegion] = useState("philippines");
  const [dateFormat, setDateFormat] = useState("mm-dd-yyyy");

  // Security
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // Danger Zone
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleProfileSave = () => {
    setProfileSaved(true);

    setTimeout(() => {
      setProfileSaved(false);
    }, 3000);
  };

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return;
    }

    if (newPassword !== confirmPassword) {
      return;
    }

    setPasswordUpdated(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setPasswordUpdated(false);
    }, 3000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      return;
    }

    // Frontend-only account deletion simulation.
    // Backend/database deletion will be connected later.
    setFullName("");
    setUsername("");
    setEmail("");
    setBirthday("");
    setAbout("");

    setEmailNotifications(false);
    setProjectUpdates(false);
    setTaskNotifications(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setDeleteConfirmation("");
    setShowDeleteModal(false);
    setAccountDeleted(true);
  };

  const renderToggle = (
    enabled: boolean,
    onToggle: () => void,
    label: string,
  ) => (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={enabled}
      className={`relative h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 ${
        enabled ? "bg-indigo-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  if (accountDeleted) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50 px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-8 w-8 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Account Deleted
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Your account information has been removed from this settings
            session.
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            This is currently a frontend-only simulation. Permanent account
            deletion will be connected to the backend later.
          </p>

          <button
            type="button"
            onClick={() => setAccountDeleted(false)}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
          >
            Return to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Account
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage your account, notifications, appearance, language, and
            security preferences.
          </p>
        </div>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
          {/* Settings Navigation */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="px-3 pb-2 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Settings
              </p>
            </div>

            <nav className="space-y-1" aria-label="Settings navigation">
              {settingsSections.map((section) => {
                const isActive = activeSection === section.id;
                const isDanger = section.id === "danger";

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full rounded-xl px-3 py-3 text-left transition ${
                      isActive
                        ? isDanger
                          ? "bg-red-50 text-red-700"
                          : "bg-indigo-50 text-indigo-700"
                        : isDanger
                          ? "text-red-500 hover:bg-red-50 hover:text-red-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${
                        isActive
                          ? isDanger
                            ? "text-red-700"
                            : "text-indigo-700"
                          : isDanger
                            ? "text-red-600"
                            : "text-slate-700"
                      }`}
                    >
                      {section.label}
                    </span>

                    <span
                      className={`mt-0.5 block text-xs ${
                        isActive
                          ? isDanger
                            ? "text-red-500"
                            : "text-indigo-500"
                          : isDanger
                            ? "text-red-400"
                            : "text-slate-400"
                      }`}
                    >
                      {section.description}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* PROFILE */}
            {activeSection === "profile" && (
              <>
                <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Profile
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Update your personal information and profile details.
                  </p>
                </div>

                <div className="space-y-7 p-5 sm:p-7">
                  {/* Profile Photo */}
                  <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:p-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
                      CS
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Profile Photo
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        JPG, PNG or GIF. Maximum file size 2MB.
                      </p>

                      <button
                        type="button"
                        className="mt-3 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Full Name
                      </label>

                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Username
                      </label>

                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="birthday"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Birthday
                      </label>

                      <input
                        id="birthday"
                        type="date"
                        value={birthday}
                        onChange={(event) => setBirthday(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />

                      <p className="mt-1.5 text-xs text-slate-400">
                        Your birthday is part of your profile information.
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="about"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        About Me
                      </label>

                      <textarea
                        id="about"
                        rows={5}
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                        placeholder="Tell us a little about yourself"
                        className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  {/* Save */}
                  <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                    {profileSaved && (
                      <p className="text-sm font-medium text-emerald-600">
                        Changes saved successfully.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleProfileSave}
                      className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 active:translate-y-px"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === "notifications" && (
              <>
                <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Notifications
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Manage how you receive notifications from CollabSpace.
                  </p>
                </div>

                <div className="space-y-3 p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 sm:p-5">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Email Notifications
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Receive important updates through email.
                      </p>
                    </div>

                    {renderToggle(
                      emailNotifications,
                      () =>
                        setEmailNotifications(!emailNotifications),
                      "Toggle email notifications",
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 sm:p-5">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Project Updates
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Get notified when projects are updated.
                      </p>
                    </div>

                    {renderToggle(
                      projectUpdates,
                      () => setProjectUpdates(!projectUpdates),
                      "Toggle project updates",
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 sm:p-5">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Task Notifications
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Receive notifications about assigned tasks.
                      </p>
                    </div>

                    {renderToggle(
                      taskNotifications,
                      () => setTaskNotifications(!taskNotifications),
                      "Toggle task notifications",
                    )}
                  </div>
                </div>
              </>
            )}

            {/* APPEARANCE */}
            {activeSection === "appearance" && (
              <>
                <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Appearance
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Customize how CollabSpace looks on your device.
                  </p>
                </div>

                <div className="space-y-5 p-5 sm:p-7">
                  <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
                    <label
                      htmlFor="theme"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Theme
                    </label>

                    <p className="mb-4 text-xs leading-5 text-slate-500 sm:text-sm">
                      Choose the theme you want to use across the application.
                    </p>

                    <select
                      id="theme"
                      value={theme}
                      onChange={(event) => setTheme(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Accent Color
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      CollabSpace currently uses Indigo as its primary accent
                      color.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-indigo-500 ring-4 ring-indigo-100" />

                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Indigo
                        </p>

                        <p className="text-xs text-slate-400">
                          Primary accent
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Current Theme
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {theme === "light"
                        ? "Light Mode"
                        : theme === "dark"
                          ? "Dark Mode"
                          : "System Default"}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* LANGUAGE & REGION */}
            {activeSection === "language" && (
              <>
                <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Language & Region
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Choose your preferred language and regional settings.
                  </p>
                </div>

                <div className="space-y-5 p-5 sm:p-7">
                  <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
                    <label
                      htmlFor="language"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Language
                    </label>

                    <p className="mb-4 text-xs leading-5 text-slate-500 sm:text-sm">
                      Select the language you prefer to use in CollabSpace.
                    </p>

                    <select
                      id="language"
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="english">English</option>
                      <option value="filipino">Filipino</option>
                    </select>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
                    <label
                      htmlFor="region"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Region
                    </label>

                    <p className="mb-4 text-xs leading-5 text-slate-500 sm:text-sm">
                      Your region helps CollabSpace format dates and regional
                      information correctly.
                    </p>

                    <select
                      id="region"
                      value={region}
                      onChange={(event) => setRegion(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="philippines">Philippines</option>
                      <option value="united-states">United States</option>
                      <option value="japan">Japan</option>
                      <option value="singapore">Singapore</option>
                    </select>
                  </div>

                  <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
                    <label
                      htmlFor="dateFormat"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Date Format
                    </label>

                    <p className="mb-4 text-xs leading-5 text-slate-500 sm:text-sm">
                      Choose how dates should be displayed in the application.
                    </p>

                    <select
                      id="dateFormat"
                      value={dateFormat}
                      onChange={(event) => setDateFormat(event.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="mm-dd-yyyy">MM/DD/YYYY</option>
                      <option value="dd-mm-yyyy">DD/MM/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Current Settings
                    </p>

                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Language</span>

                        <span className="font-medium text-slate-900">
                          {language === "english" ? "English" : "Filipino"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Region</span>

                        <span className="font-medium capitalize text-slate-900">
                          {region === "united-states"
                            ? "United States"
                            : region}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-500">Date Format</span>

                        <span className="font-medium text-slate-900">
                          {dateFormat === "mm-dd-yyyy"
                            ? "MM/DD/YYYY"
                            : dateFormat === "dd-mm-yyyy"
                              ? "DD/MM/YYYY"
                              : "YYYY-MM-DD"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">
                    <p className="text-sm font-semibold text-indigo-900">
                      Frontend Preview
                    </p>

                    <p className="mt-1 text-xs leading-5 text-indigo-700 sm:text-sm">
                      These preferences currently update this Settings page
                      only. Full application-wide language support will be
                      connected later.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* SECURITY */}
            {activeSection === "security" && (
              <>
                <div className="border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Security
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Manage your password and account security settings.
                  </p>
                </div>

                <div className="space-y-5 p-5 sm:p-7">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
                    <div className="mb-5">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Change Password
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Use a strong password that you do not use on other
                        websites.
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Current Password
                        </label>

                        <input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(event) =>
                            setCurrentPassword(event.target.value)
                          }
                          placeholder="Enter your current password"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="newPassword"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          New Password
                        </label>

                        <input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(event) =>
                            setNewPassword(event.target.value)
                          }
                          placeholder="Enter a new password"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Confirm New Password
                        </label>

                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          placeholder="Confirm your new password"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>

                      {newPassword &&
                        confirmPassword &&
                        newPassword !== confirmPassword && (
                          <p className="text-sm font-medium text-red-500">
                            New passwords do not match.
                          </p>
                        )}

                      {passwordUpdated && (
                        <p className="text-sm font-medium text-emerald-600">
                          Password updated successfully.
                        </p>
                      )}

                      <div className="border-t border-slate-200 pt-5">
                        <button
                          type="button"
                          onClick={handlePasswordUpdate}
                          disabled={
                            !currentPassword ||
                            !newPassword ||
                            !confirmPassword ||
                            newPassword !== confirmPassword
                          }
                          className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-300 sm:w-auto"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-amber-900">
                      Security Reminder
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-amber-700 sm:text-sm">
                      Keep your account credentials private and avoid sharing
                      your password with other users.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* DANGER ZONE */}
            {activeSection === "danger" && (
              <>
                <div className="border-b border-red-100 bg-red-50/40 px-5 py-5 sm:px-7 sm:py-6">
                  <h2 className="text-lg font-semibold text-red-700">
                    Danger Zone
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-red-600/80">
                    Permanent account actions. Please make sure you understand
                    what will happen before continuing.
                  </p>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="rounded-2xl border border-red-200 bg-red-50/60 p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-red-800">
                          Delete Account
                        </h3>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-red-700/80">
                          Permanently remove your account and its associated
                          information from CollabSpace.
                        </p>

                        <ul className="mt-4 space-y-2 text-xs leading-5 text-red-700/80 sm:text-sm">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>
                              Your profile information will be removed.
                            </span>
                          </li>

                          <li className="flex gap-2">
                            <span>•</span>
                            <span>
                              Your notification and security preferences will
                              be cleared.
                            </span>
                          </li>

                          <li className="flex gap-2">
                            <span>•</span>
                            <span>
                              This action cannot be undone once connected to
                              the real account system.
                            </span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full shrink-0 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 sm:w-auto"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Frontend Notice
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      Account deletion is currently a frontend-only
                      simulation. Permanent deletion from the database and
                      authentication system will be implemented when the
                      backend is connected.
                    </p>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-5 w-5 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                  />
                </svg>
              </div>

              <h2
                id="delete-account-title"
                className="mt-4 text-lg font-bold text-slate-900"
              >
                Delete your account?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This is a destructive action. Your current profile and
                settings data will be cleared from this frontend session.
              </p>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <label
                  htmlFor="deleteConfirmation"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Type{" "}
                  <span className="font-bold text-red-600">DELETE</span> to
                  confirm
                </label>

                <input
                  id="deleteConfirmation"
                  type="text"
                  value={deleteConfirmation}
                  onChange={(event) =>
                    setDeleteConfirmation(event.target.value)
                  }
                  placeholder="DELETE"
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium uppercase tracking-wide text-slate-900 outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation("");
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== "DELETE"}
                  className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;