export const toUserResource = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}