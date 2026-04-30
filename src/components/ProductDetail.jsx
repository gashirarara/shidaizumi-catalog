const CATEGORY_STYLE = {
  '純米大吟醸': { emoji: '🏆', from: '#fef3c7', to: '#fde68a', accent: '#d97706', text: '#78350f' },
  '大吟醸':    { emoji: '✨', from: '#fefce8', to: '#fef08a', accent: '#ca8a04', text: '#713f12' },
  '純米吟醸':  { emoji: '🌸', from: '#fdf2f8', to: '#fbcfe8', accent: '#db2777', text: '#831843' },
  '吟醸':      { emoji: '🌺', from: '#fff1f2', to: '#fecdd3', accent: '#e11d48', text: '#9f1239' },
  '純米':      { emoji: '🌾', from: '#f0fdf4', to: '#bbf7d0', accent: '#16a34a', text: '#14532d' },
  '特別純米':  { emoji: '⭐', from: '#ecfdf5', to: '#a7f3d0', accent: '#059669', text: '#065f46' },
  '特別本醸造':{ emoji: '🌟', from: '#fff7ed', to: '#fed7aa', accent: '#ea580c', text: '#7c2d12' },
  '本醸造':    { emoji: '🍶', from: '#fefce8', to: '#fef08a', accent: '#b45309', text: '#451a03' },
  'カップ酒':  { emoji: '🥤', from: '#eff6ff', to: '#bfdbfe', accent: '#2563eb', text: '#1e3a8a' },
  '純米生原酒':{ emoji: '🌿', from: '#f0fdf4', to: '#bbf7d0', accent: '#15803d', text: '#14532d' },
  '発泡性':    { emoji: '🫧', from: '#f0f9ff', to: '#bae6fd', accent: '#0284c7', text: '#0c4a6e' },
};
const DEFAULT_STYLE = { emoji: '🍶', from: '#fafafa', to: '#e5e7eb', accent: '#6b7280', text: '#374151' };

function SpecRow({ label, value, accent }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-base font-bold text-[#1a1208]">{value}</span>
    </div>
  );
}

function Section({ title, accent, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="font-serif text-lg font-bold text-[#1a1208] mb-3 flex items-center gap-2">
        <span className="w-1.5 h-5 rounded-full inline-block" style={{ backgroundColor: accent }} />
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
  const style = CATEGORY_STYLE[product.category] ?? DEFAULT_STYLE;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* 戻るボタン */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl bg-white border border-gray-200
                   text-[#1a1208] text-sm font-medium hover:border-gray-300 transition-colors active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.product.back}
      </button>

      {/* ヒーロー */}
      <div className="rounded-2xl overflow-hidden shadow-sm mb-5">
        {/* カラーヘッダー */}
        <div
          className="h-44 flex flex-col items-center justify-center gap-3"
          style={{ background: `linear-gradient(135deg, ${style.from}, ${style.to})` }}
        >
          {product.image_url ? (
            <img src={product.image_url} alt={name} className="h-full w-full object-contain p-8"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          ) : null}
          <span className="text-7xl drop-shadow" style={{ display: product.image_url ? 'none' : 'block' }}>
            {style.emoji}
          </span>
          <span className="px-4 py-1 rounded-full text-sm font-bold"
            style={{ backgroundColor: `${style.accent}25`, color: style.text }}>
            {product.category}
          </span>
        </div>

        {/* 名前エリア */}
        <div className="bg-white px-5 pt-5 pb-4">
          <h1 className="font-serif text-2xl font-bold text-[#1a1208] leading-snug mb-1">
            {name}
          </h1>
          <p className="text-sm text-gray-400">
            {lang === 'ja' ? product.name_en : product.name_ja}
          </p>
        </div>
      </div>

      {/* スペック */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
        <Section title={t.product.specs} accent={style.accent}>
          <SpecRow label={t.product.rice} value={product.rice} />
          <SpecRow label={t.product.yeast} value={product.yeast} />
          <SpecRow label={t.product.seimaibuai} value={product.seimaibuai ? `${product.seimaibuai}%` : null} />
          <SpecRow label={t.product.alcohol} value={product.alcohol ? `${product.alcohol}%` : null} />
          <SpecRow label={t.product.nihonshu_do} value={product.nihonshu_do} />
          <SpecRow label={t.product.acidity} value={product.acidity} />
        </Section>
      </div>

      {/* 説明・テイスティング・ペアリング */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-6">
        {description && (
          <Section title={t.product.description} accent={style.accent}>
            <p className="text-base text-gray-700 leading-relaxed">{description}</p>
          </Section>
        )}
        {tasting && (
          <Section title={t.product.tasting} accent={style.accent}>
            <p className="text-base text-gray-700 leading-relaxed">{tasting}</p>
          </Section>
        )}
        {pairing && (
          <Section title={t.product.pairing} accent={style.accent}>
            <p className="text-base text-gray-700 leading-relaxed">{pairing}</p>
          </Section>
        )}
      </div>
    </div>
  );
}
