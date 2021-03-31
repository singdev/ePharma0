module.exports = async (id, profilRepository) => {
  try {
    const profil = await profilRepository.getProfil(id);
    return profil;
  } catch (err) {
    return null;
  }
}