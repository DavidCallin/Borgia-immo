import { defineField, defineType } from 'sanity';

const copyFields = [
  defineField({ name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required() }),
  defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
  defineField({
    name: 'features',
    title: 'Caractéristiques',
    type: 'array',
    of: [{ type: 'string' }],
  }),
  defineField({ name: 'electricity_included', title: 'Électricité incluse', type: 'boolean' }),
  defineField({ name: 'notes', title: 'Notes', type: 'string' }),
];

export const property = defineType({
  name: 'property',
  title: 'Bien immobilier',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID numérique', type: 'number', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'translations.fr.title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'offer',
      title: 'Offre',
      type: 'string',
      options: { list: [
        { title: 'Séjour', value: 'stay' },
        { title: 'Location', value: 'rent' },
        { title: 'Vente', value: 'sale' },
      ]},
      description: 'Facultatif : sinon déduit de price.period',
    }),
    defineField({
      name: 'type',
      title: 'Type de bien',
      type: 'string',
      options: { list: [
        { title: 'Appartement', value: 'apartment' },
        { title: 'Duplex', value: 'duplex' },
        { title: 'Studio', value: 'studio' },
        { title: 'Villa', value: 'villa' },
        { title: 'Maison', value: 'house' },
        { title: 'Terrain', value: 'land' },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Nombre de chambres / catégorie',
      type: 'string',
      options: { list: [
        { title: 'Studio', value: 'studio' },
        { title: '1 chambre', value: '1-bedroom' },
        { title: '2 chambres', value: '2-bedroom' },
        { title: '3 chambres', value: '3-bedroom' },
        { title: '4 chambres et +', value: '4-bedroom-plus' },
        { title: 'Terrain', value: 'land' },
      ]},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'object',
      fields: [
        defineField({ name: 'city', title: 'Ville', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'district', title: 'Quartier', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'area', title: 'Zone / secteur', type: 'string' }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'object',
      fields: [
        defineField({ name: 'amount', title: 'Montant', type: 'number', validation: (r) => r.required() }),
        defineField({ name: 'currency', title: 'Devise', type: 'string', initialValue: 'XOF' }),
        defineField({
          name: 'period',
          title: 'Période',
          type: 'string',
          options: { list: [
            { title: 'Nuit', value: 'night' },
            { title: 'Mois', value: 'month' },
            { title: 'Total (vente)', value: 'total' },
          ]},
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({ name: 'phone', title: 'Téléphone', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Images (chemins ou URLs)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex. /images/apartments/1/1.JPG ou URL CDN',
    }),
    defineField({
      name: 'translations',
      title: 'Traductions',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'object', fields: copyFields }),
        defineField({ name: 'en', title: 'English', type: 'object', fields: copyFields }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'translations.fr.title',
      subtitle: 'location.district',
      id: 'id',
    },
    prepare({ title, subtitle, id }) {
      return { title: title || `Bien #${id}`, subtitle };
    },
  },
});
