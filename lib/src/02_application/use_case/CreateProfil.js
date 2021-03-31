
module.exports = async (info, profilRepository) => {
  try {
    const profil = await profilRepository.createProfil(info);
    return profil;
  } catch (err) {
    return null;
  }
}