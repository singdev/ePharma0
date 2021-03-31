module.exports = async (id, info, profilRepository) => {
  try {
    const profil = await profilRepository.updateProfil(id, info);
    return profil;
  } catch (err) {
    return null;
  }
}