'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  CATEGORY_ORDER,
  categoryKey,
  copyOf,
  formatPrice,
  offersOf,
  placeLabel,
  type Offer,
  type CategoryKey,
  type PropType,
  type Property,
} from '@/lib/biens';

/* ---------- Helpers de normalisation ---------- */

// "Fidjrossè" / "FIDJROSSE" / "fidjrosse " -> "fidjrosse"
const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const isAllCaps = (s: string) => s === s.toUpperCase() && s !== s.toLowerCase();

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s-])(\p{L})/gu, (_, sep, c) => sep + c.toUpperCase());

const prettify = (s: string) => (isAllCaps(s) ? titleCase(s) : s);

type Option = { value: string; label: string };

/** Quartiers d'un bien = district + area, sans doublon, sans valeurs parasites. */
function quartiersOf(p: Property, cityKeys: Set<string>): Option[] {
  const loc = p.location as { district?: string; area?: string };
  const found = new Map<string, string>();

  for (const raw of [loc.district, loc.area]) {
    const v = (raw ?? '').trim();
    if (!v) continue;
    const key = norm(v);
    if (!key || key === 'situe a' || cityKeys.has(key)) continue; // vide, "SITUÉ A", nom de ville
    const prev = found.get(key);
    // on préfère la forme non-MAJUSCULES quand il y a le choix
    if (!prev || (isAllCaps(prev) && !isAllCaps(v))) found.set(key, v);
  }

  const keys = [...found.keys()];
  return keys
    // "haie" est supprimé si "haie vive" existe (district tronqué)
    .filter((k) => !keys.some((o) => o !== k && o.startsWith(k + ' ')))
    .map((k) => ({ value: k, label: prettify(found.get(k)!) }));
}

function uniqueOptions(opts: Option[]): Option[] {
  const m = new Map<string, Option>();
  for (const o of opts) if (!m.has(o.value)) m.set(o.value, o);
  return [...m.values()].sort((a, b) => a.label.localeCompare(b.label, 'fr'));
}

/* ---------- UI ---------- */

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

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  allLabel: string;
  options: Option[];
  onChange: (v: string) => void;
  disabled?: boolean;
};

