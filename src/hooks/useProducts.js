import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export const SAMPLE_PRODUCTS = [
  {
    id: '001',
    name_ja: '志太泉 純米吟醸 藤枝誉富士',
    name_en: 'Shidaizumi Junmai Ginjo Fujieda Homarefuji',
    category: '純米吟醸',
    rice: '誉富士（静岡県産）',
    yeast: '静岡酵母 NEW-5',
    seimaibuai: 55,
    alcohol: 15,
    nihonshu_do: '+3',
    acidity: 1.2,
    description_ja: '静岡県初のオリジナル酒米・誉富士を100%使用。柑橘系と花を思わせる爽やかな吟醸香に、透明感のある軽快さとヴィヴィットな酸、誉富士由来のふくよかな旨みが特徴。',
    description_en: 'Made entirely from Homarefuji, Shizuoka\'s first original sake rice. Features a fresh citrus and floral ginjo aroma, with clean lightness, vivid acidity, and the full umami characteristic of Homarefuji.',
    tasting_ja: '柑橘系・白い花のような吟醸香。透明感のある爽やかな飲み口で、ほどよい酸と米の旨みが心地よく続く。',
    tasting_en: 'Ginjo aroma of citrus and white flowers. Clean and refreshing palate with balanced acidity and lingering rice umami.',
    pairing_ja: '白身魚のカルパッチョ、蒸し鶏、野菜のおひたし',
    pairing_en: 'White fish carpaccio, steamed chicken, dressed vegetables',
    image_url: '',
  },
  {
    id: '002',
    name_ja: '志太泉 純米吟醸 焼津山田錦',
    name_en: 'Shidaizumi Junmai Ginjo Yaizu Yamadanishiki',
    category: '純米吟醸',
    rice: '山田錦（焼津市産）',
    yeast: '静岡酵母 NEW-5',
    seimaibuai: 55,
    alcohol: 16,
    nihonshu_do: '+6',
    acidity: 1.2,
    description_ja: '焼津の契約農家が育てた山田錦を使用した純米吟醸。清らかなアロマとすっきりとした辛口の飲み口が特徴。地元産原料米へのこだわりが光る一本。',
    description_en: 'Junmai Ginjo crafted from Yamadanishiki grown by contract farmers in Yaizu. Clear aroma with a clean, dry finish — a testament to the brewery\'s commitment to local ingredients.',
    tasting_ja: 'クリーンな吟醸香。キレよく辛口で、後味にかすかな米の甘みが残る。',
    tasting_en: 'Clean ginjo aroma. Dry and crisp with a faint sweetness of rice on the finish.',
    pairing_ja: '鮮魚の刺身、焼き魚、山菜料理',
    pairing_en: 'Fresh sashimi, grilled fish, mountain vegetable dishes',
    image_url: '',
  },
  {
    id: '003',
    name_ja: '志太泉 特別本醸造',
    name_en: 'Shidaizumi Tokubetsu Honjozo',
    category: '特別本醸造',
    rice: '五百万石',
    yeast: '静岡酵母 NEW-5',
    seimaibuai: 50,
    alcohol: 15,
    nihonshu_do: '+7',
    acidity: 1.3,
    description_ja: '1990年より精米歩合50%で製造を続ける高品質な日常酒。爽やかな香りと軽やかな辛口が食中酒として抜群の適性を発揮する。志太泉の定番中の定番。',
    description_en: 'A high-quality everyday sake polished to 50% since 1990. Refreshing aroma and light dryness make it a perfect companion for food — the quintessential Shidaizumi table sake.',
    tasting_ja: 'すっきりとした吟醸香。キレのある辛口で、料理の邪魔をしない上品な飲み口。',
    tasting_en: 'Clean ginjo aroma. Dry and crisp, with an elegant mouthfeel that complements food without overpowering it.',
    pairing_ja: '焼き鳥、天ぷら、おでん、和食全般',
    pairing_en: 'Yakitori, tempura, oden, Japanese cuisine',
    image_url: '',
  },
  {
    id: '004',
    name_ja: '志太泉 本醸造',
    name_en: 'Shidaizumi Honjozo',
    category: '本醸造',
    rice: '国産米',
    yeast: '静岡酵母',
    seimaibuai: 60,
    alcohol: 15,
    nihonshu_do: '+6',
    acidity: 1.3,
    description_ja: '優雅な吟醸香と軽やかな味わいが特徴の日常酒。冷やしても温めても美味しく楽しめる万能型。食卓に寄り添う頼もしい一本。',
    description_en: 'An everyday sake with elegant ginjo character and a light palate. Versatile and delicious both chilled and warmed — a reliable table companion.',
    tasting_ja: 'やわらかな吟醸香。軽くてなめらかな飲み口で、燗にすると旨みが開く。',
    tasting_en: 'Soft ginjo aroma. Light and smooth, with umami that opens beautifully when warmed.',
    pairing_ja: '煮物、焼き魚、鍋料理、揚げ物',
    pairing_en: 'Simmered dishes, grilled fish, hot pot, fried foods',
    image_url: '',
  },
  {
    id: '005',
    name_ja: '志太泉 開龍 純米生原酒',
    name_en: 'Shidaizumi Kairyu Junmai Nama Genshu',
    category: '純米生原酒',
    rice: '山田錦（朝比奈産）',
    yeast: '静岡酵母 NO-2',
    seimaibuai: 70,
    alcohol: 17,
    nihonshu_do: '+4',
    acidity: 1.5,
    description_ja: '藤枝市朝比奈地区産の山田錦を100%使用した季節限定の純米生原酒。力強い旨みとふくよかな酸が特徴。火入れなし・加水なしの生原酒。要冷蔵。',
    description_en: 'Seasonal Junmai Nama Genshu made entirely from Yamadanishiki grown in Asahina, Fujieda. Bold umami and full acidity. Unpasteurized and undiluted. Refrigeration required.',
    tasting_ja: 'フレッシュな香りとともに、力強い旨みが広がる。生原酒ならではの濃厚さと酸のバランスが秀逸。',
    tasting_en: 'Fresh aroma with bold umami on the palate. Outstanding balance of the rich body and acidity unique to nama genshu.',
    pairing_ja: '肉料理、濃い味付けの煮物、チーズ',
    pairing_en: 'Meat dishes, richly seasoned simmered dishes, cheese',
    image_url: '',
  },
  {
    id: '006',
    name_ja: '志太泉 純米吟醸 生酛 ラヂオ正宗',
    name_en: 'Shidaizumi Kimoto Junmai Ginjo Radio Masamune',
    category: '純米吟醸',
    rice: '山田錦',
    yeast: '静岡酵母 HD-101',
    seimaibuai: 55,
    alcohol: 15,
    nihonshu_do: '+1',
    acidity: 1.6,
    description_ja: '戦前に志太泉が醸造していた銘柄「ラヂオ正宗」の復刻品。伝統的な生酛造りの深みある味わいに吟醸造りの上品な軽快さを融合させた、個性的な一本。',
    description_en: 'A revival of "Radio Masamune," a pre-war brand once brewed at Shidaizumi. Combines the depth of traditional kimoto brewing with the elegant lightness of ginjo — a truly distinctive sake.',
    tasting_ja: '乳酸由来のやや複雑な香り。生酛の深みある旨みと、吟醸のきれいな香りが調和した奥行きのある味わい。',
    tasting_en: 'Complex lactic aroma. The deep umami of kimoto harmonizes with clean ginjo fragrance for a sake of remarkable depth.',
    pairing_ja: '発酵食品（チーズ・味噌料理）、鴨料理、ジビエ',
    pairing_en: 'Fermented foods (cheese, miso dishes), duck, game meats',
    image_url: '',
  },
  {
    id: '007',
    name_ja: 'にゃんかっぷ 純米吟醸',
    name_en: 'Nyancup Junmai Ginjo',
    category: 'カップ酒',
    rice: '山田錦',
    yeast: '静岡酵母',
    seimaibuai: 55,
    alcohol: 16,
    nihonshu_do: '',
    acidity: null,
    description_ja: '猫のかわいいラベルが特徴のカップ酒（180ml）。純米吟醸仕込みで、カップ酒の概念を覆すクオリティ。気軽に楽しめる志太泉の人気商品。おみやげにも最適。',
    description_en: 'A 180ml cup sake with a beloved cat label design. Junmai Ginjo quality in a casual format — redefining what cup sake can be. Perfect as a souvenir.',
    tasting_ja: '純米吟醸らしいきれいな吟醸香。辛口でシャープながら、余韻に米の旨みが感じられる。',
    tasting_en: 'Clean ginjo aroma characteristic of Junmai Ginjo. Dry and sharp, with lingering rice umami.',
    pairing_ja: '唐揚げ、餃子、軽いおつまみ',
    pairing_en: 'Karaage, gyoza, light snacks',
    image_url: '',
  },
  {
    id: '008',
    name_ja: '志太泉 シダ・シードル 発泡性純米生原酒',
    name_en: 'Shida Cidre Sparkling Junmai Nama Genshu',
    category: '発泡性',
    rice: '山田錦',
    yeast: '静岡酵母',
    seimaibuai: 60,
    alcohol: 14,
    nihonshu_do: '-15',
    acidity: 1.3,
    description_ja: 'シードルをイメージして醸造したスパークリング日本酒。活性炭酸によるシュワシュワとした爽快感と、りんごのような甘酸っぱいアロマが魅力。要冷蔵。',
    description_en: 'A sparkling sake inspired by cider. Features lively natural carbonation and an apple-like sweet-tart aroma. Refreshingly unique. Refrigeration required.',
    tasting_ja: '発泡性のシュワシュワとした爽快感。りんごのような甘酸っぱい香りと、米の甘みが炭酸の辛さと絶妙に絡み合う。',
    tasting_en: 'Lively effervescence with apple-like sweet-tart aroma. The sweetness of rice intertwines beautifully with the crisp carbonation.',
    pairing_ja: 'アペリティフ、フルーツデザート、軽いチーズ',
    pairing_en: 'Aperitif, fruit desserts, light cheese',
    image_url: '',
  },
];

