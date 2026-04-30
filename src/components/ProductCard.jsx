// 種別ごとの色とアイコン定義
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

export default function ProductCard({ product, lang, t, onClick }) {
  const name = lang === 'ja' ? product.name_ja : product.name_en;
  const desc = lang === 'ja' ? product.description_ja : product.description_en;
  const style = CATEGORY_STYLE[product.category] ?? DEFAULT_STYLE;

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-white
                 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]
                 flex flex-row sm:flex-col"
      style={{ borderColor: `${style.accent}30` }}
    >
      {/* カラーブロック（モバイル:左帯、デスクトップ:上部ヘッダー） */}
      <div
        className="w-20 flex-shrink-0 sm:w-full sm:h-32 flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${style.from}, ${style.to})` }}
      >
        <span className="text-4xl sm:text-5xl drop-shadow-sm">{style.emoji}</span>
        {/* 種別ラベル（デスクトップのみ） */}
        <span
          className="hidden sm:inline-block absolute bottom-2 left-1/2 -translate-x-1/2
                     px-3 py-0.5 rounded-full text-xs font-bold tracking-wide"
          style={{ backgroundColor: `${style.accent}20`, color: style.text }}
        >
          {product.category}
        </span>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 p-4 sm:p-4 min-w-0 flex flex-col gap-2">
        {/* 種別（モバイルのみ） */}
        <span
          className="sm:hidden inline-block self-start px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: `${style.accent}15`, color: style.text }}
        >
          {product.category}
        </span>

        {/* 商品名 */}
        <h3 className="font-serif font-bold text-[#1a1208] text-base leading-snug line-clamp-2">
          {name}
        </h3>

        {/* 説明文プレビュー */}
        {desc && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {desc}
          </p>
        )}

        {/* スペック */}
        <div className="flex gap-2 mt-auto pt-1">
          {product.seimaibuai && (
            <div className="flex-1 text-center rounded-lg py-1" style={{ backgroundColor: `${style.accent}10` }}>
              <div className="text-[10px] text-gray-400 leading-tight">{t.product.seimaibuai}</div>
              <div className="text-sm font-bold" style={{ color: style.accent }}>{product.seimaibuai}%</div>
            </div>
          )}
          {product.alcohol && (
            <div className="flex-1 text-center rounded-lg py-1" style={{ backgroundColor: `${style.accent}10` }}>
              <div className="text-[10px] text-gray-400 leading-tight">{t.product.alcohol}</div>
              <div className="text-sm font-bold" style={{ color: style.accent }}>{product.alcohol}%</div>
            </div>
          )}
          {product.nihonshu_do && (
            <div className="flex-1 text-center rounded-lg py-1" style={{ backgroundColor: `${style.accent}10` }}>
              <div className="text-[10px] text-gray-400 leading-tight">{t.product.nihonshu_do}</div>
              <div className="text-sm font-bold" style={{ color: style.accent }}>{product.nihonshu_do}</div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
