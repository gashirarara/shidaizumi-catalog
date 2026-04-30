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
    <div className="min-h-screen bg-[#fdf6ec]">
      <Header t={t} lang={lang} onLangChange={setLang} />

      <Routes>
        <Route path="/" element={<ProductList lang={lang} setLang={setLang} t={t} />} />
        <Route path="/products/:id" element={<ProductDetailPage lang={lang} t={t} />} />
      </Routes>

      <footer className="mt-12 py-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-300 font-serif">
          志太泉酒造 / SHIDAIZUMI SAKE BREWERY — 静岡県藤枝市
        </p>
      </footer>
    </div>
  );
}
