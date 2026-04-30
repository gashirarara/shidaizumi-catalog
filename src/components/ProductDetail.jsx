const CATEGORY_EMOJI = {
  '純米大吟醸': '🏆',
  '大吟醸': '✨',
  '純米吟醸': '🌸',
  '吟醸': '🌺',
  '純米': '🌾',
  '特別純米': '⭐',
  '特別本醸造': '🌟',
  '本醸造': '🍶',
  'カップ酒': '🥤',
  '純米生原酒': '🌿',
  '発泡性': '🫧',
};

function SpecRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="spec-row">
      <span className="spec-label">{label}</span>
      <span className="spec-value">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="font-serif text-base font-semibold text-[#1a2744] mb-3 pb-2 border-b border-[#c9a84c]/30 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#c9a84c] rounded-full inline-block" />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ProductDetail({ product, lang, t, onBack }) {
  const name = lang === 'ja' ? product.name_ja : product.name_en;
  const description = lang === 'ja' ? product.description_ja : product.description_en;
  const tasting = lang === 'ja' ? product.tasting_ja : product.tasting_en;
  const pairing = lang === 'ja' ? product.pairing_ja : product.pairing_en;
  const emoji = CATEGORY_EMOJI[product.category] ?? '🍶';

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#1a2744] hover:text-[#c9a84c] transition-colors mb-6 group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">{t.product.back}</span>
      </button>

      {/* Hero */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
        <div className="h-56 bg-[#faf8f4] flex items-center justify-center relative">
          {product.image_url ? (
            <>
              <img
                src={product.image_url}
                alt={name}
                className="h-full w-full object-contain p-8"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{ display: 'none' }} className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl">{emoji}</span>
              </div>
            </>
          ) : (
            <span className="text-7xl">{emoji}</span>
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        <div className="p-5">
          <span className="inline-block px-3 py-1 bg-[#1a2744]/5 text-[#1a2744] text-xs font-medium rounded-full tracking-wide mb-3">
            {product.category}
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#1a2744] leading-snug mb-1">
            {name}
          </h1>
          {lang === 'en' && product.name_ja && (
            <p className="text-sm text-gray-400 font-serif">{product.name_ja}</p>
          )}
          {lang === 'ja' && product.name_en && (
            <p className="text-sm text-gray-400 tracking-wider">{product.name_en}</p>
          )}
        </div>
      </div>

      {/* Specs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <Section title={t.product.specs}>
          <div className="divide-y divide-gray-100">
            <SpecRow label={t.product.rice} value={product.rice} />
            <SpecRow label={t.product.yeast} value={product.yeast} />
            <SpecRow label={t.product.seimaibuai} value={product.seimaibuai ? `${product.seimaibuai}%` : null} />
            <SpecRow label={t.product.alcohol} value={product.alcohol ? `${product.alcohol}%` : null} />
            <SpecRow label={t.product.nihonshu_do} value={product.nihonshu_do} />
            <SpecRow label={t.product.acidity} value={product.acidity} />
          </div>
        </Section>
      </div>

      {/* Description, Tasting, Pairing */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        {description && (
          <Section title={t.product.description}>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </Section>
        )}
        {tasting && (
          <Section title={t.product.tasting}>
            <p className="text-sm text-gray-600 leading-relaxed">{tasting}</p>
          </Section>
        )}
        {pairing && (
          <Section title={t.product.pairing}>
            <p className="text-sm text-gray-600 leading-relaxed">{pairing}</p>
          </Section>
        )}
      </div>
    </div>
  );
}