function SelectField({ id, label, value, allLabel, options, onChange, disabled }: SelectFieldProps) {
  return (
    <div className="select-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        <option value="all">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Nombre de biens affichés avant le bouton « Voir tous nos biens »
const INITIAL_COUNT = 9;

type Props = { items: Property[] };

export default function Biens({ items }: Props) {
  const t = useTranslations('biens');
  const locale = useLocale();
  const [offer, setOffer] = useState<'all' | Offer>('all');
  const [country, setCountry] = useState('all');
  const [city, setCity] = useState('all');
  const [quartier, setQuartier] = useState('all');
  const [propType, setPropType] = useState<'all' | PropType>('all');
  const [category, setCategory] = useState<'all' | CategoryKey>('all');
  const [showAll, setShowAll] = useState(false);

  const availableOffers = useMemo(() => offersOf(items), [items]);

  // Données de localisation normalisées, calculées une seule fois
  const geo = useMemo(() => {
    const cityKeys = new Set(items.map((p) => norm(p.location.city ?? '')).filter(Boolean));
    return items.map((p) => ({
      p,
      country: { value: norm(p.pays ?? ''), label: (p.pays ?? '').trim() },
      city: { value: norm(p.location.city ?? ''), label: (p.location.city ?? '').trim() },
      quartiers: quartiersOf(p, cityKeys),
    }));
  }, [items]);

  // Options en cascade : Pays -> Ville -> Quartier
  const countryOptions = useMemo(
    () => uniqueOptions(geo.map((g) => g.country).filter((o) => o.value)),
    [geo],
  );

  const cityOptions = useMemo(
    () =>
      uniqueOptions(
        geo
          .filter((g) => country === 'all' || g.country.value === country)
          .map((g) => g.city)
          .filter((o) => o.value),
      ),
    [geo, country],
  );

  const quartierOptions = useMemo(
    () =>
      uniqueOptions(
        geo
          .filter((g) => country === 'all' || g.country.value === country)
          .filter((g) => city === 'all' || g.city.value === city)
          .flatMap((g) => g.quartiers),
      ),
    [geo, country, city],
  );

  // Garde-fous si une valeur sélectionnée n'existe plus dans les options
  const activeCity = city === 'all' || cityOptions.some((o) => o.value === city) ? city : 'all';
  const activeQuartier =
    quartier === 'all' || quartierOptions.some((o) => o.value === quartier) ? quartier : 'all';

  const types = useMemo(
    () => [...new Set(items.map((p) => p.type))].sort() as PropType[],
    [items],
  );

  const inBeforeCategory = useMemo(() => {
    return geo
      .filter((g) => {
        if (offer !== 'all' && g.p.offer !== offer) return false;
        if (country !== 'all' && g.country.value !== country) return false;
        if (activeCity !== 'all' && g.city.value !== activeCity) return false;
        if (activeQuartier !== 'all' && !g.quartiers.some((q) => q.value === activeQuartier)) return false;
        if (propType !== 'all' && g.p.type !== propType) return false;
        return true;
      })
      .map((g) => g.p);
  }, [geo, offer, country, activeCity, activeQuartier, propType]);

  const categories = useMemo(
    () => CATEGORY_ORDER.filter((k) => inBeforeCategory.some((p) => categoryKey(p) === k)),
    [inBeforeCategory],
  );
  const activeCategory = category !== 'all' && categories.includes(category) ? category : 'all';

  const list = useMemo(
    () =>
      activeCategory === 'all'
        ? inBeforeCategory
        : inBeforeCategory.filter((p) => categoryKey(p) === activeCategory),
    [inBeforeCategory, activeCategory],
  );

  // Au départ, seuls les 9 premiers biens sont affichés
  const visible = showAll ? list : list.slice(0, INITIAL_COUNT);

  // « Voir tous nos biens » / « Voir moins » : en refermant, on remonte au début de la section
  const toggleShowAll = () => {
    if (showAll) {
      document.getElementById('biens')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll((v) => !v);
  };

  const hasActiveFilters =
    offer !== 'all' ||
    country !== 'all' ||
    activeCity !== 'all' ||
    activeQuartier !== 'all' ||
    propType !== 'all' ||
    activeCategory !== 'all';

  const resetFilters = () => {
    setOffer('all');
    setCountry('all');
    setCity('all');
    setQuartier('all');
    setPropType('all');
    setCategory('all');
  };

  const onCountryChange = (v: string) => {
    setCountry(v);
    setCity('all');
    setQuartier('all');
  };

  const onCityChange = (v: string) => {
    setCity(v);
    setQuartier('all');
  };

  return (
    <section id="biens">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2>{t('title')}</h2>
          <p>{t('intro')}</p>
        </div>

        {availableOffers.length > 1 && (
          <FilterRow<'all' | Offer>
            label={t('offerLabel')}
            values={['all', ...availableOffers]}
            active={offer}
            onChange={setOffer}
            render={(v) => t(`offers.${v}`)}
          />
        )}

        <div className="select-filters">
          {countryOptions.length > 1 && (
            <SelectField
              id="filter-country"
              label={t('countryLabel')}
              value={country}
              allLabel={t('offers.all')}
              options={countryOptions}
              onChange={onCountryChange}
            />
          )}

          {cityOptions.length > 1 && (
            <SelectField
              id="filter-city"
              label={t('cityLabel')}
              value={activeCity}
              allLabel={t('offers.all')}
              options={cityOptions}
              onChange={onCityChange}
            />
          )}

          {quartierOptions.length > 1 && (
            <SelectField
              id="filter-quartier"
              label={t('quartierLabel')}
              value={activeQuartier}
              allLabel={t('offers.all')}
              options={quartierOptions}
              onChange={setQuartier}
            />
          )}
        </div>

        {types.length > 1 && (
          <FilterRow<'all' | PropType>
            label={t('typeLabel')}
            values={['all', ...types]}
            active={propType}
            onChange={setPropType}
            render={(v) => (v === 'all' ? t('offers.all') : t(`types.${v}`))}
          />
        )}

        {categories.length > 1 && (
          <FilterRow<'all' | CategoryKey>
            label={t('bedroomsLabel')}
            values={['all', ...categories]}
            active={activeCategory}
            onChange={setCategory}
            render={(v) => t(`categories.${v}`)}
          />
        )}

        {hasActiveFilters && (
          <div className="filters" role="group" aria-label={t('reset')}>
            <button type="button" onClick={resetFilters}>
              {t('reset')}
            </button>
          </div>
        )}

        <p className="results" aria-live="polite">
          {t('count', { count: list.length })}
        </p>

        <div className="grid3">
          {visible.map((p) => {
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

        {list.length > INITIAL_COUNT && (
          <button
            type="button"
            className="btn ghost more"
            aria-expanded={showAll}
            onClick={toggleShowAll}
          >
            {showAll ? t('showLess') : t('showAll')}
          </button>
        )}
      </div>
    </section>
  );
}