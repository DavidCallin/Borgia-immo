'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  FILTERS,
  stays,
  filterKey,
  copyOf,
  formatPrice,
  placeLabel,
  type FilterKey,
} from '@/lib/sejours';

export default function Sejours() {
  const t = useTranslations('sejours');
  const locale = useLocale();
  const [active, setActive] = useState<FilterKey>('all');

  const list = useMemo(
    () => (active === 'all' ? stays : stays.filter((s) => filterKey(s) === active)),
    [active],
  );

  return (
    <section id="sejours">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          <p>{t('intro')}</p>
        </div>

        <div className="filters rv" role="group" aria-label={t('filtersLabel')}>
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              className={active === key ? 'on' : undefined}
              aria-pressed={active === key}
              onClick={() => setActive(key)}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>

        <p className="results" aria-live="polite">
          {t('count', { count: list.length })}
        </p>

        <div className="grid3">
          {list.map((s) => {
            const c = copyOf(s, locale);
            const href = `/sejours/${s.slug}`;
            const power = c.electricity_included ? t('electricityIncluded') : c.notes;

            return (
              <article className="card" key={s.id}>
                <Link href={href} className="ph" aria-label={c.title}>
                  <Image
                    src={s.images[0]}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 360px"
                  />
                  <span className="tag">{t(`types.${s.type}`)}</span>
                </Link>

                <div className="body">
                  <h3>
                    <Link href={href}>{c.title}</Link>
                  </h3>
                  <div className="loc">{placeLabel(s)}</div>
                  {power ? <div className="am">{power}</div> : null}

                  <div className="meta">
                    <span>
                      <span className="price">{formatPrice(s.price.amount, locale)}</span>{' '}
                      {t('perNight')}
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
