import LanguageToggle from './LanguageToggle';

const SNS_LINKS = [
  {
    label: '公式サイト',
    href: 'https://shidaizumi.com/',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c-2.5 0-4-4-4-9s1.5-9 4-9m0 18c2.5 0 4-4 4-9s-1.5-9-4-9M3.5 9h17M3.5 15h17" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/shidaizumishuzo/',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
        <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE-%E5%BF%97%E5%A4%AA%E6%B3%89%E9%85%92%E9%80%A0-100057480369756/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
];

export default function Header({ t, lang, onLangChange }) {
  return (
    <header className="bg-[#1a2744] text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* ロゴ */}
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-lg md:text-xl font-semibold tracking-wide">
            {t.header.title}
          </span>
          <span className="text-[#c9a84c] text-[10px] md:text-xs tracking-[0.15em] font-light">
            {t.header.subtitle}
          </span>
        </div>

        {/* 右側：SNSリンク + 言語切り替え */}
        <div className="flex items-center gap-3">
          {/* SNSアイコン（モバイルでも表示） */}
          <div className="flex items-center gap-2">
            {SNS_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-white/60 hover:text-[#c9a84c] transition-colors p-1"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-white/20" />

          <LanguageToggle lang={lang} onChange={onLangChange} />
        </div>
      </div>

      {/* ゴールドライン */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />
    </header>
  );
}
