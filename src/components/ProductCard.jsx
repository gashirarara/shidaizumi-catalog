// 種別ごとのアクセントカラー（落ち着いたトーン）
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

export default function ProductCard({ product, lang, t, onClick }) {
  const name = lang === 'ja' ? product.name_ja : product.name_en;
  const desc = lang === 'ja' ? product.description_ja : product.description_en;
  const s = CATEGORY_STYLE[product.category] ?? DEFAULT_STYLE;

  return (
    <article
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden cursor-pointer
                 border border-gray-100 shadow-sm
                 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]
                 flex flex-row sm:flex-col"
    >
      {/* 種別カラートップ（デスクトップ）/ 左帯（モバイル） */}
      <div
        className="w-2 flex-shrink-0 sm:w-full sm:h-1.5"
        style={{ backgroundColor: s.accent }}
      />

      {/* 絵文字エリア（デスクトップのみ） */}
      <div
        className="hidden sm:flex h-36 items-center justify-center"
        style={{ backgroundColor: s.light }}
      >
        <span className="text-5xl">{s.emoji}</span>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 px-4 py-3 min-w-0 flex flex-col gap-2">

        {/* モバイル：絵文字 + 種別を横並び */}
        <div className="flex sm:hidden items-center gap-2">
          <span className="text-2xl leading-none">{s.emoji}</span>
          <span
            className="text-xs font-bold tracking-wide px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
          >
            {product.category}
          </span>
        </div>

        {/* デスクトップ：種別バッジ */}
        <span
          className="hidden sm:inline-block self-start text-xs font-bold tracking-wide px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${s.accent}15`, color: s.accent }}
        >
          {product.category}
        </span>

        {/* 商品名 */}
        <h3 className="font-serif font-bold text-[#1a1208] text-[15px] leading-snug line-clamp-2">
          {name}
        </h3>

        {/* 説明文プレビュー */}
        {desc && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 hidden sm:block">
            {desc}
          </p>
        )}
        {desc && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-1 sm:hidden">
            {desc}
          </p>
        )}

        {/* スペック */}
        <div className="flex gap-1.5 mt-auto pt-1">
          {product.seimaibuai && (
            <div className="flex-1 text-center bg-gray-50 rounded-lg py-1.5">
              <div className="text-[9px] text-gray-400 leading-tight">{t.product.seimaibuai}</div>
              <div className="text-xs font-bold text-[#1a2744]">{product.seimaibuai}%</div>
            </div>
          )}
          {product.alcohol && (
            <div className="flex-1 text-center bg-gray-50 rounded-lg py-1.5">
              <div className="text-[9px] text-gray-400 leading-tight">{t.product.alcohol}</div>
              <div className="text-xs font-bold text-[#1a2744]">{product.alcohol}%</div>
            </div>
          )}
          {product.nihonshu_do && (
            <div className="flex-1 text-center bg-gray-50 rounded-lg py-1.5">
              <div className="text-[9px] text-gray-400 leading-tight">{t.product.nihonshu_do}</div>
              <div className="text-xs font-bold text-[#1a2744]">{product.nihonshu_do}</div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
