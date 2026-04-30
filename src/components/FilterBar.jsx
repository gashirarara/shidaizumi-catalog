export default function FilterBar({
  t,
  categories,
  search,
  onSearch,
  category,
  onCategory,
}) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t.filter.searchPlaceholder}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl
                     text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1
                     focus:ring-[#c9a84c] transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => onCategory('all')}
          className={`btn-chip flex-shrink-0 ${category === 'all' ? 'btn-chip-active' : 'btn-chip-inactive'}`}
        >
          {t.filter.all}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategory(cat)}
            className={`btn-chip flex-shrink-0 ${category === cat ? 'btn-chip-active' : 'btn-chip-inactive'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
