const CATEGORY_STYLE = {
  '純米大吟醸': { emoji: '🏆', accent: '#b08d3a', light: '#fdf8ee' },
  '大吟醸':     { emoji: '✨', accent: '#a07830', light: '#fdf6e3' },
  '純米吟醸':   { emoji: '🌸', accent: '#b06080', light: '#fdf0f4' },
  '吟醸':       { emoji: '🌺', accent: '#c0506a', light: '#fdf0f2' },
  '純米':       { emoji: '🌾', accent: '#5a8050', light: '#f0f8f0' },
  '特別純米':   { emoji: '⭐', accent: '#408060', light: '#edf8f2' },
  '特別本醸造': { emoji: '🌟', accent: '#b06830', light: '#fdf4ec' },
  '本醸造':     { emoji: '🍶', accent: '#906030', light: '#fdf4e8' },
  'カップ酒':   { emoji: '🥤', accent: '#4070b0', light: '#eff5fc' },
  '純米生原酒': { emoji: '🌿', accent: '#407050', light: '#eef8f2' },
  '発泡性':     { emoji: '🫧', accent: '#3888b0', light: '#eef6fc' },
};
const DEFAULT_STYLE = { emoji: '🍶', accent: '#707070', light: '#f5f5f5' };

function SpecRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-bold text-[#1a1208]">{value}</span>
    </div>
  );
}

function Section({ title, accent, children }) {
  return (
    <div className="mb-7 last:mb-0">
      <h3 className="font-serif text-lg font-bold text-[#1a2744] mb-3 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full" style={{ backgroundColor: accent }} />
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
  const s = CATEGORY_STYLE[product.category] ?? DEFAULT_STYLE;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* 戻るボタン */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl bg-white border border-gray-200
                   text-[#1a1208] text-sm font-medium hover:border-[#c9a84c] transition-colors active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.product.back}
      </button>

      {/* ヒーロー */}
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-5">
        {/* 種別カラーライン */}
        <div className="h-1.5 w-full" style={{ backgroundColor: s.accent }} />

        {/* 絵文字エリア */}
        <div
          className="h-44 flex flex-col items-center justify-center gap-3"
          style={{ backgroundColor: s.light }}
        >
          {product.image_url ? (
            <img src={product.image_url} alt={name}
              className="h-full w-full object-contain p-8"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
          ) : null}
          <span className="text-7xl" style={{ display: product.image_url ? 'none' : 'block' }}>
            {s.emoji}
          </span>
          <span
            className="text-sm font-bold tracking-wide px-4 py-1 rounded-full"
            style={{ backgroundColor: `${s.accent}20`, color: s.accent }}
          >
            {product.category}
          </span>
        </div>

        {/* 名前 */}
        <div className="px-5 pt-5 pb-4 border-t border-gray-50">
          <h1 className="font-serif text-2xl font-bold text-[#1a2744] leading-snug mb-1">
            {name}
          </h1>
          <p className="text-sm text-gray-400 tracking-wider">
            {lang === 'ja' ? product.name_en : product.name_ja}
          </p>
        </div>
      </div>

      {/* スペック */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <Section title={t.product.specs} accent={s.accent}>
          <SpecRow label={t.product.rice} value={product.rice} />
          <SpecRow label={t.product.yeast} value={product.yeast} />
          <SpecRow label={t.product.seimaibuai} value={product.seimaibuai ? `${product.seimaibuai}%` : null} />
          <SpecRow label={t.product.alcohol} value={product.alcohol ? `${product.alcohol}%` : null} />
          <SpecRow label={t.product.nihonshu_do} value={product.nihonshu_do} />
          <SpecRow label={t.product.acidity} value={product.acidity} />
        </Section>
      </div>

      {/* 説明・テイスティング・ペアリング */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        {description && (
          <Section title={t.product.description} accent={s.accent}>
            <p className="text-base text-gray-700 leading-[1.9]">{description}</p>
          </Section>
        )}
        {tasting && (
          <Section title={t.product.tasting} accent={s.accent}>
            <p className="text-base text-gray-700 leading-[1.9]">{tasting}</p>
          </Section>
        )}
        {pairing && (
          <Section title={t.product.pairing} accent={s.accent}>
            <p className="text-base text-gray-700 leading-[1.9]">{pairing}</p>
          </Section>
        )}
      </div>
    </div>
  );
}
