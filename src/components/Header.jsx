import LanguageToggle from './LanguageToggle';

export default function Header({ t, lang, onLangChange }) {
  return (
    <header className="bg-[#1a2744] text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-serif text-lg md:text-xl font-semibold leading-tight tracking-wide">
            {t.header.title}
          </span>
          <span className="text-[#c9a84c] text-[10px] md:text-xs tracking-widest font-light">
            {t.header.subtitle}
          </span>
        </div>

        <div className="hidden sm:block text-center">
          <span className="text-white/60 text-xs tracking-widest uppercase">
            {t.header.catalog}
          </span>
        </div>

        <LanguageToggle lang={lang} onChange={onLangChange} />
      </div>

      {/* Gold accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-60" />
    </header>
  );
}
