// const parseType = (type) => {
//     if (['work', 'home', 'personal'].includes(type)) return type
// }

// const parseIsFavourite = (isFavourite) => {
//     if (!['true', 'false'].includes(isFavourite)) return undefined

//     return isFavourite === 'true' ? true : false
// }

// export const parseFilterParams = (query) => {
//     const { type, isFavourite } = query
    
//     const parsedType = parseType(type)
//     const parsedFavourite = parseIsFavourite(isFavourite)

//     return {
//         type: parsedType,
//         isFavourite: parsedFavourite
//     }
// }

export const parseFilterParams = (query) => {
  const filter = {}

  if (query.type) {
    filter.contactType = query.type
  }

  if (query.isFavourite !== undefined) {
    filter.isFavourite = query.isFavourite === 'true'
  }

  return filter
}