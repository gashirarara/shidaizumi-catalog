export default function LanguageToggle({ lang, onChange }) {
  return (
    <div className="flex items-center bg-white/10 rounded-full p-0.5">
      <button
        onClick={() => onChange('ja')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          lang === 'ja'
            ? 'bg-[#c9a84c] text-[#1a2744]'
            : 'text-white/70 hover:text-white'
        }`}
      >
        JA
      </button>
      <button
        onClick={() => onChange('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          lang === 'en'
            ? 'bg-[#c9a84c] text-[#1a2744]'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