function parseRow(row) {
  return {
    id: row.id?.trim() ?? '',
    name_ja: row.name_ja?.trim() ?? '',
    name_en: row.name_en?.trim() ?? '',
    category: row.category?.trim() ?? '',
    rice: row.rice?.trim() ?? '',
    yeast: row.yeast?.trim() ?? '',
    seimaibuai: row.seimaibuai ? Number(row.seimaibuai) : null,
    alcohol: row.alcohol ? Number(row.alcohol) : null,
    nihonshu_do: row.nihonshu_do?.trim() ?? '',
    acidity: row.acidity ? Number(row.acidity) : null,
    description_ja: row.description_ja?.trim() ?? '',
    description_en: row.description_en?.trim() ?? '',
    tasting_ja: row.tasting_ja?.trim() ?? '',
    tasting_en: row.tasting_en?.trim() ?? '',
    pairing_ja: row.pairing_ja?.trim() ?? '',
    pairing_en: row.pairing_en?.trim() ?? '',
    image_url: row.image_url?.trim() ?? '',
  };
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const csvUrl = import.meta.env.VITE_SHEET_CSV_URL;

    if (!csvUrl) {
      setProducts(SAMPLE_PRODUCTS);
      setLoading(false);
      return;
    }

    fetch(csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        const parsed = result.data.map(parseRow).filter((p) => p.id);
        setProducts(parsed.length > 0 ? parsed : SAMPLE_PRODUCTS);
        setLoading(false);
      })
      .catch((err) => {
        console.error('CSV fetch failed:', err);
        setError(err.message);
        setProducts(SAMPLE_PRODUCTS);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
}
