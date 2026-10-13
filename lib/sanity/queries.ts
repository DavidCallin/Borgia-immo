export const propertiesQuery = `*[_type == "property"] | order(id asc) {
  id,
  "slug": slug.current,
  offer,
  type,
  category,
  location,
  price,
  contact,
  images,
  translations
}`;

export const propertyBySlugQuery = `*[_type == "property" && slug.current == $slug][0] {
  id,
  "slug": slug.current,
  offer,
  type,
  category,
  location,
  price,
  contact,
  images,
  translations
}`;
