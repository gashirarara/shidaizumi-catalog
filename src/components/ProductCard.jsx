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

function CategoryPlaceholder({ category }) {
  const emoji = CATEGORY_EMOJI[category] ?? '🍶';
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a2744]/5 to-[#1a2744]/10">
      <span className="text-5xl mb-2">{emoji}</span>
      <span className="text-xs text-[#1a2744]/40 font-medium tracking-wider">{category}</span>
    </div>
  );
}

export default function ProductCard({ product, lang, t, onClick }) {
  const name = lang === 'ja' ? product.name_ja : product.name_en;

  return (
    <article className="product-card" onClick={onClick}>
      {/* Image area */}
      <div className="h-44 bg-[#faf8f4] overflow-hidden relative">
        {product.image_url ? (
          <>
            <img
              src={product.image_url}
              alt={name}
              className="w-full h-full object-contain p-4"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none' }} className="absolute inset-0">
              <CategoryPlaceholder category={product.category} />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex">
            <CategoryPlaceholder category={product.category} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="inline-block px-2 py-0.5 bg-[#1a2744]/5 text-[#1a2744] text-[10px] font-medium rounded-full tracking-wide mb-2">
          {product.category}
        </span>

        <h3 className="font-serif font-semibold text-[#2c2c2c] text-sm leading-snug mb-3 line-clamp-2">
          {name}
        </h3>

        <div className="grid grid-cols-3 gap-1">
          {product.seimaibuai && (
            <div className="text-center bg-[#faf8f4] rounded-lg py-1.5 px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">{t.product.seimaibuai}</div>
              <div className="text-xs font-semibold text-[#1a2744]">{product.seimaibuai}%</div>
            </div>
          )}
          {product.alcohol && (
            <div className="text-center bg-[#faf8f4] rounded-lg py-1.5 px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">{t.product.alcohol}</div>
              <div className="text-xs font-semibold text-[#1a2744]">{product.alcohol}%</div>
            </div>
          )}
          {product.nihonshu_do && (
            <div className="text-center bg-[#faf8f4] rounded-lg py-1.5 px-1">
              <div className="text-[10px] text-gray-400 mb-0.5">{t.product.nihonshu_do}</div>
              <div className="text-xs font-semibold text-[#1a2744]">{product.nihonshu_do}</div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
