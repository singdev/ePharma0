module.exports = async (accountId, profilRepository) => {
  try {
    const profil = await profilRepository.getProfilByAccount(accountId);
    return profil;
  } catch (err) {
    return null;
  }
}