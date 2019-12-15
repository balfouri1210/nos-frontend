export default function ({ app }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = () => {
    // callback parameter : (oldLocale, newLocale)
    // console.log(oldLocale, newLocale)
  };
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = () => {
    // callback parameter : (oldLocale, newLocale)
    // console.log(oldLocale, newLocale)
  };
}