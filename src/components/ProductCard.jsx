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

function Placeholder({ category, size = 'md' }) {
  const emoji = CATEGORY_EMOJI[category] ?? '🍶';
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a2744]/5 to-[#1a2744]/10">
      <span className={size === 'sm' ? 'text-3xl' : 'text-5xl'}>{emoji}</span>
    </div>
  );
}

export default function ProductCard({ product, lang, t, onClick }) {
  const name = lang === 'ja' ? product.name_ja : product.name_en;

  return (
    <article
      className="product-card flex flex-row sm:flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 sm:w-full sm:h-44 bg-[#faf8f4] overflow-hidden relative">
        {product.image_url ? (
          <>
            <img
              src={product.image_url}
              alt={name}
              className="w-full h-full object-contain p-3"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none' }} className="absolute inset-0">
              <Placeholder category={product.category} size="sm" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex">
            <Placeholder category={product.category} size="sm" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
        <div>
          <span className="inline-block px-2 py-0.5 bg-[#1a2744]/5 text-[#1a2744] text-[10px] font-medium rounded-full tracking-wide mb-1.5">
            {product.category}
          </span>
          <h3 className="font-serif font-semibold text-[#2c2c2c] text-sm leading-snug line-clamp-2">
            {name}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-1 mt-2">
          {product.seimaibuai && (
            <div className="text-center bg-[#faf8f4] rounded-lg py-1.5 px-1">
              <div className="text-[9px] text-gray-400 mb-0.5 leading-tight">{t.product.seimaibuai}</div>
              <div className="text-xs font-semibold text-[#1a2744]">{product.seimaibuai}%</div>
            </div>
          )}
          {product.alcohol && (
            <div className="text-center bg-[#faf8f4] rounded-lg py-1.5 px-1">
              <div className="text-[9px] text-gray-400 mb-0.5 leading-tight">{t.product.alcohol}</div>
              <div className="text-xs font-semibold text-[#1a2744]">{product.alcohol}%</div>
            </div>
          )}
          {product.nihonshu_do && (
            <div className="text-center bg-[#faf8f4] rounded-lg py-1.5 px-1">
              <div className="text-[9px] text-gray-400 mb-0.5 leading-tight">{t.product.nihonshu_do}</div>
              <div className="text-xs font-semibold text-[#1a2744]">{product.nihonshu_do}</div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
