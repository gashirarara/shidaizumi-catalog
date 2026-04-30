import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import { ja } from './i18n/ja';
import { en } from './i18n/en';

function ProductList({ lang, setLang, t }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const { products, loading, error } = useProducts();

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const name = lang === 'ja' ? p.name_ja : p.name_en;
      if (search && !name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'all' && p.category !== category) return false;
      return true;
    });
  }, [products, search, category, lang]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {error && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {t.error}
        </div>
      )}

      <FilterBar
        t={t}
        categories={categories}
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">{t.loading}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-2">
          <span className="text-4xl">🍶</span>
          <p className="text-gray-400 text-sm">{t.noResults}</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 mt-4 mb-3 text-right">
            {t.count(filtered.length)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                t={t}
                onClick={() => navigate(`/products/${product.id}`)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

function ProductDetailPage({ lang, t }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">{t.loading}</p>
      </div>
    );
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <span className="text-4xl">🍶</span>
        <p className="text-gray-400 text-sm">商品が見つかりません</p>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      lang={lang}
      t={t}
      onBack={() => navigate('/')}
    />
  );
}

export default function App() {
  const [lang, setLang] = useState('ja');
  const t = lang === 'ja' ? ja : en;

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <Header t={t} lang={lang} onLangChange={setLang} />

      <Routes>
        <Route path="/" element={<ProductList lang={lang} setLang={setLang} t={t} />} />
        <Route path="/products/:id" element={<ProductDetailPage lang={lang} t={t} />} />
      </Routes>

      <footer className="mt-16 bg-[#1a2744] text-white">
        <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif text-base font-semibold">志太泉酒造</p>
            <p className="text-[#c9a84c] text-xs tracking-widest mt-0.5">SHIDAIZUMI SAKE BREWERY</p>
            <p className="text-white/40 text-xs mt-1">静岡県藤枝市宮原423-22-1</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://shidaizumi.com/" target="_blank" rel="noopener noreferrer"
               className="flex flex-col items-center gap-1 text-white/50 hover:text-[#c9a84c] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c-2.5 0-4-4-4-9s1.5-9 4-9m0 18c2.5 0 4-4 4-9s-1.5-9-4-9M3.5 9h17M3.5 15h17" />
              </svg>
              <span className="text-[10px] tracking-wider">WEBSITE</span>
            </a>
            <a href="https://www.instagram.com/shidaizumishuzo/" target="_blank" rel="noopener noreferrer"
               className="flex flex-col items-center gap-1 text-white/50 hover:text-[#c9a84c] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.8} />
                <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
              <span className="text-[10px] tracking-wider">INSTAGRAM</span>
            </a>
            <a href="https://www.facebook.com/p/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE-%E5%BF%97%E5%A4%AA%E6%B3%89%E9%85%92%E9%80%A0-100057480369756/"
               target="_blank" rel="noopener noreferrer"
               className="flex flex-col items-center gap-1 text-white/50 hover:text-[#c9a84c] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              <span className="text-[10px] tracking-wider">FACEBOOK</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
