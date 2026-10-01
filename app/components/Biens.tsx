'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  properties,
  availableOffers,
  CATEGORY_ORDER,
  categoryKey,
  copyOf,
  formatPrice,
  placeLabel,
  type Offer,
  type CategoryKey,
} from '@/lib/biens';

type FilterRowProps<T extends string> = {
  label: string;
  values: T[];
  active: T;
  onChange: (v: T) => void;
  render: (v: T) => string;
};

function FilterRow<T extends string>({ label, values, active, onChange, render }: FilterRowProps<T>) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {values.map((v) => (
        <button
          key={v}
          type="button"
          className={active === v ? 'on' : undefined}
          aria-pressed={active === v}
          onClick={() => onChange(v)}
        >
          {render(v)}
        </button>
      ))}
    </div>
  );
}

export default function Biens() {
  const t = useTranslations('biens');
  const locale = useLocale();
  const [offer, setOffer] = useState<'all' | Offer>('all');
  const [category, setCategory] = useState<'all' | CategoryKey>('all');

  const inOffer = useMemo(
    () => (offer === 'all' ? properties : properties.filter((p) => p.offer === offer)),
    [offer],
  );

  // Seules les catégories qui ont au moins un bien dans l'offre choisie sont proposées.
  const categories = useMemo(
    () => CATEGORY_ORDER.filter((k) => inOffer.some((p) => categoryKey(p) === k)),
    [inOffer],
  );
  const activeCategory = category !== 'all' && categories.includes(category) ? category : 'all';

  const list = useMemo(
    () =>
      activeCategory === 'all' ? inOffer : inOffer.filter((p) => categoryKey(p) === activeCategory),
    [inOffer, activeCategory],
  );

  return (
    <section id="biens">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          <p>{t('intro')}</p>
        </div>

        {/* Les offres sans bien n'apparaissent pas : Location et Vente s'ajoutent d'elles-mêmes avec les données. */}
        {availableOffers.length > 1 && (
          <FilterRow<'all' | Offer>
            label={t('offerLabel')}
            values={['all', ...availableOffers]}
            active={offer}
            onChange={setOffer}
            render={(v) => t(`offers.${v}`)}
          />
        )}

        {categories.length > 1 && (
          <FilterRow<'all' | CategoryKey>
            label={t('categoryLabel')}
            values={['all', ...categories]}
            active={activeCategory}
            onChange={setCategory}
            render={(v) => t(`categories.${v}`)}
          />
        )}

        <p className="results" aria-live="polite">
          {t('count', { count: list.length })}
        </p>

        <div className="grid3">
          {list.map((p) => {
            const c = copyOf(p, locale);
            const href = `/biens/${p.slug}`;
            const power = c.electricity_included ? t('electricityIncluded') : c.notes;
            const unit = p.price.period === 'total' ? null : t(`units.${p.price.period}`);

            return (
              <article className="card" key={p.id}>
                <Link href={href} className="ph" aria-label={c.title}>
                  <Image
                    src={p.images[0]}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 360px"
                  />
                  <span className="tag">{t(`offerTag.${p.offer}`)}</span>
                </Link>

                <div className="body">
                  <h3>
                    <Link href={href}>{c.title}</Link>
                  </h3>
                  <div className="loc">
                    {t(`types.${p.type}`)}, {placeLabel(p)}
                  </div>
                  {power ? <div className="am">{power}</div> : null}

                  <div className="meta">
                    <span>
                      <span className="price">{formatPrice(p.price.amount, locale)}</span>
                      {unit ? ` ${unit}` : null}
                    </span>
                    <Link href={href}>{t('view')}</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
